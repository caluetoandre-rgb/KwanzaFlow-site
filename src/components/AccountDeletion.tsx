import { useState, FormEvent, useEffect } from 'react';
import {
  UserX,
  Trash2,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Copy,
  Check,
  Mail,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Send,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import { DeletionRequest } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function AccountDeletion() {
  // Step: 1 = Email & reason input, 2 = Code verification, 3 = Confirmed protocol screen
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('Não utilizo mais o aplicativo');
  const [notes, setNotes] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // States for API requests and feedback
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [previewCode, setPreviewCode] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [submittedRequest, setSubmittedRequest] = useState<DeletionRequest | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const copyDeletionUrl = () => {
    const url = window.location.origin + window.location.pathname + '#eliminar-conta';
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const copyProtocolText = (protocol: string) => {
    navigator.clipboard.writeText(protocol);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2500);
  };

  /**
   * Send 6-digit confirmation code to the user's email
   */
  const handleRequestCode = async (e: FormEvent) => {
    e.preventDefault();
    setFeedbackError(null);
    setFeedbackSuccess(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setFeedbackError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setIsSendingCode(true);

    try {
      const response = await fetch('/api/account-deletion/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Não foi possível enviar o código. Tente novamente.');
      }

      setFeedbackSuccess(data.message || `Código enviado para ${cleanEmail}.`);
      if (data.previewCode) {
        setPreviewCode(data.previewCode);
      }
      setResendCooldown(60);
      setStep(2);
    } catch (err: any) {
      setFeedbackError(err.message || 'Erro ao conectar ao servidor. Tente novamente.');
    } finally {
      setIsSendingCode(false);
    }
  };

  /**
   * Resend code
   */
  const handleResendCode = async () => {
    if (resendCooldown > 0 || isSendingCode) return;
    setFeedbackError(null);
    setFeedbackSuccess(null);
    setIsSendingCode(true);

    try {
      const response = await fetch('/api/account-deletion/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Não foi possível reenviar o código.');
      }

      setFeedbackSuccess('Novo código de verificação enviado para o seu e-mail.');
      if (data.previewCode) {
        setPreviewCode(data.previewCode);
      }
      setResendCooldown(60);
    } catch (err: any) {
      setFeedbackError(err.message || 'Falha ao reenviar código.');
    } finally {
      setIsSendingCode(false);
    }
  };

  /**
   * Verify code and submit deletion request
   */
  const handleVerifyAndSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedbackError(null);
    setFeedbackSuccess(null);

    const cleanCode = verificationCode.trim();
    if (cleanCode.length < 4) {
      setFeedbackError('Por favor, informe o código completo de confirmação recebido no seu e-mail.');
      return;
    }

    if (!confirmed) {
      setFeedbackError('É necessário declarar expressamente a confirmação de titularidade da conta.');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/account-deletion/verify-and-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: cleanCode,
          reason,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Código de confirmação incorreto ou expirado.');
      }

      const verifiedRequest: DeletionRequest = data.request;

      // Also persist to Firestore for durable audit trail
      try {
        await setDoc(doc(db, 'deletion_requests', verifiedRequest.id), {
          id: verifiedRequest.id,
          email: verifiedRequest.email,
          reason: verifiedRequest.reason,
          notes: verifiedRequest.notes || '',
          date: verifiedRequest.date,
          status: 'processado',
          estimatedPurgeDate: verifiedRequest.estimatedPurgeDate,
          verifiedAt: verifiedRequest.verifiedAt || new Date().toISOString(),
          adminNotifiedEmail: 'appkwanzaflow@gmail.com',
          createdAt: serverTimestamp(),
        });
      } catch (firestoreErr) {
        console.warn('Firestore backup note:', firestoreErr);
      }

      setSubmittedRequest(verifiedRequest);
      setStep(3);
    } catch (err: any) {
      setFeedbackError(err.message || 'Erro ao validar código. Verifique e tente novamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setEmail('');
    setVerificationCode('');
    setNotes('');
    setConfirmed(false);
    setFeedbackError(null);
    setFeedbackSuccess(null);
    setPreviewCode(null);
    setStep(1);
  };

  return (
    <section id="eliminar-conta" className="py-12 sm:py-16 bg-[#f8fafc] text-[#1e293b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compliance Header Card with Google Play URL Copier */}
        <div className="bg-[#0f172a] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <UserX className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    Exclusão de Conta e Dados
                  </h1>
                  <span className="bg-rose-900/80 text-rose-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-rose-700/50">
                    Google Play
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-rose-300 font-medium mt-0.5">
                  Política Obrigatória de Segurança de Dados (Data Safety Account Deletion)
                </p>
              </div>
            </div>

            <button
              onClick={copyDeletionUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer self-start sm:self-center"
              title="Copiar link exato para submissão no Google Play Console"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'URL Copiada!' : 'Copiar URL de Exclusão'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 pt-4 leading-relaxed">
            Em conformidade com as diretrizes da Google Play Store, disponibilizamos esta página pública para solicitação de remoção de conta, perfil e dados financeiros do aplicativo <strong>KwanzaFlow</strong>.
          </p>

          {/* Anti-fraud Protection Highlight */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed">
              <strong>Proteção Antifraude Obrigatória:</strong> Para evitar que terceiros solicitem indevidamente a exclusão da conta de outra pessoa, o sistema exige a comprovação de titularidade através de um <strong>código de verificação enviado para o e-mail cadastrado</strong> antes de qualquer confirmação.
            </p>
          </div>
        </div>

        {/* Breakdown of What is Deleted vs Retained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Box 1: Deleted Immediately */}
          <div className="bg-white border border-[#e2e8f0] p-6 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-base mb-3">
              <Trash2 className="w-5 h-5 text-rose-600" />
              <span>O que é Excluído Imediatamente:</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748b]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0f172a]">Registo de Autenticação:</strong> Desativação e exclusão definitiva do perfil (UID e e-mail) no Google Firebase Authentication.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0f172a]">Documentos no Firestore:</strong> Purga irreversível de lançamentos, categorias e orçamentos 50/30/20.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0f172a]">Kixikilas e Poupanças:</strong> Desvinculação imediata dos grupos coletivos e histórico financeiro.
                </span>
              </li>
            </ul>
          </div>

          {/* Box 2: Temporary Security Retention */}
          <div className="bg-white border border-[#e2e8f0] p-6 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-base mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Retenção Técnica de Segurança:</span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed mb-3">
              Certos dados técnicos anónimos podem permanecer retidos em servidores de cópia de segurança por um período estritamente limitado:
            </p>
            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0] text-xs text-slate-700 space-y-1.5">
              <div className="font-semibold text-[#0f172a] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Prazo Máximo de Retenção: Até 30 dias</span>
              </div>
              <p className="text-[#64748b] leading-relaxed">
                Utilizado exclusivamente para logs de auditoria técnica, prevenção contra abusos e conformidade legal. Ao término do prazo, a exclusão nos backups é automatizada.
              </p>
            </div>
          </div>
        </div>

        {/* Step Progress Indicator */}
        {step !== 3 && (
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                1
              </span>
              <span className="text-xs font-semibold text-[#0f172a]">
                1. Informar E-mail
              </span>
            </div>
            <div className="flex-1 mx-4 h-0.5 bg-slate-200">
              <div
                className={`h-full transition-all duration-300 ${
                  step === 2 ? 'w-full bg-rose-600' : 'w-0'
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                2
              </span>
              <span className={`text-xs font-semibold ${step === 2 ? 'text-[#0f172a]' : 'text-slate-400'}`}>
                2. Confirmar Código & Excluir
              </span>
            </div>
          </div>
        )}

        {/* Feedback Alerts */}
        {feedbackError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{feedbackError}</div>
          </div>
        )}

        {feedbackSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{feedbackSuccess}</div>
          </div>
        )}

        {/* Interactive Step Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          {/* STEP 1: Email and Deletion Reason Form */}
          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                  Passo 1: Identificação da Conta KwanzaFlow
                </h2>
                <p className="text-xs sm:text-sm text-[#64748b] mt-1">
                  Informe o e-mail cadastrado no aplicativo. Para garantir que terceiros não anulem a sua conta, enviaremos um código de segurança antes de autorizar a anulação.
                </p>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="delete-email" className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                  E-mail da Conta Google Cadastrada <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="delete-email"
                    type="email"
                    required
                    placeholder="exemplo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-[8px] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all bg-[#f8fafc]"
                  />
                  <Mail className="w-4 h-4 text-[#64748b] absolute left-4 top-3.5" />
                </div>
                <span className="text-[11px] text-[#64748b] mt-1.5 block">
                  O código de confirmação será enviado diretamente para este endereço de e-mail.
                </span>
              </div>

              {/* Reason Field */}
              <div>
                <label htmlFor="delete-reason" className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                  Motivo da Solicitação (Opcional)
                </label>
                <select
                  id="delete-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] transition-all bg-white"
                >
                  <option value="Não utilizo mais o aplicativo">Não utilizo mais o aplicativo</option>
                  <option value="Preocupações com privacidade de dados">Preocupações com privacidade de dados</option>
                  <option value="Desejo reiniciar meus dados financeiros do zero">Desejo reiniciar meus dados financeiros do zero</option>
                  <option value="Troquei de telemóvel ou número">Troquei de telemóvel ou número</option>
                  <option value="Outro motivo">Outro motivo</option>
                </select>
              </div>

              {/* Notes Field */}
              <div>
                <label htmlFor="delete-notes" className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                  Observações Adicionais (Opcional)
                </label>
                <textarea
                  id="delete-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Comentários sobre a sua experiência ou instruções específicas..."
                  className="w-full px-4 py-3 rounded-[8px] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] transition-all bg-[#f8fafc]"
                />
              </div>

              {/* Notice Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Ao clicar em <strong>Enviar Código de Verificação</strong>, o KwanzaFlow gera um código numérico de segurança com validade de 10 minutos. Você só poderá efetivar a anulação da conta após digitar o código correto.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!email || isSendingCode}
                  className={`w-full py-3.5 px-6 rounded-[8px] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    email && !isSendingCode
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-rose-600/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSendingCode ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>A enviar código de verificação...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Código de Confirmação por E-mail</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Verification Code Input and Final Submission */}
          {step === 2 && (
            <form onSubmit={handleVerifyAndSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                    Passo 2: Digite o Código de Segurança
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748b] mt-0.5">
                    O código de 6 dígitos foi enviado para <strong>{email}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setFeedbackError(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Alterar e-mail</span>
                </button>
              </div>

              {/* Preview Helper for local / dev testing */}
              {previewCode && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <span>
                      Código enviado: <strong className="font-mono text-sm tracking-wider">{previewCode}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVerificationCode(previewCode)}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium text-[11px] cursor-pointer"
                  >
                    Preencher Código
                  </button>
                </div>
              )}

              {/* 6-Digit Code Input */}
              <div>
                <label
                  htmlFor="verify-code"
                  className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2"
                >
                  Código de Confirmação Recebido por E-mail <span className="text-rose-600">*</span>
                </label>
                <div className="relative max-w-sm">
                  <input
                    id="verify-code"
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    placeholder="Ex: 849201"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3.5 text-center tracking-[8px] font-mono text-xl font-bold rounded-[8px] border-2 border-slate-300 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all bg-[#f8fafc]"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-[#64748b]">
                  <span>Válido por 10 minutos</span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendCooldown > 0 || isSendingCode}
                    className={`font-semibold cursor-pointer ${
                      resendCooldown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-rose-600 hover:text-rose-700 underline'
                    }`}
                  >
                    {resendCooldown > 0 ? `Reenviar em ${resendCooldown}s` : 'Não recebeu? Reenviar código'}
                  </button>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="w-4 h-4 mt-1 text-rose-600 rounded border-slate-300 focus:ring-rose-500 accent-rose-600 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
                    Declaro que sou o titular legítimo do e-mail <strong>{email}</strong>, inseri o código de verificação recebido e confirmo a solicitação de <strong>exclusão definitiva e irreversível da minha conta KwanzaFlow</strong>. Estou ciente de que o pedido será enviado ao suporte (<strong>appkwanzaflow@gmail.com</strong>) para purga permanente.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-5 py-3 rounded-[8px] border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={!confirmed || verificationCode.length < 4 || isVerifying}
                  className={`flex-1 w-full py-3.5 px-6 rounded-[8px] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    confirmed && verificationCode.length >= 4 && !isVerifying
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-rose-600/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validando código e enviando pedido...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Confirmar Titularidade e Solicitar Exclusão</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmed Request Screen with Official Protocol */}
          {step === 3 && submittedRequest && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#10b981] flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-2xl font-black text-[#0f172a]">
                  Solicitação de Exclusão Registada com Sucesso
                </h3>
                <p className="text-sm text-[#64748b] mt-2">
                  A titularidade do seu e-mail foi confirmada por código de segurança e o pedido oficial foi encaminhado com sucesso.
                </p>
              </div>

              {/* Status notifications dispatch box */}
              <div className="max-w-lg mx-auto space-y-2.5">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    <strong>E-mail do Administrador Notificado:</strong> Pedido enviado para <strong>appkwanzaflow@gmail.com</strong>
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>
                    <strong>Confirmação Enviada ao Usuário:</strong> Mensagem de protocolo enviada para <strong>{submittedRequest.email}</strong>
                  </span>
                </div>
              </div>

              {/* Ticket Details Box */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 max-w-lg mx-auto space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                  <span className="text-[#64748b] font-medium">Protocolo Oficial:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {submittedRequest.id}
                    </span>
                    <button
                      onClick={() => copyProtocolText(submittedRequest.id)}
                      className="p-1 text-slate-500 hover:text-slate-800 rounded cursor-pointer"
                      title="Copiar Protocolo"
                    >
                      {copiedProtocol ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                  <span className="text-[#64748b] font-medium">E-mail Cadastrado:</span>
                  <span className="font-semibold text-[#0f172a]">{submittedRequest.email}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                  <span className="text-[#64748b] font-medium">Validação de Titularidade:</span>
                  <span className="inline-flex items-center gap-1 text-[#10b981] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Código confirmado
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                  <span className="text-[#64748b] font-medium">Data do Pedido:</span>
                  <span className="text-slate-700">{submittedRequest.date}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                  <span className="text-[#64748b] font-medium">Status no Firebase:</span>
                  <span className="inline-flex items-center gap-1 text-[#10b981] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                    Em processamento prioritário
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#64748b] font-medium">Expiração de Logs (Máx):</span>
                  <span className="text-slate-700 font-medium">{submittedRequest.estimatedPurgeDate}</span>
                </div>
              </div>

              {/* Instructions Callout */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-lg mx-auto text-xs text-slate-700 leading-relaxed">
                <strong>O que acontece a seguir:</strong> O seu perfil no Firebase Authentication será desativado e todos os registros financeiros e kixikilas vinculados ao seu usuário serão purgados de forma permanente nos servidores Google Cloud.
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-[#64748b] hover:text-[#0f172a] underline cursor-pointer"
                >
                  Registrar outra solicitação ou voltar ao início
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


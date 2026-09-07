import { useState } from 'react';
import { ShieldCheck, Copy, Check, Lock, Database, UserCheck, Smartphone, EyeOff, Globe, FileCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface PrivacyPolicyProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export function PrivacyPolicy({ setActiveTab }: PrivacyPolicyProps) {
  const [copied, setCopied] = useState(false);

  const copyPolicyUrl = () => {
    const url = window.location.origin + window.location.pathname + '#privacidade';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="privacidade" className="py-12 sm:py-16 bg-[#f8fafc] text-[#1e293b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compliance Header Card */}
        <div className="bg-[#0f172a] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Política de Privacidade
                </h1>
                <p className="text-xs sm:text-sm text-[#10b981] font-semibold mt-0.5">
                  KwanzaFlow (kwanzaflow.online) • Compromisso com a sua Privacidade
                </p>
              </div>
            </div>

            <button
              onClick={copyPolicyUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer self-start sm:self-center"
              title="Copiar URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'URL Copiada!' : 'Copiar URL da Página'}</span>
            </button>
          </div>

          {/* Quick Metadata Box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 text-xs">
            <div>
              <span className="text-slate-400 block">Aplicação:</span>
              <strong className="text-white font-semibold">KwanzaFlow</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Portal Oficial:</span>
              <strong className="text-[#10b981] font-semibold">kwanzaflow.online</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Última Atualização:</span>
              <span className="text-white font-medium">Setembro de 2026</span>
            </div>
          </div>
        </div>

        {/* Legal Text Content */}
        <div className="space-y-6 text-[#334155] leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <FileCheck className="w-5 h-5 text-[#10b981]" />
              1. Apresentação e Visão Geral
            </h2>
            <p>
              Esta Política de Privacidade descreve de forma clara e transparente como o aplicativo e portal <strong>KwanzaFlow</strong> (<a href="https://kwanzaflow.online" className="text-[#10b981] underline" target="_blank" rel="noopener noreferrer">kwanzaflow.online</a>) coleta, processa, armazena e protege as informações dos seus utilizadores no território da República de Angola e internacionalmente.
            </p>
            <p className="mt-2 text-[#64748b]">
              Ao utilizar o KwanzaFlow, o utilizador concorda expressamente com as práticas de recolha e tratamento de dados descritas neste documento, estruturado em estrita conformidade com as diretrizes de segurança da Google Play Store e a legislação aplicável de proteção de dados pessoais.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <UserCheck className="w-5 h-5 text-[#10b981]" />
              2. Dados Recolhidos
            </h2>
            <p>
              O KwanzaFlow adota o princípio da minimização de dados, recolhendo estritamente o necessário para o funcionamento das ferramentas de orçamento e poupança:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-[#64748b]">
              <li>
                <strong className="text-[#0f172a]">Autenticação via Google Sign-In:</strong> Recolhemos o seu endereço de e-mail, nome de exibição e fotografia de perfil através da autenticação oficial do Google. Não temos acesso à palavra-passe da sua conta.
              </li>
              <li>
                <strong className="text-[#0f172a]">Dados Financeiros (Inserção Voluntária):</strong> Valores numéricos em Kwanzas (AOA), categorias de despesas, metas e registos de Kixikila introduzidos voluntariamente por si.
              </li>
              <li>
                <strong className="text-[#0f172a]">Dados Técnicos de Diagnóstico:</strong> Relatórios anónimos de erros para garantir a estabilidade e fluidez do sistema.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Database className="w-5 h-5 text-[#10b981]" />
              3. Armazenamento Seguro em Nuvem
            </h2>
            <p>
              Os dados recolhidos são armazenados de forma segura utilizando infraestrutura em nuvem de alta confiabilidade (Google Firebase Firestore).
            </p>
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
              <strong>Compromisso de Privacidade:</strong> O KwanzaFlow <u>NUNCA vende, aluga ou compartilha</u> as suas informações financeiras pessoais com terceiros.
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Smartphone className="w-5 h-5 text-[#10b981]" />
              4. Experiência de Utilização e Cookies
            </h2>
            <p className="text-[#64748b]">
              Utilizamos cookies e armazenamento local estritamente para manter a sua sessão ativa e preferências de visualização, garantindo uma experiência rápida e intuitiva.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Lock className="w-5 h-5 text-[#10b981]" />
              5. Segurança e Criptografia
            </h2>
            <p className="text-[#64748b]">
              Toda a comunicação entre o seu dispositivo e os nossos servidores é protegida com criptografia moderna HTTPS (SSL/TLS). Os dados em repouso nos servidores também contam com camadas rigorosas de segurança e regras de acesso por utilizador.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-rose-200 shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-rose-500 pb-1 w-fit">
              <EyeOff className="w-5 h-5 text-rose-600" />
              6. Direitos do Titular e Eliminação de Conta
            </h2>
            <p className="text-[#64748b]">
              Garantimos o seu direito de solicitar a <strong>eliminação total e definitiva da sua conta e de todos os dados associados</strong> a qualquer momento.
            </p>
            <div className="mt-4 p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="text-[#0f172a] block font-semibold text-sm">
                  Deseja excluir a sua conta agora?
                </strong>
                <span className="text-xs text-[#64748b]">
                  Acesse nossa página dedicada de exclusão de dados.
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('eliminar-conta');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-[8px] bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer flex-shrink-0"
              >
                Ir para Exclusão de Conta
              </button>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Globe className="w-5 h-5 text-[#10b981]" />
              7. Contacto e Suporte Oficial
            </h2>
            <p className="text-[#64748b]">
              Para esclarecimentos, dúvidas ou exercício dos seus direitos de privacidade, entre em contacto connosco através do e-mail oficial de suporte:
            </p>
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-900 font-bold">
              appkwanzaflow@gmail.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

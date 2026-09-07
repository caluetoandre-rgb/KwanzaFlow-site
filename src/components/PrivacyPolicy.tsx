import { useState } from 'react';
import { ShieldCheck, Copy, Check, Lock, Database, UserCheck, Smartphone, EyeOff, Globe, Server, FileCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface PrivacyPolicyProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export function PrivacyPolicy({ setActiveTab }: PrivacyPolicyProps) {
  const [copied, setCopied] = useState(false);

  const copyPolicyUrl = () => {
    const url = 'https://kwanzaflow.online#privacidade';
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
                  Conformidade Oficial Google Play Store & Legislação Angolana
                </p>
              </div>
            </div>

            <button
              onClick={copyPolicyUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer self-start sm:self-center"
              title="Copiar URL para o Google Play Console"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'URL Copiada!' : 'Copiar Link Oficial'}</span>
            </button>
          </div>

          {/* Quick Metadata Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
            <div>
              <span className="text-slate-400 block">Aplicação:</span>
              <strong className="text-white font-semibold">KwanzaFlow</strong>
            </div>
            <div>
              <span className="text-slate-400 block">ID do Pacote (Package):</span>
              <code className="text-[#10b981] font-mono text-[11px]">com.kwanzaflow.aoa</code>
            </div>
            <div>
              <span className="text-slate-400 block">Domínio Oficial:</span>
              <strong className="text-[#10b981] font-mono text-[11px]">kwanzaflow.online</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Última Atualização:</span>
              <span className="text-white font-medium">Janeiro de 2026</span>
            </div>
          </div>
        </div>

        {/* Legal Text Content */}
        <div className="space-y-6 text-[#334155] leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <FileCheck className="w-5 h-5 text-[#10b981]" />
              1. Identificação e Visão Geral
            </h2>
            <p>
              Esta Política de Privacidade descreve de forma clara e transparente como o aplicativo <strong>KwanzaFlow</strong> (identificador de pacote Android: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-800 font-mono">com.kwanzaflow.aoa</code>) coleta, processa, armazena e protege as informações dos seus utilizadores no território da República de Angola e internacionalmente.
            </p>
            <p className="mt-2 text-[#64748b]">
              Ao utilizar o KwanzaFlow, o utilizador concorda expressamente com as práticas de recolha e tratamento de dados descritas neste documento, estruturado em estrita conformidade com as <strong>Diretrizes de Segurança de Dados da Google Play Store (Google Play Developer Program Policies)</strong> e a <strong>Lei n.º 22/11 de Proteção de Dados Pessoais de Angola</strong>.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <UserCheck className="w-5 h-5 text-[#10b981]" />
              2. Dados Recolhidos e Métodos de Obtenção
            </h2>
            <p>
              O KwanzaFlow adota o princípio da minimização de dados, recolhendo estritamente os dados necessários para o funcionamento das funcionalidades contratadas:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-[#64748b]">
              <li>
                <strong className="text-[#0f172a]">Autenticação e Identidade via Google Sign-In:</strong> Recolhemos o seu endereço de e-mail, nome de exibição e fotografia de perfil através do <em>Credential Manager</em> oficial do Android e <em>Google Firebase Authentication</em>. Não temos acesso à sua palavra-passe da conta Google.
              </li>
              <li>
                <strong className="text-[#0f172a]">Dados Financeiros e Registos de Gestão (Inserção Voluntária):</strong> Valores numéricos em Kwanzas (AOA), categorias de despesas, orçamentos, metas de poupança, registos de quotas de Kixikila e notas simples de vendas/fiados de micro-negócios fornecidos voluntariamente por si.
              </li>
              <li>
                <strong className="text-[#0f172a]">Dados Técnicos de Diagnóstico:</strong> Relatórios anónimos de estabilidade, modelo de hardware e versão do Android para garantir o correto funcionamento do aplicativo.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Database className="w-5 h-5 text-[#10b981]" />
              3. Finalidade do Tratamento e Armazenamento em Nuvem
            </h2>
            <p>
              Os dados recolhidos possuem as seguintes finalidades operacionais exclusivas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0]">
                <strong className="text-[#0f172a] block text-xs uppercase text-[#10b981] font-bold mb-1">
                  Sincronização em Nuvem
                </strong>
                <span className="text-xs text-[#64748b]">
                  Armazenamento em tempo real dos seus lançamentos no <strong>Google Cloud Firestore</strong> com infraestrutura criptografada e segura, permitindo restaurar os seus dados caso troque ou formate o seu telemóvel.
                </span>
              </div>
              <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0]">
                <strong className="text-[#0f172a] block text-xs uppercase text-[#10b981] font-bold mb-1">
                  Segurança e Autenticação
                </strong>
                <span className="text-xs text-[#64748b]">
                  Garantir que apenas a sua conta Google autorizada tenha acesso de leitura e escrita às suas finanças e grupos de Kixikila através de regras de segurança rígidas (Firebase Security Rules).
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
              <strong>Compromisso de Não Comercialização:</strong> O KwanzaFlow <u>NUNCA vende, aluga ou compartilha</u> as suas informações financeiras pessoais com bancos, financeiras ou corretores de dados (data brokers) para fins de enriquecimento de perfil ou telemarketing.
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              4. Ausência de Publicidade e Sigilo Financeiro
            </h2>
            <p>
              O <strong>KwanzaFlow</strong> opera de forma independente e com foco absoluto na privacidade e comodidade do utilizador:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-[#64748b]">
              <li>
                <strong className="text-[#0f172a]">Sem Anúncios:</strong> O aplicativo não exibe qualquer modalidade de anúncios publicitários, faixas de terceiros ou banners patrocinados.
              </li>
              <li>
                <strong className="text-[#0f172a]">Isento de Rastreamento Comercial:</strong> Não coletamos identificadores de publicidade (como o AAID) para perfis comerciais nem usamos ferramentas de telemetria para anúncios.
              </li>
              <li>
                <strong className="text-[#0f172a]">Sigilo Total:</strong> Os seus cálculos orçamentários, saldos e anotações de Kixikila permanecem sob sigilo exclusivo da sua conta.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Lock className="w-5 h-5 text-[#10b981]" />
              5. Segurança, Criptografia e Armazenamento dos Dados
            </h2>
            <p>
              Implementamos salvaguardas técnicas e administrativas rigorosas para manter os seus dados seguros:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm text-[#64748b]">
              <li>
                <strong className="text-[#0f172a]">Criptografia em Trânsito:</strong> Toda a comunicação entre o aplicativo KwanzaFlow e os servidores em nuvem é protegida com criptografia moderna HTTPS e protocolo Transport Layer Security (TLS 1.3).
              </li>
              <li>
                <strong className="text-[#0f172a]">Criptografia em Repouso:</strong> Os dados no Google Firestore são criptografados em repouso nos centros de dados seguros da Google Cloud Platform (GCP).
              </li>
              <li>
                <strong className="text-[#0f172a]">Acesso Restrito:</strong> Nenhuma pessoa estranha tem permissão para visualizar o conteúdo do seu orçamento pessoal.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-rose-200 shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-rose-500 pb-1 w-fit">
              <EyeOff className="w-5 h-5 text-rose-600" />
              6. Direitos do Titular e Eliminação de Conta (URL Google Play)
            </h2>
            <p>
              Em harmonia com as regras obrigatórias de exclusão de dados da Google Play Store, garantimos o seu direito inalienável de solicitar a <strong>eliminação total e definitiva da sua conta e de todos os dados associados</strong> a qualquer momento, sem necessidade de reinstalar o aplicativo.
            </p>
            <div className="mt-4 p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="text-[#0f172a] block font-semibold text-sm">
                  Deseja excluir a sua conta agora?
                </strong>
                <span className="text-xs text-[#64748b]">
                  Acesse nossa página e formulário oficial de exclusão imediata.
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
              7. Legislação Aplicável e Encarregado de Proteção (DPO)
            </h2>
            <p>
              Esta política é regida pela <strong>Lei n.º 22/11 de Proteção de Dados Pessoais de Angola</strong> e pelas diretrizes internacionais do Google Play Developer Console.
            </p>
            <p className="mt-3 text-sm text-[#64748b]">
              Para esclarecimentos, exercício dos seus direitos de privacidade ou contacto com o responsável pelo tratamento de dados, envie um e-mail para o canal oficial de suporte: <strong className="text-[#10b981]">appkwanzaflow@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

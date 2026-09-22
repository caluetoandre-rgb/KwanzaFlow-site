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
              Esta Política explica como os dados são tratados quando o utilizador utiliza o aplicativo e portal <strong>KwanzaFlow</strong> (<a href="https://kwanzaflow.online" className="text-[#10b981] underline" target="_blank" rel="noopener noreferrer">kwanzaflow.online</a>). O tratamento rege-se pelos princípios da transparência e segurança.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <UserCheck className="w-5 h-5 text-[#10b981]" />
              2. Dados Recolhidos
            </h2>
            <p>
              O KwanzaFlow adota o princípio da minimização de dados, recolhendo e processando as seguintes categorias conforme necessário para a prestação dos serviços:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-3 text-[#64748b] text-xs sm:text-sm">
              <li>
                <strong className="text-[#0f172a] block">Nome, E-mail, Foto de Perfil e Dados de Autenticação:</strong>
                <span><strong>Finalidade:</strong> Identificação da conta e login seguro via Google Sign-In. <strong>Processamento/Armazenamento:</strong> Firebase Authentication e Firestore (nuvem segura). <strong>Partilha:</strong> Não partilhado com terceiros, exceto infraestrutura Google de autenticação.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Receitas, Despesas, Categorias, Orçamento, Metas e Dívidas:</strong>
                <span><strong>Finalidade:</strong> Registo contábil e cálculo de orçamentos pessoais. <strong>Processamento/Armazenamento:</strong> Firestore (nuvem). <strong>Partilha:</strong> Exclusivo do utilizador.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Dados de Kixikila:</strong>
                <span><strong>Finalidade:</strong> Organização de rondas de poupança voluntária e registo de quotas. <strong>Processamento/Armazenamento:</strong> Firestore. <strong>Partilha:</strong> Partilhado unicamente com os membros autorizados do respetivo grupo de kixikila.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Dados de Pequenos Negócios:</strong>
                <span><strong>Finalidade:</strong> Organização financeira e registo simplificado de receitas e despesas de pequenos negócios. <strong>Processamento/Armazenamento:</strong> Firestore. <strong>Partilha:</strong> Exclusivo do utilizador.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Dados de Recibos e Imagens Capturadas pela Câmera:</strong>
                <span><strong>Finalidade:</strong> Leitura de comprovativos e anexação opcional a registos financeiros. <strong>Processamento/Armazenamento:</strong> Processado localmente ou em servidor seguro para extração de dados. <strong>Partilha:</strong> Não comercializado.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Dados Processados pela IA (Consultoria Financeira):</strong>
                <span><strong>Finalidade:</strong> Geração de respostas automáticas de assistência financeira. <strong>Processamento/Armazenamento:</strong> Processado via Firebase AI Logic / Google Gemini. <strong>Partilha:</strong> Servidores Google de IA para fins exclusivos de inferência da resposta.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Identificadores do Dispositivo, Dados de Diagnóstico e Analytics/Crashlytics:</strong>
                <span><strong>Finalidade:</strong> Diagnosticar problemas, monitorizar estabilidade e analisar métricas de utilização. <strong>Processamento/Armazenamento:</strong> Google Firebase Crashlytics e Analytics. <strong>Partilha:</strong> Google LLC para relatórios técnicos agregados.</span>
              </li>
              <li>
                <strong className="text-[#0f172a] block">Dados de Publicidade:</strong>
                <span><strong>Finalidade:</strong> Exibição de anúncios para manutenção da gratuidade do app. <strong>Processamento/Armazenamento:</strong> Google AdMob / AdSense. <strong>Partilha:</strong> Redes parceiras de publicidade autorizadas.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Inteligência Artificial e Consultoria Financeira */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Database className="w-5 h-5 text-[#10b981]" />
              3. Inteligência Artificial e Consultoria Financeira
            </h2>
            <p className="text-[#334155] leading-relaxed">
              O KwanzaFlow inclui funcionalidades de consultoria e assistência baseadas em Inteligência Artificial (serviços de IA da Google). As informações financeiras fornecidas pelo utilizador durante as interações podem fazer parte do contexto necessário para que o modelo processe e elabore a resposta.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-xs sm:text-sm text-[#64748b]">
              <li><strong>Serviços Utilizados:</strong> Firebase AI Logic e modelos Google Gemini.</li>
              <li><strong>Armazenamento e Retenção:</strong> Os prompts e respostas podem ser processados em servidores externos da Google para inferência, sendo retidos conforme as políticas de IA aplicáveis da Google.</li>
              <li><strong>Impacto da Eliminação de Conta:</strong> Ao eliminar a sua conta e dados no KwanzaFlow, os registos associados são purgados dos nossos servidores.</li>
              <li><strong>Limitações:</strong> As respostas geradas pela IA podem conter erros, omissões ou imprecisões e não constituem garantia de resultados financeiros nem substituem aconselhamento profissional.</li>
            </ul>
          </div>

          {/* Section 4: Câmera e Leitura de Comprovativos */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Smartphone className="w-5 h-5 text-[#10b981]" />
              4. Câmera e Leitura de Comprovativos
            </h2>
            <p className="text-[#334155] leading-relaxed">
              Quando aplicável, a câmara do dispositivo pode ser acedida pelo utilizador para fotografar recibos, talões de transferência ou comprovativos de kixikila. As imagens são utilizadas exclusivamente para o propósito de registo documental associado à transação, sendo processadas com segurança e armazenadas apenas conforme solicitado pelo utilizador na sua conta.
            </p>
          </div>

          {/* Section 5: Prestadores de Serviços e Tecnologias de Terceiros */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Database className="w-5 h-5 text-[#10b981]" />
              5. Prestadores de Serviços e Tecnologias de Terceiros
            </h2>
            <p className="text-[#334155] leading-relaxed">
              O KwanzaFlow não vende nem aluga os dados financeiros pessoais dos utilizadores. Determinados dados podem ser processados por fornecedores tecnológicos necessários à prestação dos serviços:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-xs sm:text-sm text-[#64748b]">
              <li><strong>Google Firebase / Firestore:</strong> Infraestrutura em nuvem para armazenamento seguro de dados e sincronização.</li>
              <li><strong>Firebase Authentication:</strong> Gestão de início de sessão seguro via contas Google.</li>
              <li><strong>Firebase Crashlytics:</strong> Recolha de relatórios técnicos de falhas e erros de execução.</li>
              <li><strong>Google AdMob / AdSense:</strong> Veiculação de anúncios publicitários para suporte à gratuidade da plataforma.</li>
              <li><strong>Google AI / Gemini:</strong> Processamento de consultas e assistência financeira por inteligência artificial.</li>
            </ul>
          </div>

          {/* Section 6: Cookies (Portal Web) e Identificadores (App Móvel) */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Smartphone className="w-5 h-5 text-[#10b981]" />
              6. Cookies e Identificadores Tecnológicos
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#475569]">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">Cookies e armazenamento no portal web (kwanzaflow.online):</strong>
                <p>O portal web utiliza cookies técnicos essenciais para gestão de sessões, segurança contra fraudes (CSRF) e preferências. O utilizador pode gerir ou bloquear cookies através do seu navegador.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">Identificadores e tecnologias utilizadas no aplicativo móvel:</strong>
                <p>O aplicativo móvel utiliza identificadores de publicidade do sistema operativo e SDKs oficiais (como Firebase e AdMob) para suporte técnico e medição de desempenho de anúncios.</p>
              </div>
            </div>
          </div>

          {/* Section 7: Publicidade */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/20 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Globe className="w-5 h-5 text-[#10b981]" />
              <h2 className="text-lg font-bold text-[#0f172a]">
                7. Publicidade e Anúncios
              </h2>
            </div>
            <p className="text-[#334155] leading-relaxed">
              Os serviços de publicidade podem utilizar cookies, identificadores ou tecnologias semelhantes para apresentar, medir e personalizar anúncios, de acordo com as configurações de consentimento e publicidade aplicáveis. Os parceiros de publicidade não têm acesso aos dados financeiros pessoais inseridos no KwanzaFlow.
            </p>
            <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Ficheiro Oficial:</strong> O ficheiro <code className="bg-amber-100 px-1 rounded font-mono">/app-ads.txt</code> encontra-se publicamente ativo e verificado na raiz de <a href="https://kwanzaflow.online/app-ads.txt" className="underline font-bold" target="_blank" rel="noopener noreferrer">kwanzaflow.online/app-ads.txt</a>.
            </div>
          </div>

          {/* Section 8: Retenção e Eliminação de Dados */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Database className="w-5 h-5 text-[#10b981]" />
              8. Retenção e Eliminação de Dados
            </h2>
            <p className="text-[#64748b] leading-relaxed">
              Os dados da conta e os registos financeiros são mantidos enquanto a conta estiver ativa. Quando o utilizador solicita a eliminação da conta (através da nossa página dedicada ou canais oficiais), os dados associados à conta são removidos dos servidores ativos. Determinados registos de suporte ou logs técnicos podem ser retidos temporariamente por prazos estritos exigidos por obrigações legais ou de segurança legítima.
            </p>
          </div>

          {/* Section 9: Segurança */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Lock className="w-5 h-5 text-[#10b981]" />
              9. Segurança e Criptografia
            </h2>
            <p className="text-[#64748b]">
              As comunicações entre o aplicativo, o portal e os servidores são protegidas por HTTPS/TLS. Adotamos práticas rigorosas de controlo de acesso e proteção de infraestrutura em nuvem.
            </p>
          </div>

          {/* Section 10: Diagnósticos */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <FileCheck className="w-5 h-5 text-[#10b981]" />
              10. Dados Técnicos e Diagnósticos
            </h2>
            <p className="text-[#64748b]">
              Recolhemos dados técnicos e relatórios de falhas, que podem incluir informações sobre o dispositivo, versão da aplicação e circunstâncias do erro, utilizados para diagnosticar problemas e melhorar a estabilidade.
            </p>
          </div>

          {/* Section 11: Enquadramento Legal */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              11. Enquadramento Legal e Legislação Aplicável
            </h2>
            <p className="text-[#64748b] leading-relaxed">
              Esta Política foi elaborada tendo em consideração as políticas aplicáveis do Google Play e a legislação de proteção de dados aplicável em Angola (incluindo a Lei n.º 22/11).
            </p>
          </div>

          {/* Section 12: Direitos do Titular */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-rose-200 shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-rose-500 pb-1 w-fit">
              <EyeOff className="w-5 h-5 text-rose-600" />
              12. Direitos do Titular e Eliminação de Conta
            </h2>
            <p className="text-[#64748b]">
              Garantimos o seu direito de aceder, retificar ou solicitar a eliminação total e definitiva da sua conta e de todos os dados associados a qualquer momento.
            </p>
            <div className="mt-4 p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="text-[#0f172a] block font-semibold text-sm">
                  Deseja excluir a sua conta agora?
                </strong>
                <span className="text-xs text-[#64748b]">
                  Acesse nossa página dedicada de solicitação de exclusão de dados.
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

          {/* Section 13: Contacto */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Globe className="w-5 h-5 text-[#10b981]" />
              13. Contacto e Suporte
            </h2>
            <p className="text-[#64748b]">
              Para esclarecimentos ou exercício dos seus direitos de privacidade, entre em contacto connosco através do e-mail oficial:
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

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

          {/* Section 4: Cookies e Tecnologias de Rastreio */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Smartphone className="w-5 h-5 text-[#10b981]" />
              4. Política Explícita de Cookies e Armazenamento Local
            </h2>
            <p className="text-[#334155] leading-relaxed">
              O portal web e os serviços associados do <strong>KwanzaFlow</strong> (<a href="https://kwanzaflow.online" className="text-[#10b981] underline" target="_blank" rel="noopener noreferrer">kwanzaflow.online</a>) utilizam cookies, tags de pixel, identificadores de dispositivo e tecnologias de armazenamento local (HTML5 <em>localStorage</em> e <em>sessionStorage</em>) para otimizar o desempenho, personalizar a navegação e garantir a integridade das sessões dos utilizadores.
            </p>
            <div className="mt-4 space-y-3 text-sm text-[#475569]">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">Tipos de Cookies Utilizados:</strong>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                  <li>
                    <strong className="text-slate-800">Cookies Estritamente Necessários:</strong> Indispensáveis para a autenticação segura de contas de utilizador, prevenção contra fraudes (Cross-Site Request Forgery - CSRF) e manutenção de preferências essenciais de navegação.
                  </li>
                  <li>
                    <strong className="text-slate-800">Cookies de Desempenho e Telemetria:</strong> Permitem recolher métricas agregadas anónimas sobre velocidade de carregamento de páginas, erros de tempo de execução e fluxos de navegação, visando a melhoria contínua da aplicação.
                  </li>
                  <li>
                    <strong className="text-slate-800">Cookies de Personalização e Funcionalidade:</strong> Lembram opções voluntárias selecionadas pelo utilizador, como moedas secundárias de referência, temas de visualização e filtros de consulta.
                  </li>
                  <li>
                    <strong className="text-slate-800">Cookies de Publicidade e Medição (Terceiros):</strong> Utilizados por parceiros publicitários para mensurar o alcance e a eficácia de campanhas informativas e de anúncios exibidos na plataforma.
                  </li>
                </ul>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong>Gestão e Desativação de Cookies:</strong> O utilizador pode, a qualquer instante, configurar o seu navegador web (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge ou navegador móvel) para recusar, bloquear ou eliminar cookies armazenados. Note-se que a desativação total de cookies técnicos essenciais pode impactar a persistência da sua sessão autenticada.
              </p>
            </div>
          </div>

          {/* Section 5: Publicidade de Terceiros e Google AdSense / AdMob */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/20 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Globe className="w-5 h-5 text-[#10b981]" />
              <h2 className="text-lg font-bold text-[#0f172a]">
                5. Cláusula de Publicidade, Parceiros de Anúncios e Google AdSense
              </h2>
            </div>
            <p className="text-[#334155] leading-relaxed">
              De forma a manter o <strong>KwanzaFlow 100% gratuito e acessível</strong> a todas as famílias e micro-empreendedores angolanos, o website e o aplicativo móvel exibem anúncios publicitários veiculados por plataformas tecnológicas de terceiros credenciadas, designadamente a <strong>Google LLC (Google AdSense e Google AdMob)</strong> e suas redes parceiras certificadas.
            </p>

            <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-[#475569]">
              <div className="p-4 bg-white rounded-xl border border-emerald-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  O Uso de Cookies Publicitários e o Cookie DART da Google
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A Google, na qualidade de fornecedora terceira, utiliza cookies para veicular anúncios no nosso portal e nas aplicações móveis:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                  <li>
                    O uso do <strong>cookie DART</strong> permite à Google e aos seus parceiros exibir anúncios direcionados aos utilizadores com base nas suas visitas a este site, a outros sites na Internet ou em aplicações móveis.
                  </li>
                  <li>
                    Os cookies de publicidade registam informações técnicas anónimas (como tipo de navegador, páginas visualizadas, interação com blocos de anúncio e endereço IP anonimizado).
                  </li>
                  <li>
                    <strong className="text-slate-800">Isolamento Absoluto de Dados Financeiros:</strong> Os parceiros de publicidade (incluindo o Google AdSense) <u>NÃO têm qualquer acesso</u> aos valores do seu orçamento, notas de kixikila, metas de poupança ou registos de despesas pessoais armazenados no KwanzaFlow.
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Como Desativar a Publicidade Personalizada (Opt-Out)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Respeitamos integralmente a sua autonomia sobre anúncios personalizados. O utilizador pode desativar a personalização de anúncios da Google a qualquer momento através dos seguintes canais oficiais:
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Configurações de Anúncios da Google</span>
                    <span className="text-[#10b981] font-bold">↗</span>
                  </a>
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs flex items-center justify-between transition-colors"
                  >
                    <span>AboutAds Choices (NAI / DAA)</span>
                    <span className="text-[#10b981] font-bold">↗</span>
                  </a>
                  <a
                    href="https://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Your Online Choices (EDAA)</span>
                    <span className="text-[#10b981] font-bold">↗</span>
                  </a>
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Como a Google Utiliza Dados em Sites Parceiros</span>
                    <span className="text-[#10b981] font-bold">↗</span>
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Ficheiro Oficial Autorizado de Publicidade:</strong> Mantemos o ficheiro <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">/app-ads.txt</code> publicamente verificado e atualizado na raiz do domínio <a href="https://kwanzaflow.online/app-ads.txt" className="underline font-bold" target="_blank" rel="noopener noreferrer">kwanzaflow.online/app-ads.txt</a>, em total conformidade com os padrões da IAB Tech Lab e da Google Play Store.
              </div>
            </div>
          </div>

          {/* Section 6: Segurança e Criptografia */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Lock className="w-5 h-5 text-[#10b981]" />
              6. Segurança e Criptografia de Ponta a Ponta
            </h2>
            <p className="text-[#64748b]">
              Toda a comunicação entre o seu dispositivo e os nossos servidores é protegida com criptografia moderna HTTPS (SSL/TLS de 256 bits). Os dados em repouso nos servidores também contam com camadas rigorosas de segurança, regras estritas de controlo de acesso por utilizador e auditoria periódica de vulnerabilidades.
            </p>
          </div>

          {/* Section 7: Enquadramento Legal e APD */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              7. Enquadramento Legal em Angola (Lei n.º 22/11)
            </h2>
            <p className="text-[#64748b] leading-relaxed">
              O tratamento de dados operado pelo KwanzaFlow rege-se pelos princípios da legalidade, lealdade, transparência e proporcionalidade consagrados na <strong>Lei n.º 22/11, de 17 de Junho — Lei de Protecção de Dados Pessoais da República de Angola</strong>, sob a supervisão das melhores práticas da Agência de Protecção de Dados (APD).
            </p>
          </div>

          {/* Section 8: Direitos do Titular */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-rose-200 shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-rose-500 pb-1 w-fit">
              <EyeOff className="w-5 h-5 text-rose-600" />
              8. Direitos do Titular e Eliminação de Conta
            </h2>
            <p className="text-[#64748b]">
              Garantimos o seu direito inalienável de aceder, retificar, limitar o tratamento ou solicitar a <strong>eliminação total e definitiva da sua conta e de todos os dados associados</strong> a qualquer momento.
            </p>
            <div className="mt-4 p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="text-[#0f172a] block font-semibold text-sm">
                  Deseja excluir a sua conta agora?
                </strong>
                <span className="text-xs text-[#64748b]">
                  Acesse nossa página dedicada de solicitação de exclusão imediata de dados.
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

          {/* Section 9: Contacto */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Globe className="w-5 h-5 text-[#10b981]" />
              9. Contacto e Encarregado de Privacidade
            </h2>
            <p className="text-[#64748b]">
              Para esclarecimentos, dúvidas sobre cookies ou exercício dos seus direitos de privacidade e protecção de dados, entre em contacto connosco através do e-mail oficial de suporte:
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

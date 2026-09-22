import { FileText, AlertTriangle, ShieldCheck, Scale, Copyright, RefreshCw } from 'lucide-react';
import { ActiveTab } from '../types';

interface TermsOfUseProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export function TermsOfUse({ setActiveTab }: TermsOfUseProps) {
  return (
    <section id="termos" className="py-12 sm:py-16 bg-[#f8fafc] text-[#1e293b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#0f172a] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center border border-emerald-500/30">
              <FileText className="w-6 h-6 text-[#10b981]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Termos e Condições de Uso
              </h1>
              <p className="text-xs sm:text-sm text-[#10b981] font-semibold mt-0.5">
                KwanzaFlow (kwanzaflow.online) • Vigência a partir de Setembro de 2026
              </p>
            </div>
          </div>
        </div>

        {/* Legal Clauses */}
        <div className="space-y-6 text-[#334155] text-sm sm:text-base leading-relaxed">
          {/* Clause 1: Nature of Service */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Scale className="w-5 h-5 text-[#10b981]" />
              1. Natureza Informativa e Não Bancária do Serviço
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-4 text-xs sm:text-sm text-amber-950">
              <strong>AVISO LEGAL EXPRESSO:</strong> O <strong>KwanzaFlow</strong> (<a href="https://kwanzaflow.online" className="underline font-semibold" target="_blank" rel="noopener noreferrer">kwanzaflow.online</a>) é exclusivamente uma ferramenta tecnológica de organização pessoal, organização financeira e registo simplificado de receitas e despesas de pequenos negócios, e apoio à poupança comunitária. O KwanzaFlow <u>NÃO É uma instituição bancária, financeira, emissora de moeda eletrónica, cooperativa de crédito nem prestador de serviços de pagamento regulado pelo Banco Nacional de Angola (BNA)</u>.
            </div>
            <p className="text-[#64748b]">
              O aplicativo não realiza custódia de fundos financeiros reais, não concede empréstimos, não intermedia cobranças compulsórias e não garante rendimentos de capital. Quaisquer montantes indicados no aplicativo em Kwanzas (Kz) correspondem a registos contábeis e apontamentos inseridos pelo próprio utilizador.
            </p>
          </div>

          {/* Clause 2: AI Consulting */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <FileText className="w-5 h-5 text-[#10b981]" />
              2. Consultoria Financeira por Inteligência Artificial
            </h2>
            <p className="text-[#334155]">
              O KwanzaFlow possui funcionalidades de assistência e consultoria financeira baseadas em Inteligência Artificial. Destaca-se que:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm text-[#64748b]">
              <li>As respostas e orientações são geradas automaticamente por modelos tecnológicos e podem conter erros, omissões ou informações incompletas.</li>
              <li>A inteligência artificial funciona estritamente como uma ferramenta informativa e de apoio à organização financeira pessoal.</li>
              <li>Não constitui garantia de resultados financeiros futuros nem substitui em nenhuma circunstância aconselhamento profissional qualificado.</li>
              <li>O utilizador deve sempre verificar informações importantes antes de tomar quaisquer decisões de investimento ou gestão financeira.</li>
              <li>As informações necessárias para responder às consultas podem ser processadas pelos serviços de IA utilizados pelo KwanzaFlow, conforme detalhado na Política de Privacidade.</li>
            </ul>
          </div>

          {/* Clause 3: Responsibilities of User */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              3. Responsabilidades do Utilizador
            </h2>
            <p>
              Ao utilizar a plataforma, o utilizador assume e declara que:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm text-[#64748b]">
              <li>
                <strong className="text-[#0f172a]">Veracidade dos Dados:</strong> É o único responsável pela integridade e precisão dos valores de receitas, despesas, fiados e orçamentos lançados no sistema.
              </li>
              <li>
                <strong className="text-[#0f172a]">Segurança da Conta Google:</strong> Deve zelar pela segurança do seu dispositivo e das credenciais de acesso vinculadas à sua conta Google.
              </li>
              <li>
                <strong className="text-[#0f172a]">Uso Legítimo:</strong> Compromete-se a não utilizar o KwanzaFlow para fins ilícitos.
              </li>
            </ul>
          </div>

          {/* Clause 4: Kixikila Disclaimer */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-amber-500 pb-1 w-fit">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              4. Regras e Isenção de Responsabilidade sobre a Kixikila
            </h2>
            <p>
              O módulo de <strong>Kixikila</strong> do KwanzaFlow atua unicamente como um livro-razão digital e facilitador de comunicação para rondas de poupança voluntária entre pessoas de confiança recíproca.
            </p>
            <p className="mt-2 text-sm text-[#64748b]">
              Os pagamentos e transferências entre os participantes são realizados diretamente entre os próprios membros, fora do KwanzaFlow. O KwanzaFlow não recebe, mantém, movimenta ou custodia os valores das contribuições.
            </p>
            <p className="mt-2 text-sm text-[#64748b]">
              O KwanzaFlow não atua como fiador de membros inadimplentes e não possui autoridade legal para intervir em disputas financeiras internas entre os membros de um grupo.
            </p>
          </div>

          {/* Clause 5: Third-Party Services & Privacy Policy */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <FileText className="w-5 h-5 text-[#10b981]" />
              5. Publicidade e Serviços de Terceiros
            </h2>
            <p className="text-[#64748b]">
              O KwanzaFlow utiliza serviços tecnológicos de terceiros, incluindo publicidade, infraestrutura em nuvem e outros serviços necessários ao funcionamento, conforme detalhado na Política de Privacidade.
            </p>
            <div className="mt-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-900">
              <strong>Protecção de Dados:</strong> O tratamento dos dados pessoais e financeiros do utilizador é realizado conforme descrito na <a href="#privacidade" onClick={(e) => { e.preventDefault(); setActiveTab('privacidade'); window.scrollTo({top:0, behavior:'smooth'}); }} className="underline font-bold text-emerald-700">Política de Privacidade do KwanzaFlow</a>.
            </div>
          </div>

          {/* Clause 6: Intellectual Property */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <Copyright className="w-5 h-5 text-[#10b981]" />
              6. Propriedade Intelectual
            </h2>
            <p className="text-[#64748b]">
              A marca <strong>KwanzaFlow</strong>, o logótipo, a interface do utilizador, textos, gráficos e o código-fonte associado são propriedade exclusiva dos desenvolvedores, protegidos pelas leis angolanas e tratados internacionais de propriedade intelectual.
            </p>
          </div>

          {/* Clause 7: Modifications and Support */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2 mb-3 border-b-2 border-[#10b981] pb-1 w-fit">
              <RefreshCw className="w-5 h-5 text-[#10b981]" />
              7. Modificações e Suporte
            </h2>
            <p>
              Reservamo-nos o direito de atualizar periodicamente estes Termos para refletir melhorias no serviço.
            </p>
            <p className="mt-2 text-sm text-[#64748b]">
              Dúvidas ou suporte oficial devem ser remetidos exclusivamente para o e-mail: <strong className="text-[#10b981]">appkwanzaflow@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

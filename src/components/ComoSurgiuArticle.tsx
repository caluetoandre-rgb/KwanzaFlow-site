import { useEffect, useState } from 'react';
import { 
  Download, 
  FileText, 
  ExternalLink, 
  Share2, 
  Check, 
  Copy, 
  BookOpen, 
  HeartHandshake, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  User, 
  Calendar, 
  ChevronRight, 
  ArrowDownToLine, 
  Smartphone, 
  Layers, 
  PieChart, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Compass,
  Building2,
  Lock,
  Globe2,
  DollarSign
} from 'lucide-react';
import { ActiveTab } from '../types';

interface ComoSurgiuArticleProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDownloadModal?: () => void;
}

export function ComoSurgiuArticle({ setActiveTab, onOpenDownloadModal }: ComoSurgiuArticleProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeHeading, setActiveHeading] = useState('genese');

  const articleUrl = 'https://kwanzaflow.online/sobre-nos';
  const pdfDownloadUrl = '/downloads/KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf';
  const pdfViewUrl = '/comosurgiu.pdf';

  useEffect(() => {
    // Dynamic SEO Title and Meta update for Google crawlers and user browser tabs
    const previousTitle = document.title;
    document.title = 'Sobre Nós - Génese e Princípios do KwanzaFlow | Tecnologia e Cidadania Financeira';

    // Update canonical or meta if present
    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Sobre Nós: Conheça a génese do KwanzaFlow, princípios de gestão consciente, orçamento familiar em Kwanzas, Kixikila digital e cidadania financeira em Angola.'
      );
    }


    return () => {
      document.title = previousTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    setActiveHeading(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#f8fafc] text-[#1e293b] min-h-screen py-6 sm:py-10">
      {/* Schema.org Structured Data for Google Rich Snippets & Search Appearance */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                '@id': 'https://kwanzaflow.online/sobre-nos#article',
                isPartOf: {
                  '@type': 'WebSite',
                  '@id': 'https://kwanzaflow.online/#website',
                  name: 'KwanzaFlow',
                  url: 'https://kwanzaflow.online',
                },
                headline: 'KwanzaFlow: Tecnologia e Cidadania Financeira ao Alcance de Todos',
                description:
                  'Sobre Nós: Génese, princípios norteadores de responsabilidade e história do projeto KwanzaFlow em Angola.',
                inLanguage: 'pt-AO',
                mainEntityOfPage: 'https://kwanzaflow.online/sobre-nos',
                datePublished: '2026-09-14T08:00:00+01:00',
                dateModified: '2026-09-14T10:00:00+01:00',
                author: {
                  '@type': 'Organization',
                  name: 'KwanzaFlow',
                  url: 'https://kwanzaflow.online',
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'KwanzaFlow',
                  url: 'https://kwanzaflow.online',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://kwanzaflow.online/logo.svg',
                  },
                },
                articleSection: 'Finanças Pessoais, Gestão Orçamental e Cidadania',
                keywords: [
                  'KwanzaFlow',
                  'Sobre Nós KwanzaFlow',
                  'Como surgiu o KwanzaFlow',
                  'Educação financeira Angola',
                  'Gestão Consciente',
                  'Kixikila digital',
                  'Finanças pessoais em Kwanzas',
                  'Orçamento doméstico',
                  'Orçamento familiar Angola',
                ],
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Início',
                    item: 'https://kwanzaflow.online/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Sobre Nós',
                    item: 'https://kwanzaflow.online/sobre-nos',
                  },
                ],
              },

              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Como surgiu o aplicativo KwanzaFlow?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A ideia do KwanzaFlow nasceu inspirada nas discussões vivenciadas durante encontros formativos sobre Gestão e Finanças Pessoais com jovens e famílias em Angola, identificando a necessidade de uma ferramenta acessível e adaptada à moeda nacional Kwanza.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Quem desenvolveu o KwanzaFlow?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'O aplicativo foi concebido e desenvolvido pela equipa da iniciativa KwanzaFlow em Angola.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Qual é o princípio norteador do KwanzaFlow?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'O princípio norteador é a Gestão Consciente e Responsável: apoiar a juventude e as famílias na administração equilibrada dos seus recursos diários com prudência, ética, temperança e sem endividamento.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'O KwanzaFlow é gratuito?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Sim! O KwanzaFlow é 100% gratuito para toda a comunidade angolana, sem cobranças ocultas nem mensalidades, sustentado por exibição responsável de anúncios.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'O KwanzaFlow realiza transferências ou custódia de dinheiro?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Não. O KwanzaFlow funciona estritamente como um caderno digital pessoal para anotação e planeamento orçamental doméstico. Não é uma instituição financeira nem realiza custódia bancária.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation for SEO and UX */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => setActiveTab('inicio')}
            className="hover:text-[#10b981] transition-colors cursor-pointer"
          >
            Início
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-semibold">Institucional</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#10b981] font-bold" aria-current="page">
            Sobre Nós
          </span>
        </nav>


        {/* Quick Actions Bar (Download PDF, Print, Share) */}
        <div className="mb-6 bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-emerald-50 text-[#10b981]">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Documento Oficial em PDF Disponível</p>
              <p className="text-[11px] text-slate-500">KwanzaFlow: Tecnologia e Cidadania Financeira (3 Páginas • ~9 KB)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={pdfDownloadUrl}
              download="KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Baixar arquivo PDF completo"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Baixar PDF</span>
            </a>

            <a
              href={pdfViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              title="Abrir PDF no visualizador do navegador"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Ver PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              title="Imprimir este artigo"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
              title="Copiar link oficial do artigo"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* MAIN ARTICLE CARD (Matching the PDF header & typography) */}
        <article className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* HEADER BANNER (Exact dark navy theme from PDF Page 1) */}
          <header className="bg-[#0f172a] text-white p-6 sm:p-10 relative overflow-hidden border-b border-slate-800">
            {/* Background geometric flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            {/* Category Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#eab308] text-[#0f172a] text-[11px] font-black uppercase tracking-wider mb-4 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#0f172a]" />
              <span>Iniciativa & Cidadania Financeira</span>
            </div>

            {/* Main Document Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              KwanzaFlow: Tecnologia e Cidadania Financeira ao Alcance de Todos
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mb-6">
              Promovendo a autonomia financeira, inclusão social e gestão ética e prudente de recursos
            </p>

            {/* Attribution Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Iniciativa:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  KwanzaFlow
                </span>
              </div>



              <div className="flex items-center gap-1.5 text-slate-200">
                <Globe2 className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Âmbito: <strong>Finanças Pessoais & Cidadania em Angola</strong>
                </span>
              </div>
            </div>
          </header>

          {/* Quick Index / Table of Contents */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Índice do Documento</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => scrollToSection('genese')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                1. A Génese do Projeto
              </button>
              <button
                onClick={() => scrollToSection('mordomia')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                2. Gestão Consciente
              </button>
              <button
                onClick={() => scrollToSection('objetivos')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                3. Objetivos Fundamentais
              </button>
              <button
                onClick={() => scrollToSection('funcionalidades')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                4. Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection('diferenciais')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                5. Valências e Diferenciais
              </button>
              <button
                onClick={() => scrollToSection('termos')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                6. Avisos Legais
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-[#10b981] border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                7. Perguntas Frequentes
              </button>
            </div>
          </div>

          {/* ARTICLE BODY */}
          <div className="p-6 sm:p-10 space-y-10 text-[15px] sm:text-base leading-relaxed text-slate-700">
            {/* SEÇÃO 1: A GÉNESE DO PROJETO */}
            <section id="genese" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Da Consciência à Prática: A Génese do Projeto
                </h2>
              </div>

              <div className="space-y-4 text-slate-700">
                <p>
                  A verdadeira transformação económica, social e individual começa na base: no domínio do orçamento doméstico,
                  na gestão responsável dos recursos e na educação financeira. Foi com este propósito que nasceu o <strong>KwanzaFlow</strong>.
                </p>

                <div className="p-5 rounded-xl bg-slate-50 border-l-4 border-[#10b981] text-slate-800 space-y-2">
                  <p className="leading-relaxed">
                    A ideia do aplicativo nasceu inspirada diretamente pelas discussões e reflexões vivenciadas durante
                    encontros formativos sobre <strong>Mordomia e Finanças Pessoais</strong>, realizados com jovens e famílias em Angola.
                  </p>
                  <p className="text-sm text-slate-600">
                    Observando de perto os desafios quotidianos da juventude e das famílias na administração do orçamento mensal e na disciplina de poupança, tornou-se evidente a necessidade de uma ferramenta prática, acessível e contextualizada à realidade sociocultural angolana.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: PRINCÍPIO NORTEADOR: GESTÃO CONSCIENTE */}
            <section id="mordomia" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Princípio Norteador: Gestão Consciente e Responsabilidade Integral
                </h2>
              </div>

              {/* Callout Box */}
              <div className="p-5 sm:p-6 rounded-xl bg-sky-50/80 border-l-4 border-sky-500 mb-5 shadow-2xs">
                <blockquote className="text-base sm:text-lg font-medium text-slate-900 italic leading-relaxed">
                  "O KwanzaFlow foi concebido com uma missão que ultrapassa o simples registo de números: apoiar os jovens e as famílias na vivência prática da administração responsável e equilibrada dos seus recursos."
                </blockquote>
              </div>

              <p className="text-slate-700">
                Na perspetiva da boa mordomia e gestão ética, a responsabilidade financeira exige sabedoria para administrar com prudência, temperança e equilíbrio todos os recursos sob cuidado do indivíduo e da família.
              </p>
              <p className="mt-3 text-slate-700">
                O <strong>KwanzaFlow</strong> propõe-se a ser o assistente prático diário para que os cidadãos mantenham uma conduta financeira equilibrada, honrada e livre do endividamento desnecessário.
              </p>
            </section>

            {/* SEÇÃO 3: OBJETIVOS FUNDAMENTAIS */}
            <section id="objetivos" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Objetivos Fundamentais
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700 shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Fidelidade e Responsabilidade Contínua</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Fornecer suporte para que o compromisso moral e espiritual com Deus se traduza também numa administração diária equilibrada e ética do orçamento pessoal.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100/70 text-blue-700 shrink-0 mt-0.5">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Desmistificar a Gestão Orçamental</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Tornar a organização de receitas e despesas compreensível e natural para qualquer cidadão, independentemente do seu nível de escolaridade formal.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100/70 text-amber-700 shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Fomentar o Hábito da Poupança</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Estimular a criação de reservas de emergência e o planeamento de metas pessoais a curto, médio e longo prazo.
                    </p>
                  </div>
                </div>


                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100/70 text-purple-700 shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Preservar Tradições Colaborativas</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Fornecer suporte tecnológico e transparência a práticas comunitárias e culturais de entreajuda, como a <strong>Kixikila</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100/70 text-teal-700 shrink-0 mt-0.5">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Garantir Acessibilidade Digital e Inclusão</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Disponibilizar uma solução leve, eficiente em consumo de dados e plenamente funcional mesmo em ligações instáveis de internet.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: PRINCIPAIS FUNCIONALIDADES (Tabela e Lista) */}
            <section id="funcionalidades" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Principais Funcionalidades
                </h2>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-[#0f172a] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider w-1/3">
                        Funcionalidade
                      </th>
                      <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider">
                        Finalidade e Impacto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        Registo Rápido de Movimentações
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-sm">
                        Interface simplificada para anotação imediata de entradas e saídas diárias, reduzindo o esquecimento de pequenas despesas.
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        Categorização Inteligente
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-sm">
                        Separação clara de gastos essenciais (alimentação, transporte, habitação, educação, compromissos morais/espirituais) e não essenciais.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        Gestão de Metas de Poupança
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-sm">
                        Painel visual para definir objetivos claros (reserva familiar, formação, reforma de habitação) com acompanhamento em tempo real.
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 align-top flex items-center gap-1.5">
                        <span>Módulo Integrado de Kixikila</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-sm">
                        Ferramenta dedicada para registar participantes, montantes de contribuição, ordem das rondas e histórico de pagamentos de grupos de poupança rotativa.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        Relatórios Visuais e Resumos
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-sm">
                        Gráficos e indicadores fáceis de interpretar, permitindo ao utilizador saber com clareza para onde foi o seu dinheiro ao longo do mês.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SEÇÃO 5: VALÊNCIAS E DIFERENCIAIS */}
            <section id="diferenciais" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Valências e Diferenciais
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#10b981]" />
                    <span>Contextualização Local e Comunitária</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Moldado a partir das necessidades reais das famílias e jovens angolanos, integrando valores de solidariedade e responsabilidade mútua.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Caráter Educativo e Sem Especulação</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Concebido sob a premissa de mordomia responsável — administração prudente, ética e equilibrada para a paz de espírito e bem-estar familiar.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Privacidade e Segurança Absolutas</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Foco rigoroso na salvaguarda e confidencialidade dos dados inseridos, garantindo soberania e discrição ao utilizador.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span>Interface Sem Atrito</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Design moderno, intuitivo e com foco em usabilidade prática e imediata, garantindo fluidez e facilidade em qualquer telemóvel.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 6: TERMOS DE UTILIZAÇÃO, AVISOS LEGAIS E SUSTENTABILIDADE */}
            <section id="termos" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Termos de Utilização, Avisos Legais e Sustentabilidade
                </h2>
              </div>

              {/* Box 1: Natureza da Aplicação */}
              <div className="p-5 sm:p-6 rounded-xl bg-amber-50/70 border-l-4 border-amber-500 border-y border-r border-amber-200/60 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  <span>1. Natureza da Aplicação (Caderno Digital de Anotações)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  O <strong>KwanzaFlow funciona exclusivamente como uma ferramenta informativa e um caderno digital</strong> para registo e organização de finanças pessoais. O aplicativo <strong>não constitui instituição financeira</strong>, não realiza custódia de valores monetários, não efetua transferências bancárias e não guarda títulos, ações ou ativos financeiros de qualquer natureza. Todos os valores exibidos são inserções declaratórias feitas manualmente pelo próprio utilizador para fins de controlo orçamental doméstico.
                </p>
              </div>

              {/* Box 2: Inteligência Artificial */}
              <div className="p-5 sm:p-6 rounded-xl bg-amber-50/70 border-l-4 border-amber-500 border-y border-r border-amber-200/60 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>2. Automação Consciente e Proteção da Privacidade</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  Quaisquer recursos automatizados e de cálculo presentes na plataforma destinam-se unicamente a categorizar dados, auxiliar na visualização de resumos e sugerir boas práticas educativas de gestão. A tecnologia opera dentro de padrões rigorosos de ética, transparência e respeito à privacidade individual, <strong>não recolhendo dados sensíveis nem realizando aconselhamento de investimentos</strong>.
                </p>
              </div>


              {/* Box 3: Gratuidade e Anúncios */}
              <div className="p-5 sm:p-6 rounded-xl bg-amber-50/70 border-l-4 border-amber-500 border-y border-r border-amber-200/60 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-700" />
                  <span>3. Modelo de Gratuidade e Exibição de Anúncios</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  Para garantir o acesso livre, democrático e <strong>100% gratuito a toda a comunidade</strong> — sem mensalidades ou cobranças ocultas —, o projeto recorre à exibição responsável e não invasiva de anúncios publicitários. Esta receita destina-se integralmente a cobrir os custos de infraestrutura técnica, alojamento de servidores e continuidade do desenvolvimento.
                </p>
              </div>
            </section>

            {/* SEÇÃO 7: PERGUNTAS FREQUENTES (FAQ) - Forte para indexação e Google Snippets */}
            <section id="faq" className="scroll-mt-24 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Perguntas Frequentes (FAQ & ASO)
                </h2>
              </div>

              <div className="space-y-3">
                <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Quem é o responsável pelo desenvolvimento do KwanzaFlow?</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    O aplicativo foi concebido e programado pela equipa da iniciativa <strong>KwanzaFlow em Angola</strong>, focada na criação de soluções digitais acessíveis para a cidadania financeira.
                  </p>
                </details>

                <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>O que motivou a criação do aplicativo?</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A motivação nasceu durante palestras e encontros comunitários sobre Finanças Pessoais e Orçamento Familiar. Foi identificada a necessidade urgente de uma ferramenta adaptada à moeda Kwanza (AOA), sem termos bancários complicados, e que incluísse a tradição da Kixikila.
                  </p>
                </details>

                <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>O que é o Módulo Integrado de Kixikila?</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A Kixikila é o tradicional sistema de poupança rotativa angolano. O KwanzaFlow oferece um módulo digital transparente para registar os membros do grupo, as quotas mensais, a ordem dos sorteios/rondas e o histórico de quem já recebeu ou pagou.
                  </p>
                </details>

                <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Onde posso descarregar o aplicativo KwanzaFlow?</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    O aplicativo pode ser descarregado diretamente na Google Play Store procurando por <strong>"KwanzaFlow"</strong> ou através do link oficial no portal <strong className="text-emerald-700">kwanzaflow.online</strong>.
                  </p>
                </details>
              </div>
            </section>

            {/* DOWNLOAD BOX & VERIFICATION CARD */}
            <section id="download-doc" className="pt-6 border-t border-slate-200">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 text-white shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10b981] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      Documento Oficial Verificado
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Descarregar Documento Completo em PDF
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                      Obtenha a versão impressa oficial (Páginas 1 a 3) contendo a génese, tabela de funcionalidades, salvaguardas éticas e princípios de cidadania financeira.
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Formato: PDF A4</span>
                      <span>•</span>
                      <span>Tamanho: ~9 KB</span>
                      <span>•</span>
                      <span>Iniciativa: KwanzaFlow</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                    <a
                      href={pdfDownloadUrl}
                      download="KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#10b981] hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
                    >
                      <ArrowDownToLine className="w-4 h-4" />
                      <span>Baixar PDF</span>
                    </a>

                    <a
                      href={pdfViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>Abrir no Navegador</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* FOOTER OF ARTICLE */}
          <footer className="bg-slate-100 border-t border-slate-200 px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>KwanzaFlow — Tecnologia e Cidadania Financeira • Documento Público</span>
            <span>URL Canónica: <strong>kwanzaflow.online/sobre-nos</strong></span>
          </footer>

        </article>

        {/* Floating Play Store CTA */}
        <div className="mt-8 text-center bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <h4 className="font-black text-slate-900 text-base sm:text-lg mb-1">
            Experimente o KwanzaFlow no seu telemóvel
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Tenha em mãos o assistente diário de orçamento familiar, kixikila e micro-negócios criado especialmente para a realidade angolana.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#10b981]" />
                <span>Instalar via Play Store</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('inicio')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <span>Ir para a Página Inicial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

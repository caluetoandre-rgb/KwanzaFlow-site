import { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Lightbulb,
  AlertTriangle,
  FileSpreadsheet,
  Quote,
  Check,
  Tag,
} from 'lucide-react';
import { Article, ActiveTab } from '../types';
import { getRelatedArticles, allArticles } from '../data/articles';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDownloadModal: () => void;
}

export function ArticleDetailPage({
  article,
  onBack,
  onSelectArticle,
  setActiveTab,
  onOpenDownloadModal,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const relatedArticles = getRelatedArticles(article.id, 3);

  // Find next and previous articles
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const handleShare = () => {
    const url = `${window.location.origin}/artigos/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="min-h-screen bg-[#f8fafc] text-[#1e293b] pb-20">
      {/* Article Header Hero */}
      <header className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-10 pb-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer py-1 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar aos Artigos Académicos</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Partilhar Artigo'}</span>
            </button>
          </div>

          {/* Category & Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#10b981] text-white shadow-xs">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              {article.wordCount} palavras
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {article.datePublished}
            </span>
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {article.subtitle}
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        {/* Executive Summary Card */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-md mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Sumário Executivo e Enquadramento Didático
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
            "{article.summary}"
          </p>

          {/* Key Takeaways */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Principais Conclusões Pedagógicas
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/80 text-xs sm:text-sm text-slate-800 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Article Body Sections */}
        <div className="space-y-10">
          {article.sections.map((section, sIdx) => (
            <section
              key={sIdx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs"
            >
              <header className="mb-5 pb-3 border-b border-slate-100">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="text-sm text-emerald-700 font-medium mt-1">
                    {section.subheading}
                  </p>
                )}
              </header>

              {/* Paragraphs */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Optional Callout */}
              {section.callout && (
                <div
                  className={`mt-6 p-4 sm:p-5 rounded-xl border text-xs sm:text-sm ${
                    section.callout.type === 'formula'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : section.callout.type === 'warning'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                      : section.callout.type === 'quote'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 italic'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2 mb-1.5 uppercase text-xs tracking-wider">
                    {section.callout.type === 'formula' && <Lightbulb className="w-4 h-4 text-amber-600" />}
                    {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                    {section.callout.type === 'quote' && <Quote className="w-4 h-4 text-slate-700" />}
                    {section.callout.type === 'tip' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    <span>{section.callout.title}</span>
                  </div>
                  <div className="leading-relaxed">{section.callout.content}</div>
                </div>
              )}

              {/* Optional Data Table */}
              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                      <tr>
                        {section.table.headers.map((th, hIdx) => (
                          <th key={hIdx} className="p-3 sm:p-3.5">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 sm:p-3.5 text-slate-700">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Practical Implementation Checklist */}
        <section className="mt-10 bg-gradient-to-br from-slate-900 to-[#1e293b] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800">
          <div className="flex items-center gap-2.5 mb-2 text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Roteiro de Aplicação Prática</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-4">
            O Que Fazer Hoje: Plano de Ação em 5 Passos
          </h2>
          <div className="space-y-3">
            {article.practicalChecklist.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/40">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* CTA to Download App */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-white text-sm block font-semibold">
                Aplique esta metodologia agora no KwanzaFlow
              </strong>
              <span className="text-xs text-slate-400">
                100% gratuito e configurado especificamente para a economia de Angola.
              </span>
            </div>
            <button
              onClick={onOpenDownloadModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Instalar Aplicativo Oficial</span>
            </button>
          </div>
        </section>

        {/* FAQs Accordion */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-10 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              Perguntas Frequentes & Esclarecimentos do Professor
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {openFaqIndex === fIdx ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === fIdx && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic References */}
        {article.references && (
          <section className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
              Referências Bibliográficas e Fontes Oficiais
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {article.references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Tags */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Tag className="w-3.5 h-3.5" />
            Tópicos:
          </span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle.slug)}
              className="p-4 rounded-xl bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1 group-hover:text-emerald-700">
                <ArrowLeft className="w-3.5 h-3.5" /> Artigo Anterior
              </div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800">
                {prevArticle.title}
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              onClick={() => onSelectArticle(nextArticle.slug)}
              className="p-4 rounded-xl bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 text-right transition-all cursor-pointer group sm:col-start-2"
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-end gap-1 group-hover:text-emerald-700">
                Próximo Artigo <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800">
                {nextArticle.title}
              </div>
            </button>
          )}
        </div>

        {/* Related Articles Cards */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Artigos Relacionados & Leituras Recomendadas
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              Ver todos os 10 artigos →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.slug)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1.5">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>{rel.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

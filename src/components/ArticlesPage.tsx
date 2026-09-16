import { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  FileSpreadsheet,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';

import { Article, ActiveTab } from '../types';
import { allArticles, getArticleBySlug } from '../data/articles';
import { ArticleDetailPage } from './ArticleDetailPage';

interface ArticlesPageProps {
  initialSlug?: string | null;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDownloadModal: () => void;
}

export function ArticlesPage({
  initialSlug,
  setActiveTab,
  onOpenDownloadModal,
}: ArticlesPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Sync with initialSlug if passed or changes
  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(allArticles.map((a) => a.category));
    return ['Todas', ...Array.from(set)];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Todas' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectArticle = (slug: string) => {
    setSelectedSlug(slug);
    window.history.pushState(null, '', `/artigos/${slug}`);
    window.location.hash = `artigos/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    window.history.pushState(null, '', '/artigos');
    window.location.hash = 'artigos';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a specific article is selected, render its dedicated page
  if (selectedSlug) {
    const article = getArticleBySlug(selectedSlug);
    if (article) {
      return (
        <ArticleDetailPage
          article={article}
          onBack={handleBackToList}
          onSelectArticle={handleSelectArticle}
          setActiveTab={setActiveTab}
          onOpenDownloadModal={onOpenDownloadModal}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] pb-20">
      {/* Top Academic Hero Banner */}
      <header className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-12 pb-16 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Biblioteca Académica & Ensaios Económicos</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            20 Artigos sobre Finanças Pessoais, Orçamento & Emprego Informal em Angola
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Uma coletânea pedagógica escrita com rigor prático e exemplos reais do dia a dia angolano em Kwanzas. Artigos completos de 800 a 1.250 palavras sobre gestão de renda informal, despesas invisíveis (geradores, água e candongueiros), eliminação do fiado, economia de kupapatas e mototaxistas, abastecimento nos grossistas (Kikolo e Mercado do 30), zunga, dívida social familiar, bancarização com Multicaixa Express e orçamento de subsistência.
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <strong>20 Artigos Completos</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <strong>Mais de 23.000 palavras</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <strong>Respostas para o Dia a Dia</strong>
            </span>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por título, tema ou palavra-chave..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block flex-shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Mostrando <strong>{filteredArticles.length}</strong> de {allArticles.length} artigos académicos
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
            >
              Limpar pesquisa
            </button>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, idx) => (
            <article
              key={article.id}
              onClick={() => handleSelectArticle(article.slug)}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      {article.wordCount} palavras
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                  {article.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {article.subtitle}
                </p>

                {/* Takeaways Snippet */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 mb-4">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Ponto Central da Lição:
                  </div>
                  <div className="line-clamp-2 italic">
                    "{article.keyTakeaways[0]}"
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{article.datePublished}</span>
                </span>
                <span className="font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 flex-shrink-0">
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">Nenhum artigo encontrado</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Não encontramos nenhum artigo com os termos pesquisados. Tente usar palavras-chave como "BODIVA", "inflação", "kixikila" ou "salário".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todas');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
            >
              Ver todos os 10 artigos
            </button>
          </div>
        )}

        {/* Bottom Educational Callout */}
        <section className="mt-14 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Impacto Social e Cidadania
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1">
              Coloque a Teoria em Prática com o KwanzaFlow
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              O aplicativo KwanzaFlow traduz estes 10 princípios económicos em ferramentas práticas para o seu smartphone. Controle gastos em Kwanzas, simule o impacto da inflação e gerencie a sua Kixikila sem custos.
            </p>
          </div>
          <button
            onClick={onOpenDownloadModal}
            className="px-6 py-3.5 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            <Download className="w-5 h-5 text-emerald-600" />
            <span>Descarregar App Grátis</span>
          </button>
        </section>
      </div>
    </div>
  );
}

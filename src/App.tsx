import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BannerCarousel } from './components/BannerCarousel';
import { Features } from './components/Features';
import { KixikilaSection } from './components/KixikilaSection';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { AccountDeletion } from './components/AccountDeletion';
import { ComoSurgiuArticle } from './components/ComoSurgiuArticle';
import { ArticlesPage } from './components/ArticlesPage';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [articleSlug, setArticleSlug] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('kwanzaflow_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('kwanzaflow_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Synchronize with URL pathname and hash on load, popstate, and hashchange
  useEffect(() => {
    const handleUrlRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const rawHash = window.location.hash.replace('#', '').toLowerCase();

      if (
        pathname === '/sobre-nos' ||
        pathname === '/sobre-nos/' ||
        rawHash === 'sobre-nos' ||
        pathname === '/comosurgiu' ||
        pathname === '/comosurgiu/' ||
        rawHash === 'comosurgiu'
      ) {
        setActiveTab('sobre-nos');
        setArticleSlug(null);
      } else if (pathname.startsWith('/artigos') || rawHash.startsWith('artigos')) {
        setActiveTab('artigos');
        const parts = pathname.replace('/artigos', '').replace(/^\//, '').split('/');
        const hashParts = rawHash.replace('artigos', '').replace(/^\//, '').split('/');
        const slug = parts[0] || hashParts[0] || null;
        setArticleSlug(slug);
      } else if (['inicio', 'recursos', 'kixikila', 'privacidade', 'termos', 'eliminar-conta'].includes(rawHash)) {
        setActiveTab(rawHash as ActiveTab);
        setArticleSlug(null);
      } else if (pathname === '/' || pathname === '') {
        // default tab
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'sobre-nos' || tab === 'comosurgiu') {
      window.history.pushState(null, '', '/sobre-nos');
      window.location.hash = 'sobre-nos';
      setArticleSlug(null);
    } else if (tab === 'artigos') {
      window.history.pushState(null, '', '/artigos');
      window.location.hash = 'artigos';
      setArticleSlug(null);
    } else if (tab === 'inicio') {
      window.history.pushState(null, '', '/');
      window.location.hash = '';
      setArticleSlug(null);
    } else {
      window.history.pushState(null, '', `/#${tab}`);
      window.location.hash = tab;
      setArticleSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#10b981] selection:text-white ${darkMode ? 'dark bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-[#1e293b]'}`}>
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'inicio' && (
          <div className="animate-in fade-in duration-200">
            {/* Carrossel Oficial de Destaques - Logo abaixo do menu de navegação */}
            <BannerCarousel
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              setActiveTab={handleTabChange}
            />
            <Hero
              onExploreFeatures={() => handleTabChange('recursos')}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              setActiveTab={handleTabChange}
            />
            <Features setActiveTab={handleTabChange} />
            <KixikilaSection
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              setActiveTab={handleTabChange}
            />
          </div>
        )}

        {activeTab === 'recursos' && (
          <div className="animate-in fade-in duration-200">
            <div className="bg-[#0f172a] py-10 text-white text-center border-b border-slate-800">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-xs font-bold text-[#10b981] uppercase tracking-wider">Recursos Financeiros</span>
                <h1 className="text-3xl sm:text-4xl font-black mt-1">Orçamento Inteligente & Gestão em Kwanzas</h1>
              </div>
            </div>
            <BannerCarousel
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              setActiveTab={handleTabChange}
            />
            <Features setActiveTab={handleTabChange} />
          </div>
        )}

        {activeTab === 'kixikila' && (
          <div className="animate-in fade-in duration-200">
            <div className="bg-[#0f172a] py-10 text-white text-center border-b border-slate-800">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-xs font-bold text-[#10b981] uppercase tracking-wider">Poupança Comunitária</span>
                <h1 className="text-3xl sm:text-4xl font-black mt-1">Kixikila Digital Transparente</h1>
              </div>
            </div>
            <KixikilaSection
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              setActiveTab={handleTabChange}
            />
          </div>
        )}

        {(activeTab === 'sobre-nos' || activeTab === 'comosurgiu') && (
          <div className="animate-in fade-in duration-200">
            <ComoSurgiuArticle
              setActiveTab={handleTabChange}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            />
          </div>
        )}


        {activeTab === 'artigos' && (
          <div className="animate-in fade-in duration-200">
            <ArticlesPage
              initialSlug={articleSlug}
              setActiveTab={handleTabChange}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'privacidade' && (
          <div className="animate-in fade-in duration-200">
            <PrivacyPolicy setActiveTab={handleTabChange} />
          </div>
        )}

        {activeTab === 'termos' && (
          <div className="animate-in fade-in duration-200">
            <TermsOfUse setActiveTab={handleTabChange} />
          </div>
        )}

        {activeTab === 'eliminar-conta' && (
          <div className="animate-in fade-in duration-200">
            <AccountDeletion />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}

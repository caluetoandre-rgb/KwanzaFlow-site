import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { KixikilaSection } from './components/KixikilaSection';
import { AdMobContainer } from './components/AdMobContainer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { AccountDeletion } from './components/AccountDeletion';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { CodeModal } from './components/CodeModal';
import { ActiveTab } from './types';
import { ShieldCheck, UserX } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [rawFileHtml, setRawFileHtml] = useState<string>('');

  // Synchronize with URL hash on load and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (['inicio', 'recursos', 'kixikila', 'privacidade', 'termos', 'eliminar-conta'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Fetch the real content of public/index.html to display in the modal
    fetch('/index.html')
      .then((res) => res.text())
      .then((text) => setRawFileHtml(text))
      .catch(() => {
        setRawFileHtml('Código disponível no arquivo public/index.html da raiz do projeto.');
      });

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-[#10b981] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Area with Smooth Tab Transitions */}
      <main className="flex-grow">
        {activeTab === 'inicio' && (
          <div className="animate-in fade-in duration-200">
            <Hero
              onExploreFeatures={() => handleTabChange('recursos')}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              setActiveTab={handleTabChange}
            />
            {/* Standardized Google AdMob Ad Container */}
            <AdMobContainer />

            {/* Quick Teaser for Features & Kixikila */}
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
            <Features setActiveTab={handleTabChange} />
            <AdMobContainer />
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
            <AdMobContainer />
          </div>
        )}

        {activeTab === 'privacidade' && (
          <div className="animate-in fade-in duration-200">
            <PrivacyPolicy setActiveTab={handleTabChange} />
            <AdMobContainer />
          </div>
        )}

        {activeTab === 'termos' && (
          <div className="animate-in fade-in duration-200">
            <TermsOfUse setActiveTab={handleTabChange} />
            <AdMobContainer />
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
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Floating Action Badge for quick Google Play reviewers testing */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={() => handleTabChange('eliminar-conta')}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-4 rounded-[8px] shadow-lg flex items-center gap-1.5 transition-all border border-rose-500 cursor-pointer"
          title="Atalho para URL Obrigatória da Google Play: Exclusão de Conta"
        >
          <UserX className="w-3.5 h-3.5" />
          <span>Excluir Conta (Play URL)</span>
        </button>
      </div>

      {/* Modals */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        rawHtml={rawFileHtml}
      />
    </div>
  );
}

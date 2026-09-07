import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { KixikilaSection } from './components/KixikilaSection';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { AccountDeletion } from './components/AccountDeletion';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

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

import { useState } from 'react';
import { KwanzaLogo } from './KwanzaLogo';
import { ActiveTab } from '../types';
import { Menu, X, Download, ShieldCheck, UserX, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDownloadModal: () => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenDownloadModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon?: typeof Sparkles; highlight?: boolean }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'kixikila', label: 'Kixikila' },
    { id: 'privacidade', label: 'Privacidade', icon: ShieldCheck },
    { id: 'termos', label: 'Termos', icon: FileText },
    { id: 'eliminar-conta', label: 'Eliminar Conta', icon: UserX, highlight: true },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e2e8f0] shadow-2xs">
      {/* Top micro-banner for Google Play Store Policy Verification */}
      <div className="bg-[#0f172a] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="font-semibold text-emerald-400">Google Play Compliance Hub:</span>
            <span className="text-slate-400 hidden sm:inline">Package ID: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-[11px]">com.kwanzaflow.aoa</code></span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <button 
              onClick={() => handleNavClick('privacidade')}
              className="hover:text-white underline decoration-emerald-500/50 cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => handleNavClick('eliminar-conta')}
              className="hover:text-amber-300 font-medium cursor-pointer flex items-center gap-1"
            >
              <UserX className="w-3 h-3 text-amber-400" />
              Exclusão de Dados
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar: height 70px as in theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center text-left focus:outline-hidden group cursor-pointer"
          >
            <KwanzaLogo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors duration-150 flex items-center gap-1.5 cursor-pointer py-1 ${
                    isActive
                      ? 'text-[#10b981] font-bold border-b-2 border-[#10b981]'
                      : item.highlight
                      ? 'text-rose-600 hover:text-rose-700 font-semibold'
                      : 'text-[#475569] hover:text-[#0f172a]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#10b981]' : item.highlight ? 'text-rose-500' : 'text-slate-400'}`} />}
                  {item.label}
                  {item.highlight && (
                    <span className="text-[10px] px-1 py-0.2 bg-rose-50 text-rose-600 rounded font-bold border border-rose-200 ml-0.5">
                      Play
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Download CTA matching .btn-playstore from theme: background: var(--bg-slate); border-radius: 8px; font-weight: 600 */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-[13px] font-semibold shadow-xs hover:shadow transition-all duration-150 cursor-pointer group"
            >
              {/* Play Store Minimal Triangle Icon */}
              <svg className="w-4 h-4 text-[#10b981] group-hover:text-emerald-300 transition-colors fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.986V2.8a2.38 2.38 0 0 1 .61-.986zm11.602 11.602l2.394-2.394-11.45-6.52 9.056 8.914zm0-2.832L6.155 1.67l11.45 6.52-2.394 2.394zm1.414 1.414l3.18-1.813c1.07-.61 1.07-1.604 0-2.214l-3.18-1.813-2.122 2.12 2.122 2.12z" />
              </svg>
              <span>Baixar na Play Store</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenDownloadModal}
              className="p-2 text-[#10b981] hover:bg-emerald-50 rounded-lg sm:hidden cursor-pointer"
              title="Baixar App"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#475569] hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
            Menu de Navegação
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                    Play Compliance
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 text-white font-semibold shadow-sm hover:bg-emerald-700 text-center"
            >
              <Download className="w-4 h-4" />
              <span>Baixar na Google Play Store</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

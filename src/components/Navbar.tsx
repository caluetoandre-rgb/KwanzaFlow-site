import { useState } from 'react';
import { KwanzaLogo } from './KwanzaLogo';
import { ActiveTab } from '../types';
import { Menu, X, Download, ShieldCheck, UserX, FileText, Facebook, BookOpen, Sun, Moon, LucideIcon } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDownloadModal: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenDownloadModal, darkMode, setDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon?: LucideIcon; highlight?: boolean }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'kixikila', label: 'Kixikila' },
    { id: 'artigos', label: 'Artigos', icon: BookOpen },
    { id: 'sobre-nos', label: 'Sobre Nós' },
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
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${darkMode ? 'bg-[#0b1712] border-slate-800 text-slate-100 shadow-lg shadow-black/20' : 'bg-white border-[#e2e8f0] text-[#1e293b] shadow-2xs'}`}>
      {/* Main Navbar: height 70px as in theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center text-left focus:outline-hidden group cursor-pointer"
          >
            <KwanzaLogo variant={darkMode ? 'dark' : 'light'} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id || (item.id === 'sobre-nos' && activeTab === 'comosurgiu');
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors duration-150 flex items-center gap-1.5 cursor-pointer py-1 ${
                    isActive
                      ? 'text-[#10b981] font-bold border-b-2 border-[#10b981]'
                      : item.highlight
                      ? 'text-rose-500 hover:text-rose-400 font-semibold'
                      : darkMode
                      ? 'text-slate-300 hover:text-white'
                      : 'text-[#475569] hover:text-[#0f172a]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#10b981]' : item.highlight ? 'text-rose-500' : darkMode ? 'text-slate-400' : 'text-slate-400'}`} />}
                  {item.label}
                  {item.highlight && (
                    <span className="text-[10px] px-1 py-0.2 bg-rose-500/10 text-rose-400 rounded font-bold border border-rose-500/20 ml-0.5">
                      Play
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Download CTA & Social Links & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode((prev: boolean) => !prev)}
              className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center border ${
                darkMode
                  ? 'bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200'
              }`}
              title={darkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
              aria-label="Alternar Tema"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="https://facebook.com/KwanzaFlow"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors cursor-pointer border ${
                darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
                  : 'text-[#64748b] hover:text-[#1877F2] hover:bg-blue-50/50 border-transparent hover:border-blue-100'
              }`}
              title="Página Oficial no Facebook (facebook.com/KwanzaFlow)"
              aria-label="Página Oficial no Facebook"
            >
              <Facebook className="w-4 h-4 fill-current text-[#1877F2]" />
            </a>

            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#10b981] hover:bg-emerald-600 text-white text-[13px] font-bold shadow-xs hover:shadow transition-all duration-150 cursor-pointer group"
            >
              {/* Play Store Minimal Triangle Icon */}
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.986V2.8a2.38 2.38 0 0 1 .61-.986zm11.602 11.602l2.394-2.394-11.45-6.52 9.056 8.914zm0-2.832L6.155 1.67l11.45 6.52-2.394 2.394zm1.414 1.414l3.18-1.813c1.07-.61 1.07-1.604 0-2.214l-3.18-1.813-2.122 2.12 2.122 2.12z" />
              </svg>
              <span>Baixar na Play Store</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setDarkMode((prev: boolean) => !prev)}
              className={`p-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-amber-600'}`}
              aria-label="Alternar Tema"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenDownloadModal}
              className="p-2 text-[#10b981] hover:bg-emerald-50 rounded-lg sm:hidden cursor-pointer"
              title="Baixar App"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg cursor-pointer ${darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-[#475569] hover:bg-slate-100'}`}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200 ${darkMode ? 'bg-[#0b1712] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
          <div className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
            Menu de Navegação
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id || (item.id === 'sobre-nos' && activeTab === 'comosurgiu');
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between cursor-pointer ${
                  isActive
                    ? darkMode ? 'bg-emerald-950/60 text-emerald-400 font-semibold border border-emerald-800/50' : 'bg-emerald-50 text-emerald-800 font-semibold'
                    : darkMode ? 'text-slate-200 hover:bg-slate-800/80' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-emerald-500" />}
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full font-semibold border border-rose-500/20">
                    Play Compliance
                  </span>
                )}
              </button>
            );
          })}

          <div className={`pt-4 border-t space-y-2 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#10b981] hover:bg-emerald-600 text-white font-bold shadow-sm text-center"
            >
              <Download className="w-4 h-4" />
              <span>Baixar na Google Play Store</span>
            </button>

            <a
              href="https://facebook.com/KwanzaFlow"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors border ${
                darkMode ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              }`}
            >
              <Facebook className="w-4 h-4 fill-current text-[#1877F2]" />
              <span>Siga-nos no Facebook: /KwanzaFlow</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

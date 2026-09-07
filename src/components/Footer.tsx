import { useState } from 'react';
import { KwanzaLogo } from './KwanzaLogo';
import { Mail, Copy, Check, ShieldCheck, FileText, UserX, Heart, ExternalLink, Code2 } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCodeModal: () => void;
  onOpenDownloadModal: () => void;
}

export function Footer({ setActiveTab, onOpenCodeModal, onOpenDownloadModal }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const supportEmail = 'suporte@kwanzaflow.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <KwanzaLogo />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              O fluxo certo para a sua vida financeira. Orçamento inteligente 50/30/20, gestão comunitária de Kixikila e controle de micro-negócios angolanos.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#10b981] font-medium pt-1">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              <span>Em total conformidade com a Google Play Store 2026</span>
            </div>
            {/* Direct button to inspect or copy the standalone Firebase Hosting HTML */}
            <div className="pt-2">
              <button
                onClick={onOpenCodeModal}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Ver Código HTML Autocontido (public/index.html)</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('inicio')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('recursos')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Orçamento 50/30/20
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('kixikila')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Módulo Kixikila
                </button>
              </li>
              <li>
                <button onClick={onOpenDownloadModal} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Baixar na Play Store
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Conformidade Google Play</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('privacidade')}
                  className="hover:text-[#10b981] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Política de Privacidade</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('termos')}
                  className="hover:text-[#10b981] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Termos de Uso</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('eliminar-conta')}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UserX className="w-3.5 h-3.5 text-rose-500" />
                  <span>Eliminar Conta e Dados</span>
                </button>
              </li>
              <li className="text-[11px] text-slate-500 pt-1 font-mono">
                Package: com.kwanzaflow.aoa
              </li>
            </ul>
          </div>

          {/* Support and Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Apoio ao Utilizador</h4>
            <p className="text-xs text-slate-400">
              Dúvidas, sugestões ou suporte técnico:
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center gap-2 text-white font-mono text-[11.5px] truncate">
                <Mail className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
                <span>{supportEmail}</span>
              </div>
              <button
                onClick={copyEmail}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'E-mail Copiado!' : 'Copiar E-mail de Apoio'}</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500">
              Alternativo: Caluetoandre@gmail.com
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 KwanzaFlow. Feito para Angola.</span>
            <span>🇦🇴</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Simples • Seguro • Inteligente — Feito com dedicação para a nossa gente.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

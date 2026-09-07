import { X, Check, ShieldCheck, Smartphone, Download, Star } from 'lucide-react';
import { KwanzaLogo } from './KwanzaLogo';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#e2e8f0] overflow-hidden text-[#1e293b]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#64748b] hover:text-[#0f172a] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <KwanzaLogo className="w-12 h-12" subtitle={false} />
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verificado pelo Google Play Protect</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 mb-6 space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[#64748b]">Nome do Aplicativo:</span>
            <span className="font-bold text-[#0f172a]">KwanzaFlow - Finanças & Kixikila</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748b]">Identificador (Package):</span>
            <code className="font-mono text-[#10b981] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-xs font-bold">
              com.kwanzaflow.aoa
            </code>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748b]">Versão:</span>
            <span className="text-[#0f172a] font-semibold">1.0.4 (Build 2026.01)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748b]">Requisitos Mínimos:</span>
            <span className="text-[#64748b]">Android 8.0 (Oreo) ou superior</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748b]">Classificação:</span>
            <span className="text-[#0f172a] font-medium">Livre / Finanças Pessoais</span>
          </div>
        </div>

        {/* Google Play Download Button */}
        <div className="space-y-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.kwanzaflow.aoa"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              alert("Redirecionando para o Google Play Store: https://play.google.com/store/apps/details?id=com.kwanzaflow.aoa (Pacote: com.kwanzaflow.aoa)");
            }}
            className="w-full py-4 px-6 rounded-[8px] bg-[#0f172a] hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-slate-900/20 transition-all cursor-pointer border border-slate-800 group"
          >
            {/* Google Play Vector */}
            <svg className="w-6 h-6 fill-current text-[#10b981] group-hover:text-emerald-300 transition-colors" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.986V2.8a2.38 2.38 0 0 1 .61-.986zm11.602 11.602l2.394-2.394-11.45-6.52 9.056 8.914zm0-2.832L6.155 1.67l11.45 6.52-2.394 2.394zm1.414 1.414l3.18-1.813c1.07-.61 1.07-1.604 0-2.214l-3.18-1.813-2.122 2.12 2.122 2.12z" />
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Instalar via</div>
              <div className="text-base font-black">Google Play Store</div>
            </div>
          </a>

          <p className="text-[11px] text-center text-[#64748b]">
            Gratuito • Sem taxas ocultas • Sincronização segura via Firebase
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { X, Copy, Check, FileCode, ExternalLink, Download } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawHtml: string;
}

export function CodeModal({ isOpen, onClose, rawHtml }: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(rawHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([rawHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f172a] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col text-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center border border-emerald-500/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Arquivo HTML5 Autocontido para Firebase Hosting
              </h3>
              <p className="text-xs text-slate-400">
                Pronto para salvar diretamente em <code className="text-[#10b981] font-mono">public/index.html</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadFile}
              className="px-3 py-1.5 rounded-[8px] bg-[#10b981] hover:bg-[#059669] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar index.html</span>
            </button>
            <button
              onClick={copyCode}
              className="px-3 py-1.5 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-[8px] hover:bg-slate-800 transition-colors cursor-pointer ml-2"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="mt-4 flex-1 overflow-auto rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre">{rawHtml}</pre>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <span>Este código contém Tailwind via CDN, JavaScript puro, tabs suaves e conformidade total com a Google Play.</span>
          <span className="text-[#10b981] font-semibold">100% Autocontido e Responsivo</span>
        </div>
      </div>
    </div>
  );
}

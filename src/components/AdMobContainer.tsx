import { Info } from 'lucide-react';

export function AdMobContainer() {
  return (
    <aside aria-label="Espaço de Publicidade" className="w-full max-w-5xl mx-auto px-4 my-10">
      <div className="bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-2xl p-4 text-center">
        {/* Compliance Ad Label Required by Google */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-2 px-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            Publicidade • Espaço Patrocinado
          </span>
          <span className="text-[#94a3b8] text-[10px] hidden sm:inline">
            Google AdMob / AdSense Container
          </span>
        </div>

        {/* Ad Space Placeholder Container with standard responsive dimensions */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 sm:p-6 min-h-[90px] sm:min-h-[105px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xs">
          {/* Watermark background badge */}
          <div className="absolute right-3 top-2 text-[10px] text-[#94a3b8] font-mono">
            Slot: 728x90 / Responsive
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-50 text-[#10b981] border border-emerald-100 flex items-center justify-center font-black text-sm flex-shrink-0">
                Ad
              </div>
              <div>
                <div className="font-bold text-[#0f172a] text-sm">
                  Espaço Reservado para Anúncios Autorizados
                </div>
                <div className="text-xs text-[#64748b]">
                  Integração via Google AdMob SDK (identificador AAID) e Google AdSense Web.
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#64748b] bg-[#f8fafc] px-2.5 py-1 rounded-[6px] border border-[#e2e8f0]">
                <Info className="w-3 h-3 text-[#10b981]" />
                <span>Anúncios em conformidade com a Google Play</span>
              </span>
            </div>
          </div>
        </div>

        {/* Transparent Compliance Note */}
        <p className="text-[10px] text-[#94a3b8] mt-2 text-center">
          Os anúncios no aplicativo KwanzaFlow são veiculados de acordo com a política de identificador de publicidade da Google Play (AAID) e diretrizes de privacidade do utilizador.
        </p>
      </div>
    </aside>
  );
}

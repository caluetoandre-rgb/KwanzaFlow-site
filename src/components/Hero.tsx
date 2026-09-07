import { TrendingUp, ShieldCheck, Users, Store, ArrowRight, CheckCircle2, ChevronRight, PieChart, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  onExploreFeatures: () => void;
  onOpenDownloadModal: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function Hero({ onExploreFeatures, onOpenDownloadModal, setActiveTab }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:py-16 bg-[#f8fafc] text-[#1e293b] border-b border-[#e2e8f0]">
      {/* Decorative subtle vibrant accent gradient */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-slate-200/50 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[#10b981] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              <span>Finanças para Angola 🇦🇴</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#64748b] font-semibold lowercase tracking-normal">o fluxo certo para a sua vida</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.12] text-[#0f172a]">
              Domine as suas <br className="hidden sm:inline" />
              Finanças em <span className="text-[#10b981]">Kwanzas</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#64748b] max-w-2xl font-normal leading-relaxed">
              Organize o seu orçamento com a regra <strong>50/30/20</strong>, gerencie <strong>Kixikilas comunitárias</strong> e tenha total controle do seu micro-negócio com relatórios automáticos.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-2.5 shadow-2xs hover:border-[#10b981] transition-colors">
                <div className="flex items-center gap-1.5 text-[#0f172a] font-bold text-xs mb-1">
                  <Store className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Negócio</span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-tight">Vendas, estoque e fiados</p>
              </div>

              <div className="bg-white border border-[#e2e8f0] rounded-xl p-2.5 shadow-2xs hover:border-[#10b981] transition-colors">
                <div className="flex items-center gap-1.5 text-[#0f172a] font-bold text-xs mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Finanças</span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-tight">Receitas, despesas e DRE</p>
              </div>

              <div className="bg-white border border-[#e2e8f0] rounded-xl p-2.5 shadow-2xs hover:border-[#10b981] transition-colors">
                <div className="flex items-center gap-1.5 text-[#0f172a] font-bold text-xs mb-1">
                  <Users className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Família</span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-tight">Gestão e metas coletivas</p>
              </div>

              <div className="bg-white border border-[#e2e8f0] rounded-xl p-2.5 shadow-2xs hover:border-[#10b981] transition-colors">
                <div className="flex items-center gap-1.5 text-[#0f172a] font-bold text-xs mb-1">
                  <PieChart className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Metas</span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-tight">Planeje e poupe com foco</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenDownloadModal}
                className="px-6 py-3 rounded-[8px] bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow transition-all duration-150 flex items-center gap-2.5 cursor-pointer"
              >
                {/* Google Play Vector */}
                <svg className="w-4 h-4 fill-current text-emerald-100" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.986V2.8a2.38 2.38 0 0 1 .61-.986zm11.602 11.602l2.394-2.394-11.45-6.52 9.056 8.914zm0-2.832L6.155 1.67l11.45 6.52-2.394 2.394zm1.414 1.414l3.18-1.813c1.07-.61 1.07-1.604 0-2.214l-3.18-1.813-2.122 2.12 2.122 2.12z" />
                </svg>
                <span>Começar Agora • Play Store</span>
              </button>

              <button
                onClick={onExploreFeatures}
                className="px-5 py-3 rounded-[8px] bg-white hover:bg-slate-50 border border-[#cbd5e1] text-[#0f172a] font-semibold text-sm sm:text-base transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Conhecer Recursos</span>
                <ChevronRight className="w-4 h-4 text-[#64748b]" />
              </button>
            </div>

            {/* Trust Slogan */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#64748b] font-medium">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#e2e8f0] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span className="font-semibold text-[#0f172a]">Simples • Seguro • Inteligente</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">—</span>
              <span className="hidden sm:inline text-[#64748b]">Feito para o público angolano crescer com tranquilidade.</span>
            </div>
          </div>

          {/* Right Column: Phone Mockup Frame featuring Vibrant Palette styling */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Vibrant Green Card Container */}
            <div className="relative w-[320px] h-[420px] bg-gradient-to-br from-[#10b981] to-[#059669] rounded-[24px] p-4 shadow-xl flex flex-col justify-between overflow-hidden">
              {/* Top Bar of the Phone mockup */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 font-bold tracking-tight">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center font-black text-xs">K</div>
                  <span>KwanzaFlow</span>
                </div>
                <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-semibold">Android AO</span>
              </div>

              {/* Inner Mini Cards */}
              <div className="space-y-2.5 my-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/90 backdrop-blur-xs p-2.5 rounded-xl text-left shadow-2xs">
                    <div className="text-[10px] text-[#64748b] font-semibold">Receitas (Mês)</div>
                    <div className="text-sm font-black text-[#0f172a]">280.000 Kz</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xs p-2.5 rounded-xl text-left shadow-2xs">
                    <div className="text-[10px] text-[#64748b] font-semibold">Despesas (50/30)</div>
                    <div className="text-sm font-black text-rose-600">134.750 Kz</div>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-xs p-3 rounded-xl text-left flex items-center justify-between shadow-2xs">
                  <div>
                    <div className="text-[10px] text-[#64748b] font-medium">Kixikila Comunitária</div>
                    <div className="text-xs font-bold text-[#0f172a]">Ronda 3 de 8 • Quota Paga</div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-[#059669] font-bold px-2 py-0.5 rounded">Em dia</span>
                </div>
              </div>

              {/* Floating Balance Card matching the Design HTML */}
              <div className="bg-white p-4 rounded-[16px] shadow-lg border border-slate-100 text-left">
                <div className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider mb-0.5">Saldo Atual</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-extrabold text-[#0f172a]">
                    Kz 145.250,00
                  </div>
                  <span className="text-[10px] font-bold text-[#10b981] bg-emerald-50 px-2 py-0.5 rounded-full">
                    ▲ +2,3%
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white text-[#0f172a] p-3 rounded-xl shadow-md border border-[#e2e8f0] items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              <div className="text-xs">
                <div className="font-bold">Google Play 2026</div>
                <div className="text-[11px] text-[#64748b]">Conformidade Total Data Safety</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, TrendingUp, Users, Store, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface BannerCarouselProps {
  onOpenDownloadModal: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function BannerCarousel({ onOpenDownloadModal, setActiveTab }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const banners = [
    {
      id: 1,
      title: "Saiba onde Vai seu dinheiro",
      subtitle: "Tenha controle absoluto das receitas e despesas",
      description: "Acompanhe relatórios visuais por categoria, gráfico em rosca detalhado e saldo em Kwanzas (AOA) em tempo real.",
      badge: "Gestão Financeira",
      icon: TrendingUp,
      features: ["Orçamento 50/30/20", "Gráficos por Categoria", "Histórico de Transações"],
      bgGradient: "from-emerald-950 via-slate-900 to-slate-950",
      accentColor: "#10b981",
      previewType: "financas"
    },
    {
      id: 2,
      title: "Poupanças em Família & Kixikila",
      subtitle: "Alcance suas metas coletivas com transparência",
      description: "Organize rodas de Kixikila digital com amigos e familiares, defina cotas e controle o sorteio das rondas.",
      badge: "Kixikila Digital",
      icon: Users,
      features: ["Sorteio Transparente", "Rondas e Quotas", "Modo Família Compartilhado"],
      bgGradient: "from-slate-950 via-emerald-950 to-slate-900",
      accentColor: "#10b981",
      previewType: "kixikila"
    },
    {
      id: 3,
      title: "Modo Negócio para Empreendedores",
      subtitle: "Controle vendas, estoque, fiados e lucro real",
      description: "Ideal para cantinas, prestadores de serviços e comerciantes em Angola. Gerencia o DRE simplificado e exporta PDFs.",
      badge: "Modo PRO Negócio",
      icon: Store,
      features: ["Controle de Stock & Produtos", "Gestão de Fiados & Clientes", "DRE & Lucro Líquido"],
      bgGradient: "from-slate-900 via-slate-950 to-emerald-950",
      accentColor: "#10b981",
      previewType: "negocio"
    },
    {
      id: 4,
      title: "Consultoria com Inteligência Artificial",
      subtitle: "Registo de gastos com foto na fatura e SMS bancário",
      description: "Adeus à digitação manual! Extraia dados de faturas de supermercados, farmácias ou SMS do BAI e BFA instantaneamente.",
      badge: "IA & Scanner",
      icon: Sparkles,
      features: ["Leitor de Comprovativos IA", "Leitura de SMS Bancário", "Auditoria Estratégica Kz"],
      bgGradient: "from-emerald-900 via-slate-950 to-slate-900",
      accentColor: "#10b981",
      previewType: "ia"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, banners.length]);

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const current = banners[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Destaques Oficiais KwanzaFlow</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Explore os Banners e Recursos do Aplicativo
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-1">
          Navegue pelas principais apresentações visuais e conheça o potencial completo para a sua liberdade financeira em Angola.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0f172a] text-white border border-slate-800">
        <div className={`absolute inset-0 bg-gradient-to-br ${current.bgGradient} opacity-90 transition-all duration-700 pointer-events-none`}></div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="relative p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left Text Presentation */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              <IconComponent className="w-4 h-4 text-[#10b981]" />
              <span>{current.badge}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Banner {currentIndex + 1} de {banners.length}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
              {current.title}
            </h3>

            <p className="text-lg sm:text-xl font-bold text-emerald-400">
              {current.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {current.description}
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              {current.features.map((feat, idx) => (
                <div key={idx} className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-3 text-xs font-semibold text-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDownloadModal}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-6 rounded-xl text-sm sm:text-base shadow-lg shadow-emerald-900/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Baixar App na Play Store</span>
              </button>

              {current.previewType === 'financas' && (
                <button
                  onClick={() => setActiveTab('recursos')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-5 rounded-xl text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  Ver Recursos Detalhados
                </button>
              )}

              {current.previewType === 'kixikila' && (
                <button
                  onClick={() => setActiveTab('kixikila')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-5 rounded-xl text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  Conhecer Kixikila Digital
                </button>
              )}
            </div>
          </div>

          {/* Right Phone Mockup Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] bg-slate-900/90 border border-slate-700 rounded-[28px] p-5 shadow-2xl backdrop-blur-md">
              {/* Phone Header notch indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 font-bold text-white">
                  <div className="w-6 h-6 rounded-lg bg-[#10b981] flex items-center justify-center text-white text-xs">K</div>
                  <span>KwanzaFlow AOA</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">PRO 2026</span>
              </div>

              {/* Dynamic Mockup Card Content */}
              <div className="space-y-4">
                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-left">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Módulo Selecionado</div>
                  <div className="text-lg font-black text-white mt-1">{current.title}</div>
                  <div className="text-xs text-emerald-400 mt-0.5 font-medium">{current.subtitle}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-left">
                    <div className="text-[10px] text-slate-400">Moeda Oficial</div>
                    <div className="text-sm font-black text-white mt-0.5">Kwanzas (AOA)</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-left">
                    <div className="text-[10px] text-slate-400">Segurança</div>
                    <div className="text-sm font-black text-emerald-400 mt-0.5">Firebase Auth</div>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-left">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                    <span>Pronto para Google Play Store</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Totalmente otimizado para kwanzaflow.online e appkwanzaflow@gmail.com.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Control Navigation Bar */}
        <div className="bg-slate-950/80 backdrop-blur-md px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-[#10b981]' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Ir para banner ${idx + 1}`}
              ></button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              title={isPlaying ? 'Pausar carrossel' : 'Reproduzir carrossel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#10b981]" /> : <Play className="w-3.5 h-3.5 text-[#10b981]" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pausar' : 'Autoplay'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={prevBanner}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                title="Banner anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextBanner}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                title="Próximo banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

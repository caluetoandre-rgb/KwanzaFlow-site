import { useState, useEffect, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface BannerCarouselProps {
  onOpenDownloadModal: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

// ============================================================================
// CONFIGURAÇÃO DOS 6 BANNERS OFICIAIS DO KWANZAFLOW (GOOGLE PLAY STORE)
// NOTA: Para trocar ou atualizar as imagens, coloque seus arquivos na pasta:
// /public/assets/imagem-1.png até /public/assets/imagem-6.png
// (ou substitua as propriedades 'image' abaixo pelo caminho desejado)
// ============================================================================
export const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Saiba onde Vai seu dinheiro e tenha controle das receitas e despesas",
    shortTitle: "Controle de Receitas & Despesas",
    badge: "1. Gestão Financeira",
    subtitle: "Acompanhe relatórios visuais por categoria, balanço em tempo real e gráficos detalhados em Kwanzas (AOA).",
    // CAMINHO DA IMAGEM 1:
    image: "/assets/imagem-1.svg",
    pngAlternative: "/assets/imagem-1.png",
    accentColor: "#10b981",
    bgColor: "#071d18",
  },
  {
    id: 2,
    title: "Faça suas poupanças em família e alcance suas metas. A Kixikila Angolana Digital",
    shortTitle: "Kixikila Angolana Digital",
    badge: "2. Poupança & Família",
    subtitle: "Organize rodas de poupança comunitária, rondas e cotas com transparência total e divisão familiar justa.",
    // CAMINHO DA IMAGEM 2:
    image: "/assets/imagem-2.svg",
    pngAlternative: "/assets/imagem-2.png",
    accentColor: "#f59e0b",
    bgColor: "#061f19",
  },
  {
    id: 3,
    title: "Acesse o Modo Negócio para Empreendedores",
    shortTitle: "Modo Negócio & Empreendedorismo",
    badge: "3. Modo PRO Negócio",
    subtitle: "Gestão completa de estoque, fiados e clientes devedores, faturamento e Demonstrativo DRE de lucros em Angola.",
    // CAMINHO DA IMAGEM 3:
    image: "/assets/imagem-3.svg",
    pngAlternative: "/assets/imagem-3.png",
    accentColor: "#0d9488",
    bgColor: "#081a1a",
  },
  {
    id: 4,
    title: "Consultoria Financeira com Inteligência Artificial e registro de gastos com foto na fatura",
    shortTitle: "Consultoria com IA & Scanner",
    badge: "4. Inteligência Artificial & SMS",
    subtitle: "Extraia despesas automaticamente tirando foto da fatura ou lendo notificações SMS do BAI, BFA e Multicaixa.",
    // CAMINHO DA IMAGEM 4:
    image: "/assets/imagem-4.svg",
    pngAlternative: "/assets/imagem-4.png",
    accentColor: "#0284c7",
    bgColor: "#091722",
  },
  {
    id: 5,
    title: "Quite Dívidas e Faça Gestão de Empréstimos",
    shortTitle: "Quitação de Dívidas",
    badge: "5. Eliminação de Passivos",
    subtitle: "Simule e aplique estratégias inteligentes (Avalanche por taxa de juros e Bola de Neve) para liquidar passivos com segurança.",
    // CAMINHO DA IMAGEM 5:
    image: "/assets/imagem-5.svg",
    pngAlternative: "/assets/imagem-5.png",
    accentColor: "#f43f5e",
    bgColor: "#052219",
  },
  {
    id: 6,
    title: "Continue Aprendendo Sobre Finanças Pessoais",
    shortTitle: "Educação Financeira & BODIVA",
    badge: "6. Educação & Investimentos",
    subtitle: "Aulas interativas e práticas para aprender a investir na Bolsa de Valores de Angola (BODIVA), títulos e tesouro.",
    // CAMINHO DA IMAGEM 6:
    image: "/assets/imagem-6.svg",
    pngAlternative: "/assets/imagem-6.png",
    accentColor: "#059669",
    bgColor: "#05261d",
  }
];

export function BannerCarousel({ onOpenDownloadModal, setActiveTab }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Autoplay timer (5 segundos) com pausa no hover
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Suporte a swipe em dispositivos móveis
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  return (
    <section 
      id="carrossel-destaques"
      aria-label="Carrossel de Apresentação KwanzaFlow"
      className="w-full bg-[#0a151b] border-b border-slate-800 text-white relative py-4 sm:py-6"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Destaques da Google Play Store</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Versão 20 • 100% Alta Resolução
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 text-emerald-400 font-semibold">
              {String(currentIndex + 1).padStart(2, '0')} / {String(CAROUSEL_SLIDES.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pausar rotação automática" : "Ativar rotação automática"}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title={isPlaying ? "Pausar Autoplay" : "Iniciar Autoplay"}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span className="hidden md:inline">{isPlaying ? "Pausa" : "Play"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONTAINER PRINCIPAL DO CARROSSEL: ASPECT-RATIO 16:9 E OBJECT-FIT: CONTAIN */}
        {/* ========================================================================= */}
        <div 
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 transition-colors duration-500"
          style={{ backgroundColor: currentSlide.bgColor }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Fundo Adaptativo com Gradiente Sutil para harmonização perfeita */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle at 75% 50%, ${currentSlide.accentColor} 0%, transparent 65%)`
            }}
          />

          {/* Área de Visualização da Imagem (Aspecto 16:9 padrão Google Play, sem corte nem estiramento) */}
          <div className="relative w-full aspect-[16/9] max-h-[580px] flex items-center justify-center p-1 sm:p-2">
            {CAROUSEL_SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center p-2 transition-opacity duration-500 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* IMAGEM COM OBJECT-FIT: CONTAIN (100% SEM DISTORÇÃO) */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] cursor-pointer"
                    loading={index === 0 ? "eager" : "lazy"}
                    onClick={() => setFullscreenImage(slide.image)}
                  />
                </div>
              );
            })}

            {/* Botão de Ampliar / Zoom */}
            <button
              onClick={() => setFullscreenImage(currentSlide.image)}
              className="absolute top-3 right-3 z-20 p-2 sm:p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 shadow-lg cursor-pointer transition-transform hover:scale-105"
              title="Visualizar em Tela Cheia (Fidelidade Máxima)"
              aria-label="Ver imagem em tamanho ampliado"
            >
              <Maximize2 className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Botão Lateral Esquerdo (Anterior) */}
            <button
              onClick={prevSlide}
              aria-label="Banner anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/75 hover:bg-emerald-600/90 text-white backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Botão Lateral Direito (Próximo) */}
            <button
              onClick={nextSlide}
              aria-label="Próximo banner"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/75 hover:bg-emerald-600/90 text-white backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Barra Inferior com Informações do Slide & Indicadores Interativos */}
          <div className="relative z-20 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 px-4 py-3 sm:px-6 sm:py-3.5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Título & Descrição do Banner Atual */}
              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    {currentSlide.badge}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {currentSlide.shortTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block truncate">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Bolinhas / Dots Clicáveis (6 Imagens) */}
              <div 
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Seletor de slides do carrossel"
              >
                {CAROUSEL_SLIDES.map((slide, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Ir para ${slide.shortTitle} (Imagem ${index + 1})`}
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                        isActive
                          ? 'w-8 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                          : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Botão Rápido para Baixar App */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenDownloadModal}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Obter na Play Store</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Modal de Zoom em Tela Cheia para Avaliação da Imagem Original com 100% de Fidelidade */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Fidelidade Máxima 16:9 • Clique em qualquer local para fechar
            </span>
            <button
              onClick={() => setFullscreenImage(null)}
              className="p-2.5 rounded-full bg-slate-800 text-white hover:bg-rose-600 transition-colors cursor-pointer"
              aria-label="Fechar visualização ampliada"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            className="w-full max-w-5xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullscreenImage}
              alt="Visualização Original em Alta Definição"
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onOpenDownloadModal}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Instalar KwanzaFlow na Google Play Store</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

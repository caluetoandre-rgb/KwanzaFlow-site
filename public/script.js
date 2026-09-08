/**
 * ============================================================================
 * KwanzaFlow - Carrossel de Imagens Moderno, Fluido e Responsivo
 * JavaScript Vanilla (Puro) - Sem dependências externas
 * ============================================================================
 * 
 * INSTRUÇÃO DE SUBSTITUIÇÃO DE IMAGENS:
 * Para trocar ou utilizar suas próprias imagens, coloque os arquivos na pasta
 * 'assets/' com os nomes abaixo ou altere os caminhos no array `slidesData`:
 * 
 * 1. Imagem 1 -> assets/imagem-1.png (Receitas, despesas e relatórios)
 * 2. Imagem 2 -> assets/imagem-2.png (Kixikila digital e poupança em família)
 * 3. Imagem 3 -> assets/imagem-3.png (Modo negócio para empreendedores)
 * 4. Imagem 4 -> assets/imagem-4.png (Consultoria financeira com IA e fotos)
 * 5. Imagem 5 -> assets/imagem-5.png (Quitação de dívidas e estratégias)
 * 6. Imagem 6 -> assets/imagem-6.png (Educação financeira e BODIVA)
 * ============================================================================
 */

(function () {
  'use strict';

  // Configuração dos dados dos slides
  const slidesData = [
    {
      id: 1,
      tag: "1. Gestão Financeira",
      title: "Saiba onde Vai seu dinheiro e tenha controle das receitas e despesas",
      bg: "#071d18",
      accent: "#10b981"
    },
    {
      id: 2,
      tag: "2. Kixikila Digital",
      title: "Faça suas poupanças em família e alcance suas metas. A Kixikila Angolana Digital",
      bg: "#061f19",
      accent: "#10b981"
    },
    {
      id: 3,
      tag: "3. Modo PRO Negócio",
      title: "Acesse o Modo Negócio para Empreendedores (Estoque, Fiados e DRE)",
      bg: "#081a1a",
      accent: "#10b981"
    },
    {
      id: 4,
      tag: "4. Inteligência Artificial",
      title: "Consultoria Financeira com IA e registro de gastos com foto na fatura",
      bg: "#091722",
      accent: "#0284c7"
    },
    {
      id: 5,
      tag: "5. Quitação de Dívidas",
      title: "Quite Dívidas e Faça Gestão de Empréstimos (Avalanche e Bola de Neve)",
      bg: "#052219",
      accent: "#10b981"
    },
    {
      id: 6,
      tag: "6. Educação Financeira",
      title: "Continue Aprendendo Sobre Finanças Pessoais e Investimentos na BODIVA",
      bg: "#05261d",
      accent: "#059669"
    }
  ];

  // Elementos do DOM
  let carouselContainer = null;
  let slides = [];
  let dots = [];
  let prevBtn = null;
  let nextBtn = null;
  let counterElem = null;
  let infoTag = null;
  let infoTitle = null;
  let toggleBtn = null;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isPlaying = true;
  let isHovered = false;
  const AUTOPLAY_DELAY = 5000; // 5 segundos

  // Variáveis para suporte a toque (Swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  function initCarousel() {
    carouselContainer = document.querySelector('.kf-carousel-container');
    if (!carouselContainer) return; // Não inicializa se o container não existir na página

    slides = Array.from(document.querySelectorAll('.kf-carousel-slide'));
    dots = Array.from(document.querySelectorAll('.kf-carousel-dot'));
    prevBtn = document.querySelector('.kf-carousel-prev');
    nextBtn = document.querySelector('.kf-carousel-next');
    counterElem = document.querySelector('.kf-carousel-counter');
    infoTag = document.querySelector('.kf-carousel-info-tag');
    infoTitle = document.querySelector('.kf-carousel-info-title');
    toggleBtn = document.querySelector('.kf-carousel-toggle');

    if (slides.length === 0) return;

    // Listeners de Botões
    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goToPrev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goToNext();
      });
    }

    // Listeners de Dots
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        goToSlide(index);
      });
    });

    // Pausa com Mouse Hover
    carouselContainer.addEventListener('mouseenter', function () {
      isHovered = true;
      pauseAutoplay();
    });

    carouselContainer.addEventListener('mouseleave', function () {
      isHovered = false;
      if (isPlaying) startAutoplay();
    });

    // Suporte a Swipe no Mobile
    carouselContainer.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    // Suporte a Teclado (Setas Esquerda / Direita)
    window.addEventListener('keydown', function (e) {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    });

    // Botão de Alternar Play/Pausa
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        isPlaying = !isPlaying;
        if (isPlaying) {
          toggleBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pausar';
          startAutoplay();
        } else {
          toggleBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Autoplay';
          pauseAutoplay();
        }
      });
    }

    // Inicializa o primeiro slide
    updateSlideView(0);
    startAutoplay();
  }

  function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 45) {
      goToNext();
    } else if (swipeDistance < -45) {
      goToPrev();
    }
  }

  function goToSlide(newIndex) {
    if (newIndex === currentIndex) return;
    updateSlideView(newIndex);
    resetAutoplay();
  }

  function goToNext() {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlideView(nextIndex);
    resetAutoplay();
  }

  function goToPrev() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlideView(prevIndex);
    resetAutoplay();
  }

  function updateSlideView(index) {
    currentIndex = index;

    // Atualiza classes ativas dos slides
    slides.forEach(function (slide, i) {
      if (i === currentIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    // Atualiza classes ativas dos dots
    dots.forEach(function (dot, i) {
      if (i === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Atualiza contador
    if (counterElem) {
      const currentFormatted = String(currentIndex + 1).padStart(2, '0');
      const totalFormatted = String(slides.length).padStart(2, '0');
      counterElem.textContent = currentFormatted + ' / ' + totalFormatted;
    }

    // Atualiza texto informativo e fundo adaptativo
    const currentData = slidesData[currentIndex];
    if (currentData) {
      if (infoTag) infoTag.textContent = currentData.tag;
      if (infoTitle) infoTitle.textContent = currentData.title;
      if (carouselContainer) {
        carouselContainer.style.backgroundColor = currentData.bg;
      }
    }
  }

  function startAutoplay() {
    pauseAutoplay();
    if (isPlaying && !isHovered) {
      autoplayTimer = setInterval(function () {
        goToNext();
      }, AUTOPLAY_DELAY);
    }
  }

  function pauseAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    pauseAutoplay();
    if (isPlaying && !isHovered) {
      startAutoplay();
    }
  }

  // Inicializa quando o DOM estiver carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }

  // Exporta função para controle externo caso necessário
  window.KwanzaCarousel = {
    goTo: goToSlide,
    next: goToNext,
    prev: goToPrev,
    pause: pauseAutoplay,
    play: startAutoplay
  };
})();

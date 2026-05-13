# Template HTML — Apresentações Itaú Empresas

Arquitetura de referência para gerar slides. **Toda apresentação segue esta estrutura.**

---

## Estrutura HTML Base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[TÍTULO DA APRESENTAÇÃO]</title>

  <!-- Fontes externas (quando necessário para presets criativos) -->
  <!-- Para presets nativos Itaú, usar apenas @font-face local -->
  <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..."> -->

  <style>
    /* ===========================================
       FONTES ITAÚ DISPLAY PRO (LOCAL)
       Sempre declarar antes de qualquer uso
       =========================================== */
    @font-face {
      font-family: 'Itau Display Pro';
      src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Lt.woff2') format('woff2');
      font-weight: 300; font-display: swap;
    }
    @font-face {
      font-family: 'Itau Display Pro';
      src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Rg.woff2') format('woff2');
      font-weight: 400; font-display: swap;
    }
    @font-face {
      font-family: 'Itau Display Pro';
      src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Bd.woff2') format('woff2');
      font-weight: 700; font-display: swap;
    }
    @font-face {
      font-family: 'Itau Display Pro';
      src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Blk.woff2') format('woff2');
      font-weight: 900; font-display: swap;
    }

    /* ===========================================
       CSS CUSTOM PROPERTIES (TEMA)
       Alterar aqui para mudar o visual todo
       =========================================== */
    :root {
      /* Marca Itaú Empresas */
      --itau-orange:   #EC7000;
      --itau-blue:     #1F3B6B;
      --itau-white:    #FFFFFF;
      --itau-black:    #1A1A1A;
      --itau-gray-100: #F5F5F5;
      --itau-gray-300: #CCCCCC;
      --itau-gray-500: #999999;

      /* Cores do preset escolhido (sobrescrever conforme o preset) */
      --bg-primary:    var(--itau-blue);
      --bg-secondary:  #162d52;
      --text-primary:  var(--itau-white);
      --text-secondary: rgba(255,255,255,0.65);
      --accent:        var(--itau-orange);
      --border:        rgba(255,255,255,0.10);

      /* Tipografia — OBRIGATÓRIO usar clamp() */
      --font-display:  'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
      --font-body:     'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
      --font-mono:     'JetBrains Mono', 'Fira Code', monospace;

      --title-size:    clamp(1.8rem, 5.5vw, 4.5rem);
      --h2-size:       clamp(1.3rem, 3.5vw, 2.5rem);
      --h3-size:       clamp(1rem, 2.5vw, 1.75rem);
      --body-size:     clamp(0.8rem, 1.5vw, 1.125rem);
      --small-size:    clamp(0.65rem, 1vw, 0.875rem);
      --stat-size:     clamp(2.5rem, 8vw, 5.5rem);

      /* Espaçamento */
      --slide-padding: clamp(1.5rem, 5vw, 5rem);
      --content-gap:   clamp(0.75rem, 2vw, 2rem);
      --element-gap:   clamp(0.35rem, 1vw, 1rem);

      /* Animações */
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --duration-fast: 0.25s;
      --duration-normal: 0.55s;
      --duration-slow: 0.85s;
    }

    /* ===========================================
       BASE RESET
       =========================================== */
    *, *::before, *::after {
      margin: 0; padding: 0; box-sizing: border-box;
    }

    /* --- COLE O CONTEÚDO DE viewport-base.css AQUI --- */

    /* ===========================================
       TIPOGRAFIA GLOBAL
       =========================================== */
    body {
      font-family: var(--font-body);
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    h1 { font-family: var(--font-display); font-weight: 900; line-height: 1.05; }
    h2 { font-family: var(--font-display); font-weight: 900; line-height: 1.1; }
    h3 { font-family: var(--font-display); font-weight: 700; line-height: 1.2; }
    p, li { font-family: var(--font-body); font-weight: 400; line-height: 1.5; }

    /* ===========================================
       ANIMAÇÕES DE ENTRADA
       Disparadas via classe .visible (IntersectionObserver)
       =========================================== */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity var(--duration-normal) var(--ease-out-expo),
                  transform var(--duration-normal) var(--ease-out-expo);
    }
    .slide.visible .reveal { opacity: 1; transform: translateY(0); }

    /* Stagger sequencial */
    .reveal:nth-child(1) { transition-delay: 0.05s; }
    .reveal:nth-child(2) { transition-delay: 0.15s; }
    .reveal:nth-child(3) { transition-delay: 0.25s; }
    .reveal:nth-child(4) { transition-delay: 0.35s; }
    .reveal:nth-child(5) { transition-delay: 0.45s; }
    .reveal:nth-child(6) { transition-delay: 0.55s; }

    /* Variantes de reveal */
    .reveal-scale { opacity: 0; transform: scale(0.9);
      transition: opacity var(--duration-normal) var(--ease-out-expo),
                  transform var(--duration-normal) var(--ease-out-expo); }
    .slide.visible .reveal-scale { opacity: 1; transform: scale(1); }

    .reveal-left { opacity: 0; transform: translateX(-40px);
      transition: opacity var(--duration-normal) var(--ease-out-expo),
                  transform var(--duration-normal) var(--ease-out-expo); }
    .slide.visible .reveal-left { opacity: 1; transform: translateX(0); }

    /* ===========================================
       COMPONENTES COMUNS
       =========================================== */

    /* Barra de acento laranja */
    .accent-bar {
      width: clamp(40px, 5vw, 64px);
      height: 4px;
      background: var(--accent);
      margin-bottom: var(--content-gap);
    }

    /* Tag/label de seção */
    .tag-label {
      font-size: var(--small-size);
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: var(--element-gap);
    }

    /* Stat card */
    .stat-card {
      background: rgba(255,255,255,0.05);
      border-top: 3px solid var(--accent);
      padding: clamp(16px,2.5vw,32px) clamp(14px,2vw,28px);
    }
    .stat-value {
      font-family: var(--font-display);
      font-size: var(--stat-size);
      font-weight: 900;
      color: var(--accent);
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .stat-label {
      font-size: var(--small-size);
      color: var(--text-secondary);
      margin-top: 6px;
      line-height: 1.4;
    }

    /* Grid de stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
      gap: clamp(12px, 2vw, 24px);
      width: 100%;
    }

    /* Lista de bullets */
    .bullet-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 1.5vh, 18px);
    }
    .bullet-list li {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      font-size: var(--body-size);
      line-height: 1.45;
    }
    .bullet-list li::before {
      content: '';
      display: block;
      min-width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
      margin-top: 0.5em;
      flex-shrink: 0;
    }
    .bullet-list li strong { color: var(--accent); font-weight: 700; }

    /* Rodapé padrão */
    .slide-footer {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: clamp(48px, 6vh, 72px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 14px;
      padding: 0 var(--slide-padding);
      border-top: 1px solid var(--border);
    }
    .slide-footer .page-num {
      font-size: var(--small-size);
      font-weight: 300;
      opacity: 0.45;
    }
    .slide-footer .logo-itau {
      height: clamp(24px, 3vh, 36px);
      width: auto;
    }

    /* Nav dots */
    .nav-dots {
      position: fixed;
      right: clamp(12px, 2vw, 24px);
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 100;
    }
    .nav-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      cursor: pointer;
      transition: background 0.25s, transform 0.25s;
    }
    .nav-dot.active {
      background: var(--accent);
      transform: scale(1.5);
    }

    /* Progress bar */
    .progress-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      background: var(--accent);
      width: 0%;
      transition: width 0.3s ease;
      z-index: 200;
    }

    /* ... estilos específicos do preset aqui ... */
  </style>
</head>
<body>

  <div class="progress-bar" id="progressBar"></div>
  <nav class="nav-dots" id="navDots"></nav>

  <!-- ============================================================
       SLIDE 1: TÍTULO
       ============================================================ -->
  <section class="slide slide-title">
    <div class="slide-content">
      <div class="tag-label reveal">Itaú Empresas</div>
      <div class="accent-bar reveal"></div>
      <h1 class="reveal">[Título da Apresentação]</h1>
      <p class="reveal" style="font-size:var(--h3-size); font-weight:300; opacity:0.7; margin-top:var(--content-gap);">
        [Subtítulo ou descrição]
      </p>
      <p class="reveal" style="font-size:var(--small-size); opacity:0.45; margin-top:auto;">
        [Autor] &nbsp;·&nbsp; [Data]
      </p>
    </div>
    <footer class="slide-footer">
      <span class="page-num">01</span>
      <img class="logo-itau" src="src/assets/logos/logo-itau-branca.png" alt="Itaú Empresas">
    </footer>
  </section>

  <!-- ============================================================
       SLIDE 2: AGENDA
       ============================================================ -->
  <section class="slide slide-agenda">
    <div class="slide-content">
      <div class="tag-label reveal">Agenda</div>
      <h2 class="reveal">[O que vamos cobrir]</h2>
      <ul class="bullet-list" style="margin-top:var(--content-gap)">
        <li class="reveal">[Tópico 1]</li>
        <li class="reveal">[Tópico 2]</li>
        <li class="reveal">[Tópico 3]</li>
      </ul>
    </div>
    <footer class="slide-footer">
      <span class="page-num">02</span>
      <img class="logo-itau" src="src/assets/logos/logo-itau-laranja.png" alt="Itaú Empresas">
    </footer>
  </section>

  <!-- ============================================================
       SLIDE N: SEÇÃO (laranja)
       ============================================================ -->
  <section class="slide slide-section" style="background:#EC7000; text-align:center; align-items:center;">
    <div class="slide-content" style="align-items:center;">
      <div class="tag-label reveal" style="color:rgba(255,255,255,0.6);">Parte 1</div>
      <h2 class="reveal" style="font-size:var(--title-size); color:#fff;">[Nome da Seção]</h2>
      <p class="reveal" style="font-size:var(--body-size); color:rgba(255,255,255,0.7); margin-top:var(--element-gap);">
        [Descrição curta]
      </p>
    </div>
    <footer class="slide-footer" style="border-top-color:rgba(255,255,255,0.15);">
      <span class="page-num" style="color:rgba(255,255,255,0.4)">0N</span>
      <img class="logo-itau" src="src/assets/logos/logo-itau-branca.png" alt="Itaú Empresas">
    </footer>
  </section>

  <!-- ============================================================
       SLIDE N: CONTEÚDO COM STATS
       ============================================================ -->
  <section class="slide slide-content">
    <div class="slide-content">
      <div class="tag-label reveal">[Seção]</div>
      <h2 class="reveal">[Título do slide como afirmação]</h2>
      <div class="stats-grid reveal" style="margin-top:var(--content-gap);">
        <div class="stat-card">
          <div class="stat-value">XX%</div>
          <div class="stat-label">[descrição da métrica]</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">R$ Xbi</div>
          <div class="stat-label">[descrição da métrica]</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">Xk</div>
          <div class="stat-label">[descrição da métrica]</div>
        </div>
      </div>
    </div>
    <footer class="slide-footer">
      <span class="page-num">0N</span>
      <img class="logo-itau" src="src/assets/logos/logo-itau-branca.png" alt="Itaú Empresas">
    </footer>
  </section>

  <!-- ============================================================
       SLIDE FINAL: ENCERRAMENTO
       ============================================================ -->
  <section class="slide slide-closing" style="text-align:center; align-items:center;">
    <div class="slide-content" style="align-items:center;">
      <img class="logo-itau reveal" src="src/assets/logos/logo-itau-branca.png" alt="Itaú Empresas"
           style="height:clamp(40px,5vh,60px); margin-bottom:var(--content-gap);">
      <h2 class="reveal" style="font-size:var(--title-size);">[Mensagem de encerramento]</h2>
      <p class="reveal" style="font-size:var(--body-size); opacity:0.6; margin-top:var(--element-gap);">
        [CTA ou contato]
      </p>
    </div>
    <footer class="slide-footer" style="border-top-color:rgba(255,255,255,0.08);">
      <span class="page-num" style="opacity:0.25">0N</span>
    </footer>
  </section>

  <script>
    /* ===========================================
       SLIDE PRESENTATION CONTROLLER
       =========================================== */
    class SlidePresentation {
      constructor() {
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.currentIndex = 0;
        this.isScrolling = false;

        this.progressBar = document.getElementById('progressBar');
        this.navDotsContainer = document.getElementById('navDots');

        this.setupIntersectionObserver();
        this.setupKeyboardNav();
        this.setupTouchNav();
        this.setupWheelNav();
        this.setupProgressBar();
        this.setupNavDots();

        // Expose for PDF export script
        window.presentation = this;
      }

      /* --- IntersectionObserver: adiciona .visible para CSS animations --- */
      setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              const idx = this.slides.indexOf(entry.target);
              if (idx !== -1) {
                this.currentIndex = idx;
                this.updateProgressBar();
                this.updateNavDots();
              }
            }
          });
        }, { threshold: 0.5 });

        this.slides.forEach(slide => observer.observe(slide));
      }

      /* --- Teclado: setas, espaço, Page Up/Down --- */
      setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
          // Skip if inline editing is active
          if (e.target.getAttribute('contenteditable')) return;

          switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
              e.preventDefault();
              this.goToSlide(this.currentIndex + 1);
              break;
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'PageUp':
              e.preventDefault();
              this.goToSlide(this.currentIndex - 1);
              break;
            case 'Home':
              e.preventDefault();
              this.goToSlide(0);
              break;
            case 'End':
              e.preventDefault();
              this.goToSlide(this.slides.length - 1);
              break;
          }
        });
      }

      /* --- Touch/swipe --- */
      setupTouchNav() {
        let startY = 0;
        let startX = 0;

        document.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY;
          startX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
          const deltaY = startY - e.changedTouches[0].clientY;
          const deltaX = startX - e.changedTouches[0].clientX;

          if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 40) {
            this.goToSlide(this.currentIndex + (deltaY > 0 ? 1 : -1));
          }
        }, { passive: true });
      }

      /* --- Mouse wheel --- */
      setupWheelNav() {
        let lastWheelTime = 0;

        document.addEventListener('wheel', (e) => {
          e.preventDefault();
          const now = Date.now();
          if (now - lastWheelTime < 800) return; // Throttle
          lastWheelTime = now;
          this.goToSlide(this.currentIndex + (e.deltaY > 0 ? 1 : -1));
        }, { passive: false });
      }

      /* --- Navegar para slide específico --- */
      goToSlide(index) {
        const target = Math.max(0, Math.min(index, this.slides.length - 1));
        if (target === this.currentIndex) return;
        this.slides[target].scrollIntoView({ behavior: 'smooth' });
        this.currentIndex = target;
      }

      /* --- Barra de progresso --- */
      setupProgressBar() {
        this.updateProgressBar();
      }
      updateProgressBar() {
        if (!this.progressBar) return;
        const pct = ((this.currentIndex) / (this.slides.length - 1)) * 100;
        this.progressBar.style.width = `${pct}%`;
      }

      /* --- Nav dots --- */
      setupNavDots() {
        if (!this.navDotsContainer) return;
        this.navDotsContainer.innerHTML = ''; // Limpar antes de recriar

        this.slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', `Slide ${i + 1}`);
          dot.addEventListener('click', () => this.goToSlide(i));
          this.navDotsContainer.appendChild(dot);
        });
      }
      updateNavDots() {
        const dots = this.navDotsContainer?.querySelectorAll('.nav-dot');
        dots?.forEach((dot, i) => dot.classList.toggle('active', i === this.currentIndex));
      }
    }

    new SlidePresentation();
  </script>

</body>
</html>
```

---

## Funcionalidades JS Obrigatórias

Todo HTML gerado deve incluir:

1. **`SlidePresentation` class** — Teclado, touch, wheel, progress bar, nav dots
2. **`IntersectionObserver`** — Adiciona `.visible` para disparar animações CSS
3. **`window.presentation = this`** — Expõe instância para o script `export-pdf.sh`
4. **`navDotsContainer.innerHTML = ''`** — Limpar dots antes de recriar (evita duplicação ao reabrir arquivo salvo)

---

## Inline Editing (Opcional — só se usuário solicitou)

Se o usuário escolheu "Sim" para edição inline, adicionar:

**NÃO usar CSS `~` sibling selector** — `pointer-events: none` quebra a cadeia de hover. Usar JS com timeout de 400ms.

```html
<div class="edit-hotzone"></div>
<button class="edit-toggle" id="editToggle" title="Editar (E)">✏️</button>
```

```css
.edit-hotzone { position:fixed; top:0; left:0; width:80px; height:80px; z-index:10000; cursor:pointer; }
.edit-toggle { opacity:0; pointer-events:none; transition:opacity 0.3s; z-index:10001; position:fixed; top:16px; left:16px; }
.edit-toggle.show, .edit-toggle.active { opacity:1; pointer-events:auto; }
```

```javascript
// Hotzone com grace period de 400ms
let hideTimeout = null;
hotzone.addEventListener('mouseenter', () => { clearTimeout(hideTimeout); editToggle.classList.add('show'); });
hotzone.addEventListener('mouseleave', () => {
  hideTimeout = setTimeout(() => { if (!editor.isActive) editToggle.classList.remove('show'); }, 400);
});
editToggle.addEventListener('mouseenter', () => clearTimeout(hideTimeout));

// CRÍTICO: exportFile() deve remover estado de edição antes de capturar outerHTML
function exportFile() {
  const editableEls = Array.from(document.querySelectorAll('[contenteditable]'));
  editableEls.forEach(el => el.removeAttribute('contenteditable'));
  document.body.classList.remove('edit-active');
  editToggle?.classList.remove('active', 'show');

  const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

  // Restaurar estado de edição
  document.body.classList.add('edit-active');
  editableEls.forEach(el => el.setAttribute('contenteditable', 'true'));
  editToggle?.classList.add('active');

  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'apresentacao.html';
  a.click();
  URL.revokeObjectURL(a.href);
}
```

---

## Limites de Conteúdo por Slide

| Tipo de Slide | Conteúdo Máximo |
|---------------|----------------|
| Título | 1 heading + 1 subtítulo + autor/data |
| Agenda | 1 heading + máx 6 itens |
| Conteúdo | 1 heading + máx 5 bullets OU 2 parágrafos |
| Métricas | 1 heading + máx 4 stat cards |
| Seção | 1 heading grande + 1 descrição curta |
| Código | 1 heading + máx 10 linhas de código |
| Quote | 1 citação (máx 3 linhas) + atribuição |
| Encerramento | Logo + heading + CTA |

**Conteúdo excede os limites? Dividir em múltiplos slides. Nunca cramear, nunca rolar.**

---

## Imagens

```css
.slide-image { max-width:100%; max-height:min(50vh,400px); object-fit:contain; }
.slide-image.logo { max-height:min(30vh,200px); }
.slide-image.screenshot { border:1px solid rgba(255,255,255,0.1); border-radius:8px; }
```

- Usar caminhos relativos (`src="assets/foto.png"`), nunca base64 para imagens grandes
- Logo Itaú: sempre `src/assets/logos/logo-itau-[variante].png`
- Nunca repetir a mesma imagem em múltiplos slides (exceto logos no título e encerramento)

---

## Qualidade de Código

- Comentários `/* === NOME DA SEÇÃO === */` em cada bloco CSS e JS
- HTML semântico: `<section>`, `<nav>`, `<footer>`, `<main>`
- ARIA labels em nav dots e botões
- `prefers-reduced-motion` (incluído no viewport-base.css)
- Teclado 100% funcional (testado sem mouse)

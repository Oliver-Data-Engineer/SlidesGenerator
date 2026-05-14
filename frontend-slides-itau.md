---
name: frontend-slides-itau
description: Crie apresentações HTML ricas em animações para o Itaú Unibanco, respeitando rigorosamente os brand tokens oficiais da marca (cores, tipografia, logos, acessibilidade). Use este skill SEMPRE que o usuário quiser criar slides, apresentações, pitch decks, decks de estratégia ou qualquer apresentação de slides que mencione "Itaú", "banco", "financeiro", "banking", siga a identidade visual do Itaú, ou quando quiser apresentações com a paleta azul escuro #000D3C / laranja #FF6200. Acione também para conversão de PPT/PPTX para web no contexto da marca Itaú. O skill garante 100% viewport por slide, sem quebra de página, temas visuais distintos e interatividade criativa.
---
 
# Frontend Slides — Itaú Brand System
 
Especialização do skill `frontend-slides` base com os **brand tokens oficiais do Itaú Unibanco**. Cada apresentação gerada deve ser visualmente reconhecível como Itaú — precisa, confiante, e memorável.
 
---
 
## Regra de Ouro: 100% Viewport por Slide
 
**SEMPRE, sem exceção:**
 
```css
html, body {
  margin: 0; padding: 0;
  width: 100vw; height: 100vh;
  overflow: hidden; /* nunca scroll visível */
}
 
.slide {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden; /* conteúdo nunca vaza para fora */
  position: absolute;
  top: 0; left: 0;
}
```
 
Slides são navegados via JS (teclado, clique, swipe) — **nunca via scroll nativo**. O container principal usa `position: relative` com slides em `position: absolute` ou `fixed`, transicionando via transform/opacity.
 
---
 
## Phase 0: Detectar Modo
 
| Sinal | Modo |
|-------|------|
| "criar slides", "fazer uma apresentação" | **A: Nova Apresentação** |
| Arquivo .ppt/.pptx anexado | **B: Conversão PPT** |
| HTML existente compartilhado | **C: Melhoria de Apresentação Existente** |
 
---
 
## Phase 1: Descoberta de Conteúdo
 
Pergunte via AskUserQuestion:
 
**Pergunta 1 — Finalidade:**
- Pitch deck — Investidores, clientes, vendas
- Apresentação estratégica — Resultados, roadmap, OKRs
- Treinamento / Onboarding — Capacitação de times
- Palestra / Evento — Conferências, keynotes
**Pergunta 2 — Tamanho:**
- Curto (5–10 slides)
- Médio (10–20 slides)
- Longo (20+ slides)
**Pergunta 3 — Conteúdo:**
- Tenho tudo pronto — só preciso do design
- Tenho rascunhos — preciso organizar
- Tenho apenas o tema — preciso de estrutura completa
---
 
## Phase 2: Seleção de Tema Visual
 
### Se o usuário não especificou um tema, SEMPRE apresente as opções visuais antes de gerar.
 
Mostre as 4 opções de tema Itaú disponíveis + as variantes de paginação:
 
---
 
### 2A. Temas Disponíveis (4 temas oficiais da marca)
 
#### TEMA 1 — "Azul Noite" (Dark Executive)
```
Background: #000D3C (azul escuro dominante)
Textos: #FFFFFF
Acento: #FF6200 (laranja)
Acento secundário: #0131FF
Personalidade: Autoridade, confiança, institucional
Ideal para: Pitch para investidores, resultados financeiros, estratégia corporativa
```
Detalhes visuais:
- Fundo `#000D3C` sólido com mesh gradient sutil em radial azul mais escuro
- Tipografia display branca bold com accent line laranja
- Cards com `background: rgba(255,255,255,0.06)` + borda `rgba(255,98,0,0.3)`
- Números grandes em laranja (`#FF6200`) para dados e métricas
- Logo branco no canto superior
#### TEMA 2 — "Laranja Vibrante" (Brand Bold)
```
Background: #FF6200 (laranja total)
Textos: #000D3C
Acento: #000000
Personalidade: Energia, inovação, impacto
Ideal para: Lançamentos, campanhas, eventos internos de engajamento
```
Detalhes visuais:
- Fundo laranja `#FF6200` com ruído/grain sutil em overlay
- Tipografia preta `#000D3C` ou `#000000`
- Logo azul escuro
- Cards com fundo `rgba(0,13,60,0.08)` + borda `rgba(0,13,60,0.2)`
- Slides alternados: laranja → azul escuro → laranja (ritmo visual)
#### TEMA 3 — "Branco Limpo" (Digital Light)
```
Background: #FFFFFF / #F1F2F4
Textos: #000D3C
Acento: #FF6200 + #0131FF
Personalidade: Clareza, modernidade, digital
Ideal para: Apresentações de produto, onboarding, treinamentos
```
Detalhes visuais:
- Fundo branco `#FFFFFF` ou `#F1F2F4`
- Header/hero com `#000D3C` como âncora visual
- Accent bar laranja de 3px nos títulos
- Cards brancos com `box-shadow: 0 2px 8px rgba(0,13,60,0.08)`
- Texto primário `#000D3C`, secundário `#4C4C4C`
- Logo laranja no header
#### TEMA 4 — "Contraste Máximo" (High Impact)
```
Background: alternância dramática entre #000D3C e #FFFFFF por slide
Textos: #FFFFFF (sobre escuro) / #000D3C (sobre claro)
Acento: #FF6200 consistente em todos os slides
Personalidade: Dinamismo, narrativa, ritmo
Ideal para: Keynotes, conferências externas, storytelling de marca
```
Detalhes visuais:
- Slides ímpares: fundo `#000D3C`, texto branco
- Slides pares: fundo `#FFFFFF`, texto `#000D3C`
- Laranja `#FF6200` como fio condutor visual (números, ícones, destaques)
- Transições mais dramáticas entre slides (flip ou slide diagonal)
- Logo alterna entre versão branca e laranja
---
 
### 2B. Variantes de Paginação / Transição
 
Apresente junto com os temas:
 
| Variante | Comportamento | Melhor com |
|----------|--------------|------------|
| **Fade** | Dissolve suave entre slides | Temas 1 e 3 |
| **Slide Horizontal** | Push lateral clássico | Qualquer tema |
| **Slide Vertical** | Push de cima para baixo | Narrativas lineares |
| **Zoom** | Próximo slide escala do centro | Tema 2 e 4 |
| **Flip** | Virada 3D no eixo Y | Tema 4 (alto impacto) |
| **Reveal** | Próximo slide "abre" por baixo | Temas 1 e 4 |
| **Morph** | Elementos persistem entre slides | Storytelling contínuo |
 
---
 
## Phase 3: Arquitetura HTML — Regras Fixas
 
### Estrutura Base Obrigatória
 
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apresentação Itaú</title>
 
  <!-- Tipografia — nunca Inter como display -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
 
  <style>
    /* ============================================
       ITAÚ BRAND TOKENS — não modificar
       ============================================ */
    :root {
      /* Cores primárias */
      --itau-azul:     #000D3C;
      --itau-branco:   #FFFFFF;
      --itau-laranja:  #FF6200;
      --itau-azul-vib: #0131FF;
      --itau-preto:    #000000;
 
      /* Escala de cinzas */
      --itau-g50:  #F1F2F4;
      --itau-g100: #E3E5E8;
      --itau-g500: #6E6E6E;
      --itau-g600: #4C4C4C;
 
      /* Tipografia */
      --font-display: 'DM Sans', sans-serif;
      --font-body:    'DM Sans', sans-serif;
 
      /* Easing Itaú — suave e confiante */
      --ease-itau: cubic-bezier(0.4, 0, 0.2, 1);
      --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
 
      /* Espaçamento base */
      --slide-pad: clamp(2.5rem, 5vw, 5rem);
    }
 
    /* ============================================
       RESET + FULLSCREEN — OBRIGATÓRIO
       ============================================ */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
    html {
      width: 100vw; height: 100vh;
      overflow: hidden;
      font-size: 16px;
    }
 
    body {
      width: 100vw; height: 100vh;
      overflow: hidden;
      font-family: var(--font-body);
    }
 
    /* ============================================
       SLIDE ENGINE
       ============================================ */
    #presentation {
      width: 100vw; height: 100vh;
      position: relative;
      overflow: hidden;
    }
 
    .slide {
      position: absolute;
      inset: 0; /* top:0 right:0 bottom:0 left:0 */
      width: 100vw; height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: var(--slide-pad);
 
      /* Estado inicial: fora da tela */
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s var(--ease-itau),
                  transform 0.5s var(--ease-itau);
    }
 
    .slide.active {
      opacity: 1;
      pointer-events: all;
      z-index: 2;
    }
 
    .slide.prev { transform: translateX(-100%); opacity: 0; }
    .slide.next { transform: translateX(100%);  opacity: 0; }
  </style>
</head>
<body>
  <div id="presentation">
    <!-- Slides aqui -->
  </div>
 
  <!-- UI Overlay -->
  <div id="slide-counter">1 / N</div>
  <nav id="progress-dots"></nav>
  <div id="nav-hint">← → para navegar</div>
 
  <script>
    /* ============================================
       ITAÚ SLIDE CONTROLLER
       ============================================ */
    class ItauPresentation {
      constructor() {
        this.slides = [...document.querySelectorAll('.slide')];
        this.current = 0;
        this.total = this.slides.length;
        this.animating = false;
 
        this.init();
      }
 
      init() {
        this.buildDots();
        this.goTo(0, false);
        this.bindKeys();
        this.bindSwipe();
        this.bindClick();
        this.updateCounter();
      }
 
      goTo(index, animate = true) {
        if (this.animating && animate) return;
        if (index < 0 || index >= this.total) return;
 
        const prev = this.current;
        this.current = index;
 
        this.slides.forEach((s, i) => {
          s.classList.remove('active', 'prev', 'next');
          if (i === this.current) s.classList.add('active');
          else if (i < this.current) s.classList.add('prev');
          else s.classList.add('next');
        });
 
        this.triggerReveal(this.slides[this.current]);
        this.updateDots();
        this.updateCounter();
 
        if (animate) {
          this.animating = true;
          setTimeout(() => { this.animating = false; }, 600);
        }
      }
 
      next() { this.goTo(this.current + 1); }
      prev() { this.goTo(this.current - 1); }
 
      triggerReveal(slide) {
        const elements = slide.querySelectorAll('.reveal');
        elements.forEach((el, i) => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(24px)';
          setTimeout(() => {
            el.style.transition = `opacity 0.5s var(--ease-enter) ${i * 0.1}s,
                                   transform 0.5s var(--ease-enter) ${i * 0.1}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 50);
        });
      }
 
      bindKeys() {
        document.addEventListener('keydown', e => {
          if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); this.next(); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
        });
      }
 
      bindSwipe() {
        let startX = 0;
        document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
        document.addEventListener('touchend', e => {
          const diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
        });
      }
 
      bindClick() {
        document.addEventListener('click', e => {
          if (e.target.closest('#progress-dots, button, a, [data-no-nav]')) return;
          e.clientX > window.innerWidth / 2 ? this.next() : this.prev();
        });
      }
 
      buildDots() {
        const nav = document.getElementById('progress-dots');
        if (!nav) return;
        this.slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.setAttribute('aria-label', `Slide ${i + 1}`);
          dot.addEventListener('click', (e) => { e.stopPropagation(); this.goTo(i); });
          nav.appendChild(dot);
        });
      }
 
      updateDots() {
        const dots = document.querySelectorAll('#progress-dots button');
        dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
      }
 
      updateCounter() {
        const el = document.getElementById('slide-counter');
        if (el) el.textContent = `${this.current + 1} / ${this.total}`;
      }
    }
 
    document.addEventListener('DOMContentLoaded', () => new ItauPresentation());
  </script>
</body>
</html>
```
 
---
 
## Phase 4: Tokens por Tema — CSS Específico
 
### Tema 1 — Azul Noite
 
```css
body { background: #000D3C; }
 
.slide { background: #000D3C; color: #FFFFFF; }
 
/* Hero slide com mesh */
.slide-hero {
  background:
    radial-gradient(ellipse at 15% 85%, rgba(1,49,255,0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 15%, rgba(255,98,0,0.15) 0%, transparent 55%),
    #000D3C;
}
 
/* Cards */
.card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,98,0,0.25);
  border-radius: 12px;
  padding: 24px;
}
 
/* Accent bar nos títulos */
.slide h2::before {
  content: '';
  display: block;
  width: 40px; height: 3px;
  background: #FF6200;
  border-radius: 2px;
  margin-bottom: 12px;
}
 
/* Métricas em laranja */
.metric { color: #FF6200; font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; }
 
/* Botão CTA */
.btn-cta {
  background: #FF6200; color: #000D3C;
  padding: 14px 32px; border-radius: 8px;
  font-weight: 700; border: none; cursor: pointer;
}
```
 
### Tema 2 — Laranja Vibrante
 
```css
.slide { background: #FF6200; color: #000D3C; }
 
/* Slides alternados */
.slide:nth-child(even) { background: #000D3C; color: #FFFFFF; }
 
/* Textura grain */
.slide::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}
 
.card { background: rgba(0,13,60,0.08); border: 1px solid rgba(0,13,60,0.15); }
.btn-cta { background: #000D3C; color: #FFFFFF; }
```
 
### Tema 3 — Branco Limpo
 
```css
.slide { background: #FFFFFF; color: #000D3C; }
 
.slide-alt { background: #F1F2F4; }
 
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,13,60,0.08);
  padding: 24px;
}
 
.accent-line {
  width: 40px; height: 3px;
  background: #FF6200;
  border-radius: 2px;
  margin-bottom: 16px;
}
 
.metric { color: #000D3C; }
.metric-accent { color: #FF6200; }
.tag { background: #FF6200; color: #000D3C; padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
```
 
### Tema 4 — Contraste Máximo
 
```css
/* Slides ímpares: escuro */
.slide:nth-child(odd)  { background: #000D3C; color: #FFFFFF; }
/* Slides pares: claro */
.slide:nth-child(even) { background: #FFFFFF; color: #000D3C; }
 
/* Laranja como fio condutor */
.accent { color: #FF6200; }
.accent-bg { background: #FF6200; }
 
/* Transição flip */
.slide { transform-origin: center; }
.slide.prev  { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
.slide.next  { transform: perspective(1200px) rotateY(90deg);  opacity: 0; }
.slide.active{ transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
```
 
---
 
## Phase 5: Padrões de Slides Criativos
 
Vá além de "título + bullets". Use estes layouts por tipo de conteúdo:
 
### Slide de Métrica Única (Big Number)
```html
<section class="slide slide-metric">
  <div class="metric-wrapper reveal">
    <span class="metric">R$ 2,4B</span>
    <span class="metric-label">em crédito concedido em 2024</span>
  </div>
  <div class="metric-context reveal">
    <p>Crescimento de 34% YoY</p>
  </div>
</section>
```
 
### Slide de Comparação (Antes / Depois)
```html
<section class="slide slide-compare">
  <div class="compare-grid">
    <div class="compare-before reveal">
      <span class="label">Antes</span>
      <h3>Processo manual</h3>
      <ul>...</ul>
    </div>
    <div class="compare-divider reveal">→</div>
    <div class="compare-after reveal">
      <span class="label accent-bg">Agora</span>
      <h3>Automatizado com IA</h3>
      <ul>...</ul>
    </div>
  </div>
</section>
```
 
### Slide de Timeline
```html
<section class="slide slide-timeline">
  <h2 class="reveal">Nossa Jornada</h2>
  <div class="timeline">
    <div class="timeline-item reveal" style="--i:0">
      <span class="year">2022</span>
      <span class="event">Lançamento da plataforma</span>
    </div>
    <!-- mais itens -->
  </div>
</section>
```
 
### Slide de Cards (3 colunas)
```html
<section class="slide slide-cards">
  <h2 class="reveal">Três Pilares</h2>
  <div class="cards-grid">
    <div class="card reveal" style="--delay:0.1s">...</div>
    <div class="card reveal" style="--delay:0.2s">...</div>
    <div class="card reveal" style="--delay:0.3s">...</div>
  </div>
</section>
```
 
### Slide Divisor / Transição
```html
<section class="slide slide-divider">
  <div class="divider-content reveal">
    <span class="section-number accent">02</span>
    <h2>Resultados</h2>
    <div class="accent-line"></div>
  </div>
</section>
```
 
---
 
## Phase 6: UI Overlay (Padrão)
 
Sempre inclua na apresentação:
 
```css
/* Contador de slides */
#slide-counter {
  position: fixed; bottom: 24px; left: 32px;
  font-size: 0.75rem; font-weight: 600;
  color: rgba(255,255,255,0.5);
  z-index: 100; letter-spacing: 0.1em;
  mix-blend-mode: difference;
}
 
/* Dots de navegação */
#progress-dots {
  position: fixed; right: 24px; top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 8px;
  z-index: 100;
}
 
#progress-dots button {
  width: 6px; height: 6px;
  border-radius: 50%; border: none;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: all 0.25s var(--ease-itau);
}
 
#progress-dots button.active {
  background: #FF6200;
  transform: scale(1.5);
}
 
/* Hint de navegação (some após 3s) */
#nav-hint {
  position: fixed; bottom: 24px; right: 32px;
  font-size: 0.7rem; color: rgba(255,255,255,0.4);
  z-index: 100; letter-spacing: 0.05em;
  mix-blend-mode: difference;
  animation: fadeHint 3s ease 2s forwards;
}
 
@keyframes fadeHint {
  to { opacity: 0; pointer-events: none; }
}
```
 
---
 
## Checklist de Entrega
 
Antes de entregar, valide:
 
- [ ] Nenhum slide ultrapassa 100vh — zero scroll nativo
- [ ] Todas as combinações de cores seguem as regras WCAG do Itaú
- [ ] Botão CTA usa `#FF6200` com texto `#000D3C` (nunca branco)
- [ ] Logo correto para o fundo (branco sobre azul, laranja sobre branco)
- [ ] Keyboard navigation funcionando (← →, space)
- [ ] Touch/swipe funcionando em mobile
- [ ] `.reveal` animações disparando ao entrar no slide
- [ ] Nenhum uso de Inter ou Roboto como fonte display
- [ ] `prefers-reduced-motion` respeitado
- [ ] A apresentação seria reconhecível como "Itaú" sem o logo visível
---
 
## Erros Comuns — Nunca Faça
 
| ❌ Errado | ✅ Correto |
|-----------|-----------|
| `scroll-snap` para navegar | JS controller com `.active/.prev/.next` |
| `overflow: auto` em slides | `overflow: hidden` sempre |
| Branco sobre laranja | Azul escuro ou preto sobre laranja |
| Laranja sobre azul vibrante | Nunca esta combinação |
| Inter como fonte de título | DM Sans, Plus Jakarta Sans, Sora |
| `min-height: 100vh` sem controle | `height: 100vh` + `overflow: hidden` |
| Purple/violet gradients | Azul `#000D3C` + laranja `#FF6200` |
| Animações excessivas/distrativas | Motion funcional, no máximo stagger 4 elementos |
 
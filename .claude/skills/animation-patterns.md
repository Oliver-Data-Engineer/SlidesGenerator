# Padrões de Animação — Itaú Empresas

Referência de animações CSS/JS para apresentações. Combine o feeling da apresentação com os efeitos abaixo. **Use sempre a paleta da marca Itaú Empresas.**

---

## Guia Feeling × Animação

| Feeling | Animações | Pistas Visuais |
|---------|-----------|----------------|
| **Executivo / Confiante** | Fade rápido (200–300ms), slides limpos sem excessos | Azul escuro #1F3B6B, espaço em branco, tipografia sólida |
| **Impactante / Moderno** | Fade + slide-up (0.6s), scale-in nos stats | Laranja #EC7000, grandes números, contraste alto |
| **Técnico / Preciso** | Stagger sequencial, border reveals, código | Azul escuro + mono, grid, linhas de separação |
| **Dinâmico / Energético** | Slide-left nos bullets, counters animados | Split panels, badges laranjas, motion nos números |
| **Editorial / Relatório** | Slow fade (0.8–1s), deslocamento suave | Alta hierarquia tipográfica, pull quotes, regras |
| **Calmo / Institucional** | Muito sutil, fades lentos | Branco dominante, muito espaço, serif elegante |

---

## Animações de Entrada

```css
/* === FADE + SLIDE UP — mais versátil, tom executivo === */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s var(--ease-out-expo),
                transform 0.6s var(--ease-out-expo);
}
.slide.visible .reveal {
    opacity: 1;
    transform: translateY(0);
}

/* === SCALE IN — para stats e números grandes === */
.reveal-scale {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s var(--ease-out-expo),
                transform 0.6s var(--ease-out-expo);
}
.slide.visible .reveal-scale {
    opacity: 1;
    transform: scale(1);
}

/* === SLIDE FROM LEFT — para bullets sequenciais === */
.reveal-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.5s var(--ease-out-expo),
                transform 0.5s var(--ease-out-expo);
}
.slide.visible .reveal-left {
    opacity: 1;
    transform: translateX(0);
}

/* === BLUR IN — para slides de seção de impacto === */
.reveal-blur {
    opacity: 0;
    filter: blur(8px);
    transition: opacity 0.8s var(--ease-out-expo),
                filter 0.8s var(--ease-out-expo);
}
.slide.visible .reveal-blur {
    opacity: 1;
    filter: blur(0);
}

/* === STAGGER — delays sequenciais para listas === */
.reveal:nth-child(1) { transition-delay: 0.05s; }
.reveal:nth-child(2) { transition-delay: 0.15s; }
.reveal:nth-child(3) { transition-delay: 0.25s; }
.reveal:nth-child(4) { transition-delay: 0.35s; }
.reveal:nth-child(5) { transition-delay: 0.45s; }
.reveal:nth-child(6) { transition-delay: 0.55s; }
```

---

## Efeitos de Fundo

```css
/* === GRADIENT MESH — profundidade nos slides escuros === */
/* Use com var(--secondary) = #1F3B6B como base */
.gradient-bg-dark {
    background:
        radial-gradient(ellipse at 15% 85%, rgba(236, 112, 0, 0.12) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 15%, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
        #1F3B6B;
}

/* === GRADIENT MESH — slides de seção laranja === */
.gradient-bg-orange {
    background:
        radial-gradient(ellipse at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 20% 80%, rgba(31, 59, 107, 0.15) 0%, transparent 50%),
        #EC7000;
}

/* === GRID PATTERN — slides técnicos === */
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
}

/* === NOISE TEXTURE — slides premium/editoriais === */
.noise-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.4;
}

/* === ACCENT LINE — barra laranja de destaque === */
.accent-line {
    width: clamp(40px, 5vw, 64px);
    height: 4px;
    background: #EC7000;
    margin-bottom: clamp(16px, 2vw, 32px);
}
```

---

## Animações de Número / Contador

```javascript
/* === COUNTER ANIMATION — para slides de métricas === */
function animateCounter(element, target, duration = 1200, prefix = '', suffix = '') {
    const start = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startValue + (target - startValue) * eased);
        element.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

/* Uso: quando o slide fica visível, dispare os counters */
/* <span class="counter" data-target="32" data-suffix="%">0%</span> */
document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    animateCounter(el, target, 1200, prefix, suffix);
});
```

---

## Efeito 3D Tilt nos Cards

```javascript
/* === 3D TILT — profundidade em cards/painéis === */
class TiltEffect {
    constructor(element, maxDeg = 8) {
        this.element = element;
        this.maxDeg = maxDeg;
        element.style.transformStyle = 'preserve-3d';
        element.style.transition = 'transform 0.15s ease-out';

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            element.style.transform =
                `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }
}

/* Aplicar em todos os cards com a classe .tilt */
document.querySelectorAll('.tilt').forEach(el => new TiltEffect(el));
```

---

## Keyframes CSS Reutilizáveis

```css
/* === EASE CURVES === */
:root {
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
    --duration-fast: 0.25s;
    --duration-normal: 0.5s;
    --duration-slow: 0.8s;
}

/* === PULSE — destaque em CTAs === */
@keyframes pulse-orange {
    0%, 100% { box-shadow: 0 0 0 0 rgba(236, 112, 0, 0.4); }
    50%       { box-shadow: 0 0 0 12px rgba(236, 112, 0, 0); }
}

/* === SLIDE-IN BORDER — revelação de linha decorativa === */
@keyframes border-grow {
    from { width: 0; }
    to   { width: 100%; }
}

/* === FLOAT — elementos decorativos flutuantes === */
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
}

/* === GRADIENT SHIFT — fundos vivos === */
@keyframes gradient-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Animações não disparam | Verificar se `IntersectionObserver` está rodando e adicionando `.visible` |
| Scroll snap não funciona | Garantir `scroll-snap-type: y mandatory` no `html` e `scroll-snap-align: start` em cada `.slide` |
| `-clamp()` não funciona | Usar `calc(-1 * clamp(...))` — o browser ignora silenciosamente o `-` antes de funções CSS |
| Mobile com problemas | Reduzir efeitos em `@media (max-width: 768px)`; testar touch events |
| Performance ruim | Usar `will-change: transform` só onde necessário; prefer `transform`/`opacity` para animar |
| Fontes não carregam | Checar URL do Google Fonts; garantir que o nome da fonte no CSS coincide exatamente |

# SlidesGenerator

Gerador de apresentações HTML para a marca **Itaú Empresas**. Um arquivo `.html` que abre em qualquer browser — sem npm, sem build, sem dependências de runtime.

Dois modos de uso: **Skill para o Claude Code** (`/frontend-slides-pt`) ou **app React** com galeria de 32 templates.

---

## Get started

### Com Claude Code (recomendado)

Clone o repositório dentro de um projeto Claude Code e use o slash command:

```bash
git clone https://github.com/Oliver-Data-Engineer/SlidesGenerator
cd SlidesGenerator
npm install
```

No Claude Code:

```
/frontend-slides-pt Crie uma apresentação sobre crédito PME, 10 slides, tema executivo
```

A Skill lê o guia de marca, gera previews dos 8 estilos disponíveis e entrega o HTML completo pronto para apresentar.

### Como app React (galeria de templates)

```bash
npm install
npm run dev
# → http://localhost:5173
```

Galeria dos 32 templates com wizard de customização.

### Compartilhar e exportar

```bash
# Deploy para URL pública (Vercel — funciona em qualquer dispositivo)
bash scripts/deploy.sh ./minha-apresentacao.html

# Exportar como PDF (requer Node.js)
bash scripts/export-pdf.sh ./minha-apresentacao.html

# Converter um arquivo .pptx para HTML (requer Python + python-pptx)
python scripts/extract-pptx.py ./deck.pptx ./output/
```

---

## Presets Itaú Empresas

A Skill gera apresentações em 8 presets visuais fiéis à marca. Abra qualquer arquivo em `public/itau-presets/` no browser para ver uma prévia animada.

> Para regenerar os screenshots: `bash scripts/screenshot-presets.sh`

### [Itaú Escuro](./public/itau-presets/01-itau-escuro.html)

<p><img src="public/itau-presets/screenshots/01-itau-escuro.png" width="100%" alt="Itaú Escuro"></p>

> Executivo, premium, institucional. Fundo azul `#1F3B6B`, destaque laranja.

### [Itaú Claro](./public/itau-presets/02-itau-claro.html)

<p><img src="public/itau-presets/screenshots/02-itau-claro.png" width="100%" alt="Itaú Claro"></p>

> Transparente, acessível, corporativo limpo. Fundo branco, acentos laranja e azul.

### [Itaú Split](./public/itau-presets/03-itau-split.html)

<p><img src="public/itau-presets/screenshots/03-itau-split.png" width="100%" alt="Itaú Split"></p>

> Moderno, dinâmico. Painel azul (30%) + branco (70%), ideal para pitch decks.

### [Itaú Laranja](./public/itau-presets/04-itau-laranja.html)

<p><img src="public/itau-presets/screenshots/04-itau-laranja.png" width="100%" alt="Itaú Laranja"></p>

> Alta energia, impactante. Fundo `#EC7000` — para seções de destaque e CTAs.

### [Itaú Tech](./public/itau-presets/05-itau-tech.html)

<p><img src="public/itau-presets/screenshots/05-itau-tech.png" width="100%" alt="Itaú Tech"></p>

> Técnico, preciso. Fundo `#0f1e38` com grid pattern — para dados, APIs e código.

### [Itaú Editorial](./public/itau-presets/06-itau-editorial.html)

<p><img src="public/itau-presets/screenshots/06-itau-editorial.png" width="100%" alt="Itaú Editorial"></p>

> Relatórios premium. Hierarquia tipográfica forte, pull quotes e regras editoriais.

### [Bold Signal](./public/itau-presets/07-bold-signal.html)

<p><img src="public/itau-presets/screenshots/07-bold-signal.png" width="100%" alt="Bold Signal"></p>

> Criativo, alto impacto. Card laranja em destaque sobre fundo escuro `#1A1A1A`.

### [Swiss Modern](./public/itau-presets/08-swiss-modern.html)

<p><img src="public/itau-presets/screenshots/08-swiss-modern.png" width="100%" alt="Swiss Modern"></p>

> Clean, minimalista, inspiração Bauhaus. Branco + preto + laranja Itaú.

---

## O que está incluído

| | |
|--|--|
| **8 presets visuais** | Marca Itaú Empresas, prontos para uso |
| **Skill Claude Code** | `/frontend-slides-pt` — gera slides a partir de um prompt |
| **Guia de marca** | `src/brand/` — cores, tipografia, logos, voz e tom em Markdown |
| **32 templates adaptados** | beautiful-html-templates com paleta Itaú (`samples/`) |
| **Scripts prontos** | deploy, PDF, extração de PPTX, screenshots, adaptação de templates |
| **Exemplo gerado** | `examples/skill-star/apresentacao.html` — 16 slides com metodologia STAR |

Para regenerar as amostras adaptadas:

```bash
python scripts/adapt-templates.py              # adapta os 32 templates → samples/
python scripts/screenshot-presets.py --samples # captura screenshots 1920×1080
```

---

## Requisitos

- **Node.js 18+** — app React + scripts de deploy e PDF
- **Python 3.8+** — apenas para `scripts/extract-pptx.py` (requer `pip install python-pptx`)

---

## Galeria de Templates — com Paleta Itau


32 templates da biblioteca [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates), adaptados com a paleta de cores e tipografia Itau Empresas. Abra qualquer arquivo em `samples/[slug]/itau-[slug].html` para ver a versao adaptada.

### [8-Bit Orbit](./samples/8-bit-orbit/itau-8-bit-orbit.html)

<p><img src="samples/8-bit-orbit/screenshot.png" width="100%" alt="8-Bit Orbit com paleta Itau"></p>

> Pixel-art neon arcade aesthetic on a deep navy void.

### [Biennale Yellow](./samples/biennale-yellow/itau-biennale-yellow.html)

<p><img src="samples/biennale-yellow/screenshot.png" width="100%" alt="Biennale Yellow com paleta Itau"></p>

> Solar yellow on warm parchment with deep indigo serif and atmospheric sun-glow gradients.

### [BlockFrame](./samples/block-frame/itau-block-frame.html)

<p><img src="samples/block-frame/screenshot.png" width="100%" alt="BlockFrame com paleta Itau"></p>

> Neobrutalist deck with pastel-neon color blocks and chunky black borders.

### [Blue Professional](./samples/blue-professional/itau-blue-professional.html)

<p><img src="samples/blue-professional/screenshot.png" width="100%" alt="Blue Professional com paleta Itau"></p>

> Cream paper background with electric cobalt blue accents; clean modern professional.

### [Bold Poster](./samples/bold-poster/itau-bold-poster.html)

<p><img src="samples/bold-poster/screenshot.png" width="100%" alt="Bold Poster com paleta Itau"></p>

> Editorial poster aesthetic with massive Shrikhand display and a single fire-engine red accent.

### [Broadside](./samples/broadside/itau-broadside.html)

<p><img src="samples/broadside/screenshot.png" width="100%" alt="Broadside com paleta Itau"></p>

> Dark editorial canvas with a single fire orange accent and bilingual Latin/Chinese type stack.

### [Capsule](./samples/capsule/itau-capsule.html)

<p><img src="samples/capsule/screenshot.png" width="100%" alt="Capsule com paleta Itau"></p>

> Modular pill-shaped cards on warm bone with a full pastel-pop palette.

### [Cartesian](./samples/cartesian/itau-cartesian.html)

<p><img src="samples/cartesian/screenshot.png" width="100%" alt="Cartesian com paleta Itau"></p>

> Quiet warm-neutral palette with classical Playfair serifs; tasteful and unhurried.

### [Cobalt Grid](./samples/cobalt-grid/itau-cobalt-grid.html)

<p><img src="samples/cobalt-grid/screenshot.png" width="100%" alt="Cobalt Grid com paleta Itau"></p>

> Electric cobalt italic serifs on a graph-paper canvas, anchored by stair-stepped pixel-glitch decorations and slim hairline rules.

### [Coral](./samples/coral/itau-coral.html)

<p><img src="samples/coral/screenshot.png" width="100%" alt="Coral com paleta Itau"></p>

> Cream and coral on near-black, set in oversized Bebas Neue.

### [Creative Mode](./samples/creative-mode/itau-creative-mode.html)

<p><img src="samples/creative-mode/screenshot.png" width="100%" alt="Creative Mode com paleta Itau"></p>

> Cream paper canvas with confident multi-color (green, pink, orange, yellow) accents and Archivo Black display.

### [Daisy Days](./samples/daisy-days/itau-daisy-days.html)

<p><img src="samples/daisy-days/screenshot.png" width="100%" alt="Daisy Days com paleta Itau"></p>

> Cheerful pastel deck with hand-drawn daisies, stars, and rainbows. Friendly, soft, and warm.

### [Editorial Tri-Tone](./samples/editorial-tri-tone/itau-editorial-tri-tone.html)

<p><img src="samples/editorial-tri-tone/screenshot.png" width="100%" alt="Editorial Tri-Tone com paleta Itau"></p>

> Three-color editorial system: dusty pink, mustard cream, and deep burgundy, set in Bricolage + Instrument Serif.

### [Grove](./samples/grove/itau-grove.html)

<p><img src="samples/grove/screenshot.png" width="100%" alt="Grove com paleta Itau"></p>

> Forest-green canvas with cream type, classical Playfair serifs, and a single rust accent.

### [Long Table](./samples/long-table/itau-long-table.html)

<p><img src="samples/long-table/screenshot.png" width="100%" alt="Long Table com paleta Itau"></p>

> Warm cream and rust-red supper-club aesthetic with bold uppercase grotesk headlines, italic Fraunces, and pill-shaped outlined buttons.

### [Mat](./samples/mat/itau-mat.html)

<p><img src="samples/mat/screenshot.png" width="100%" alt="Mat com paleta Itau"></p>

> Dark sage canvas with bone paper and burnt-orange accent; mid-century modern with wood undertones.

### [Monochrome](./samples/monochrome/itau-monochrome.html)

<p><img src="samples/monochrome/screenshot.png" width="100%" alt="Monochrome com paleta Itau"></p>

> Ivory ledger paper with all-black type; Lora serif headlines, Jost body, no color at all.

### [Neo-Grid Bold](./samples/neo-grid-bold/itau-neo-grid-bold.html)

<p><img src="samples/neo-grid-bold/screenshot.png" width="100%" alt="Neo-Grid Bold com paleta Itau"></p>

> Editorial neo-brutalism with a single neon yellow accent on off-white paper.

### [People's Platform (Block & Bold)](./samples/peoples-platform/itau-peoples-platform.html)

<p><img src="samples/peoples-platform/screenshot.png" width="100%" alt="People's Platform (Block & Bold) com paleta Itau"></p>

> Activist poster energy: blue, orange, red on cream, with Alfa Slab + Caveat Brush.

### [Pin & Paper](./samples/pin-and-paper/itau-pin-and-paper.html)

<p><img src="samples/pin-and-paper/screenshot.png" width="100%" alt="Pin & Paper com paleta Itau"></p>

> Yellow paper with safety-pin illustrations, ink-blue handwritten Caveat, paper-grain texture.

### [Pink Script — After Hours](./samples/pink-script/itau-pink-script.html)

<p><img src="samples/pink-script/screenshot.png" width="100%" alt="Pink Script — After Hours com paleta Itau"></p>

> Black canvas, hot pink accent, pearl-cream paper, Instrument Serif headlines: late-night editorial luxury.

### [Playful](./samples/playful/itau-playful.html)

<p><img src="samples/playful/screenshot.png" width="100%" alt="Playful com paleta Itau"></p>

> Sun-warm peach background with Syne display: a friendly indie launch deck.

### [Raw Grid](./samples/raw-grid/itau-raw-grid.html)

<p><img src="samples/raw-grid/screenshot.png" width="100%" alt="Raw Grid com paleta Itau"></p>

> Neo-brutalist deck with thick borders, offset shadows, and a pink/sage/ink palette.

### [Retro Windows](./samples/retro-windows/itau-retro-windows.html)

<p><img src="samples/retro-windows/screenshot.png" width="100%" alt="Retro Windows com paleta Itau"></p>

> Windows 95 chrome: gray title bars, MS Sans Serif, pixel typography, full nostalgia.

### [Retro Zine](./samples/retro-zine/itau-retro-zine.html)

<p><img src="samples/retro-zine/screenshot.png" width="100%" alt="Retro Zine com paleta Itau"></p>

> Beige paper with green accent and Bebas Neue + Caveat: a riso-printed zine in HTML form.

### [Sakura Chroma](./samples/sakura-chroma/itau-sakura-chroma.html)

<p><img src="samples/sakura-chroma/screenshot.png" width="100%" alt="Sakura Chroma com paleta Itau"></p>

> Vintage Japanese cassette-package aesthetic: cream paper, diagonal rainbow ribbons, condensed bold type, JIS-style spec checkboxes.

### [Scatterbrain](./samples/scatterbrain/itau-scatterbrain.html)

<p><img src="samples/scatterbrain/screenshot.png" width="100%" alt="Scatterbrain com paleta Itau"></p>

> Post-it inspired: pastel sticky notes, Caveat handwriting, Shrikhand and Zilla Slab type stack.

### [Signal](./samples/signal/itau-signal.html)

<p><img src="samples/signal/screenshot.png" width="100%" alt="Signal com paleta Itau"></p>

> Deep navy canvas with bone paper and a single muted-gold accent; institutional with quiet weight.

### [Soft Editorial](./samples/soft-editorial/itau-soft-editorial.html)

<p><img src="samples/soft-editorial/screenshot.png" width="100%" alt="Soft Editorial com paleta Itau"></p>

> Cormorant Garamond serif on warm paper with sage, blush, and lemon accents.

### [Stencil & Tablet](./samples/stencil-tablet/itau-stencil-tablet.html)

<p><img src="samples/stencil-tablet/screenshot.png" width="100%" alt="Stencil & Tablet com paleta Itau"></p>

> Bone paper with stencil-cut headlines and a six-color earth palette: archaeology meets brand.

### [Studio](./samples/studio/itau-studio.html)

<p><img src="samples/studio/screenshot.png" width="100%" alt="Studio com paleta Itau"></p>

> Black canvas with electric-yellow type; high-voltage design studio aesthetic.

### [Vellum](./samples/vellum/itau-vellum.html)

<p><img src="samples/vellum/screenshot.png" width="100%" alt="Vellum com paleta Itau"></p>

> Deep navy canvas with warm-yellow italic Cormorant serifs and a single dusty teal accent. A quiet, scholarly aesthetic.

---
## Licença

[MIT](./LICENSE)

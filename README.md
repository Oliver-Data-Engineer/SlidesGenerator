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

## Galeria de Templates — Paleta Itau Empresas

32 templates da biblioteca [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates), adaptados com cores e tipografia Itau Empresas.
Abra qualquer arquivo `samples/[slug]/itau-[slug].html` no browser para ver a versao interativa.

<table>
<tr>
<td align="center" width="33%">
<a href="./samples/8-bit-orbit/itau-8-bit-orbit.html"><img src="samples/8-bit-orbit/screenshot.png" width="100%" alt="8-Bit Orbit"></a>
<br><b>8-Bit Orbit</b>
<br><small>Pixel-art neon arcade aesthetic on a deep navy void.</small>
</td>
<td align="center" width="33%">
<a href="./samples/biennale-yellow/itau-biennale-yellow.html"><img src="samples/biennale-yellow/screenshot.png" width="100%" alt="Biennale Yellow"></a>
<br><b>Biennale Yellow</b>
<br><small>Solar yellow on warm parchment with deep indigo serif and atmospheric sun-glow g...</small>
</td>
<td align="center" width="33%">
<a href="./samples/block-frame/itau-block-frame.html"><img src="samples/block-frame/screenshot.png" width="100%" alt="BlockFrame"></a>
<br><b>BlockFrame</b>
<br><small>Neobrutalist deck with pastel-neon color blocks and chunky black borders.</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/blue-professional/itau-blue-professional.html"><img src="samples/blue-professional/screenshot.png" width="100%" alt="Blue Professional"></a>
<br><b>Blue Professional</b>
<br><small>Cream paper background with electric cobalt blue accents; clean modern professio...</small>
</td>
<td align="center" width="33%">
<a href="./samples/bold-poster/itau-bold-poster.html"><img src="samples/bold-poster/screenshot.png" width="100%" alt="Bold Poster"></a>
<br><b>Bold Poster</b>
<br><small>Editorial poster aesthetic with massive Shrikhand display and a single fire-engi...</small>
</td>
<td align="center" width="33%">
<a href="./samples/broadside/itau-broadside.html"><img src="samples/broadside/screenshot.png" width="100%" alt="Broadside"></a>
<br><b>Broadside</b>
<br><small>Dark editorial canvas with a single fire orange accent and bilingual Latin/Chine...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/capsule/itau-capsule.html"><img src="samples/capsule/screenshot.png" width="100%" alt="Capsule"></a>
<br><b>Capsule</b>
<br><small>Modular pill-shaped cards on warm bone with a full pastel-pop palette.</small>
</td>
<td align="center" width="33%">
<a href="./samples/cartesian/itau-cartesian.html"><img src="samples/cartesian/screenshot.png" width="100%" alt="Cartesian"></a>
<br><b>Cartesian</b>
<br><small>Quiet warm-neutral palette with classical Playfair serifs; tasteful and unhurrie...</small>
</td>
<td align="center" width="33%">
<a href="./samples/cobalt-grid/itau-cobalt-grid.html"><img src="samples/cobalt-grid/screenshot.png" width="100%" alt="Cobalt Grid"></a>
<br><b>Cobalt Grid</b>
<br><small>Electric cobalt italic serifs on a graph-paper canvas, anchored by stair-stepped...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/coral/itau-coral.html"><img src="samples/coral/screenshot.png" width="100%" alt="Coral"></a>
<br><b>Coral</b>
<br><small>Cream and coral on near-black, set in oversized Bebas Neue.</small>
</td>
<td align="center" width="33%">
<a href="./samples/creative-mode/itau-creative-mode.html"><img src="samples/creative-mode/screenshot.png" width="100%" alt="Creative Mode"></a>
<br><b>Creative Mode</b>
<br><small>Cream paper canvas with confident multi-color (green, pink, orange, yellow) acce...</small>
</td>
<td align="center" width="33%">
<a href="./samples/daisy-days/itau-daisy-days.html"><img src="samples/daisy-days/screenshot.png" width="100%" alt="Daisy Days"></a>
<br><b>Daisy Days</b>
<br><small>Cheerful pastel deck with hand-drawn daisies, stars, and rainbows. Friendly, sof...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/editorial-tri-tone/itau-editorial-tri-tone.html"><img src="samples/editorial-tri-tone/screenshot.png" width="100%" alt="Editorial Tri-Tone"></a>
<br><b>Editorial Tri-Tone</b>
<br><small>Three-color editorial system: dusty pink, mustard cream, and deep burgundy, set ...</small>
</td>
<td align="center" width="33%">
<a href="./samples/grove/itau-grove.html"><img src="samples/grove/screenshot.png" width="100%" alt="Grove"></a>
<br><b>Grove</b>
<br><small>Forest-green canvas with cream type, classical Playfair serifs, and a single rus...</small>
</td>
<td align="center" width="33%">
<a href="./samples/long-table/itau-long-table.html"><img src="samples/long-table/screenshot.png" width="100%" alt="Long Table"></a>
<br><b>Long Table</b>
<br><small>Warm cream and rust-red supper-club aesthetic with bold uppercase grotesk headli...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/mat/itau-mat.html"><img src="samples/mat/screenshot.png" width="100%" alt="Mat"></a>
<br><b>Mat</b>
<br><small>Dark sage canvas with bone paper and burnt-orange accent; mid-century modern wit...</small>
</td>
<td align="center" width="33%">
<a href="./samples/monochrome/itau-monochrome.html"><img src="samples/monochrome/screenshot.png" width="100%" alt="Monochrome"></a>
<br><b>Monochrome</b>
<br><small>Ivory ledger paper with all-black type; Lora serif headlines, Jost body, no colo...</small>
</td>
<td align="center" width="33%">
<a href="./samples/neo-grid-bold/itau-neo-grid-bold.html"><img src="samples/neo-grid-bold/screenshot.png" width="100%" alt="Neo-Grid Bold"></a>
<br><b>Neo-Grid Bold</b>
<br><small>Editorial neo-brutalism with a single neon yellow accent on off-white paper.</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/peoples-platform/itau-peoples-platform.html"><img src="samples/peoples-platform/screenshot.png" width="100%" alt="People's Platform (Block & Bold)"></a>
<br><b>People's Platform (Block & Bold)</b>
<br><small>Activist poster energy: blue, orange, red on cream, with Alfa Slab + Caveat Brus...</small>
</td>
<td align="center" width="33%">
<a href="./samples/pin-and-paper/itau-pin-and-paper.html"><img src="samples/pin-and-paper/screenshot.png" width="100%" alt="Pin & Paper"></a>
<br><b>Pin & Paper</b>
<br><small>Yellow paper with safety-pin illustrations, ink-blue handwritten Caveat, paper-g...</small>
</td>
<td align="center" width="33%">
<a href="./samples/pink-script/itau-pink-script.html"><img src="samples/pink-script/screenshot.png" width="100%" alt="Pink Script — After Hours"></a>
<br><b>Pink Script — After Hours</b>
<br><small>Black canvas, hot pink accent, pearl-cream paper, Instrument Serif headlines: la...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/playful/itau-playful.html"><img src="samples/playful/screenshot.png" width="100%" alt="Playful"></a>
<br><b>Playful</b>
<br><small>Sun-warm peach background with Syne display: a friendly indie launch deck.</small>
</td>
<td align="center" width="33%">
<a href="./samples/raw-grid/itau-raw-grid.html"><img src="samples/raw-grid/screenshot.png" width="100%" alt="Raw Grid"></a>
<br><b>Raw Grid</b>
<br><small>Neo-brutalist deck with thick borders, offset shadows, and a pink/sage/ink palet...</small>
</td>
<td align="center" width="33%">
<a href="./samples/retro-windows/itau-retro-windows.html"><img src="samples/retro-windows/screenshot.png" width="100%" alt="Retro Windows"></a>
<br><b>Retro Windows</b>
<br><small>Windows 95 chrome: gray title bars, MS Sans Serif, pixel typography, full nostal...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/retro-zine/itau-retro-zine.html"><img src="samples/retro-zine/screenshot.png" width="100%" alt="Retro Zine"></a>
<br><b>Retro Zine</b>
<br><small>Beige paper with green accent and Bebas Neue + Caveat: a riso-printed zine in HT...</small>
</td>
<td align="center" width="33%">
<a href="./samples/sakura-chroma/itau-sakura-chroma.html"><img src="samples/sakura-chroma/screenshot.png" width="100%" alt="Sakura Chroma"></a>
<br><b>Sakura Chroma</b>
<br><small>Vintage Japanese cassette-package aesthetic: cream paper, diagonal rainbow ribbo...</small>
</td>
<td align="center" width="33%">
<a href="./samples/scatterbrain/itau-scatterbrain.html"><img src="samples/scatterbrain/screenshot.png" width="100%" alt="Scatterbrain"></a>
<br><b>Scatterbrain</b>
<br><small>Post-it inspired: pastel sticky notes, Caveat handwriting, Shrikhand and Zilla S...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/signal/itau-signal.html"><img src="samples/signal/screenshot.png" width="100%" alt="Signal"></a>
<br><b>Signal</b>
<br><small>Deep navy canvas with bone paper and a single muted-gold accent; institutional w...</small>
</td>
<td align="center" width="33%">
<a href="./samples/soft-editorial/itau-soft-editorial.html"><img src="samples/soft-editorial/screenshot.png" width="100%" alt="Soft Editorial"></a>
<br><b>Soft Editorial</b>
<br><small>Cormorant Garamond serif on warm paper with sage, blush, and lemon accents.</small>
</td>
<td align="center" width="33%">
<a href="./samples/stencil-tablet/itau-stencil-tablet.html"><img src="samples/stencil-tablet/screenshot.png" width="100%" alt="Stencil & Tablet"></a>
<br><b>Stencil & Tablet</b>
<br><small>Bone paper with stencil-cut headlines and a six-color earth palette: archaeology...</small>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="./samples/studio/itau-studio.html"><img src="samples/studio/screenshot.png" width="100%" alt="Studio"></a>
<br><b>Studio</b>
<br><small>Black canvas with electric-yellow type; high-voltage design studio aesthetic.</small>
</td>
<td align="center" width="33%">
<a href="./samples/vellum/itau-vellum.html"><img src="samples/vellum/screenshot.png" width="100%" alt="Vellum"></a>
<br><b>Vellum</b>
<br><small>Deep navy canvas with warm-yellow italic Cormorant serifs and a single dusty tea...</small>
</td>
<td width="33%"></td>
</tr>
</table>

---
## Licença

[MIT](./LICENSE)

# SlidesGenerator

Gerador de apresentações HTML para a marca **Itaú Empresas**. Um arquivo `.html` que abre em qualquer browser — sem npm, sem build, sem dependências de runtime.

Dois modos de uso: **Skill para o Claude Code** (`/frontend-slides-pt`) ou **app React** com galeria de 32 templates.

---

## Get started

### Com Claude Code (recomendado)

Clone o repositório dentro de um projeto Claude Code e use o slash command:

```bash
git clone https://github.com/SEU_USER/SlidesGenerator
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
| **32 templates base** | Biblioteca `beautiful-html-templates` (app React) |
| **Scripts prontos** | deploy, PDF, extração de PPTX, screenshots |
| **Exemplo gerado** | `examples/skill-star/apresentacao.html` — 16 slides com metodologia STAR |

---

## Requisitos

- **Node.js 18+** — app React + scripts de deploy e PDF
- **Python 3.8+** — apenas para `scripts/extract-pptx.py` (requer `pip install python-pptx`)

---

## Galeria de Templates Base

32 templates HTML da biblioteca [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates), disponíveis no app React.

### [Soft Editorial](./public/templates/soft-editorial/)

<p>
  <img src="public/screenshots/soft-editorial-4.png" width="32.5%" alt="Soft Editorial — slide 4">
  <img src="public/screenshots/soft-editorial-6.png" width="32.5%" alt="Soft Editorial — slide 6">
  <img src="public/screenshots/soft-editorial-10.png" width="32.5%" alt="Soft Editorial — slide 10">
</p>

> Cormorant Garamond serif em papel quente com acentos sage, blush e limão.

### [Stencil & Tablet](./public/templates/stencil-tablet/)

<p>
  <img src="public/screenshots/stencil-tablet-1.png" width="32.5%" alt="Stencil & Tablet — slide 1">
  <img src="public/screenshots/stencil-tablet-3.png" width="32.5%" alt="Stencil & Tablet — slide 3">
  <img src="public/screenshots/stencil-tablet-8.png" width="32.5%" alt="Stencil & Tablet — slide 8">
</p>

> Papel bone com títulos em stencil e paleta de seis tons terrosos: arqueologia meets marca.

### [Vellum](./public/templates/vellum/)

<p>
  <img src="public/screenshots/vellum-1.png" width="32.5%" alt="Vellum — slide 1">
  <img src="public/screenshots/vellum-4.png" width="32.5%" alt="Vellum — slide 4">
  <img src="public/screenshots/vellum-8.png" width="32.5%" alt="Vellum — slide 8">
</p>

> Fundo azul profundo com Cormorant itálico amarelo-quente e único acento azul-empoeirado.

### [Neo-Grid Bold](./public/templates/neo-grid-bold/)

<p>
  <img src="public/screenshots/neo-grid-bold-1.png" width="32.5%" alt="Neo-Grid Bold — slide 1">
  <img src="public/screenshots/neo-grid-bold-3.png" width="32.5%" alt="Neo-Grid Bold — slide 3">
  <img src="public/screenshots/neo-grid-bold-8.png" width="32.5%" alt="Neo-Grid Bold — slide 8">
</p>

> Neo-brutalismo editorial com único acento amarelo neon em papel off-white.

### [Editorial Tri-Tone](./public/templates/editorial-tri-tone/)

<p>
  <img src="public/screenshots/editorial-tri-tone-1.png" width="32.5%" alt="Editorial Tri-Tone — slide 1">
  <img src="public/screenshots/editorial-tri-tone-4.png" width="32.5%" alt="Editorial Tri-Tone — slide 4">
  <img src="public/screenshots/editorial-tri-tone-3.png" width="32.5%" alt="Editorial Tri-Tone — slide 3">
</p>

> Sistema editorial tri-cromático: rosa empoeirado, mostarda creme e bordô, em Bricolage + Instrument Serif.

### [Creative Mode](./public/templates/creative-mode/)

<p>
  <img src="public/screenshots/creative-mode-1.png" width="32.5%" alt="Creative Mode — slide 1">
  <img src="public/screenshots/creative-mode-4.png" width="32.5%" alt="Creative Mode — slide 4">
  <img src="public/screenshots/creative-mode-6.png" width="32.5%" alt="Creative Mode — slide 6">
</p>

> Tela creme com acentos multicoloridos confiantes (verde, rosa, laranja, amarelo) e Archivo Black.

### [Monochrome](./public/templates/monochrome/)

<p>
  <img src="public/screenshots/monochrome-1.png" width="32.5%" alt="Monochrome — slide 1">
  <img src="public/screenshots/monochrome-4.png" width="32.5%" alt="Monochrome — slide 4">
  <img src="public/screenshots/monochrome-12.png" width="32.5%" alt="Monochrome — slide 12">
</p>

> Papel creme com tipo all-black; Lora serif nos títulos, Jost no corpo, zero cor.

### [People's Platform](./public/templates/peoples-platform/)

<p>
  <img src="public/screenshots/peoples-platform-1.png" width="32.5%" alt="People's Platform — slide 1">
  <img src="public/screenshots/peoples-platform-4.png" width="32.5%" alt="People's Platform — slide 4">
  <img src="public/screenshots/peoples-platform-8.png" width="32.5%" alt="People's Platform — slide 8">
</p>

> Energia de pôster ativista: azul, laranja e vermelho em creme, com Alfa Slab + Caveat Brush.

### [Pink Script — After Hours](./public/templates/pink-script/)

<p>
  <img src="public/screenshots/pink-script-1.png" width="32.5%" alt="Pink Script — slide 1">
  <img src="public/screenshots/pink-script-4.png" width="32.5%" alt="Pink Script — slide 4">
  <img src="public/screenshots/pink-script-8.png" width="32.5%" alt="Pink Script — slide 8">
</p>

> Fundo preto, acento rosa quente, papel pérola, Instrument Serif: luxo editorial noturno.

### [8-Bit Orbit](./public/templates/8-bit-orbit/)

<p>
  <img src="public/screenshots/8-bit-orbit-1.png" width="32.5%" alt="8-Bit Orbit — slide 1">
  <img src="public/screenshots/8-bit-orbit-6.png" width="32.5%" alt="8-Bit Orbit — slide 6">
  <img src="public/screenshots/8-bit-orbit-5.png" width="32.5%" alt="8-Bit Orbit — slide 5">
</p>

> Estética arcade pixel-art neon sobre fundo azul profundo.

### [BlockFrame](./public/templates/block-frame/)

<p>
  <img src="public/screenshots/block-frame-1.png" width="32.5%" alt="BlockFrame — slide 1">
  <img src="public/screenshots/block-frame-4.png" width="32.5%" alt="BlockFrame — slide 4">
  <img src="public/screenshots/block-frame-8.png" width="32.5%" alt="BlockFrame — slide 8">
</p>

> Deck neo-brutalista com blocos de cores pastel-neon e bordas pretas espessas.

### [Blue Professional](./public/templates/blue-professional/)

<p>
  <img src="public/screenshots/blue-professional-1.png" width="32.5%" alt="Blue Professional — slide 1">
  <img src="public/screenshots/blue-professional-6.png" width="32.5%" alt="Blue Professional — slide 6">
  <img src="public/screenshots/blue-professional-8.png" width="32.5%" alt="Blue Professional — slide 8">
</p>

> Fundo creme com acentos azul-cobalto elétrico; moderno e profissional.

### [Bold Poster](./public/templates/bold-poster/)

<p>
  <img src="public/screenshots/bold-poster-1.png" width="32.5%" alt="Bold Poster — slide 1">
  <img src="public/screenshots/bold-poster-4.png" width="32.5%" alt="Bold Poster — slide 4">
  <img src="public/screenshots/bold-poster-8.png" width="32.5%" alt="Bold Poster — slide 8">
</p>

> Estética de pôster editorial com Shrikhand em display gigante e único acento vermelho.

### [Broadside](./public/templates/broadside/)

<p>
  <img src="public/screenshots/broadside-1.png" width="32.5%" alt="Broadside — slide 1">
  <img src="public/screenshots/broadside-4.png" width="32.5%" alt="Broadside — slide 4">
  <img src="public/screenshots/broadside-13.png" width="32.5%" alt="Broadside — slide 13">
</p>

> Tela editorial escura com único acento laranja fogo e stack tipográfico Latin/Chinês.

### [Capsule](./public/templates/capsule/)

<p>
  <img src="public/screenshots/capsule-1.png" width="32.5%" alt="Capsule — slide 1">
  <img src="public/screenshots/capsule-4.png" width="32.5%" alt="Capsule — slide 4">
  <img src="public/screenshots/capsule-8.png" width="32.5%" alt="Capsule — slide 8">
</p>

> Cards modulares em formato pílula sobre fundo bone quente com paleta pastel-pop completa.

### [Cartesian](./public/templates/cartesian/)

<p>
  <img src="public/screenshots/cartesian-1.png" width="32.5%" alt="Cartesian — slide 1">
  <img src="public/screenshots/cartesian-4.png" width="32.5%" alt="Cartesian — slide 4">
  <img src="public/screenshots/cartesian-8.png" width="32.5%" alt="Cartesian — slide 8">
</p>

> Paleta neutra-quente com serifas Playfair clássicas; discreto e sem pressa.

### [Coral](./public/templates/coral/)

<p>
  <img src="public/screenshots/coral-1.png" width="32.5%" alt="Coral — slide 1">
  <img src="public/screenshots/coral-4.png" width="32.5%" alt="Coral — slide 4">
  <img src="public/screenshots/coral-8.png" width="32.5%" alt="Coral — slide 8">
</p>

> Creme e coral sobre quase-preto, com Bebas Neue em tamanho gigante.

### [Daisy Days](./public/templates/daisy-days/)

<p>
  <img src="public/screenshots/daisy-days-1.png" width="32.5%" alt="Daisy Days — slide 1">
  <img src="public/screenshots/daisy-days-4.png" width="32.5%" alt="Daisy Days — slide 4">
  <img src="public/screenshots/daisy-days-8.png" width="32.5%" alt="Daisy Days — slide 8">
</p>

> Deck pastel alegre com margaridas, estrelas e arco-íris desenhados à mão. Amigável e caloroso.

### [Grove](./public/templates/grove/)

<p>
  <img src="public/screenshots/grove-1.png" width="32.5%" alt="Grove — slide 1">
  <img src="public/screenshots/grove-4.png" width="32.5%" alt="Grove — slide 4">
  <img src="public/screenshots/grove-8.png" width="32.5%" alt="Grove — slide 8">
</p>

> Tela verde-floresta com tipo creme, serifas Playfair clássicas e único acento ferrugem.

### [Mat](./public/templates/mat/)

<p>
  <img src="public/screenshots/mat-1.png" width="32.5%" alt="Mat — slide 1">
  <img src="public/screenshots/mat-4.png" width="32.5%" alt="Mat — slide 4">
  <img src="public/screenshots/mat-8.png" width="32.5%" alt="Mat — slide 8">
</p>

> Tela sálvia-escura com papel bone e acento laranja queimado; mid-century moderno.

### [Pin & Paper](./public/templates/pin-and-paper/)

<p>
  <img src="public/screenshots/pin-and-paper-1.png" width="32.5%" alt="Pin & Paper — slide 1">
  <img src="public/screenshots/pin-and-paper-11.png" width="32.5%" alt="Pin & Paper — slide 11">
  <img src="public/screenshots/pin-and-paper-3.png" width="32.5%" alt="Pin & Paper — slide 3">
</p>

> Papel amarelo com ilustrações de alfinetes, Caveat azul manuscrito e textura de grão de papel.

### [Playful](./public/templates/playful/)

<p>
  <img src="public/screenshots/playful-1.png" width="32.5%" alt="Playful — slide 1">
  <img src="public/screenshots/playful-6.png" width="32.5%" alt="Playful — slide 6">
  <img src="public/screenshots/playful-8.png" width="32.5%" alt="Playful — slide 8">
</p>

> Fundo pêssego-solar com Syne display: um deck indie de lançamento amigável.

### [Raw Grid](./public/templates/raw-grid/)

<p>
  <img src="public/screenshots/raw-grid-1.png" width="32.5%" alt="Raw Grid — slide 1">
  <img src="public/screenshots/raw-grid-4.png" width="32.5%" alt="Raw Grid — slide 4">
  <img src="public/screenshots/raw-grid-8.png" width="32.5%" alt="Raw Grid — slide 8">
</p>

> Deck neo-brutalista com bordas espessas, sombras offset e paleta rosa/sálvia/tinta.

### [Retro Windows](./public/templates/retro-windows/)

<p>
  <img src="public/screenshots/retro-windows-1.png" width="32.5%" alt="Retro Windows — slide 1">
  <img src="public/screenshots/retro-windows-4.png" width="32.5%" alt="Retro Windows — slide 4">
  <img src="public/screenshots/retro-windows-8.png" width="32.5%" alt="Retro Windows — slide 8">
</p>

> Chrome do Windows 95: barras de título cinza, MS Sans Serif, tipografia pixel — pura nostalgia.

### [Retro Zine](./public/templates/retro-zine/)

<p>
  <img src="public/screenshots/retro-zine-1.png" width="32.5%" alt="Retro Zine — slide 1">
  <img src="public/screenshots/retro-zine-4.png" width="32.5%" alt="Retro Zine — slide 4">
  <img src="public/screenshots/retro-zine-8.png" width="32.5%" alt="Retro Zine — slide 8">
</p>

> Papel bege com acento verde e Bebas Neue + Caveat: um zine riso-impresso em HTML.

### [Scatterbrain](./public/templates/scatterbrain/)

<p>
  <img src="public/screenshots/scatterbrain-1.png" width="32.5%" alt="Scatterbrain — slide 1">
  <img src="public/screenshots/scatterbrain-4.png" width="32.5%" alt="Scatterbrain — slide 4">
  <img src="public/screenshots/scatterbrain-8.png" width="32.5%" alt="Scatterbrain — slide 8">
</p>

> Inspirado em post-its: notas adesivas pastel, Caveat manuscrito, Shrikhand e Zilla Slab.

### [Signal](./public/templates/signal/)

<p>
  <img src="public/screenshots/signal-1.png" width="32.5%" alt="Signal — slide 1">
  <img src="public/screenshots/signal-18.png" width="32.5%" alt="Signal — slide 18">
  <img src="public/screenshots/signal-8.png" width="32.5%" alt="Signal — slide 8">
</p>

> Fundo azul-profundo com papel bone e único acento dourado-suave; institucional com peso silencioso.

### [Studio](./public/templates/studio/)

<p>
  <img src="public/screenshots/studio-1.png" width="32.5%" alt="Studio — slide 1">
  <img src="public/screenshots/studio-4.png" width="32.5%" alt="Studio — slide 4">
  <img src="public/screenshots/studio-8.png" width="32.5%" alt="Studio — slide 8">
</p>

> Fundo preto com tipo amarelo elétrico; estética de estúdio de design de alta voltagem.

### [Biennale Yellow](./public/templates/biennale-yellow/)

<p>
  <img src="public/screenshots/biennale-yellow-1.png" width="32.5%" alt="Biennale Yellow — slide 1">
  <img src="public/screenshots/biennale-yellow-5.png" width="32.5%" alt="Biennale Yellow — slide 5">
  <img src="public/screenshots/biennale-yellow-8.png" width="32.5%" alt="Biennale Yellow — slide 8">
</p>

> Amarelo solar em pergaminho quente com serifa índigo profunda e gradientes de brilho solar. Energia de pôster editorial holandês.

### [Sakura Chroma](./public/templates/sakura-chroma/)

<p>
  <img src="public/screenshots/sakura-chroma-1.png" width="32.5%" alt="Sakura Chroma — slide 1">
  <img src="public/screenshots/sakura-chroma-3.png" width="32.5%" alt="Sakura Chroma — slide 3">
  <img src="public/screenshots/sakura-chroma-4.png" width="32.5%" alt="Sakura Chroma — slide 4">
</p>

> Estética cassete japonesa vintage: papel creme, fitas diagonais arco-íris, tipo bold condensado, checkboxes estilo JIS.

### [Cobalt Grid](./public/templates/cobalt-grid/)

<p>
  <img src="public/screenshots/cobalt-grid-1.png" width="32.5%" alt="Cobalt Grid — slide 1">
  <img src="public/screenshots/cobalt-grid-3.png" width="32.5%" alt="Cobalt Grid — slide 3">
  <img src="public/screenshots/cobalt-grid-5.png" width="32.5%" alt="Cobalt Grid — slide 5">
</p>

> Serifas itálicas cobalto elétrico em tela de papel milimetrado, com decorações pixel-glitch em degraus.

### [Long Table](./public/templates/long-table/)

<p>
  <img src="public/screenshots/long-table-1.png" width="32.5%" alt="Long Table — slide 1">
  <img src="public/screenshots/long-table-3.png" width="32.5%" alt="Long Table — slide 3">
  <img src="public/screenshots/long-table-7.png" width="32.5%" alt="Long Table — slide 7">
</p>

> Estética de restaurante supper-club em creme e vermelho-ferrugem, com grotesk maiúsculo bold, Fraunces itálico e botões pill-shaped.

---

## Licença

[MIT](./LICENSE)

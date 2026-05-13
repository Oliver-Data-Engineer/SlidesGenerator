---
name: frontend-slides-pt
description: Gera apresentações HTML completas para a marca Itaú Empresas. Zero dependências, animações ricas, 100% fiel à marca. Use quando o usuário quiser criar slides, converter PPT, ou melhorar uma apresentação existente. Responde em português.
---

# Frontend Slides PT — Itaú Empresas

Cria apresentações HTML autocontidas, ricas em animações, fiéis à marca **Itaú Empresas**. Zero dependências de runtime — um arquivo `.html` que abre em qualquer browser.

---

## Princípios Fundamentais

1. **Zero dependências** — HTML único com CSS/JS inline. Sem npm, sem build tools.
2. **Mostrar, não perguntar** — Gere previews visuais, não escolhas abstratas.
3. **Design distinto** — Sem "AI slop" genérico. Cada apresentação deve parecer feita sob medida.
4. **Viewport fitting (INEGOCIÁVEL)** — Todo slide DEVE caber em exatamente 100vh. Sem scroll dentro de slides, jamais.
5. **Marca Itaú sempre** — Cores, fontes e logos exclusivos da marca em todas as saídas.

---

## Regras de Viewport Fitting

Estas invariantes se aplicam a TODO slide em TODA apresentação:

- Todo `.slide` deve ter `height: 100vh; height: 100dvh; overflow: hidden;`
- TODOS os tamanhos de fonte e espaçamentos devem usar `clamp(min, preferido, max)` — nunca px/rem fixos
- Containers de conteúdo precisam de `max-height` relativos ao viewport
- Imagens: `max-height: min(50vh, 400px)`
- Breakpoints obrigatórios para alturas: 700px, 600px, 500px
- Incluir suporte a `prefers-reduced-motion`
- **NUNCA negar funções CSS diretamente** (`-clamp()`, `-min()`, `-max()` são silenciosamente ignorados) — usar `calc(-1 * clamp(...))` em vez disso

**Antes de gerar, leia `viewport-base.css` e inclua seu conteúdo COMPLETO em toda apresentação.**

### Limites de Densidade por Tipo de Slide

| Tipo de Slide | Conteúdo Máximo |
|---------------|----------------|
| Título | 1 heading + 1 subtítulo + autor/data + logo |
| Agenda | 1 heading + máx 6 itens |
| Conteúdo | 1 heading + máx 5 bullets OU 2 parágrafos |
| Métricas | 1 heading + máx 4 stat cards |
| Feature grid | 1 heading + máx 6 cards (2×3 ou 3×2) |
| Seção | 1 heading grande + 1 descrição curta |
| Código | 1 heading + máx 10 linhas de código |
| Quote | 1 citação (máx 3 linhas) + atribuição |
| Imagem | 1 heading + 1 imagem (máx 60vh) |
| Encerramento | Logo + heading + CTA |

**Conteúdo excede os limites? Dividir em múltiplos slides. Nunca cramear, nunca rolar.**

---

## Fase 0: Detectar Modo

Determinar o que o usuário quer:

- **Modo A: Nova Apresentação** — Criar do zero. Ir para Fase 1.
- **Modo B: Conversão de PPT** — Converter arquivo .pptx. Ir para Fase 4.
- **Modo C: Melhoria** — Melhorar HTML existente. Seguir regras do Modo C abaixo.
- **Modo D: Adaptar Beautiful Template** — Usar layout de um dos 32 templates da biblioteca com cores Itaú. Ir para Fase 2D.

### Modo C: Regras de Modificação

Ao melhorar apresentações existentes, o viewport fitting é o maior risco:

1. **Antes de adicionar conteúdo:** Contar elementos existentes, checar contra os limites de densidade
2. **Adicionando imagens:** Devem ter `max-height: min(50vh, 400px)`. Se o slide já tem conteúdo máximo, dividir em dois slides
3. **Adicionando texto:** Máx 5 bullets por slide. Excede? Dividir em slides de continuação
4. **Após QUALQUER modificação, verificar:** `.slide` tem `overflow: hidden`, novos elementos usam `clamp()`, imagens têm max-height relativo ao viewport
5. **Reorganizar proativamente:** Se modificações causarão overflow, dividir o conteúdo automaticamente e informar o usuário

---

## Fase 1: Descoberta de Conteúdo (Novas Apresentações)

**Leia o guia de marca antes de qualquer outra coisa:**

| Arquivo | O que contém |
|---------|-------------|
| `src/brand/cores.md` | Paleta oficial: `#EC7000` laranja, `#1F3B6B` azul, neutros |
| `src/brand/tipografia.md` | Itau Display Pro, escala de tamanhos, pesos disponíveis |
| `src/brand/logos.md` | Qual logo usar por tipo de fundo |
| `src/brand/voz-e-tom.md` | Tom direto, afirmações, verbos no infinitivo |
| `src/brand/espacamento.md` | Margens, grid, safe zone |

**Faça TODAS as perguntas em uma única chamada `AskUserQuestion`:**

**Pergunta 1 — Propósito** (header: "Propósito"):
Para que é esta apresentação? Opções: Pitch / Relatório Executivo / Apresentação Técnica / Workshop / Reunião Interna

**Pergunta 2 — Tamanho** (header: "Tamanho"):
Quantos slides aproximadamente? Opções: Curta 5–10 / Média 10–20 / Longa 20+

**Pergunta 3 — Conteúdo** (header: "Conteúdo"):
O conteúdo está pronto? Opções: Todo pronto / Rascunho / Só o tema

**Pergunta 4 — Edição Inline** (header: "Edição"):
Precisa editar textos diretamente no browser após gerar? Opções:
- "Sim (Recomendado)" — Edita texto no browser, salva via localStorage, exporta arquivo
- "Não" — Apenas apresentação, arquivo menor

**Lembre a escolha de edição — ela determina se o código de edição inline é gerado na Fase 3.**

Se o usuário tiver conteúdo, pedir que compartilhe.

### Passo 1.2: Avaliação de Imagens (se fornecidas)

Se o usuário não forneceu imagens → pular para Fase 2.

Se o usuário forneceu imagens:
1. **Escanear** — Listar todos os arquivos de imagem
2. **Ver cada imagem** — Usar o tool Read (Claude é multimodal)
3. **Avaliar** — Para cada: o que mostra, USÁVEL ou NÃO USÁVEL (com motivo), cores dominantes
4. **Co-desenhar o roteiro** — Imagens curadas informam a estrutura dos slides
5. **Confirmar via AskUserQuestion** (header: "Roteiro"): "O roteiro e seleção de imagens estão corretos?" Opções: Está bom / Ajustar imagens / Ajustar roteiro

---

## Fase 2: Descoberta de Estilo

**Regra inegociável: sempre mostrar exemplos visuais antes de qualquer geração.** O usuário deve ver para poder decidir — nunca escolher no escuro.

### Passo 2.0: Escolher Família de Templates (OBRIGATÓRIO)

Perguntar via `AskUserQuestion` (header: "Família de Templates"):
- **Itaú Presets** — 8 estilos criados para a marca Itaú; cores, tipografia e estrutura já definidos
- **Beautiful Templates** — 32 layouts externos (editoriais, criativos, técnicos) adaptados com cores Itaú

Se **Itaú Presets** → Passo 2.1.
Se **Beautiful Templates** → Ir para **Fase 2D** (seleção e adaptação do template base).

### Passo 2.1: Gerar Previews dos Itaú Presets (quando família = Itaú Presets)

Ao receber qualquer requisição de nova apresentação com família "Itaú Presets", **antes de fazer perguntas de conteúdo ou estilo**, ler [`style-presets-itau.md`](style-presets-itau.md) e gerar um arquivo de preview HTML para cada um dos 8 presets disponíveis.

Salvar em `.claude-design/slide-previews/`:

| Arquivo | Template | Vibe |
|---------|----------|------|
| `01-itau-escuro.html` | Itaú Escuro | Executivo, confiante, premium — fundo azul `#1F3B6B` |
| `02-itau-claro.html` | Itaú Claro | Transparente, corporativo limpo — fundo branco |
| `03-itau-split.html` | Itaú Split | Moderno, dinâmico, pitch — painel azul + branco |
| `04-itau-laranja.html` | Itaú Laranja | Alta energia, impactante — fundo `#EC7000` |
| `05-itau-tech.html` | Itaú Tech | Técnico, preciso, dados/código — fundo `#0f1e38` |
| `06-itau-editorial.html` | Itaú Editorial | Relatórios premium, stakeholders externos |
| `07-bold-signal.html` | Bold Signal | Criativo, card laranja em fundo escuro `#1A1A1A` |
| `08-swiss-modern.html` | Swiss Modern | Clean minimalista, Bauhaus-inspired |

**Cada preview:** arquivo HTML autocontido (~80 linhas), mostrando **um slide de título animado** com tipografia, paleta e barra de acento características do preset. O nome do preset deve aparecer visível no slide (ex: tag-label com "Itaú Escuro").

**Abrir todos os previews automaticamente** no browser para o usuário comparar lado a lado.

### Passo 2.2: Usuário Escolhe o Template

Após abrir os previews, perguntar via `AskUserQuestion` (header: "Template"):

Qual template você prefere?
- **Itaú Escuro** — Executivo, fundo azul `#1F3B6B`, destaque laranja
- **Itaú Claro** — Corporativo limpo, fundo branco, acentos laranja e azul
- **Itaú Split** — Pitch moderno, painel dividido azul + branco
- **Itaú Laranja** — Impactante, fundo `#EC7000`, texto branco
- **Itaú Tech** — Técnico para dados/código, fundo `#0f1e38`, grid pattern
- **Itaú Editorial** — Relatórios premium, hierarquia tipográfica forte
- **Bold Signal** — Criativo, card laranja destacado em fundo escuro
- **Swiss Modern** — Minimalista clean, inspiração Bauhaus com acento laranja

Se o usuário pedir para **misturar elementos** de dois templates, perguntar quais elementos de cada um e seguir para Fase 3 com a especificação combinada.

---

## Fase 2D: Seleção e Adaptação de Beautiful Template

Usado quando o usuário quer um dos 32 templates da biblioteca `beautiful-html-templates` com cores Itaú.

### Passo 2D.1: Mostrar e Selecionar

Perguntar via `AskUserQuestion` (header: "Categoria") em qual grupo está o template desejado:

- **Escuros / Dramáticos** — Vellum, Studio, Broadside, 8-Bit Orbit, Pink Script, Signal, Grove, Mat, Bold Poster
- **Claros / Editoriais** — Soft Editorial, Monochrome, Cartesian, Playful, Biennale Yellow, Blue Professional, Capsule
- **Coloridos / Criativos** — Creative Mode, Block Frame, Daisy Days, Sakura Chroma, Retro Zine, Scatterbrain, Pin & Paper, Raw Grid
- **Modernos / Tipográficos** — Neo-Grid Bold, Editorial Tri-Tone, Cobalt Grid, Long Table, People's Platform, Retro Windows, Coral

Após a categoria, pedir o nome exato do template via campo livre. Abrir `public/screenshots/[slug]-1.png` para confirmar visualmente com o usuário.

### Passo 2D.2: Ler o Template Base

```
public/templates/[slug]/template.html   ← estrutura e CSS
public/templates/[slug]/template.json   ← metadados (palette, typography, mood)
```

Identificar no `template.html`:
1. **Tokens CSS** no `:root` — todos os `--c-*` (cores) e `--f-*` (fontes)
2. **Cores hardcoded** fora de variáveis (hex, rgb, rgba no CSS)
3. **Fontes externas** carregadas via Google Fonts
4. **Estrutura de slides** — número, layouts usados, elementos decorativos

### Passo 2D.3: Remapear para Paleta Itaú

Substituir a camada de tokens mantendo toda a arquitetura CSS intacta.

**Remapeamento de cores (`--c-*` → Itaú):**

| Token original | Itaú substituto | Regra |
|----------------|-----------------|-------|
| `--c-bg` (fundo escuro) | `#1F3B6B` | Azul Itaú como base escura |
| `--c-bg-alt` (fundo escuro alt) | `#162d52` | Variante mais escura do azul |
| `--c-bg` (fundo claro) | `#FFFFFF` ou `#FAFAF8` | Fundo limpo |
| `--c-bg-light`, `--c-bg-light-alt` | Mesmas regras de claro | — |
| `--c-fg` (texto principal em escuro) | `#FFFFFF` | — |
| `--c-fg` (texto principal em claro) | `#1A1A1A` | — |
| `--c-fg-2` (texto secundário) | `rgba(255,255,255,0.65)` em escuro / `#555555` em claro | — |
| `--c-fg-3` (texto terciário) | `rgba(255,255,255,0.35)` em escuro / `#999999` em claro | — |
| `--c-accent` | `#EC7000` | Laranja Itaú — sempre |
| `--c-emphasis` | `#EC7000` | — |
| `--c-border` | `rgba(255,255,255,0.12)` em escuro / `rgba(0,0,0,0.08)` em claro | — |
| Qualquer outra cor de marca original | Cor Itaú mais próxima em função | — |

**Remapeamento de fontes (`--f-*` → Itau Display Pro):**

```css
/* Adicionar antes de qualquer uso de fonte */
@font-face { font-family:'Itau Display Pro';
  src:url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Lt.woff2') format('woff2');
  font-weight:300; font-display:swap; }
@font-face { font-family:'Itau Display Pro';
  src:url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Rg.woff2') format('woff2');
  font-weight:400; font-display:swap; }
@font-face { font-family:'Itau Display Pro';
  src:url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Bd.woff2') format('woff2');
  font-weight:700; font-display:swap; }
@font-face { font-family:'Itau Display Pro';
  src:url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Blk.woff2') format('woff2');
  font-weight:900; font-display:swap; }

/* No :root, substituir tokens de fonte */
--f-display:  'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
--f-heading:  'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
--f-body:     'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
--f-mono:     'JetBrains Mono', 'Fira Code', monospace; /* manter para código */
--f-annotation: 'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
```

Remover o `<link>` de Google Fonts original do template — exceto se for `JetBrains Mono` para código.

**O que NÃO tocar:**
- Valores de `--sz-*` (escala de tamanhos tipográficos)
- Valores de `--sp-*` ou `--gap-*` (espaçamentos)
- Qualquer propriedade que não seja cor ou fonte
- A estrutura HTML e os layouts CSS
- O JavaScript de navegação do template (apenas adicionar `window.presentation` se ausente)
- Efeitos decorativos (formas, padrões, texturas) — só recoloridos

### Passo 2D.4: Adicionar Logo e Conteúdo

1. Adicionar logo Itaú em cada slide (branca em fundo escuro, laranja em fundo claro), posicionada no rodapé
2. Preencher o conteúdo real solicitado substituindo os placeholders do template
3. Garantir viewport fitting: cada `.slide` com `height: 100dvh; overflow: hidden`
4. Adicionar `window.presentation = this` se o JS do template não expõe

### Checklist Extra para Modo D

- [ ] Todos os `--c-*` tokens remapeados para paleta Itaú
- [ ] Cores hardcoded (hex/rgb fora de variáveis) também substituídas
- [ ] `@font-face` Itau Display Pro declarado com os 4 pesos
- [ ] `--f-display`, `--f-heading`, `--f-body` remapeados para Itau Display Pro
- [ ] Google Fonts originais do template removidos (exceto JetBrains Mono)
- [ ] Logo Itaú adicionado em cada slide com variante correta por fundo
- [ ] Conteúdo real preenchido nos placeholders do template
- [ ] Todo `.slide` com `height: 100dvh; overflow: hidden`
- [ ] `window.presentation = this` exposto para export-pdf.sh

---

## Fase 3: Gerar Apresentação

Gerar a apresentação completa usando conteúdo da Fase 1 e estilo da Fase 2.

**Antes de gerar, ler estes arquivos:**
- [`html-template.md`](html-template.md) — Arquitetura HTML e recursos JS
- [`viewport-base.css`](viewport-base.css) — CSS obrigatório (incluir COMPLETO)
- [`animation-patterns.md`](animation-patterns.md) — Referência de animações para o feeling escolhido
- [`style-presets-itau.md`](style-presets-itau.md) — Especificação do preset escolhido

### Estrutura Obrigatória de Slides

```
Slide 1  — título:        Título + subtítulo + autor + data + logo grande
Slide 2  — agenda:        O que vamos ver (máx 6 tópicos)
Slides … — conteúdo:      Um tópico por slide, bullets/stats/código
Slide N  — seção final:   Conclusões / Próximos Passos
Slide N+1 — encerramento: Obrigado + CTA + logo
```

### Regras de Marca Itaú Empresas

#### Cores (EXCLUSIVAMENTE da paleta)

| Cenário | Fundo | Texto | Destaque |
|---------|-------|-------|---------|
| Slide título escuro | `#1F3B6B` | `#FFFFFF` | `#EC7000` |
| Slide título laranja | `#EC7000` | `#FFFFFF` | `#FFFFFF` |
| Slide conteúdo | `#FFFFFF` | `#1A1A1A` | `#EC7000` |
| Slide seção | `#EC7000` | `#FFFFFF` | `#FFFFFF` |
| Slide código | `#0f1e38` | `#E8EDF5` | `#EC7000` |

#### Tipografia (Itau Display Pro — sempre via @font-face local)

```css
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
```

| Elemento | clamp() | Peso |
|----------|---------|------|
| Título slide | `clamp(1.8rem, 5.5vw, 4.5rem)` | 900 |
| Subtítulo | `clamp(1.1rem, 2.5vw, 1.8rem)` | 300 |
| Título de seção | `clamp(1.3rem, 3.5vw, 2.5rem)` | 900 |
| Corpo/bullet | `clamp(0.8rem, 1.5vw, 1.125rem)` | 400 |
| Stat/número | `clamp(2.5rem, 8vw, 5.5rem)` | 900 |
| Legenda/nota | `clamp(0.65rem, 1vw, 0.875rem)` | 300 |
| Código | `clamp(0.7rem, 1.2vw, 1rem)` | 400 |

**Para slides de código, adicionar também `JetBrains Mono` via Google Fonts.**

#### Logo

| Fundo do slide | Logo a usar |
|----------------|-------------|
| `#1F3B6B` (Azul) | `src/assets/logos/logo-itau-branca.png` |
| `#EC7000` (Laranja) | `src/assets/logos/logo-itau-branca.png` |
| `#1A1A1A` / escuro | `src/assets/logos/logo-itau-branca.png` |
| `#FFFFFF` (Branco) | `src/assets/logos/logo-itau-laranja.png` |
| `#F5F5F5` (Cinza) | `src/assets/logos/logo-itau-azul-escuro.png` |

- Posição padrão: rodapé canto inferior direito, `height: clamp(24px, 3vh, 36px)`
- Slide de título: logo maior no rodapé ou centralizado
- Nunca distorcer, aplicar efeitos, ou separar do logotipo completo

#### Tom e Voz

- Títulos: **afirmações**, nunca perguntas ("Crescimento de 32% em carteira PME")
- Bullets: **verbo no infinitivo** ("Integrar APIs em menos de 1 dia")
- Máximo **5 bullets** por slide
- Speaker notes em todo slide de conteúdo (em 1ª pessoa do apresentador, 2–4 frases)

#### Animações Permitidas

- Fade + slide-up (padrão recomendado) — `transition-delay` escalonado
- Scale-in para stats e números grandes
- Slide-from-left para bullets sequenciais
- Blur-in para slides de impacto/seção
- **PROIBIDO:** zoom excessivo, flip, bounce, rotações, convex, concave

Consultar [`animation-patterns.md`](animation-patterns.md) para os CSS patterns completos.

### Requisitos JS Obrigatórios

Toda apresentação deve incluir:
1. **Classe `SlidePresentation`** — Teclado, touch, wheel, progress bar, nav dots
2. **`IntersectionObserver`** — Adiciona `.visible` para disparar animações CSS
3. **`window.presentation = this`** — Expõe instância para o script `export-pdf.sh`
4. **Limpar nav dots** antes de recriar (`innerHTML = ''`) para evitar duplicação

Ver arquitetura completa em [`html-template.md`](html-template.md).

---

## Fase 4: Conversão de PPT

Ao converter arquivos PowerPoint:

1. **Extrair conteúdo** — Executar `python scripts/extract-pptx.py <input.pptx> <output_dir>` (instalar se necessário: `pip install python-pptx`)
2. **Confirmar com o usuário** — Apresentar títulos, resumos de conteúdo e contagem de imagens extraídas
3. **Seleção de estilo** — Ir para Fase 2 para descoberta de estilo
4. **Gerar HTML** — Converter para o estilo escolhido, preservando textos, imagens (`assets/`), ordem dos slides e notas do apresentador

---

## Fase 5: Entrega

1. **Limpar** — Deletar `.claude-design/slide-previews/` se existir
2. **Abrir** — Usar `start [arquivo].html` (Windows) ou `open [arquivo].html` (macOS) para abrir no browser
3. **Resumir** — Informar ao usuário:
   - Localização do arquivo, nome do estilo, contagem de slides
   - Navegação: setas do teclado, espaço, scroll/swipe, clique nos dots
   - Como customizar: variáveis `:root` para cores, link de fonte para tipografia, classe `.reveal` para animações
   - Se edição inline habilitada: Hover canto superior esquerdo ou tecle E para editar, Ctrl+S para salvar

---

## Fase 6: Compartilhar e Exportar (Opcional)

Após entrega, **perguntar:** _"Quer exportar a apresentação como PDF?"_

Opções:
- **Exportar PDF** — Arquivo para email, Slack ou impressão
- **Não, obrigado**

Se o usuário recusar, parar aqui.

### 6A: Exportar PDF

```bash
bash scripts/export-pdf.sh <caminho-para-html> [output.pdf]
# Com arquivo menor:
bash scripts/export-pdf.sh <caminho-para-html> [output.pdf] --compact
```

**O que acontece:** Playwright abre o HTML headless em 1920×1080, screenshot de cada slide, combina em PDF.

**Gotchas:**
- Primeira execução é lenta (~30–60s) — instala Playwright/Chromium (~150MB)
- Slides devem usar `class="slide"`
- PDFs grandes (>10MB): sugerir `--compact` (50–70% menor, 1280×720)
- Animações não são preservadas — PDF é snapshot estático

---

## Arquivos de Suporte

| Arquivo | Propósito | Quando Ler |
|---------|-----------|------------|
| [`style-presets-itau.md`](style-presets-itau.md) | 6 presets Itaú + 2 criativos adaptados | Fase 2 (estilo) |
| [`viewport-base.css`](viewport-base.css) | CSS obrigatório de viewport — copiar em toda apresentação | Fase 3 (geração) |
| [`html-template.md`](html-template.md) | Arquitetura HTML, JS completo, inline editing | Fase 3 (geração) |
| [`animation-patterns.md`](animation-patterns.md) | CSS/JS de animações por feeling | Fase 3 (geração) |
| [`scripts/extract-pptx.py`](../../scripts/extract-pptx.py) | Extração de conteúdo de .pptx | Fase 4 (conversão) |
| [`scripts/export-pdf.sh`](../../scripts/export-pdf.sh) | Exportar PDF | Fase 6 (sharing) |
| `src/brand/cores.md` | Paleta oficial com hex e CSS vars | Fase 1 e 3 |
| `src/brand/tipografia.md` | Escala de tipografia, pesos, @font-face | Fase 1 e 3 |
| `src/brand/logos.md` | Versões de logo por contexto | Fase 1 e 3 |
| `src/brand/voz-e-tom.md` | Como escrever títulos, bullets e notas | Fase 1 e 3 |
| `src/brand/espacamento.md` | Margens, grid, safe zone | Fase 3 |

---

## Checklist de Entrega

- [ ] Guia de marca lido antes de gerar (`src/brand/`)
- [ ] `viewport-base.css` incluído completo no `<style>`
- [ ] Todo `.slide` tem `height: 100dvh; overflow: hidden`
- [ ] Todos os tamanhos usam `clamp()` — zero px fixos em fontes/espaçamentos
- [ ] Slide de título com logo, autor e data
- [ ] Slide de agenda presente (máx 6 itens)
- [ ] Speaker notes em todos os slides de conteúdo
- [ ] Cores APENAS da paleta Itaú Empresas
- [ ] `@font-face` Itau Display Pro declarado com os 4 pesos
- [ ] Logo correto para cada tipo de fundo (branca/laranja/azul-escuro)
- [ ] Máximo 5 bullets por slide de conteúdo
- [ ] Títulos como afirmações, bullets com verbo no infinitivo
- [ ] Animações: apenas fade, slide, scale — sem zoom/flip/bounce
- [ ] `SlidePresentation` class com teclado, touch, wheel, progress, nav dots
- [ ] `IntersectionObserver` configurado para disparar `.reveal`
- [ ] `window.presentation = this` exposto para export-pdf.sh
- [ ] Slide final com CTA ou agradecimento

---

## Exemplos de Prompts

- "Crie uma apresentação sobre crédito para PMEs, 10 slides, tema escuro"
- "Gera slides de resultados do Q2 para a diretoria, 15 slides, foco em crescimento"
- "Converta este arquivo pptx em HTML moderno com o estilo Itaú Escuro"
- "Crie slides de workshop sobre gestão financeira para pequenos empresários"
- "Melhore esta apresentação existente adicionando animações e conformidade à marca"

---

**Versão:** 3.0.0 — full-stack (marca + viewport + animações + scripts)  
**Atualizado:** 2026-05-12

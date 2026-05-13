# SlidesGenerator — Guia para o Claude

## Visão Geral
Gerador de slides de apresentação para a marca **Itaú Empresas**. Foco em geração via IA com skills locais, usando o guia de marca estruturado em `src/brand/`.

## Stack
- Frontend: React + Vite + TypeScript
- Estilização: Tailwind CSS + CSS custom properties (tokens)
- Exportação: Playwright (PDF via `scripts/export-pdf.sh`)

---

## Marca: Itaú Empresas

**Antes de gerar qualquer slide**, leia o guia de marca:

```
src/brand/index.md          ← visão geral e mapa do guia
src/brand/cores.md          ← paleta de cores com hex e CSS vars
src/brand/tipografia.md     ← Itau Display Pro, escala de tamanhos
src/brand/espacamento.md    ← grid, margens, safe zone
src/brand/movimento.md      ← transições e animações permitidas
src/brand/voz-e-tom.md     ← como escrever textos e títulos
src/brand/logos.md          ← qual versão do logo usar em cada contexto
```

**Cores principais:**
- Laranja Itaú: `#EC7000` (primária)
- Azul Escuro: `#1F3B6B` (secundária)
- Branco: `#FFFFFF`

**Fonte:** Itau Display Pro (arquivos em `src/assets/fonts/itau-display-pro/`)

**Logos disponíveis:**
- `src/assets/logos/logo-itau-laranja.png` → fundo claro
- `src/assets/logos/logo-itau-branca.png` → fundo escuro/laranja
- `src/assets/logos/logo-itau-azul-escuro.png` → fundo neutro

**Tokens JSON:** `src/brand/tokens/` (cores, tipografia, espaçamento)

**Temas CSS prontos:** `src/themes/itau-escuro.css` e `src/themes/itau-claro.css`

**Tipos TypeScript:** `src/types/slides.ts`

---

## Estrutura do Projeto

```
SlidesGenerator/
├── README.md                          # Documentação pública (galeria de templates)
├── CLAUDE.md                          # Este arquivo — instruções para o Claude
├── .gitignore
│
├── scripts/                           # Scripts utilitários
│   ├── export-pdf.sh                  # Exportar apresentação como PDF
│   ├── extract-pptx.py                # Extrair conteúdo de arquivos .pptx
│   └── screenshot-presets.sh          # Gerar screenshots dos 8 presets Itaú
│
├── examples/                          # Apresentações de exemplo (outputs da skill)
│   └── skill-star/
│       └── apresentacao.html          # Demo da skill com metodologia STAR
│
├── public/
│   ├── deck-stage.js                  # Controle de deck para o app React
│   ├── itau-presets/                  # 8 previews animados dos presets da marca
│   │   ├── 01-itau-escuro.html        # Cada um abre standalone no browser
│   │   ├── 02-itau-claro.html
│   │   ├── 03-itau-split.html
│   │   ├── 04-itau-laranja.html
│   │   ├── 05-itau-tech.html
│   │   ├── 06-itau-editorial.html
│   │   ├── 07-bold-signal.html
│   │   ├── 08-swiss-modern.html
│   │   └── screenshots/               # PNGs gerados por screenshot-presets.sh
│   ├── templates/                     # 32 templates HTML base (beautiful-html-templates)
│   └── screenshots/                   # Screenshots dos 32 templates (3 por template)
│
├── refs/                              # Arquivos brutos de referência (não-código, não commitados)
│   └── guia-marca/                    # PDF oficial, PPTX, AI, logos originais, fontes desktop
│
├── src/
│   ├── brand/                         # Guia de marca estruturado (legível pelo Claude)
│   │   ├── index.md
│   │   ├── cores.md
│   │   ├── tipografia.md
│   │   ├── espacamento.md
│   │   ├── movimento.md
│   │   ├── voz-e-tom.md
│   │   ├── logos.md
│   │   └── tokens/
│   │       ├── cores.json
│   │       ├── tipografia.json
│   │       └── espacamento.json
│   ├── assets/                        # Assets estáticos usados no código
│   │   ├── logos/                     # PNGs dos logos (3 versões)
│   │   └── fonts/itau-display-pro/    # Fontes web (WOFF2, WOFF, EOT — 5 pesos)
│   ├── components/
│   │   ├── template-gallery/          # Galeria de templates (TemplateGallery, TemplateCard)
│   │   ├── presentation-wizard/       # Wizard de criação (PresentationWizard)
│   │   └── ui/                        # Primitivos genéricos (Button, Badge)
│   ├── lib/                           # Utilitários (templates.ts, deck-builder.ts)
│   ├── themes/                        # CSS com tokens da marca
│   │   ├── itau-escuro.css
│   │   └── itau-claro.css
│   └── types/
│       └── slides.ts                  # Interfaces TypeScript (Slide, Presentation, etc.)
│
└── .claude/
    ├── settings.json
    ├── commands/                       # Slash commands (/nome)
    │   └── frontend-slides-pt.md      # /frontend-slides-pt — gera apresentações Itaú
    └── skills/                        # Área de dev/teste de skills
        ├── README.md
        ├── frontend-slides-pt.md      # Skill principal
        ├── animation-patterns.md      # Padrões de animação
        ├── html-template.md           # Template base HTML
        ├── style-presets-itau.md      # Especificação dos 8 presets visuais
        └── viewport-base.css          # CSS obrigatório de viewport fitting
```

---

## Skills Locais (`.claude/skills/`)

Skills são prompts de sistema em Markdown que definem comportamentos especializados.

| Skill | Arquivo | Slash Command | Status |
|-------|---------|---------------|--------|
| frontend-slides-pt | `skills/frontend-slides-pt.md` | `/frontend-slides-pt` | Ativo |

**Fluxo:** Desenvolva em `.claude/skills/` → teste → promova para `.claude/commands/`

---

## Convenções de Código
- Componentes em PascalCase, arquivos em kebab-case
- Props tipadas com interfaces de `src/types/slides.ts`
- Nenhum comentário óbvio — apenas WHY não óbvio

## Tarefas Frequentes
- `npm run dev` — inicia o servidor de desenvolvimento (http://localhost:5173)
- `npm run build` — gera bundle de produção
- `bash scripts/export-pdf.sh ./apresentacao.html` — exportar como PDF
- `bash scripts/screenshot-presets.sh` — regenerar screenshots dos 8 presets

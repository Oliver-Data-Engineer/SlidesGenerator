# SETUP.md — Guia de Configuração para Agentes IA

Este arquivo é o ponto de entrada para qualquer agente de IA configurar e operar o **SlidesGenerator**. Leia e execute cada seção em ordem antes de qualquer outra ação.

---

## 1. Verificar Pré-requisitos

Execute os comandos abaixo e confirme as versões:

```bash
node --version    # precisa ser 18 ou superior
npm --version     # qualquer versão recente
python --version  # precisa ser 3.8 ou superior
git --version
```

Se Node.js não estiver instalado → instrua o usuário a instalar em https://nodejs.org  
Se Python não estiver instalado → instrua o usuário a instalar em https://python.org  
Se Git não estiver instalado → instrua o usuário a instalar em https://git-scm.com

---

## 2. Clonar o Repositório

```bash
git clone https://github.com/Oliver-Data-Engineer/SlidesGenerator
cd SlidesGenerator
```

Verifique que os seguintes arquivos existem após o clone:

- `CLAUDE.md` — instruções internas do projeto para Claude
- `package.json` — dependências do app React
- `src/brand/` — guia de marca Itaú Empresas
- `.claude/commands/frontend-slides-pt.md` — skill de geração de slides
- `public/templates/` — 32 templates HTML base
- `samples/` — 32 templates adaptados com paleta Itaú
- `scripts/` — scripts de PDF, adaptação e screenshots

Se algum desses não existir, o clone falhou — tente novamente.

---

## 3. Instalar Dependências do App React

```bash
npm install
```

Verifique que `node_modules/` foi criado. Em caso de erro de rede, tente:

```bash
npm install --legacy-peer-deps
```

---

## 4. Instalar Dependências Python

### 4a. Playwright (para screenshots e exportação PDF)

```bash
pip install playwright
playwright install chromium
```

Verifique a instalação:

```bash
python -c "from playwright.sync_api import sync_playwright; print('Playwright OK')"
```

### 4b. python-pptx (apenas para conversão de arquivos .pptx)

```bash
pip install python-pptx
```

Este passo é opcional — só é necessário se o usuário precisar converter arquivos PowerPoint.

---

## 5. Verificar o Ambiente

Execute cada verificação e confirme que passa:

```bash
# App React inicia corretamente?
npm run dev
# → deve abrir em http://localhost:5173 (Ctrl+C para parar)

# Adaptação de templates funciona?
python scripts/adapt-templates.py signal
# → deve imprimir "OK signal" e criar/atualizar samples/signal/

# Screenshots funcionam?
python scripts/screenshot-presets.py --samples
# → deve gerar PNGs em samples/[slug]/screenshot.png
```

Se tudo passar, o ambiente está pronto.

---

## 6. Ler as Instruções do Projeto

Leia `CLAUDE.md` para entender:

- A estrutura completa de diretórios
- Como a Skill `/frontend-slides-pt` funciona
- Os 8 presets visuais da marca Itaú Empresas
- Como usar os scripts de PDF e screenshots

---

## 7. Usar a Skill Principal

Com o repositório clonado e as dependências instaladas, use o slash command no Claude Code:

```
/frontend-slides-pt [sua solicitação aqui]
```

**Exemplos:**

```
/frontend-slides-pt Crie uma apresentação sobre resultados do Q2 2026, 10 slides, tema executivo

/frontend-slides-pt Converta o arquivo deck.pptx para HTML com o estilo Itaú Escuro

/frontend-slides-pt Gere uma apresentação usando o template Vellum com cores Itaú
```

A Skill vai:
1. Perguntar qual família de templates usar (Itaú Presets ou Beautiful Templates)
2. Gerar previews visuais para escolha
3. Criar o HTML completo pronto para apresentar

---

## 8. Scripts Disponíveis

| Script | Uso |
|--------|-----|
| `bash scripts/export-pdf.sh ./apresentacao.html` | Exportar como PDF |
| `python scripts/extract-pptx.py deck.pptx output/` | Extrair conteúdo de .pptx |
| `python scripts/adapt-templates.py` | Adaptar os 32 templates com paleta Itaú |
| `python scripts/adapt-templates.py [slug]` | Re-adaptar apenas um template específico |
| `python scripts/screenshot-presets.py` | Screenshots dos 8 presets Itaú |
| `python scripts/screenshot-presets.py --samples` | Screenshots dos 32 templates adaptados |
| `python scripts/screenshot-presets.py --all` | Todos os screenshots |

---

## 9. Estrutura de Diretórios (Referência Rápida)

```
SlidesGenerator/
├── CLAUDE.md                    ← leia para entender o projeto completo
├── SETUP.md                     ← este arquivo
├── README.md                    ← documentação pública com galeria de templates
│
├── src/brand/                   ← guia de marca Itaú (cores, tipografia, logos, voz)
├── src/assets/fonts/            ← fontes Itau Display Pro (WOFF2)
├── src/assets/logos/            ← logos Itaú (PNG, 3 versões)
│
├── public/itau-presets/         ← 8 previews animados dos presets da marca
├── public/templates/            ← 32 templates HTML originais (beautiful-html-templates)
├── samples/                     ← 32 templates adaptados com paleta Itaú
│
├── examples/skill-star/         ← apresentação de exemplo gerada pela Skill
├── scripts/                     ← todos os scripts utilitários
│
└── .claude/
    ├── commands/frontend-slides-pt.md  ← slash command /frontend-slides-pt
    └── skills/                         ← skill completa com guia de marca embutido
```

---

## Resolução de Problemas

**`npm install` falha com erro de permissão:**
```bash
npm install --prefix . --no-optional
```

**Playwright não encontra o Chromium:**
```bash
npx playwright install chromium --with-deps
```

**Screenshots saem pretas ou em branco:**
- Verifique se o servidor HTTP está rodando (porta 8765 ou 8766)
- Aumente o `time.sleep()` no script para 3.0 se as animações não terminaram
- Para templates com `deck-stage.js`, verifique se o arquivo foi copiado para `samples/[slug]/`

**Fonte Itau Display Pro não carrega:**
- Os arquivos WOFF2 ficam em `src/assets/fonts/itau-display-pro/`
- O caminho relativo `../../src/assets/fonts/...` funciona a partir de `public/itau-presets/` e `samples/[slug]/`
- Use um servidor HTTP local (não `file://`) para garantir o carregamento das fontes

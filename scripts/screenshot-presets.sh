#!/usr/bin/env bash
# screenshot-presets.sh — Captura screenshots dos 8 presets Itaú Empresas
#
# Usage:
#   bash scripts/screenshot-presets.sh
#
# O que faz:
#   1. Instala Playwright como devDependency do projeto (se ainda não instalado)
#   2. Inicia um servidor HTTP local na raiz do projeto (fontes carregam via HTTP)
#   3. Para cada preset em public/itau-presets/, abre no Chromium headless
#   4. Aguarda as animações de entrada terminarem (~1.6s)
#   5. Captura screenshot 1920×1080 em public/itau-presets/screenshots/
#
# Requisito: Node.js 18+
# Primeira execução baixa o Chromium (~150 MB)

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
info() { echo -e "${CYAN}ℹ${NC} $*"; }
ok()   { echo -e "${GREEN}✓${NC} $*"; }
err()  { echo -e "${RED}✗${NC} $*" >&2; }

# Sempre rodar a partir da raiz do projeto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo ""
echo -e "${BOLD}╔══════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║   Screenshots — Itaú Presets (8 total)   ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════╝${NC}"
echo ""

if ! command -v node &>/dev/null; then
    err "Node.js é necessário mas não foi encontrado."
    err "Instale em: https://nodejs.org"
    exit 1
fi

# ── Instalar Playwright no projeto (não em tmp) ──────────────────────────────

if [ ! -d "node_modules/playwright" ]; then
    info "Instalando Playwright..."
    npm install --save-dev playwright
    if [ $? -ne 0 ]; then
        err "Falha ao instalar Playwright. Verifique sua conexão e tente novamente."
        exit 1
    fi
    ok "Playwright instalado"
else
    ok "Playwright já instalado"
fi

info "Verificando browser Chromium..."
npx playwright install chromium
if [ $? -ne 0 ]; then
    err "Falha ao instalar Chromium. Tente: npx playwright install chromium"
    exit 1
fi
ok "Chromium pronto"
echo ""

# ── Criar script Node.js de captura em arquivo temporário ───────────────────

SCREENSHOTS_DIR="$PROJECT_ROOT/public/itau-presets/screenshots"
mkdir -p "$SCREENSHOTS_DIR"

CAPTURE_SCRIPT="$(mktemp /tmp/capture-XXXXX.mjs 2>/dev/null || mktemp)"
# Renomear para .mjs se mktemp não suportar extensão
if [[ "$CAPTURE_SCRIPT" != *.mjs ]]; then
    mv "$CAPTURE_SCRIPT" "${CAPTURE_SCRIPT}.mjs"
    CAPTURE_SCRIPT="${CAPTURE_SCRIPT}.mjs"
fi
trap "rm -f '$CAPTURE_SCRIPT'" EXIT

cat > "$CAPTURE_SCRIPT" << 'NODESCRIPT'
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, extname } from 'path';

const PROJECT_ROOT   = process.argv[2];
const SCREENSHOTS    = process.argv[3];
const PRESETS        = process.argv.slice(4);

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject', '.ttf': 'font/ttf',
};

// Servidor local serve toda a raiz do projeto (fontes em src/assets/ carregam corretamente)
const server = createServer((req, res) => {
  const decoded = decodeURIComponent(req.url.split('?')[0]);
  const filePath = join(PROJECT_ROOT, decoded === '/' ? '/index.html' : decoded);
  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

const port = await new Promise(resolve => server.listen(0, () => resolve(server.address().port)));
console.log(`  Servidor local: http://localhost:${port}`);

const browser = await chromium.launch();

for (const name of PRESETS) {
  const url = `http://localhost:${port}/public/itau-presets/${name}.html`;
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Aguarda todas as animações de entrada (maior delay 0.9s + duração 0.6s = 1.5s)
  await page.waitForTimeout(1600);

  const outPath = `${SCREENSHOTS}/${name}.png`;
  await page.screenshot({ path: outPath, fullPage: false });
  await page.close();
  console.log(`  ✓ ${name}.png`);
}

await browser.close();
server.close();
NODESCRIPT

# ── Executar captura a partir da raiz do projeto ─────────────────────────────

info "Capturando screenshots (1920×1080)..."
echo ""

# node é executado a partir de PROJECT_ROOT, onde playwright está em node_modules/
node "$CAPTURE_SCRIPT" \
    "$PROJECT_ROOT" \
    "$SCREENSHOTS_DIR" \
    "01-itau-escuro" \
    "02-itau-claro" \
    "03-itau-split" \
    "04-itau-laranja" \
    "05-itau-tech" \
    "06-itau-editorial" \
    "07-bold-signal" \
    "08-swiss-modern"

if [ $? -ne 0 ]; then
    err "Falha na captura. Verifique se os HTMLs existem em public/itau-presets/"
    exit 1
fi

echo ""
echo -e "${BOLD}════════════════════════════════════════════${NC}"
ok "8 screenshots gerados em public/itau-presets/screenshots/"
echo ""
echo "  Arquivos gerados:"
for name in 01-itau-escuro 02-itau-claro 03-itau-split 04-itau-laranja \
            05-itau-tech 06-itau-editorial 07-bold-signal 08-swiss-modern; do
    echo "    public/itau-presets/screenshots/${name}.png"
done
echo ""
echo -e "  ${CYAN}Próximo passo:${NC} adicione os PNGs ao git para que o README"
echo -e "  exiba as imagens diretamente no GitHub."
echo -e "${BOLD}════════════════════════════════════════════${NC}"
echo ""

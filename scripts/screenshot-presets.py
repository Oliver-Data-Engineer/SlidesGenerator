import os
import time
import subprocess
import threading
from pathlib import Path
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from playwright.sync_api import sync_playwright

# Configurações de Cores
GREEN = "\033[0;32m"
CYAN = "\033[0;36m"
RED = "\033[0;31m"
BOLD = "\033[1m"
NC = "\033[0m"

# Definições de Caminhos
PROJECT_ROOT = Path(__file__).parent.parent.absolute() # Ajuste se o script não estiver em /scripts
SCREENSHOTS_DIR = PROJECT_ROOT / "public" / "itau-presets" / "screenshots"
PRESETS = [
    "01-itau-escuro", "02-itau-claro", "03-itau-split", "04-itau-laranja",
    "05-itau-tech", "06-itau-editorial", "07-bold-signal", "08-swiss-modern"
]

def start_server(port):
    """Inicia um servidor HTTP simples para servir os arquivos do projeto."""
    os.chdir(PROJECT_ROOT)
    handler = SimpleHTTPRequestHandler
    # Silencia os logs do servidor para não poluir o terminal
    handler.log_message = lambda *args: None 
    with TCPServer(("", port), handler) as httpd:
        httpd.serve_forever()

def run():
    print(f"\n{BOLD}╔══════════════════════════════════════════╗{NC}")
    print(f"{BOLD}║   Screenshots — Itaú Presets (8 total)   ║{NC}")
    print(f"{BOLD}╚══════════════════════════════════════════╝{NC}\n")

    # 1. Garantir diretório de saída
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

    # 2. Iniciar Servidor em Background
    port = 8000
    server_thread = threading.Thread(target=start_server, args=(port,), daemon=True)
    server_thread.start()
    print(f"{CYAN}ℹ{NC} Servidor local rodando em http://localhost:{port}")

    # 3. Executar Playwright
    try:
        with sync_playwright() as p:
            print(f"{CYAN}ℹ{NC} Iniciando Chromium...")
            browser = p.chromium.launch()
            
            for name in PRESETS:
                url = f"http://localhost:{port}/public/itau-presets/{name}.html"
                page = browser.new_page(viewport={'width': 1920, 'height': 1080})
                
                print(f"  Capturando {name}...", end="\r")
                
                # Navegação
                page.goto(url, wait_until="networkidle")
                
                # Aguarda fontes e animações (1.6s conforme original)
                page.evaluate("document.fonts.ready")
                time.sleep(1.6)
                
                output_path = SCREENSHOTS_DIR / f"{name}.png"
                page.screenshot(path=str(output_path))
                
                page.close()
                print(f"{GREEN}✓{NC} {name}.png        ")

            browser.close()
            
        print(f"\n{BOLD}════════════════════════════════════════════{NC}")
        print(f"{GREEN}✓{NC} 8 screenshots gerados em {SCREENSHOTS_DIR.relative_to(PROJECT_ROOT)}")
        print(f"{BOLD}════════════════════════════════════════════{NC}\n")

    except Exception as e:
        print(f"{RED}✗ Erro durante a execução:{NC} {e}")

if __name__ == "__main__":
    run()
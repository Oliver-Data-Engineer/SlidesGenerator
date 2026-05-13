#!/usr/bin/env python3
"""
screenshot-presets.py — Captura screenshots dos presets e amostras adaptadas Itaú Empresas.

Modos:
  python scripts/screenshot-presets.py              → 8 presets Itaú (public/itau-presets/)
  python scripts/screenshot-presets.py --samples    → 32 amostras adaptadas (samples/)
  python scripts/screenshot-presets.py --all        → ambos

Requisito: playwright instalado  →  pip install playwright && playwright install chromium
"""

import os
import sys
import time
import threading
from pathlib import Path
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from playwright.sync_api import sync_playwright

# ── Cores de terminal ────────────────────────────────────────────────────────
GREEN = "\033[0;32m"; CYAN = "\033[0;36m"; RED = "\033[0;31m"; BOLD = "\033[1m"; NC = "\033[0m"

# ── Caminhos ────────────────────────────────────────────────────────────────
PROJECT_ROOT  = Path(__file__).parent.parent.absolute()
PRESETS_DIR   = PROJECT_ROOT / "public" / "itau-presets"
SAMPLES_DIR   = PROJECT_ROOT / "samples"

PRESETS_8 = [
    "01-itau-escuro", "02-itau-claro", "03-itau-split", "04-itau-laranja",
    "05-itau-tech", "06-itau-editorial", "07-bold-signal", "08-swiss-modern"
]

# ── Servidor HTTP ─────────────────────────────────────────────────────────────

def start_server(port: int):
    os.chdir(PROJECT_ROOT)
    handler = SimpleHTTPRequestHandler
    handler.log_message = lambda *args: None   # silencia logs
    with TCPServer(("", port), handler) as httpd:
        httpd.serve_forever()


def launch_server(port: int):
    t = threading.Thread(target=start_server, args=(port,), daemon=True)
    t.start()
    time.sleep(0.5)   # aguarda o bind
    print(f"{CYAN}ℹ{NC} Servidor local: http://localhost:{port}")


# ── Screenshot ────────────────────────────────────────────────────────────────

def screenshot_pages(browser, pages: list[tuple[str, Path]], *, wait_ms: int = 1600):
    """
    pages: lista de (url, output_path)
    Retorna (ok, errors).
    """
    ok, errors = 0, []
    for url, out_path in pages:
        try:
            out_path.parent.mkdir(parents=True, exist_ok=True)
            page = browser.new_page(viewport={"width": 1920, "height": 1080})
            page.goto(url, wait_until="networkidle")
            page.evaluate("document.fonts.ready")
            time.sleep(wait_ms / 1000)
            page.screenshot(path=str(out_path))
            page.close()
            print(f"  {GREEN}✓{NC} {out_path.relative_to(PROJECT_ROOT)}")
            ok += 1
        except Exception as e:
            print(f"  {RED}✗{NC} {out_path.name}: {e}")
            errors.append(str(out_path.name))
    return ok, errors


# ── Modos ─────────────────────────────────────────────────────────────────────

def mode_presets(browser, port: int):
    """Screenshot dos 8 presets Itaú em public/itau-presets/."""
    shots_dir = PRESETS_DIR / "screenshots"
    pages = [
        (
            f"http://localhost:{port}/public/itau-presets/{name}.html",
            shots_dir / f"{name}.png"
        )
        for name in PRESETS_8
        if (PRESETS_DIR / f"{name}.html").exists()
    ]
    print(f"\n{BOLD}── Itaú Presets ({len(pages)}) ──────────────────────────────{NC}")
    return screenshot_pages(browser, pages)


def mode_samples(browser, port: int):
    """Screenshot das 32 amostras adaptadas em samples/."""
    if not SAMPLES_DIR.exists():
        print(f"{RED}✗ samples/ não encontrado. Rode primeiro: python scripts/adapt-templates.py{NC}")
        return 0, []

    slugs = sorted(d.name for d in SAMPLES_DIR.iterdir() if d.is_dir())
    pages = []
    for slug in slugs:
        html_path = SAMPLES_DIR / slug / f"itau-{slug}.html"
        if html_path.exists():
            pages.append((
                f"http://localhost:{port}/samples/{slug}/itau-{slug}.html",
                SAMPLES_DIR / slug / "screenshot.png"
            ))

    print(f"\n{BOLD}── Amostras Adaptadas ({len(pages)}) ──────────────────────{NC}")
    return screenshot_pages(browser, pages, wait_ms=2000)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

    args = set(sys.argv[1:])
    do_presets = "--samples" not in args or "--all" in args
    do_samples = "--samples" in args or "--all" in args

    if not do_presets and not do_samples:
        do_presets = True   # default: presets

    label = "Presets + Amostras" if (do_presets and do_samples) else \
            "Amostras Adaptadas (32)" if do_samples else "Itau Presets (8)"

    print(f"\n{BOLD}Screenshots -- {label}{NC}")

    port = 8765
    launch_server(port)

    total_ok, total_errors = 0, []

    with sync_playwright() as p:
        print(f"{CYAN}ℹ{NC} Iniciando Chromium...")
        browser = p.chromium.launch()

        if do_presets:
            ok, errs = mode_presets(browser, port)
            total_ok += ok; total_errors += errs

        if do_samples:
            ok, errs = mode_samples(browser, port)
            total_ok += ok; total_errors += errs

        browser.close()

    print(f"\n{BOLD}{'-' * 52}{NC}")
    print(f"  {GREEN}OK{NC} {total_ok} screenshots gerados")
    if total_errors:
        print(f"  {RED}ERRO{NC} {', '.join(total_errors)}")
    print(f"{BOLD}{'-' * 52}{NC}\n")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
adapt-templates.py — Adapta os 32 templates beautiful-html-templates com a paleta Itaú Empresas.

Para cada template em public/templates/[slug]/template.html:
  1. Lê o HTML original
  2. Substitui tokens CSS de cor pelos da paleta Itaú
  3. Substitui tokens de fonte por Itau Display Pro
  4. Injeta @font-face para Itau Display Pro (caminhos relativos de samples/[slug]/)
  5. Remove links Google Fonts desnecessários (mantém JetBrains Mono para código)
  6. Salva em samples/[slug]/itau-[slug].html

Usage:
    python scripts/adapt-templates.py
"""

import re
import sys
from pathlib import Path

# ── Caminhos ────────────────────────────────────────────────────────────────
PROJECT_ROOT  = Path(__file__).parent.parent.absolute()
TEMPLATES_DIR = PROJECT_ROOT / "public" / "templates"
SAMPLES_DIR   = PROJECT_ROOT / "samples"

# ── Paleta Itaú Empresas ─────────────────────────────────────────────────────
ITAU_COLORS = {
    "--c-bg":           "#1F3B6B",
    "--c-bg-alt":       "#162d52",
    "--c-bg-light":     "#FFFFFF",
    "--c-bg-light-alt": "#F5F5F5",
    "--c-fg":           "#FFFFFF",
    "--c-fg-2":         "rgba(255,255,255,0.65)",
    "--c-fg-3":         "rgba(255,255,255,0.35)",
    "--c-fg-light":     "#1A1A1A",
    "--c-fg-light-2":   "#555555",
    "--c-fg-light-3":   "#999999",
    "--c-accent":       "#EC7000",
    "--c-emphasis":     "#EC7000",
    "--c-border":       "rgba(255,255,255,0.12)",
    "--c-border-light": "rgba(0,0,0,0.08)",
}

# Fontes substituídas (--f-mono fica com JetBrains Mono)
ITAU_FONTS = {
    "--f-display":    "'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif",
    "--f-heading":    "'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif",
    "--f-body":       "'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif",
    "--f-annotation": "'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif",
    "--f-serif":      "'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif",
    "--f-sans":       "'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif",
}

# @font-face com caminhos relativos a samples/[slug]/
FONT_FACES = """\
    @font-face { font-family: 'Itau Display Pro'; src: url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Lt.woff2') format('woff2'); font-weight: 300; font-display: swap; }
    @font-face { font-family: 'Itau Display Pro'; src: url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Rg.woff2') format('woff2'); font-weight: 400; font-display: swap; }
    @font-face { font-family: 'Itau Display Pro'; src: url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Bd.woff2') format('woff2'); font-weight: 700; font-display: swap; }
    @font-face { font-family: 'Itau Display Pro'; src: url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Blk.woff2') format('woff2'); font-weight: 900; font-display: swap; }"""

# ── Funções de adaptação ─────────────────────────────────────────────────────

def replace_css_var(html: str, var_name: str, new_value: str) -> str:
    """Substitui o valor de uma CSS custom property, preservando o resto da linha."""
    # Captura: --nome: <valor> até o ;  (multi-linha não esperado em var declarations)
    pattern = rf'({re.escape(var_name)}\s*:\s*)([^;\n]+?)(;)'
    return re.sub(pattern, lambda m: f"{m.group(1)}{new_value}{m.group(3)}", html)


def remove_google_fonts(html: str) -> str:
    """Remove links de Google Fonts, mantendo apenas JetBrains Mono."""
    has_jetbrains = bool(re.search(r'JetBrains', html, re.IGNORECASE))

    # Remove tags <link> para Google Fonts que não sejam JetBrains Mono
    def should_keep_link(match):
        link = match.group(0)
        if 'fonts.googleapis.com' not in link:
            return link
        if re.search(r'JetBrains', link, re.IGNORECASE):
            return link
        return ''

    # Links podem ser multi-linha; usar DOTALL
    html = re.sub(r'<link[^>]*fonts\.googleapis\.com[^>]*>', should_keep_link, html, flags=re.DOTALL)
    html = re.sub(r'<link[^>]*rel=["\']preconnect["\'][^>]*fonts\.(googleapis|gstatic)\.com[^>]*>',
                  lambda m: m.group(0) if has_jetbrains else '',
                  html)
    return html


def inject_font_faces(html: str) -> str:
    """Injeta @font-face Itau Display Pro no início do primeiro bloco <style>."""
    block = f"\n    /* ── Itaú Display Pro ─────────────────────────────────────────────── */\n{FONT_FACES}\n"
    return html.replace('<style>', f'<style>{block}', 1)


def inject_itau_logo(html: str, slug: str) -> str:
    """
    Não modifica o conteúdo dos slides — apenas garante que a variável de logo
    está comentada na seção de tokens para referência futura.
    O logo pode ser adicionado manualmente ou pela Skill ao usar o template.
    """
    return html


def update_title(html: str, slug: str) -> str:
    pretty = slug.replace('-', ' ').title()
    return re.sub(
        r'<title>[^<]*</title>',
        f'<title>{pretty} — Itaú Empresas</title>',
        html
    )


def adapt(slug: str) -> str:
    template_path = TEMPLATES_DIR / slug / "template.html"
    if not template_path.exists():
        raise FileNotFoundError(f"Não encontrado: {template_path}")

    html = template_path.read_text(encoding='utf-8')

    html = remove_google_fonts(html)
    html = inject_font_faces(html)

    for var, value in ITAU_COLORS.items():
        html = replace_css_var(html, var, value)

    for var, value in ITAU_FONTS.items():
        html = replace_css_var(html, var, value)

    html = update_title(html, slug)

    return html


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

    GREEN = "\033[0;32m"; RED = "\033[0;31m"; CYAN = "\033[0;36m"; BOLD = "\033[1m"; NC = "\033[0m"

    print(f"\n{BOLD}Adaptar Templates -> Itau Empresas (32 total){NC}")

    slugs = sorted(d.name for d in TEMPLATES_DIR.iterdir() if d.is_dir())

    if not slugs:
        print(f"{RED}✗ Nenhum template encontrado em {TEMPLATES_DIR}{NC}")
        sys.exit(1)

    ok_count, errors = 0, []

    for slug in slugs:
        out_dir = SAMPLES_DIR / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"itau-{slug}.html"
        try:
            adapted = adapt(slug)
            out_path.write_text(adapted, encoding='utf-8')
            print(f"  {GREEN}✓{NC} {slug}")
            ok_count += 1
        except Exception as e:
            print(f"  {RED}✗{NC} {slug}: {e}")
            errors.append(slug)

    print(f"\n{BOLD}{'-' * 50}{NC}")
    print(f"  {GREEN}OK{NC} {ok_count}/{len(slugs)} amostras salvas em samples/")
    if errors:
        print(f"  {RED}ERRO{NC} {', '.join(errors)}")
    print(f"{BOLD}{'-' * 50}{NC}")
    print(f"\n  Proximo passo: python scripts/screenshot-presets.py --samples\n")


if __name__ == "__main__":
    main()

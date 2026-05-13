#!/usr/bin/env python3
"""
adapt-templates.py  —  Adapta os 32 templates beautiful-html-templates com a paleta Itau Empresas.

Estrategia de adaptacao (muito mais abrangente que a versao anterior):

  1. Extrai TODAS as CSS custom properties do bloco :root (nao so --c-*)
  2. Classifica o papel de cada variavel por:
       a. Palavras-chave no nome (bg/paper → fundo, ink/fg → texto, pink/neon → accent, ...)
       b. Luminosidade + saturacao do valor de cor (analise HSL)
  3. Substitui pelo token Itau mais proximo
  4. Tambem substitui cores hardcoded no corpo do CSS (gradients, box-shadows, etc.)
  5. Injeta @font-face Itau Display Pro e remove Google Fonts desnecessarios

Usage:
    python scripts/adapt-templates.py
"""

import re, sys, io, json
from pathlib import Path
from colorsys import rgb_to_hls

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# ── Caminhos ─────────────────────────────────────────────────────────────────
PROJECT_ROOT  = Path(__file__).parent.parent.absolute()
TEMPLATES_DIR = PROJECT_ROOT / "public" / "templates"
SAMPLES_DIR   = PROJECT_ROOT / "samples"

# ── Paleta Itau ───────────────────────────────────────────────────────────────
ITAU = {
    'bg_dark':      '#1F3B6B',
    'bg_dark_alt':  '#162d52',
    'bg_tech':      '#0f1e38',
    'bg_light':     '#FFFFFF',
    'bg_light_alt': '#F5F5F5',
    'bg_warm':      '#FAFAF8',
    'text_on_dark':         '#FFFFFF',
    'text_on_dark_2':       'rgba(255,255,255,0.65)',
    'text_on_dark_3':       'rgba(255,255,255,0.35)',
    'text_on_light':        '#1A1A1A',
    'text_on_light_2':      '#555555',
    'text_on_light_3':      '#999999',
    'accent':       '#EC7000',
    'accent_subtle':'rgba(236,112,0,0.15)',
    'border_dark':  'rgba(255,255,255,0.12)',
    'border_light': 'rgba(0,0,0,0.08)',
}

# Fontes de display/body → Itau Display Pro
FONT_FACES = """\
    @font-face{font-family:'Itau Display Pro';src:url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Lt.woff2') format('woff2');font-weight:300;font-display:swap;}
    @font-face{font-family:'Itau Display Pro';src:url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Rg.woff2') format('woff2');font-weight:400;font-display:swap;}
    @font-face{font-family:'Itau Display Pro';src:url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Bd.woff2') format('woff2');font-weight:700;font-display:swap;}
    @font-face{font-family:'Itau Display Pro';src:url('../../src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Blk.woff2') format('woff2');font-weight:900;font-display:swap;}"""

ITAU_FONT_STACK = "'Itau Display Pro','Helvetica Neue',Arial,sans-serif"
MONO_STACK      = "'JetBrains Mono','Fira Code',monospace"

# ── Analise de cor ────────────────────────────────────────────────────────────

def parse_hex(hex_str: str):
    h = hex_str.strip('#')
    if len(h) == 3: h = ''.join(c*2 for c in h)
    if len(h) < 6: return None
    try:
        r, g, b = int(h[0:2],16)/255, int(h[2:4],16)/255, int(h[4:6],16)/255
        return r, g, b
    except: return None

def luminosity(hex_str: str) -> float:
    c = parse_hex(hex_str)
    if not c: return 0.5
    r, g, b = c
    return 0.2126*r + 0.7152*g + 0.0722*b

def saturation(hex_str: str) -> float:
    c = parse_hex(hex_str)
    if not c: return 0.0
    r, g, b = c
    _h, l, s = rgb_to_hls(r, g, b)
    return s

def hue_deg(hex_str: str) -> float:
    c = parse_hex(hex_str)
    if not c: return 0.0
    r, g, b = c
    h, _l, _s = rgb_to_hls(r, g, b)
    return h * 360

def is_itau_color(hex_str: str) -> bool:
    """True se a cor ja e da paleta Itau (nao precisa substituir)."""
    itau_hexes = {'#EC7000','#1F3B6B','#162d52','#0f1e38','#FFFFFF','#F5F5F5','#FAFAF8','#1A1A1A'}
    return hex_str.upper() in {c.upper() for c in itau_hexes}

# ── Classificacao de papel ────────────────────────────────────────────────────
# Palavras-chave ordenadas por prioridade

ACCENT_KW = {
    # cores nomeadas de destaque visiveis nos templates
    'neon','hot','pink','red','orange','yellow','cyan','teal','turquoise',
    'magenta','coral','mint','lavender','peach','butter','sky','lime',
    'salmon','rose','grape','plum','violet','retro','bright','rainbow',
    'ribbon','stripe','color1','color2','color3','color4','color5','color6',
    'color7','color8','accent','emphasis','primary','highlight','brand',
    'link','focus','active','marker','tag','badge',
    # 8-bit-orbit
    'soft-lavender',
    # peoples-platform
    'blue-deep','orange-deep','red-deep',
    # retro-windows
    'blue-bright','blue-light','green-retro','red-retro','yellow-retro','cyan-retro','blue-navy',
}

BACKGROUND_KW = {
    'bg','background','canvas','void','surface','base','fill','panel','card',
    'paper','cream','parchment','bone','ivory','ledger','sage','forest-green',
    'dark-void','deep','dark','navy','midnight',
    # retro-windows
    'bg-gray','bg-light','bg-dark','btn-face',
    # 8-bit-orbit
    'deep-navy',
}

TEXT_KW = {
    'fg','foreground','text','ink','body','heading','type','label','copy',
    'content','mute','muted','dim','faint','subtle','placeholder','disabled',
    # retro-windows
    'text-dark','black','white',
    # peoples-platform
    'cream','paper','ink',
}

BORDER_KW = {
    'border','line','rule','divider','hair','grid','stroke','outline','edge',
    'frame','separator','track',
    # retro-windows
    'btn-highlight','btn-shadow','btn-dark-shadow',
}

SECONDARY_SUFFIX = {'-2','-3','-alt','_2','_3','soft','light','mute','dim','faint'}

def classify(var_name: str, value: str) -> str:
    """
    Retorna o token Itau adequado dado o nome da variavel e seu valor.
    """
    n = var_name.lower().replace('--','')

    # 1. Fontes — tratadas separadamente, nao classificar como cor
    if any(kw in n for kw in ('font','family','ff-','f-display','f-heading','f-body','f-mono')):
        return None  # sinal para pular

    # 2. Apenas processar se o valor parece uma cor
    has_color = bool(re.search(r'#[0-9a-fA-F]{3,8}\b|rgb\(|rgba\(|hsl\(', value))
    if not has_color:
        return None

    is_secondary = any(s in n for s in SECONDARY_SUFFIX)

    # 3. Accent: nome contem palavra de cor de destaque
    if any(kw in n for kw in ACCENT_KW):
        # excecao: se o nome tambem tem 'bg' ou 'dark' + valor muito escuro → fundo
        if ('bg' in n or 'void' in n or 'dark' in n) and luminosity(value.split('#')[-1] if '#' in value else '888888') < 0.12:
            return ITAU['bg_dark']
        return ITAU['accent']

    # 4. Border
    if any(kw in n for kw in BORDER_KW):
        lum = luminosity(value.split('#')[-1] if '#' in value else '888888')
        return ITAU['border_light'] if lum > 0.5 else ITAU['border_dark']

    # 5. Background
    if any(kw in n for kw in BACKGROUND_KW):
        hex_val = re.search(r'#[0-9a-fA-F]{3,8}', value)
        lum = luminosity(hex_val.group(0)) if hex_val else 0.5
        is_alt = is_secondary or 'alt' in n or '-2' in n or '-dk' in n or 'darker' in n
        if lum < 0.4:   # fundo escuro
            return ITAU['bg_dark_alt'] if is_alt else ITAU['bg_dark']
        elif lum < 0.65: # fundo medio (cinza retro, etc.)
            return ITAU['bg_dark'] if 'dark' in n or 'btn-shadow' in n else ITAU['bg_light_alt']
        else:            # fundo claro
            return ITAU['bg_light_alt'] if is_alt else ITAU['bg_light']

    # 6. Text / Ink
    if any(kw in n for kw in TEXT_KW):
        hex_val = re.search(r'#[0-9a-fA-F]{3,8}', value)
        lum = luminosity(hex_val.group(0)) if hex_val else 0.5
        if lum > 0.55:  # texto claro → em fundo escuro
            if is_secondary: return ITAU['text_on_dark_2']
            return ITAU['text_on_dark']
        else:           # texto escuro → em fundo claro
            if is_secondary: return ITAU['text_on_light_2']
            return ITAU['text_on_light']

    # 7. Fallback: analise da cor em si
    hex_val = re.search(r'#[0-9a-fA-F]{3,8}', value)
    if not hex_val:
        return None
    hx = hex_val.group(0)
    lum = luminosity(hx)
    sat = saturation(hx)
    hue = hue_deg(hx)

    if sat > 0.45:              # saturada = accent
        return ITAU['accent']
    elif lum < 0.22:            # muito escuro = fundo escuro
        return ITAU['bg_dark']
    elif lum > 0.88:            # muito claro = fundo claro ou texto
        return ITAU['bg_light']
    elif lum > 0.6:             # claro medio = texto em fundo escuro
        return ITAU['text_on_dark_2']
    else:                       # escuro medio = texto em fundo claro
        return ITAU['text_on_light_2']

# ── Extracao e substituicao do :root ─────────────────────────────────────────

def extract_root_vars(html: str):
    """Extrai todas as declaracoes --var: value; do primeiro bloco :root."""
    root_match = re.search(r':root\s*\{([^}]*)\}', html, re.DOTALL)
    if not root_match:
        return {}
    block = root_match.group(1)
    # captura --nome: valor; (valor pode ter espacos, parens, hash, aspas)
    pairs = re.findall(r'(--[\w-]+)\s*:\s*([^;]+)\s*;', block)
    return {name.strip(): val.strip() for name, val in pairs}


def replace_root_vars(html: str) -> str:
    """Substitui valores das variaveis de cor no bloco :root."""
    def replace_var(match):
        name = match.group(1)
        colon_ws = match.group(2)
        old_val = match.group(3)
        semicolon = match.group(4)

        # Verifica se e fonte — substituir por Itau Display Pro
        n = name.lower()
        if re.search(r'--f-(display|heading|body|annotation|serif|sans)', n):
            return f'{name}{colon_ws}{ITAU_FONT_STACK}{semicolon}'
        if re.search(r'--f-(mono)', n):
            return f'{name}{colon_ws}{MONO_STACK}{semicolon}'
        if re.search(r'--(font-family|ff-)', n):
            return f'{name}{colon_ws}{ITAU_FONT_STACK}{semicolon}'

        new_val = classify(name, old_val)
        if new_val is None:
            return match.group(0)  # deixar como esta
        return f'{name}{colon_ws}{new_val}{semicolon}'

    # Aplica apenas dentro do bloco :root
    def process_root(m):
        block = m.group(0)
        return re.sub(
            r'(--[\w-]+)(\s*:\s*)([^;]+?)(;)',
            replace_var,
            block
        )

    return re.sub(r'(:root\s*\{[^}]*\})', process_root, html, flags=re.DOTALL)


# ── Substituicao de cores hardcoded no corpo do CSS ──────────────────────────

# Cores que NAO devem ser substituidas (neutras ou ja Itau)
KEEP_COLORS = {
    '#000000','#000','#0a0a0a','#0d0d0d','#111111','#111','#1a1a1a',
    '#ffffff','#fff','#fafafa','#f5f5f5','#f0f0f0',
    '#ec7000','#1f3b6b','#162d52','#0f1e38','#fafaf8',
    'transparent','inherit','currentColor','currentcolor',
}

def should_replace_hardcoded(hex_str: str) -> bool:
    lower = hex_str.lower()
    if lower in KEEP_COLORS: return False
    lum = luminosity(hex_str)
    sat = saturation(hex_str)
    # Deixar cinzas muito neutros (sat < 0.1) e pretos/brancos
    if sat < 0.10 and (lum < 0.08 or lum > 0.92): return False
    # Substituir cores saturadas ou coloridas que nao sao Itau
    return sat > 0.2 or (0.08 < lum < 0.92 and sat > 0.05)

def map_hardcoded_color(hex_str: str) -> str:
    lum = luminosity(hex_str)
    sat = saturation(hex_str)
    hue = hue_deg(hex_str)

    if sat > 0.40:
        # Azul proximo ao Itau (200-260 graus) → manter como azul Itau
        if 190 <= hue <= 265:
            return ITAU['bg_dark']
        # Demais saturados → laranja Itau
        return ITAU['accent']
    elif lum < 0.3:
        return ITAU['bg_dark']
    elif lum > 0.75:
        return ITAU['bg_light']
    elif lum > 0.5:
        return ITAU['text_on_dark_2']
    else:
        return ITAU['text_on_light_2']

def replace_hardcoded_colors(html: str) -> str:
    """
    Substitui cores hex hardcoded fora do bloco :root.
    Preserva :root (ja processado) e comentarios.
    """
    # Extrai o bloco :root para nao reprocessar
    root_match = re.search(r':root\s*\{[^}]*\}', html, re.DOTALL)
    root_span = root_match.span() if root_match else None

    parts = []
    last = 0

    def replace_in_segment(text: str) -> str:
        def hex_replacer(m):
            original = m.group(0)
            if not should_replace_hardcoded(original):
                return original
            return map_hardcoded_color(original)
        # Substitui apenas hex de 6 digitos (evita fragmentos de outros dados)
        return re.sub(r'#[0-9a-fA-F]{6}\b', hex_replacer, text)

    if root_span:
        # Antes do :root
        parts.append(replace_in_segment(html[last:root_span[0]]))
        # O bloco :root em si (ja processado — nao tocar)
        parts.append(html[root_span[0]:root_span[1]])
        last = root_span[1]

    # Depois do :root
    parts.append(replace_in_segment(html[last:]))

    return ''.join(parts)

# ── Fontes e Google Fonts ─────────────────────────────────────────────────────

def remove_google_fonts(html: str) -> str:
    """Remove links Google Fonts, mantendo apenas JetBrains Mono."""
    def keep_link(m):
        tag = m.group(0)
        if 'fonts.googleapis.com' not in tag:
            return tag
        if re.search(r'JetBrains', tag, re.IGNORECASE):
            return tag
        return ''
    html = re.sub(r'<link[^>]*fonts\.googleapis\.com[^>]*/?>', keep_link, html, flags=re.DOTALL)
    # Remove preconnects orphaos se nao sobrou nenhuma googleapis font
    has_gfonts = 'fonts.googleapis.com' in html
    if not has_gfonts:
        html = re.sub(r'<link[^>]*rel=["\']preconnect["\'][^>]*fonts\.(googleapis|gstatic)\.com[^>]*/?>[\s]*', '', html)
    return html

def inject_font_faces(html: str) -> str:
    block = f'\n    /* -- Itau Display Pro -------------------------------- */\n{FONT_FACES}\n'
    return html.replace('<style>', f'<style>{block}', 1)

def replace_font_vars_body(html: str) -> str:
    """Substitui referencias de fontes hardcoded no corpo do CSS."""
    google_font_families = [
        'Cormorant Garamond', 'DM Sans', 'Courier Prime', 'Noto Serif SC', 'Noto Sans SC',
        'Source Serif 4', 'IBM Plex Mono', 'JetBrains Mono',
        'Playfair Display', 'Archivo Black', 'Archivo', 'Shrikhand', 'Bebas Neue',
        'Bricolage Grotesque', 'Instrument Serif', 'Fraunces', 'Alfa Slab One',
        'Caveat', 'Syne', 'Zilla Slab', 'Lora', 'Jost',
        'MS Sans Serif', 'Segoe UI',
    ]
    # Substitui font-family com fontes Google (exceto JetBrains Mono)
    def replace_ff(m):
        full = m.group(0)
        val = m.group(1)
        if 'JetBrains' in val or 'Fira Code' in val:
            return full
        for gf in google_font_families:
            if gf in val:
                return full.replace(val, ITAU_FONT_STACK)
        return full
    html = re.sub(r'font-family\s*:\s*([^;]+);', replace_ff, html)
    return html

def update_title(html: str, slug: str) -> str:
    pretty = slug.replace('-', ' ').title()
    return re.sub(r'<title>[^<]*</title>', f'<title>{pretty} — Itau Empresas</title>', html)

# ── Pipeline principal ────────────────────────────────────────────────────────

def adapt(slug: str) -> str:
    path = TEMPLATES_DIR / slug / "template.html"
    if not path.exists():
        raise FileNotFoundError(f"Nao encontrado: {path}")

    html = path.read_text(encoding='utf-8')

    html = remove_google_fonts(html)
    html = inject_font_faces(html)
    html = replace_root_vars(html)          # substitui variaveis de cor no :root
    html = replace_hardcoded_colors(html)   # substitui hex hardcoded no restante
    html = replace_font_vars_body(html)     # substitui font-family restantes
    html = update_title(html, slug)

    return html

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    GREEN = '\033[0;32m'; RED = '\033[0;31m'; BOLD = '\033[1m'; NC = '\033[0m'

    print(f'\n{BOLD}Adaptar Templates -> Itau Empresas — v2 (analise completa de cores){NC}\n')

    slugs = sorted(d.name for d in TEMPLATES_DIR.iterdir() if d.is_dir())
    if not slugs:
        print(f'{RED}Nenhum template encontrado em {TEMPLATES_DIR}{NC}')
        sys.exit(1)

    ok_count, errors = 0, []
    for slug in slugs:
        out_dir = SAMPLES_DIR / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f'itau-{slug}.html'
        try:
            adapted = adapt(slug)
            out_path.write_text(adapted, encoding='utf-8')
            print(f'  {GREEN}OK{NC} {slug}')
            ok_count += 1
        except Exception as e:
            print(f'  {RED}ERRO{NC} {slug}: {e}')
            errors.append(slug)

    print(f'\n{BOLD}{"-"*55}{NC}')
    print(f'  {GREEN}OK{NC} {ok_count}/{len(slugs)} amostras salvas em samples/')
    if errors:
        print(f'  {RED}ERRO{NC} {", ".join(errors)}')
    print(f'{BOLD}{"-"*55}{NC}')
    print('\n  Proximo passo: python scripts/screenshot-presets.py --samples\n')

if __name__ == '__main__':
    main()

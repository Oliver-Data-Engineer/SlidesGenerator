# Tipografia — Itaú Empresas

## Família Tipográfica

**Itau Display Pro** — fonte exclusiva do grupo Itaú.

### Pesos Disponíveis
| Peso | Nome | Uso em slides |
|------|------|---------------|
| 300 | Light | Subtítulos longos, notas de rodapé |
| 400 | Regular | Corpo de texto, bullet points |
| 700 | Bold | Destaques, números grandes, palavras-chave |
| 900 | Black | Títulos principais, impacto visual |

Arquivos disponíveis em: `src/assets/fonts/itau-display-pro/`

### Fallback Stack
```css
font-family: 'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;
```

---

## Escala Tipográfica para Slides (1920×1080)

| Elemento | Tamanho | Peso | Line-height | Letter-spacing |
|----------|---------|------|-------------|----------------|
| Título de slide | 56px | Black (900) | 1.1 | -0.02em |
| Subtítulo | 36px | Regular (400) | 1.3 | -0.01em |
| Título de seção | 48px | Bold (700) | 1.2 | -0.02em |
| Corpo / bullet | 24px | Regular (400) | 1.5 | 0 |
| Destaque / stat | 72px | Black (900) | 1.0 | -0.03em |
| Legenda / nota | 16px | Light (300) | 1.4 | 0.01em |
| Código inline | 20px | Regular (400) | 1.6 | 0 |
| Rodapé / speaker note | 14px | Light (300) | 1.4 | 0 |

---

## CSS Custom Properties

```css
:root {
  /* Família */
  --font-family-base: 'Itau Display Pro', 'Helvetica Neue', Arial, sans-serif;

  /* Tamanhos */
  --font-size-title: 56px;
  --font-size-subtitle: 36px;
  --font-size-section: 48px;
  --font-size-body: 24px;
  --font-size-stat: 72px;
  --font-size-caption: 16px;
  --font-size-code: 20px;
  --font-size-footer: 14px;

  /* Pesos */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-bold: 700;
  --font-weight-black: 900;
}
```

---

## @font-face (para HTML autocontido)

```css
@font-face {
  font-family: 'Itau Display Pro';
  src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Rg.woff2') format('woff2'),
       url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Rg.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Itau Display Pro';
  src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Lt.woff2') format('woff2'),
       url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Lt.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Itau Display Pro';
  src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Bd.woff2') format('woff2'),
       url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Bd.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Itau Display Pro';
  src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Blk.woff2') format('woff2'),
       url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_Blk.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Itau Display Pro';
  src: url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_He.woff2') format('woff2'),
       url('src/assets/fonts/itau-display-pro/ItauDisplayPro_W_He.woff') format('woff');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
```

---

## Regras de Uso

- **Nunca** usar fonte diferente de Itau Display Pro em slides oficiais
- **Nunca** usar itálico — a família não possui variante italic oficial para slides
- Texto em caps lock apenas para **labels curtos** (ex: "SEÇÃO 1")
- Em slides de código, usar fonte monospace: `'JetBrains Mono', 'Fira Code', monospace`

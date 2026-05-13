# Style Presets — Itaú Empresas

Presets visuais curados para apresentações da marca **Itaú Empresas**. Todos os presets usam exclusivamente as cores, fontes e logos oficiais da marca. **Sem "AI slop" — cada preset tem personalidade própria.**

> **CSS de base:** Incluir sempre o conteúdo de `viewport-base.css` em toda apresentação.

---

## Presets Nativos da Marca

### 1. Itaú Escuro

**Vibe:** Executivo, confiante, premium, institucional

**Layout:** Fundo azul escuro com destaques em laranja. Números grandes, hierarquia clara.

**Tipografia:**
- Display: `Itau Display Pro` (900/Black) — local via `@font-face`
- Body: `Itau Display Pro` (400/Regular)

**Cores:**
```css
:root {
    --bg-primary:    #1F3B6B;  /* Azul Itaú */
    --bg-secondary:  #162d52;  /* Azul mais escuro para cards */
    --text-primary:  #FFFFFF;
    --text-secondary: rgba(255,255,255,0.65);
    --accent:        #EC7000;  /* Laranja Itaú */
    --accent-subtle: rgba(236,112,0,0.12);
    --border:        rgba(255,255,255,0.10);
}
```

**Elementos Assinatura:**
- Barra laranja de 4px acima de seções
- Números de métricas em `clamp(3rem, 8vw, 5rem)` em laranja
- Rodapé com linha `rgba(255,255,255,0.12)` + logo branca

**Logo:** `src/assets/logos/logo-itau-branca.png`

---

### 2. Itaú Claro

**Vibe:** Transparente, acessível, corporativo limpo

**Layout:** Fundo branco com acentos em laranja e azul. Ideal para relatórios e conteúdo denso.

**Tipografia:**
- Display: `Itau Display Pro` (900)
- Body: `Itau Display Pro` (400)

**Cores:**
```css
:root {
    --bg-primary:    #FFFFFF;
    --bg-secondary:  #F5F5F5;  /* Cards, blocos de destaque */
    --text-primary:  #1A1A1A;
    --text-secondary: #555555;
    --accent:        #EC7000;
    --accent-blue:   #1F3B6B;
    --border:        rgba(0,0,0,0.08);
}
```

**Elementos Assinatura:**
- `border-left: 4px solid #EC7000` em todos os cards
- Títulos de seção em `#1F3B6B`
- Stats em `#EC7000`, labels em cinza

**Logo:** `src/assets/logos/logo-itau-laranja.png`

---

### 3. Itaú Split

**Vibe:** Moderno, dinâmico, executivo com personalidade

**Layout:** Painel dividido — azul escuro à esquerda (30%), branco à direita (70%). Título cruza a divisão.

**Tipografia:**
- Display: `Itau Display Pro` (900)
- Body: `Itau Display Pro` (300/400)

**Cores:**
```css
:root {
    --panel-dark:    #1F3B6B;
    --panel-light:   #FFFFFF;
    --accent:        #EC7000;
    --text-on-dark:  #FFFFFF;
    --text-on-light: #1A1A1A;
    --divider:       4px solid #EC7000;
}
```

**Elementos Assinatura:**
- Linha vertical laranja como divisor
- Número do slide grande no painel escuro
- Título que "vaza" do painel escuro para o claro

**Logo:** `src/assets/logos/logo-itau-branca.png` no painel escuro

---

### 4. Itaú Laranja

**Vibe:** Alta energia, impactante, lançamentos, chamadas para ação

**Layout:** Fundo laranja puro com texto branco. Reservar para slides de seção, título e encerramento.

**Tipografia:**
- Display: `Itau Display Pro` (900)
- Body: `Itau Display Pro` (300)

**Cores:**
```css
:root {
    --bg-primary:    #EC7000;
    --bg-secondary:  rgba(31,59,107,0.15);  /* Sombra azulada nos cards */
    --text-primary:  #FFFFFF;
    --text-secondary: rgba(255,255,255,0.70);
    --accent:        #FFFFFF;
    --border:        rgba(255,255,255,0.20);
}
```

**Elementos Assinatura:**
- Letra inicial enorme `(S/T/A/R)` em `rgba(255,255,255,0.10)` no fundo
- Texto de tagline em `rgba(255,255,255,0.70)`
- Círculos decorativos com `border: 1px solid rgba(255,255,255,0.15)`

**Logo:** `src/assets/logos/logo-itau-branca.png`

---

### 5. Itaú Tech

**Vibe:** Técnico, preciso, desenvolvedor, dados

**Layout:** Azul escuro com código, grid pattern sutil e destaques laranja em elementos-chave.

**Tipografia:**
- Display: `Itau Display Pro` (700/900)
- Code: `JetBrains Mono` (400/700) via Google Fonts
- Body: `Itau Display Pro` (400)

**Cores:**
```css
:root {
    --bg-primary:    #0f1e38;  /* Azul mais profundo para código */
    --bg-code:       rgba(0,0,0,0.35);
    --bg-card:       rgba(255,255,255,0.05);
    --text-primary:  #E8EDF5;
    --text-code:     #C5CDE6;
    --accent:        #EC7000;
    --accent-green:  #2E7D32;  /* Sucesso */
    --border:        rgba(255,255,255,0.08);
}
```

**Elementos Assinatura:**
- Blocos de código com `border-left: 4px solid #EC7000`
- Grid pattern `rgba(255,255,255,0.03)` no fundo
- Tags/badges monoespaçados para status (OK, ERRO, NOVO)
- Números de linha em código coloridos em `#EC7000`

**Logo:** `src/assets/logos/logo-itau-branca.png`

---

### 6. Itaú Editorial

**Vibe:** Relatórios premium, publicações, anuais, stakeholders externos

**Layout:** Composição editorial com hierarquia tipográfica forte. Alternância de slides brancos e azuis com pull quotes.

**Tipografia:**
- Display: `Itau Display Pro` (900) em tamanhos maiores que o normal
- Body: `Itau Display Pro` (300) com `line-height: 1.7`

**Cores:**
```css
:root {
    --bg-primary:    #FAFAF8;  /* Branco levemente quente */
    --bg-dark:       #1F3B6B;
    --text-primary:  #1A1A1A;
    --text-secondary: #666666;
    --accent:        #EC7000;
    --pull-quote-bg: rgba(236,112,0,0.06);
    --rule-color:    #CCCCCC;
}
```

**Elementos Assinatura:**
- Linhas horizontais finas `1px solid #CCCCCC` como divisores
- Pull quotes com `font-size: clamp(1.5rem, 3vw, 2.5rem)` e borda laranja esquerda
- Drop caps em laranja na primeira letra de parágrafos de abertura
- Numeração de slide discreta: `0X / 12`

**Logo:** `src/assets/logos/logo-itau-laranja.png` ou `logo-itau-azul-escuro.png`

---

## Presets Criativos (Cores da Marca como Accent)

Para apresentações externas ou criativas onde o padrão institucional pode ser flexibilizado, adaptando os presets do repositório de referência com as cores da marca Itaú Empresas:

### 7. Bold Signal (Adaptado Itaú)

**Vibe:** Confiante, moderno, alto impacto

**Adapt:** Card colorido em `#EC7000` sobre fundo escuro `#1A1A1A`

```css
:root {
    --bg-primary:   #1a1a1a;
    --card-bg:      #EC7000;
    --text-primary: #ffffff;
    --text-on-card: #1F3B6B;  /* Azul Itaú no card laranja */
    --font-display: 'Archivo Black', sans-serif;  /* via Google Fonts */
}
```

---

### 8. Swiss Modern (Adaptado Itaú)

**Vibe:** Clean, preciso, Bauhaus-inspired

**Adapt:** Branco + preto + `#EC7000` como vermelho suíço

```css
:root {
    --bg-primary:   #FFFFFF;
    --text-primary: #1A1A1A;
    --accent:       #EC7000;  /* substitui o red #ff3300 */
    --font-display: 'Archivo', sans-serif;
}
```

---

## Tabela de Referência Rápida

| Preset | Fundo | Accent | Logo | Uso Principal |
|--------|-------|--------|------|---------------|
| Itaú Escuro | `#1F3B6B` | `#EC7000` | Branca | Apresentações executivas padrão |
| Itaú Claro | `#FFFFFF` | `#EC7000` | Laranja | Relatórios, conteúdo denso |
| Itaú Split | Azul + Branco | `#EC7000` | Branca | Pitch decks modernos |
| Itaú Laranja | `#EC7000` | `#FFFFFF` | Branca | Seções de impacto, CTAs |
| Itaú Tech | `#0f1e38` | `#EC7000` | Branca | Apresentações técnicas |
| Itaú Editorial | `#FAFAF8` | `#EC7000` | Laranja/Azul | Relatórios anuais, stakeholders |

---

## Regras de Combinação de Fundos × Logo

| Fundo do slide | Logo a usar |
|----------------|-------------|
| `#1F3B6B` (Azul) | `logo-itau-branca.png` |
| `#EC7000` (Laranja) | `logo-itau-branca.png` |
| `#1A1A1A` (Preto) | `logo-itau-branca.png` |
| `#FFFFFF` (Branco) | `logo-itau-laranja.png` |
| `#F5F5F5` (Cinza claro) | `logo-itau-azul-escuro.png` |

---

## NÃO USAR

**Fontes:** Inter, Roboto, Arial como principal (apenas como fallback stack)

**Cores:** Qualquer cor fora da paleta Itaú Empresas, gradientes roxos, azuis genéricos

**Layouts:** Tudo centralizado sem hierarquia, cards genéricos idênticos

**Efeitos:** Glassmorphism excessivo, sombras sem propósito, gradients rainbow

**Animações:** zoom, flip, bounce, convex, concave, rotações desnecessárias

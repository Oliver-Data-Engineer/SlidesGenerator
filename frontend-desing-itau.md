---
name: frontend-design-itau
description: Crie interfaces frontend de alta qualidade visual para o ecossistema do Itaú Unibanco, respeitando rigorosamente o design system e os brand tokens oficiais da marca (cores, tipografia, logos, acessibilidade). Use esta skill SEMPRE que o usuário pedir qualquer interface, componente, tela, landing page, dashboard, protótipo ou artefato visual que mencione "Itaú", "banco", "financeiro", "banking" ou peça para seguir "a identidade visual do Itaú". Também acione quando o usuário mencionar o laranja #FF6200, o azul escuro #000D3C ou os logos SVG do Itaú. A skill garante aderência à paleta oficial, regras de contraste WCAG, e estética característica da marca — sem improviso e sem dependências externas.
---

# Frontend Design — Itaú Brand System (Self-Contained)

Este skill é **completamente autossuficiente**: contém tanto as diretrizes de qualidade de produção do skill base `frontend-design` quanto todos os brand tokens oficiais do Itaú Unibanco. Não há dependências externas. Toda interface gerada deve ser indistinguível de uma peça produzida pelo time de design do banco — precisa, acessível, criativa e memorável.

---

## PARTE 1 — Design Thinking (Base de Qualidade)

### Antes de codificar, defina a direção

Entenda o contexto e comprometa-se com uma **direção estética clara** dentro do sistema de marca Itaú:

- **Propósito**: Que problema esta interface resolve? Quem vai usá-la?
- **Tom**: Dentro da paleta Itaú, escolha um extremo: institucional/sóbrio, vibrante/energético, digital/leve, editorial/premium. Há muitas combinações possíveis — execute uma com precisão.
- **Restrições**: Requisitos técnicos (framework, performance, acessibilidade WCAG).
- **Diferenciação**: O que torna esta interface INESQUECÍVEL dentro da linguagem da marca? Qual o elemento que alguém vai lembrar?

**CRÍTICO**: Escolha uma direção conceitual clara e execute com precisão. Maximalismo audacioso e minimalismo refinado ambos funcionam — a chave é intencionalidade, não intensidade. A criatividade vive nos layouts, composição e micro-interações, **nunca** na paleta (que é fixa pela marca).

Implemente código funcional (HTML/CSS/JS, React, Vue, etc.) que seja:
- **Pronto para produção** e plenamente funcional
- **Visualmente impactante** e memorável dentro da linguagem Itaú
- **Coeso** com um ponto de vista estético claro
- **Meticulosamente refinado** em cada detalhe

---

## PARTE 2 — Identidade Visual Itaú: Princípio Central

O Itaú tem uma estética **precisa e confiante**: azul escuro como base de autoridade, laranja como acento enérgico, tipografia sem serifa geométrica e limpa. Nunca improvise com cores ou fontes. Toda decisão de cor, espaçamento e layout deve ser justificável pelos tokens abaixo.

---

## PARTE 3 — Paleta de Cores Oficial

### 3.1 Paleta Principal (Brand Colors)

```css
:root {
  /* === CORES PRIMÁRIAS === */
  --itau-azul-escuro:   #000D3C;  /* Cor dominante. Fundos, headers, elementos âncora */
  --itau-branco:        #FFFFFF;  /* Textos e ícones sobre azul escuro e azul vibrante */
  --itau-laranja:       #FF6200;  /* Acento de marca. CTAs, destaques, hover states */
  --itau-azul-vibrante: #0131FF;  /* Links, indicadores de progresso, badges */
  --itau-preto:         #000000;  /* Textos sobre laranja; alternativa ao azul escuro */

  /* === PALETA-BASE (Grayscale) === */
  --itau-gray-50:  #F1F2F4;  /* Cinza Extra Leve — backgrounds sutis */
  --itau-gray-100: #E3E5E8;  /* Cinza Muito Leve — bordas, dividers */
  --itau-gray-200: #CFD1D3;  /* Cinza Leve */
  --itau-gray-300: #B3B3B3;  /* Cinza Claro */
  --itau-gray-400: #999999;  /* Cinza Médio — use com cautela (baixo contraste) */
  --itau-gray-500: #6E6E6E;  /* Cinza Grafite — textos secundários */
  --itau-gray-600: #4C4C4C;  /* Cinza Escuro 1 — textos sobre branco */
  --itau-gray-700: #3B3B3B;  /* Cinza Escuro 2 */
  --itau-gray-800: #262626;  /* Cinza Quase Preto */
  --itau-gray-900: #000000;  /* Preto Absoluto */
}
```

### 3.2 Regras de Contraste e Acessibilidade (WCAG)

> ⚠️ CRÍTICO: Combinações inválidas causam reprovação automática no design review do Itaú.

**✅ Combinações PERMITIDAS**

| Fundo                      | Texto / Ícone permitido                                        |
|----------------------------|----------------------------------------------------------------|
| `#000D3C` Azul Escuro      | `#FFFFFF` Branco **ou** `#FF6200` Laranja                      |
| `#FFFFFF` Branco           | `#000D3C` Azul Escuro, `#4C4C4C` Cinza Escuro, `#000000` Preto |
| `#FF6200` Laranja          | `#000D3C` Azul Escuro **ou** `#000000` Preto                   |
| `#0131FF` Azul Vibrante    | `#FFFFFF` Branco (somente)                                     |
| Cinzas claros (`#F1F2F4`)  | `#000D3C` Azul Escuro ou cores muito escuras da paleta-base    |

**❌ Combinações PROIBIDAS**

| Combinação                       | Motivo                     |
|----------------------------------|----------------------------|
| `#0131FF` sobre `#000D3C`        | Contraste insuficiente     |
| `#FF6200` sobre `#0131FF`        | Ilegível                   |
| `#FFFFFF` sobre `#FF6200`        | Ilegível — nunca usar      |
| `#0131FF` sobre `#FF6200`        | Ilegível — nunca usar      |
| `#999999` sobre `#FFFFFF`        | Falha WCAG AA              |
| `#FFFFFF` sobre `#F1F2F4`        | Contraste quase zero       |

---

## PARTE 4 — Logos Oficiais (SVG Inline)

Use os logos conforme o fundo onde serão aplicados. Sempre inline — nunca como `<img src>` externo.

### Regra de seleção do logo

| Fundo da interface              | Logo a usar              |
|---------------------------------|--------------------------|
| Branco / Cinzas claros          | Laranja ou Azul Escuro   |
| `#000D3C` Azul Escuro           | Branco                   |
| `#FF6200` Laranja               | Azul Escuro ou Preto     |
| `#0131FF` Azul Vibrante         | Branco                   |
| Fotografia escura / hero dark   | Branco                   |

### Logo Laranja — sobre fundos brancos ou claros

```html
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.1302 38.9144C29.1302 39.7841 29.7302 40.2168 30.7023 40.2168C31.7978 40.2168 32.565 39.4308 32.565 38.2935V37.4447C32.4208 37.4238 32.0277 37.4029 31.779 37.4029C30.0835 37.4029 29.1323 37.9193 29.1323 38.9123L29.1302 38.9144Z" fill="#FF6200"/>
  <path d="M49.9295 14.1262C49.4884 12.0106 48.2549 10.5994 45.8737 10.0705C41.9936 9.10045 36.2612 8.57153 29.9999 8.57153C23.7385 8.57153 18.0061 9.10045 14.126 10.0705C11.7448 10.5994 10.5114 12.0106 10.0702 14.1262C9.18801 17.8308 8.57129 23.7388 8.57129 30.0001C8.57129 36.2614 9.18801 42.1694 10.0702 45.874C10.5114 47.9896 11.7448 49.4008 14.126 49.9297C18.0061 50.8997 23.7385 51.4287 29.9999 51.4287C36.2612 51.4287 41.9936 50.8997 45.8737 49.9297C48.2549 49.4008 49.4884 47.9896 49.9295 45.874C50.8117 42.1694 51.4284 36.2614 51.4284 30.0001C51.4284 23.7388 50.8117 17.8308 49.9295 14.1262ZM39.4535 28.221L44.6863 27.2907V30.021H39.4535V28.221ZM16.4528 42.2029H13.3086V31.4677H16.4528V42.2029ZM14.8807 30.3513C13.7852 30.3513 13.0201 29.628 13.0201 28.5513C13.0201 27.4747 13.7852 26.7513 14.8807 26.7513C15.9762 26.7513 16.7434 27.4747 16.7434 28.5513C16.7434 29.628 15.9783 30.3513 14.8807 30.3513ZM25.0995 33.9095H22.3692V38.2935C22.3692 39.4308 22.8249 39.9283 23.8368 39.9283C24.3134 39.9283 24.7253 39.8656 24.9532 39.805V42.205C24.6019 42.3074 23.8786 42.4119 23.0089 42.4119C20.5901 42.4119 19.2229 41.1095 19.2229 38.5025V33.9116H17.6507V31.4719H19.2229V28.7834L22.3671 28.2252V31.4719H25.0974V33.9116L25.0995 33.9095ZM35.565 42.2029H32.6277L32.5859 41.0865C31.9441 41.9541 31.0347 42.4726 29.772 42.4726C27.5183 42.4726 26.0905 41.191 26.0905 39.1632C26.0905 36.8259 28.179 35.4607 31.4884 35.4607C31.8814 35.4607 32.2953 35.4816 32.5441 35.5025C32.5441 34.3444 31.7371 33.6816 30.2905 33.6816C29.1323 33.6816 27.8905 33.9722 26.6507 34.4468V31.9234C27.9134 31.4468 29.2159 31.2001 30.788 31.2001C33.8486 31.2001 35.5671 32.8349 35.5671 35.8956V42.205L35.565 42.2029ZM46.6932 42.2029H43.6744L43.6326 41.0447C42.9302 41.9959 42.0396 42.4726 40.7371 42.4726C38.5253 42.4726 37.1183 40.9004 37.1183 38.4398V31.4698H40.2626V37.9234C40.2626 39.2259 40.8208 39.9304 41.8556 39.9304C42.8905 39.9304 43.5511 39.1025 43.5511 37.8001V31.4719H46.6953V42.2071L46.6932 42.2029Z" fill="#FF6200"/>
</svg>
```

### Logo Azul Escuro — variante institucional sobre fundos brancos ou claros

```html
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.57129 30.0001C8.57129 23.7392 9.18843 17.8306 10.0703 14.1272C10.5113 12.0111 11.7461 10.6001 14.127 10.0706C18.007 9.10058 23.7389 8.57153 29.9999 8.57153C36.2608 8.57153 41.9927 9.10058 45.8727 10.0706C48.2537 10.5996 49.4884 12.0106 49.9294 14.1272C50.8113 17.8311 51.4284 23.7392 51.4284 30.0001C51.4284 36.2611 50.8113 42.1696 49.9294 45.873C49.4884 47.9892 48.2537 49.4001 45.8727 49.9296C41.9927 50.8996 36.2608 51.4287 29.9999 51.4287C23.7389 51.4287 18.007 50.8996 14.127 49.9296C11.7461 49.4006 10.5113 47.9896 10.0703 45.873C9.18843 42.1696 8.57129 36.2611 8.57129 30.0001Z" fill="#000066"/>
  <path d="M14.8799 30.3515C15.9765 30.3515 16.7418 29.6073 16.7418 28.552C16.7418 27.4968 15.9765 26.7525 14.8799 26.7525C13.7832 26.7525 13.0184 27.4972 13.0184 28.552C13.0184 29.6068 13.7837 30.3515 14.8799 30.3515ZM16.4518 42.2034V31.4687H13.308V42.2034H16.4518ZM19.2232 33.9092V38.5011C19.2232 41.1073 20.5889 42.4106 23.0084 42.4106C23.8775 42.4106 24.6013 42.3068 24.9527 42.2034V39.8044C24.7251 39.8663 24.3113 39.9282 23.8356 39.9282C22.8222 39.9282 22.367 39.432 22.367 38.2939V33.9092H25.097V31.4687H22.367V28.2211L19.2227 28.7792V31.4687H17.6513V33.9092H19.2232ZM29.7722 42.4725C31.0342 42.4725 31.9441 41.9553 32.5856 41.0868L32.627 42.2034H35.5641V35.8949C35.5641 32.8339 33.8475 31.1996 30.7861 31.1996C29.2146 31.1996 27.9113 31.4477 26.6494 31.9234V34.4473C27.8903 33.9711 29.1313 33.6815 30.2899 33.6815C31.7375 33.6815 32.5446 34.3434 32.5446 35.502C32.2965 35.4815 31.8827 35.4606 31.4894 35.4606C28.1799 35.4606 26.0908 36.8258 26.0908 39.163C26.0908 41.1901 27.5175 42.4725 29.7722 42.4725ZM31.7784 37.4044C32.0265 37.4044 32.4199 37.4253 32.5646 37.4463V38.2939C32.5646 39.432 31.7989 40.2177 30.7027 40.2177C29.7303 40.2177 29.1308 39.7834 29.1308 38.9144C29.1308 37.9215 30.0822 37.4044 31.7784 37.4044ZM40.7346 42.4725C42.038 42.4725 42.9275 41.9963 43.6303 41.0453L43.6718 42.2034H46.6918V31.4687H43.548V37.7977C43.548 39.1011 42.9065 39.9282 41.8518 39.9282C40.797 39.9282 40.2589 39.2249 40.2589 37.922V31.4687H37.1151V38.4392C37.1151 40.9001 38.5218 42.4725 40.7346 42.4725ZM44.6851 30.0206V27.2906L39.4522 28.2215V30.0211L44.6851 30.0206Z" fill="white"/>
</svg>
```

### Logo Branco — sobre fundos azul escuro, azul vibrante, laranja ou fotos escuras

```html
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M31.7784 37.4049C32.0265 37.4049 32.4199 37.4258 32.5646 37.4468V38.2944C32.5646 39.4325 31.7989 40.2182 30.7027 40.2182C29.7303 40.2182 29.1308 39.7839 29.1308 38.9149C29.1308 37.922 30.0822 37.4049 31.7784 37.4049ZM51.4284 30.0001C51.4284 36.2611 50.8113 42.1696 49.9294 45.873C49.4884 47.9891 48.2537 49.4001 45.8727 49.9296C41.9927 50.8996 36.2608 51.4287 29.9999 51.4287C23.7389 51.4287 18.007 50.8996 14.127 49.9296C11.7461 49.4006 10.5113 47.9896 10.0703 45.873C9.18843 42.1696 8.57129 36.2611 8.57129 30.0001C8.57129 23.7391 9.18843 17.8306 10.0703 14.1272C10.5113 12.0111 11.7461 10.6001 14.127 10.0706C18.007 9.10058 23.7389 8.57153 29.9999 8.57153C36.2608 8.57153 41.9927 9.10058 45.8727 10.0706C48.2537 10.5996 49.4884 12.0106 49.9294 14.1272C50.8113 17.8311 51.4284 23.7391 51.4284 30.0001ZM39.4527 30.0206H44.6856V27.2906L39.4527 28.2215V30.0211V30.0206ZM16.4518 31.4687H13.308V42.2034H16.4518V31.4687ZM16.7413 28.552C16.7413 27.4763 15.9761 26.7525 14.8794 26.7525C13.7827 26.7525 13.018 27.4972 13.018 28.552C13.018 29.6068 13.7832 30.3515 14.8794 30.3515C15.9756 30.3515 16.7413 29.6072 16.7413 28.552ZM25.0975 31.4687H22.3675V28.2211L19.2232 28.7791V31.4687H17.6518V33.9091H19.2232V38.5011C19.2232 41.1072 20.5889 42.4106 23.0084 42.4106C23.8775 42.4106 24.6013 42.3068 24.9527 42.2034V39.8044C24.7251 39.8663 24.3113 39.9282 23.8356 39.9282C22.8222 39.9282 22.367 39.432 22.367 38.2939V33.9091H25.097V31.4687H25.0975ZM35.5637 35.8949C35.5637 32.8339 33.847 31.1996 30.7856 31.1996C29.2141 31.1996 27.9108 31.4477 26.6489 31.9234V34.4472C27.8899 33.9711 29.1308 33.6815 30.2894 33.6815C31.737 33.6815 32.5441 34.3434 32.5441 35.502C32.2961 35.4815 31.8822 35.4606 31.4889 35.4606C28.1794 35.4606 26.0903 36.8258 26.0903 39.163C26.0903 41.1901 27.5175 42.4725 29.7722 42.4725C31.0341 42.4725 31.9441 41.9553 32.5856 41.0868L32.627 42.2034H35.5641V35.8949H35.5637ZM46.6913 31.4687H43.5475V37.7977C43.5475 39.1011 42.9061 39.9282 41.8513 39.9282C40.7965 39.9282 40.2584 39.2249 40.2584 37.922V31.4687H37.1146V38.4391C37.1146 40.9001 38.5208 42.4725 40.7337 42.4725C42.037 42.4725 42.9265 41.9963 43.6294 41.0453L43.6708 42.2034H46.6908V31.4687H46.6913Z" fill="white"/>
</svg>
```

### Logo Preto — sobre fundos laranja quando contraste máximo é necessário

```html
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.1302 38.9144C29.1302 39.7841 29.7302 40.2168 30.7023 40.2168C31.7978 40.2168 32.565 39.4308 32.565 38.2935V37.4447C32.4208 37.4238 32.0277 37.4029 31.779 37.4029C30.0835 37.4029 29.1323 37.9193 29.1323 38.9123L29.1302 38.9144Z" fill="black"/>
  <path d="M49.9295 14.1262C49.4884 12.0106 48.2549 10.5994 45.8737 10.0705C41.9936 9.10045 36.2612 8.57153 29.9999 8.57153C23.7385 8.57153 18.0061 9.10045 14.126 10.0705C11.7448 10.5994 10.5114 12.0106 10.0702 14.1262C9.18801 17.8308 8.57129 23.7388 8.57129 30.0001C8.57129 36.2614 9.18801 42.1694 10.0702 45.874C10.5114 47.9896 11.7448 49.4008 14.126 49.9297C18.0061 50.8997 23.7385 51.4287 29.9999 51.4287C36.2612 51.4287 41.9936 50.8997 45.8737 49.9297C48.2549 49.4008 49.4884 47.9896 49.9295 45.874C50.8117 42.1694 51.4284 36.2614 51.4284 30.0001C51.4284 23.7388 50.8117 17.8308 49.9295 14.1262ZM39.4535 28.221L44.6863 27.2907V30.021H39.4535V28.221ZM16.4528 42.2029H13.3086V31.4677H16.4528V42.2029ZM14.8807 30.3513C13.7852 30.3513 13.0201 29.628 13.0201 28.5513C13.0201 27.4747 13.7852 26.7513 14.8807 26.7513C15.9762 26.7513 16.7434 27.4747 16.7434 28.5513C16.7434 29.628 15.9783 30.3513 14.8807 30.3513ZM25.0995 33.9095H22.3692V38.2935C22.3692 39.4308 22.8249 39.9283 23.8368 39.9283C24.3134 39.9283 24.7253 39.8656 24.9532 39.805V42.205C24.6019 42.3074 23.8786 42.4119 23.0089 42.4119C20.5901 42.4119 19.2229 41.1095 19.2229 38.5025V33.9116H17.6507V31.4719H19.2229V28.7834L22.3671 28.2252V31.4719H25.0974V33.9116L25.0995 33.9095ZM35.565 42.2029H32.6277L32.5859 41.0865C31.9441 41.9541 31.0347 42.4726 29.772 42.4726C27.5183 42.4726 26.0905 41.191 26.0905 39.1632C26.0905 36.8259 28.179 35.4607 31.4884 35.4607C31.8814 35.4607 32.2953 35.4816 32.5441 35.5025C32.5441 34.3444 31.7371 33.6816 30.2905 33.6816C29.1323 33.6816 27.8905 33.9722 26.6507 34.4468V31.9234C27.9134 31.4468 29.2159 31.2001 30.788 31.2001C33.8486 31.2001 35.5671 32.8349 35.5671 35.8956V42.205L35.565 42.2029ZM46.6932 42.2029H43.6744L43.6326 41.0447C42.9302 41.9959 42.0396 42.4726 40.7371 42.4726C38.5253 42.4726 37.1183 40.9004 37.1183 38.4398V31.4698H40.2626V37.9234C40.2626 39.2259 40.8208 39.9304 41.8556 39.9304C42.8905 39.9304 43.5511 39.1025 43.5511 37.8001V31.4719H46.6953V42.2071L46.6932 42.2029Z" fill="black"/>
</svg>
```

---

## PARTE 5 — Tipografia

### Hierarquia de preferência

```css
/* Ordem 1: Fonte oficial Itaú (se disponível via brand kit interno) */
font-family: 'ItauText', sans-serif;

/* Ordem 2: Google Fonts — DNA geométrico-humanista da marca */
/* Display / Títulos — nunca Inter como fonte de display */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

/* Alternativas display igualmente válidas: Plus Jakarta Sans, Sora */
```

### Hierarquia tipográfica

```css
:root {
  --font-display: 'DM Sans', sans-serif;  /* Títulos H1–H2 */
  --font-body:    'DM Sans', sans-serif;  /* Body, labels, captions */
}

/* H1 — Impacto máximo */
h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* H2 — Hierarquia secundária */
h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
}

/* Body */
p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Caption / Label */
.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

> ⚠️ **NUNCA** use Inter, Roboto ou Arial como fonte display — são genéricos demais para headers de marca Itaú. DM Sans, Plus Jakarta Sans ou Sora são as alternativas corretas.

---

## PARTE 6 — Estética e Diretrizes de Design

### 6.1 Tipografia (aplicada à marca)

Escolha fontes que sejam belas e distintivas dentro do DNA Itaú: geométricas, humanistas, sem serifa. Pares recomendados:
- **Display**: DM Sans 800 / Plus Jakarta Sans 700 / Sora 700
- **Body**: DM Sans 400 / mesma família em peso regular

### 6.2 Cor e Tema

Comprometa-se com a paleta oficial. Use CSS variables para consistência total. A dominância do `#000D3C` com acento `#FF6200` supera sempre paletas tímidas de distribuição igual. O `#0131FF` é reservado para elementos de ação e informação — nunca como fundo dominante.

### 6.3 Motion e Animações

Use animações **funcionais e contidas** — o Itaú é uma marca de confiança, não de entretenimento.

```css
:root {
  --ease-itau:  cubic-bezier(0.4, 0, 0.2, 1);   /* Padrão — suave e confiante */
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);  /* Entrada de elementos */
  --dur-fast:   150ms;
  --dur-base:   250ms;
  --dur-slow:   400ms;
}

/* Entrada de elementos — stagger recomendado */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Reduced motion — obrigatório */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**NUNCA use:** parallax pesado, partículas aleatórias, gradientes animados berrantes, animações sem propósito funcional.

**USE:** um page load bem orquestrado com stagger de elementos cria mais impacto do que dezenas de micro-interações dispersas.

### 6.4 Composição Espacial

- Assimetria intencional e fluxo diagonal quando o contexto permitir
- Elementos que quebram o grid para criar tensão visual positiva
- Espaço negativo generoso **OU** densidade controlada — nunca meio-termo sem intenção
- Sobreposições e layering para criar profundidade

### 6.5 Fundos e Detalhes Visuais

Crie atmosfera e profundidade em vez de cores sólidas genéricas. Técnicas específicas para a marca:

```css
/* Mesh gradient — tema escuro institucional */
.bg-mesh-dark {
  background:
    radial-gradient(ellipse at 15% 85%, rgba(1, 49, 255, 0.20) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 15%, rgba(255, 98, 0, 0.12) 0%, transparent 55%),
    #000D3C;
}

/* Grain overlay — textura sutil de profundidade */
.grain::after {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  border-radius: inherit;
}

/* Grid pattern — backgrounds estruturados */
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* Accent line — assinatura visual da marca */
.accent-bar {
  width: 40px;
  height: 3px;
  background: #FF6200;
  border-radius: 2px;
}
```

---

## PARTE 7 — Tokens de Espaçamento e Forma

```css
:root {
  /* Espaçamento — escala 4px */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  /* Border radius — moderado, nunca pill em elementos grandes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Sombras — sutis e precisas */
  --shadow-card:     0 2px 8px  rgba(0, 13, 60, 0.08);
  --shadow-elevated: 0 8px 24px rgba(0, 13, 60, 0.12);
  --shadow-float:    0 16px 48px rgba(0, 13, 60, 0.16);
}
```

---

## PARTE 8 — Componentes Padrão

### Botão Primário (CTA)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FF6200;
  color: #000D3C;           /* NUNCA branco sobre laranja */
  border: none;
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-itau),
              transform var(--dur-fast) var(--ease-itau);
}
.btn-primary:hover  { background: #e55800; }
.btn-primary:active { transform: scale(0.98); }
```

### Botão Secundário

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #000D3C;
  border: 2px solid #000D3C;
  border-radius: var(--radius-md);
  padding: 10px 24px;
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-itau),
              color var(--dur-base) var(--ease-itau);
}
.btn-secondary:hover {
  background: #000D3C;
  color: #FFFFFF;
}

/* Versão para fundo escuro */
.btn-secondary-light {
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.5);
}
.btn-secondary-light:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

### Card Financeiro

```css
/* Card padrão — fundo claro */
.card {
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  border-left: 4px solid #FF6200;
  transition: transform var(--dur-base) var(--ease-itau),
              box-shadow var(--dur-base) var(--ease-itau);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-elevated);
}

/* Card dark — para fundo azul escuro */
.card-dark {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 98, 0, 0.25);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  backdrop-filter: blur(8px);
}

/* Card métrica — destaque numérico */
.card-metric {
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
}
.card-metric .metric-value {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #FF6200;
  line-height: 1;
}
.card-metric .metric-label {
  font-size: 0.875rem;
  color: #6E6E6E;
  margin-top: 4px;
}
```

### Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.badge-primary { background: #000D3C; color: #FFFFFF; }
.badge-accent  { background: #FF6200; color: #000D3C; }  /* nunca branco */
.badge-info    { background: #0131FF; color: #FFFFFF; }
.badge-subtle  { background: #E3E5E8; color: #000D3C; }
```

### Input / Form Field

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #CFD1D3;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  color: #000D3C;
  background: #FFFFFF;
  transition: border-color var(--dur-fast) var(--ease-itau),
              box-shadow var(--dur-fast) var(--ease-itau);
  outline: none;
}
.input:focus {
  border-color: #0131FF;
  box-shadow: 0 0 0 3px rgba(1, 49, 255, 0.12);
}
.input::placeholder { color: #999999; }
```

### Divider com Accent

```css
.divider-accent {
  display: flex;
  align-items: center;
  gap: 16px;
}
.divider-accent::before,
.divider-accent::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E3E5E8;
}
.divider-accent-bar {
  width: 32px;
  height: 3px;
  background: #FF6200;
  border-radius: 2px;
}
```

---

## PARTE 9 — Temas de Interface

### Tema Escuro — Institucional

```css
.theme-dark {
  --bg:          #000D3C;
  --bg-card:     rgba(255, 255, 255, 0.06);
  --bg-hover:    rgba(255, 255, 255, 0.10);
  --text-primary:   #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-tertiary:  rgba(255, 255, 255, 0.40);
  --accent:      #FF6200;
  --accent-sub:  #0131FF;
  --border:      rgba(255, 255, 255, 0.10);
  --border-accent: rgba(255, 98, 0, 0.30);
}
```

Melhor para: pitch decks, relatórios de resultados, landing pages institucionais, dashboards executivos.

### Tema Claro — Digital / Produto

```css
.theme-light {
  --bg:          #FFFFFF;
  --bg-alt:      #F1F2F4;
  --bg-card:     #FFFFFF;
  --bg-hover:    #F1F2F4;
  --text-primary:   #000D3C;
  --text-secondary: #4C4C4C;
  --text-tertiary:  #6E6E6E;
  --accent:      #FF6200;
  --accent-sub:  #0131FF;
  --border:      #E3E5E8;
  --border-accent: #FF6200;
}
```

Melhor para: apps, dashboards de produto, onboarding, treinamentos, interfaces transacionais.

---

## PARTE 10 — Proibições Absolutas de Design

| ❌ NUNCA faça                              | ✅ Faça em vez disso                         |
|-------------------------------------------|----------------------------------------------|
| Inter / Roboto / Arial como display       | DM Sans, Plus Jakarta Sans, Sora             |
| Gradiente roxo/violeta                    | Mesh em `#000D3C` com acento laranja         |
| Branco sobre laranja `#FF6200`            | Azul escuro `#000D3C` ou preto `#000000`     |
| Laranja sobre azul vibrante `#0131FF`     | Combinação proibida — não usar juntos        |
| Cinza `#999999` sobre branco             | Cinza `#6E6E6E` ou mais escuro               |
| Layout genérico hero + cards centralizados | Assimetria, sobreposição, grid-breaking      |
| Animações sem propósito (bounce, shake)   | Stagger de entrada, hover funcional          |
| Sombras pesadas coloridas                 | Sombras em `rgba(0,13,60,X)` sutis          |
| Botão laranja com texto branco            | Botão laranja com texto `#000D3C`            |
| Space Grotesk, Nunito, Poppins            | DM Sans ou Plus Jakarta Sans                 |

---

## PARTE 11 — Checklist de Revisão Final

Antes de entregar qualquer interface, valide item por item:

- [ ] Nenhuma combinação de cores proibida foi usada
- [ ] O logo selecionado é compatível com o fundo (tabela da Parte 4)
- [ ] Textos sobre laranja `#FF6200` usam apenas `#000D3C` ou `#000000`
- [ ] Textos sobre azul vibrante `#0131FF` usam apenas `#FFFFFF`
- [ ] Botão CTA usa `#FF6200` com texto `#000D3C` — nunca branco
- [ ] Tipografia display **não** é Inter, Roboto, Arial ou Space Grotesk
- [ ] Espaçamentos seguem escala 4px (tokens da Parte 7)
- [ ] `prefers-reduced-motion` está implementado
- [ ] A interface seria reconhecível como "Itaú" sem o logo visível
- [ ] O código está pronto para produção (sem placeholders, sem TODO)
- [ ] A direção estética foi executada com precisão e intenção — não é genérica

---

## PARTE 12 — Princípio Final de Qualidade

Claude é capaz de trabalho criativo extraordinário. Não segure. Dentro dos guardrails rígidos de marca do Itaú — que protegem cor, tipografia e logo — há espaço imenso para layouts inesquecíveis, composições assimétricas, micro-interações que surpreendem, e hierarquias visuais que guiam o olhar com precisão cirúrgica.

**A restrição da paleta não limita a criatividade — ela a direciona.** Use o azul escuro e o laranja com coragem. Quebre o grid quando fizer sentido. Faça algo que o time de design do Itaú olharia e diria: *"isso é nosso."*
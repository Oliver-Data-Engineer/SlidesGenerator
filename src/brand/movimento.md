# Movimento e Animações — Itaú Empresas

## Princípios

O movimento na marca Itaú Empresas é **funcional e discreto**: reforça hierarquia e guia a atenção, nunca distrai.

---

## Transições de Slide Permitidas

| Tipo | CSS / reveal.js | Duração | Uso |
|------|-----------------|---------|-----|
| **Fade** (padrão) | `transition: 'fade'` | 300ms | Transição geral entre slides |
| **Slide horizontal** | `transition: 'slide'` | 400ms | Progressão de tópicos |
| **Nenhuma** | `transition: 'none'` | 0ms | Slides de impacto, comparações |

**Nunca usar:** zoom, convex, concave, flip, bounce, rotate.

---

## Animações de Elementos (Fragmentos)

Para revelar bullets progressivamente em reveal.js:

```html
<ul>
  <li class="fragment fade-in">Primeiro ponto</li>
  <li class="fragment fade-in">Segundo ponto</li>
</ul>
```

| Classe | Efeito | Duração |
|--------|--------|---------|
| `fragment fade-in` | Opacidade 0→1 | 300ms |
| `fragment fade-in-then-semi-out` | Destaca o atual, escurece anterior | 300ms |
| `fragment highlight-current-orange` | Cor laranja Itaú no item atual | 200ms |

---

## Curvas de Easing

```css
--ease-default: ease;              /* entradas e saídas padrão */
--ease-in: cubic-bezier(0.4,0,1,1);    /* elementos saindo */
--ease-out: cubic-bezier(0,0,0.2,1);   /* elementos entrando */
--ease-in-out: cubic-bezier(0.4,0,0.2,1); /* movimentos de transição */
```

---

## Durações Padrão

| Contexto | Duração |
|----------|---------|
| Transição de slide | 300–400ms |
| Entrada de fragmento | 300ms |
| Hover interativo | 150ms |
| Fade de overlay | 200ms |

---

## Identifiers Animados

A marca possui logos animados oficiais em:
`refs/guia-marca/ItauEmpresas_Identificadores_Estaticos_e_Animados/Animado/`

Formatos: `.mov` (fundo transparente), `.mp4` (colorido)  
Variantes: Horizontal e Vertical

Use nos slides de abertura/encerramento quando o formato suportar vídeo (reveal.js suporta via `<video>`).

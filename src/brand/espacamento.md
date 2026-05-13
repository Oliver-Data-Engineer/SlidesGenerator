# Espaçamento e Grid — Itaú Empresas

## Dimensões de Slide

| Formato | Largura | Altura | Proporção |
|---------|---------|--------|-----------|
| Widescreen (padrão) | 1920px | 1080px | 16:9 |
| Standard | 1280px | 960px | 4:3 |
| reveal.js padrão | 960px | 700px | ~16:9 |

---

## Safe Zone (Área Segura)

A área segura garante que conteúdo não seja cortado em projetores.

```
┌─────────────────────────────────────────────┐  ← 0px (borda)
│  ╔═════════════════════════════════════════╗  │  ← 60px margin-top
│  ║                                         ║  │
│  ║         CONTEÚDO AQUI                   ║  │
│  ║                                         ║  │
│  ╚═════════════════════════════════════════╝  │  ← 60px margin-bottom
│                [LOGO + RODAPÉ]                 │  ← zona de rodapé: 40px
└─────────────────────────────────────────────┘  ← 1080px
  ↑80px                                   ↑80px
  margin-left                         margin-right
```

| Zona | Valor |
|------|-------|
| Margem lateral | 80px |
| Margem superior | 60px |
| Margem inferior | 60px (+ 40px zona de rodapé) |
| Padding interno de cards | 32px |

---

## Escala de Espaçamento

Base: **8px**

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--space-1` | 4px | Micro ajustes, separação de ícones |
| `--space-2` | 8px | Espaço entre elementos inline |
| `--space-3` | 16px | Padding interno pequeno, gap entre bullets |
| `--space-4` | 24px | Gap padrão entre seções internas |
| `--space-5` | 32px | Espaço entre blocos de conteúdo |
| `--space-6` | 48px | Separação entre título e corpo |
| `--space-7` | 64px | Espaço entre seções maiores |
| `--space-8` | 96px | Margens de slide |

---

## Grid de Conteúdo

Para slides com múltiplas colunas:

| Layout | Colunas | Gap |
|--------|---------|-----|
| 1 coluna (padrão) | 12/12 | — |
| 2 colunas iguais | 6 + 6 | 48px |
| 2 colunas (destaque) | 8 + 4 | 48px |
| 3 colunas | 4 + 4 + 4 | 32px |

---

## Rodapé de Slide

Todo slide deve ter rodapé com:
- Logo Itaú Empresas (canto inferior direito, altura 32px)
- Número de slide (canto inferior direito, antes do logo)
- Linha divisória: `1px solid rgba(255,255,255,0.2)` em temas escuros

```
┌──────────────────────────────────────────────────────┐
│                                           [01] [LOGO] │
└──────────────────────────────────────────────────────┘
   ↑ altura do rodapé: 48px, padding horizontal: 80px
```

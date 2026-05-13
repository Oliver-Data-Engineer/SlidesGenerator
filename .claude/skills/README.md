# Skills Locais — SlidesGenerator

Esta pasta é o **ambiente de desenvolvimento de skills** do projeto.

## Fluxo de Trabalho

```
.claude/skills/          ← desenvolva e itere aqui
       ↓  (quando pronto)
.claude/commands/        ← promova aqui para virar /slash-command
```

## Como Testar uma Skill

1. Leia o arquivo: `.claude/skills/<nome>.md`
2. Peça ao Claude: *"Siga as instruções da skill frontend-slides-pt e gere X"*
3. Avalie o resultado e itere no arquivo `.md`
4. Quando satisfeito, copie para `.claude/commands/`

## Skills Disponíveis

| Skill | Arquivo | Slash Command | Status | Marca |
|-------|---------|---------------|--------|-------|
| frontend-slides-pt | `skills/frontend-slides-pt.md` | `/frontend-slides-pt` | Ativo | Itaú Empresas |

## Guia de Marca

As skills leem o guia de marca antes de gerar. O guia está em `src/brand/`:

| Arquivo | Conteúdo |
|---------|----------|
| `src/brand/index.md` | Visão geral + mapa do guia |
| `src/brand/cores.md` | Paleta completa (hex, CSS vars) |
| `src/brand/tipografia.md` | Itau Display Pro + escala |
| `src/brand/espacamento.md` | Grid, margens, safe zone |
| `src/brand/movimento.md` | Transições permitidas |
| `src/brand/voz-e-tom.md` | Tom de voz e escrita |
| `src/brand/logos.md` | Versões do logo e regras de uso |
| `src/brand/tokens/` | Tokens JSON machine-readable |

## Anatomia de uma Skill

```markdown
# Skill: nome-da-skill

**Tipo:** O que ela faz
**Idioma:** Português
**Status:** Desenvolvimento | Ativo

## Propósito
Uma frase descrevendo o objetivo.

## Como Esta Skill Opera
### 0. Ler o Guia de Marca (se for gerar conteúdo de marca)
### 1. Entendimento de Contexto
### 2. Lógica de Geração
### 3. Checklist de Entrega

## Exemplos de Prompts
## Notas de Desenvolvimento
```

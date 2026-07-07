# Card

Superfície contida para agrupar conteúdo relacionado. Três variantes de elevação e, opcionalmente, um `onClick` que a torna interativa (com teclado e foco).

## Quando usar

- Agrupar conteúdo relacionado em uma superfície delimitada (features, KPIs, blocos de destaque).
- Usar `elevated` para o card mais importante de um conjunto.
- Tornar o card clicável (via `onClick`) quando ele representa um destino navegável inteiro.

## Quando NÃO usar

- Aninhar cards dentro de cards — cria hierarquia de profundidade confusa.
- Como linha de layout/tabela — para dados tabulares use `DataTable`.
- Como prévia de post do blog — use `BlogCard`, que já compõe o layout do artigo.

## Variantes

Controladas pela prop `variant`:

| Variante | Descrição |
|---|---|
| `default` | Fundo `surface-container-low`, borda `outline-variant`, sem sombra. Superfície base. |
| `outlined` | Fundo transparente, borda mais proeminente (`outline`). |
| `elevated` | Sem borda, com `--dp-sem-shadow-card`. Ênfase. |

## Estados

Estados interativos só existem quando `onClick` é passado (a classe `.interactive` é aplicada).

| Estado | Comportamento |
|---|---|
| default | Fundo/borda/sombra definidos pelos tokens `--card-*` da variante. |
| hover (interativo) | Fundo `surface-container`, borda `outline`, sombra `--dp-sem-shadow-card-hover`, eleva `translateY(-2px)`. |
| active (interativo) | Retorna a `translateY(0)`. |
| focus (interativo) | `:focus-visible` exibe outline `var(--dp-sem-stroke-focus) solid var(--dp-color-primary)`, offset 2px. |
| reduced-motion | Sob `prefers-reduced-motion: reduce`, transições e transforms de hover/active são removidos. |

Sem `onClick`, o Card é estático (sem hover/focus/transform).

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `ReactNode` | — (obrigatório) | Conteúdo interno. O Card não impõe layout aos filhos. |
| `className` | `string` | — | Classe extra concatenada às classes internas. |
| `style` | `CSSProperties` | — | Estilos inline aplicados ao `<div>`. |
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | Elevação/borda. |
| `onClick` | `() => void` | — | Se presente, torna o card interativo: `role="button"`, `tabIndex={0}` e ativação por Enter/Espaço. |

## Exemplo de uso

```tsx
import { Card } from '@digital-pampas/ds'

// Variantes
<Card variant="default">
  <h3>Default card</h3>
  <p>Conteúdo agrupado.</p>
</Card>

<Card variant="outlined">…</Card>
<Card variant="elevated">…</Card>

// Interativo (clicável + teclado)
<Card variant="elevated" onClick={() => navigate('/detail')}>
  Ver detalhes
</Card>
```

## Acessibilidade

- Quando `onClick` é informado, o Card recebe `role="button"`, entra na ordem de tabulação (`tabIndex={0}`) e responde a Enter e Espaço (com `preventDefault` no Espaço para evitar scroll).
- O anel de foco (`:focus-visible`) só aparece no modo interativo.
- Sem `onClick`, o Card é um contêiner neutro — não swallowa o foco dos elementos focáveis que contém.
- Ao tornar o card clicável, garanta que o conteúdo interno comunique claramente o destino/ação (o `role="button"` não fornece rótulo por si só; considere `aria-label` via `className`/wrapper se o conteúdo não for autoexplicativo).

## Dependências

**Tokens consumidos** (do `Card.module.css`):
`--dp-color-on-surface`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-sem-motion-component`, `--dp-sem-radius-card`, `--dp-sem-shadow-card`, `--dp-sem-shadow-card-hover`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-150`, `--dp-space-300`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Card" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

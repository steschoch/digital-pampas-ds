# ChartPanel

Moldura padrão para um gráfico: header (título + legenda + ação opcional) sobre um `Card`, com estados internos de carregamento (skeleton) e vazio.

## Quando usar

- Ao envolver qualquer gráfico do portal (`LineChart`, `BarChart`, `DonutChart`, `FunnelChart`…) para dar título, legenda e enquadramento consistentes.
- Quando o gráfico precisa exibir estados de carregamento e/ou vazio sem você reimplementá-los.

## Quando NÃO usar

- Como card genérico de conteúdo sem gráfico: use `Card` diretamente.
- Como KPI com valor único, delta e sparkline: use `StatCard`.
- Não aninhe um `ChartPanel` dentro de outro `ChartPanel`.

## Variantes

Este componente não possui variantes.

## Estados

| Estado | Comportamento |
|---|---|
| default | Renderiza `children` (o gráfico) no corpo. |
| loading | Quando `loading` é `true`, o corpo mostra um `Skeleton variant="rect"` de 100% × 200px no lugar dos `children`. |
| empty | Quando `empty` é `true`, o corpo mostra um `EmptyState` com `title={emptyTitle}` e `description={emptyDescription}` no lugar dos `children`. |

Precedência no corpo: `loading` → `empty` → `children`. O componente não tem estados interativos próprios (hover/focus/disabled).

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `string` | — (obrigatório) | Título do painel, renderizado como `<h3>`. |
| `legend` | `ChartLegendItem[]` | — | Itens de legenda; cada um é um swatch colorido (`colorVar`) + `label`. Só renderiza se houver ao menos um item. |
| `action` | `ReactNode` | — | Slot de ação no header (ex.: um `Button` ou `Select`). |
| `children` | `ReactNode` | — (obrigatório) | Conteúdo do corpo (normalmente o gráfico). |
| `loading` | `boolean` | — | Exibe o skeleton no corpo. |
| `empty` | `boolean` | — | Exibe o `EmptyState` embutido no corpo. |
| `emptyTitle` | `string` | `'No data yet'` | Título do estado vazio. |
| `emptyDescription` | `string` | — | Descrição do estado vazio. |
| `className` | `string` | — | Classe adicional, concatenada à classe raiz do painel. |

Tipo auxiliar: `ChartLegendItem` (`label: string`, `colorVar: string` — uma CSS var de cor como `var(--dp-color-primary)`).

## Exemplo de uso

```tsx
import { ChartPanel, LineChart } from '@digital-pampas/ds'

<ChartPanel
  title="Sends vs replies"
  legend={[
    { label: 'Sends', colorVar: 'var(--dp-color-primary)' },
    { label: 'Replies', colorVar: 'var(--dp-color-secondary)' },
  ]}
>
  <LineChart series={series} />
</ChartPanel>
```

## Acessibilidade

- O título é um heading real (`<h3>`), dando estrutura de documento ao painel.
- A legenda é uma `<ul>` com texto legível; o swatch de cor é `aria-hidden="true"` (a cor não carrega informação sozinha, o label está sempre presente).
- A acessibilidade do gráfico em si é responsabilidade do componente passado em `children`.

## Dependências

**Tokens consumidos** (do `ChartPanel.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-font-size-112`, `--dp-font-size-37`, `--dp-font-weight-semibold`, `--dp-sem-font-display`, `--dp-sem-font-body`, `--dp-sem-radius-chip`, `--dp-space-200`, `--dp-space-150`, `--dp-space-50`

**Componentes do DS usados:** `Card` (base), `Skeleton` (estado de carregamento), `EmptyState` (estado vazio).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "ChartPanel" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

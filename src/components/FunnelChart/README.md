# FunnelChart

Barras horizontais decrescentes para um funil de qualificação/conversão, cada estágio com valor e a taxa de conversão (%) em relação ao estágio anterior. Cores via tokens.

## Quando usar

- Visualizar um funil sequencial (ex.: prospects → contatos verificados → sequência → reunião), onde cada etapa é um subconjunto da anterior.
- Quando importa mostrar a conversão etapa-a-etapa (% vs. estágio anterior) além do valor absoluto.

## Quando NÃO usar

- Para categorias não-sequenciais ou comparações independentes. Use `BarChart` (a largura ali representa magnitude, não afunilamento).
- Para séries temporais. Use `Sparkline` ou um chart de linha.

## Variantes

Este componente não possui variantes. A cor de cada barra pode ser trocada individualmente via `colorVar` por estágio (default `var(--dp-color-primary)`).

## Estados

Componente puramente de apresentação, sem estados interativos.

| Estado | Comportamento |
|---|---|
| default | Cada barra tem largura proporcional ao valor do primeiro estágio (`value / top * 100%`). A largura transiciona via `--dp-sem-motion-layout`. |

*(Sem hover/focus/disabled — não é interativo. A transição de largura é desligada sob `prefers-reduced-motion`.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `stages` | `FunnelStage[]` | — (obrigatória) | Estágios do funil, na ordem do topo para a base. |
| `yFormat` | `(v: number) => string` | `(v) => v.toLocaleString()` | Formata o valor exibido de cada estágio. |
| `ariaLabel` | `string` | `'Funnel chart'` | Rótulo acessível do container (`role="img"`). |
| `className` | `string` | `undefined` | Classe extra no wrapper. |

Tipo auxiliar exportado:

- `FunnelStage` = `{ label: string; value: number; colorVar?: string }` — `colorVar` deve ser um valor CSS de cor (ex.: `'var(--dp-color-tertiary)'`).

## Exemplo de uso

```tsx
import { FunnelChart } from '@digital-pampas/ds'
import type { FunnelStage } from '@digital-pampas/ds'

const stages: FunnelStage[] = [
  { label: 'Prospects', value: 12000 },
  { label: 'Verified', value: 9400 },
  { label: 'Sequenced', value: 3200 },
  { label: 'Replied', value: 480, colorVar: 'var(--dp-color-tertiary)' },
]

<FunnelChart stages={stages} ariaLabel="Outbound funnel" />
```

## Acessibilidade

- O container tem `role="img"` com `aria-label` (customizável via `ariaLabel`), de modo que a árvore de barras seja anunciada como uma única imagem descritiva.
- Cada barra tem `title` com label e valor, servindo de tooltip nativo.
- A `%` de conversão é texto real (não imagem), lida por leitores de tela.
- Consumidor deve garantir: passar um `ariaLabel` mais descritivo que o default quando houver múltiplos funis na mesma tela.

## Dependências

**Tokens consumidos** (do `FunnelChart.module.css`):
`--dp-color-surface-container`, `--dp-space-150`, `--dp-space-50`, `--dp-space-100`, `--dp-sem-font-body`, `--dp-font-size-56`, `--dp-color-on-surface`, `--dp-sem-font-code`, `--dp-sem-radius-chip`, `--dp-sem-motion-layout`, `--dp-font-size-37`, `--dp-color-on-surface-variant`

**Componentes do DS usados:** nenhum.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "FunnelChart" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

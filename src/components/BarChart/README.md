# BarChart

Gráfico de barras para comparações/distribuições, renderizado com barras em CSS (sem SVG). Cores via tokens. Orientação vertical (default) ou horizontal.

## Quando usar

- Comparar valores entre categorias (ex.: métricas por cliente/campanha no portal).
- Distribuições simples em que barras proporcionais bastam.

## Quando NÃO usar

- Séries temporais — use `LineChart`.
- Proporções de um todo — use `DonutChart`.
- Funil de conversão (barras decrescentes sequenciais) — use `FunnelChart`.
- Medidor 0–100 — use `Gauge`.

## Variantes

Controladas pela prop `orientation`:

| Variante | Descrição |
|---|---|
| `vertical` (default) | Colunas crescendo de baixo para cima; a altura do wrapper vem da prop `height`. Barra com `width: 60%` (máx. 48px), cantos superiores arredondados. |
| `horizontal` | Linhas crescendo da esquerda; grid de 3 colunas (`120px 1fr auto`) por item. Trilho visível (`--bc-track`) com barra em formato pill. |

## Estados

Este componente não possui estados interativos. Cada barra tem `title` nativo (`"{label}: {yFormat(value)}"`), exibido como tooltip do navegador ao passar o mouse.

| Estado | Comportamento |
|---|---|
| default | Barras dimensionadas proporcionalmente ao maior valor (`max`). |
| animação de layout | A altura (vertical) ou largura (horizontal) da barra transita via `--dp-sem-motion-layout`. |
| reduced-motion | Sob `prefers-reduced-motion: reduce`, a transição das barras é removida. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `bars` | `BarItem[]` | — (obrigatório) | Dados das barras. Cada `BarItem`: `{ label: string; value: number; colorVar?: string }`. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Direção das barras. |
| `yFormat` | `(v: number) => string` | `(v) => String(v)` | Formata o valor exibido e o `title` da barra. |
| `height` | `number` | `220` | Altura do gráfico em px. Aplicada apenas na orientação vertical. |
| `ariaLabel` | `string` | `'Bar chart'` | Rótulo acessível do container (`role="img"`). |
| `className` | `string` | — | Classe extra concatenada às classes internas. |

A cor de cada barra vem de `BarItem.colorVar`; se ausente, usa `var(--dp-color-primary)`. O valor máximo é `Math.max(...values, 0) || 1` (evita divisão por zero).

## Exemplo de uso

```tsx
import { BarChart } from '@digital-pampas/ds'
import type { BarItem } from '@digital-pampas/ds'

const bars: BarItem[] = [
  { label: 'Jan', value: 120 },
  { label: 'Fev', value: 200, colorVar: 'var(--dp-color-secondary)' },
  { label: 'Mar', value: 90 },
]

<BarChart bars={bars} ariaLabel="Sends por mês" yFormat={(v) => `${v}k`} />

// Horizontal
<BarChart bars={bars} orientation="horizontal" />
```

## Acessibilidade

- O container recebe `role="img"` + `aria-label` (`ariaLabel`) — passe um rótulo descritivo para que o gráfico seja anunciado com significado.
- Cada barra tem um `title` nativo com rótulo e valor, servindo de tooltip por hover.
- Movimento respeita `prefers-reduced-motion`.
- Observação: o rótulo e o valor de cada barra também são renderizados como texto visível (`<span>`), o que ajuda quem não usa apenas o `role="img"`.

## Dependências

**Tokens consumidos** (do `BarChart.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-surface-container`, `--dp-font-size-37`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-motion-layout`, `--dp-sem-radius-chip`, `--dp-sem-radius-pill`, `--dp-space-50`, `--dp-space-100`, `--dp-space-150`

> Além destes, a cor da barra usa `var(--dp-color-primary)` como fallback aplicado inline pelo componente quando `colorVar` não é informado.

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "BarChart" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

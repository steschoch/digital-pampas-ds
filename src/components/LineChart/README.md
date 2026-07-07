# LineChart

Gráfico de 1 a 3 séries temporais renderizado em SVG puro (sem biblioteca externa), com cores vindas de tokens e tabela de dados oculta para leitores de tela.

## Quando usar

- Visualizar a evolução de métricas ao longo do tempo no portal (ex.: envios vs. respostas por dia).
- Comparar até 3 séries temporais que compartilham o mesmo eixo x (mesmas datas).
- Dentro de um `ChartPanel`, que fornece o enquadramento (título, legenda, estados de loading/empty).

## Quando NÃO usar

- Para um indicador inline mínimo dentro de um `StatCard` — use `Sparkline`.
- Para proporções de um todo — use `DonutChart`.
- Para comparar categorias não sequenciais — use `BarChart`.
- Para um funil de conversão — use `FunnelChart`.
- Para mais de 3 séries: o componente aceita, mas a legibilidade cai; limite a 3.

## Variantes

Este componente não possui variantes.

## Estados

| Estado | Comportamento |
|---|---|
| default | Desenha grid (opcional), rótulos de eixo, linhas por série e dots (opcional). |
| dado insuficiente | Se a primeira série tiver menos de 2 pontos, o componente retorna `null` (não renderiza nada). |
| tooltip por ponto | Cada dot possui um `<title>` nativo do SVG (`label · date: valor`), exibido no hover do navegador. |

*(Componente não interativo via teclado/foco; a leitura acessível vem da tabela de dados oculta.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `series` | `LineSeries[]` | — (obrigatório) | Séries a plotar. Cada `LineSeries` tem `label: string`, `colorVar: string` (ex.: `'var(--dp-color-primary)'`) e `points: { date: string; value: number }[]`. |
| `height` | `number` | `240` | Altura do SVG em px. |
| `yFormat` | `(v: number) => string` | `(v) => String(v)` | Formata os valores do eixo y e dos tooltips. |
| `showGrid` | `boolean` | `true` | Exibe as linhas de grade horizontais e os rótulos do eixo y. |
| `showDots` | `boolean` | `true` | Exibe os círculos (dots) em cada ponto, com tooltip nativo. |
| `ariaLabel` | `string` | `'Line chart'` | Descrição acessível do gráfico; vira `aria-label` do SVG e `<caption>` da tabela. |
| `className` | `string` | — | Classe extra aplicada ao wrapper. |

## Exemplo de uso

```tsx
import { LineChart } from '@digital-pampas/ds'
import type { LineSeries } from '@digital-pampas/ds'

const series: LineSeries[] = [
  { label: 'Sends',   colorVar: 'var(--dp-color-primary)',   points: [{ date: 'Jun 1', value: 120 }, { date: 'Jun 2', value: 140 }] },
  { label: 'Replies', colorVar: 'var(--dp-color-secondary)', points: [{ date: 'Jun 1', value: 9 },   { date: 'Jun 2', value: 12 }] },
]

<LineChart series={series} yFormat={(v) => String(v)} ariaLabel="Sends vs replies" />
```

## Acessibilidade

- O `<svg>` recebe `role="img"` e `aria-label={ariaLabel}` — sempre passe um `ariaLabel` descritivo.
- Uma tabela de dados equivalente é renderizada visualmente oculta (`.srOnly`), com `<caption>` = `ariaLabel`, cabeçalho por série e uma linha por data — leitores de tela leem os números exatos.
- Cada dot expõe um `<title>` nativo (`label · date: valor`) para tooltip no hover.
- Não há animação; nada a ajustar para `prefers-reduced-motion`.

## Dependências

**Tokens consumidos** (do `LineChart.module.css`):
`--dp-color-outline-variant` (via local `--lc-grid`), `--dp-color-on-surface-variant` (via local `--lc-label`), `--dp-sem-font-code`

As cores das séries e dos dots NÃO vêm do CSS: são passadas por `colorVar` em cada `LineSeries` (ex.: `var(--dp-color-primary)`).

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "LineChart" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

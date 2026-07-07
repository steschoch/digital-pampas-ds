# DonutChart

Proporções como um anel SVG puro, com total centralizado opcional e uma legenda (valor absoluto + %). Cores vêm de tokens (dark/light automático).

## Quando usar

- Para mostrar a composição de um todo em poucos segmentos (ex.: distribuição de respostas: interessado / neutro / não agora).
- Quando o total ou um rótulo central agrega bem a leitura (ex.: "100 replies").

## Quando NÃO usar

- Séries temporais: use `LineChart`.
- Comparação entre categorias independentes: use `BarChart`.
- Funil de conversão sequencial: use `FunnelChart`.
- Medidor 0–100 com faixas: use `Gauge`.

## Variantes

Este componente não possui variantes. Tamanho ajustável via `size`; a espessura do anel é derivada (`max(12, round(size * 0.14))`).

## Estados

Este componente não é interativo — não possui estados hover/focus/disabled. Cada segmento expõe um `<title>` SVG (tooltip nativo) com `label: value (pct%)`.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `segments` | `DonutSegment[]` | — (obrigatório) | Segmentos do anel; cada um com `label`, `value` e `colorVar`. |
| `centerLabel` | `string` | — | Rótulo abaixo do valor central. |
| `centerValue` | `string` | — | Valor grande no centro. |
| `size` | `number` | `160` | Lado (px) do quadrado do SVG. |
| `ariaLabel` | `string` | `'Donut chart'` | Rótulo acessível do `<svg role="img">`. |
| `className` | `string` | — | Classe adicional no wrapper. |

Tipo auxiliar: `DonutSegment` (`label: string`, `value: number`, `colorVar: string` — uma CSS var de cor). As porcentagens são calculadas sobre a soma dos `value` (com guarda contra divisão por zero). O centro só renderiza se `centerValue` ou `centerLabel` for passado.

## Exemplo de uso

```tsx
import { DonutChart } from '@digital-pampas/ds'

<DonutChart
  segments={[
    { label: 'Interested', value: 42, colorVar: 'var(--dp-color-primary)' },
    { label: 'Neutral', value: 30, colorVar: 'var(--dp-color-plum-text)' },
    { label: 'Not now', value: 28, colorVar: 'var(--dp-color-secondary)' },
  ]}
  centerValue="100"
  centerLabel="replies"
/>
```

## Acessibilidade

- O `<svg>` tem `role="img"` e `aria-label` (padrão `'Donut chart'`) — passe um `ariaLabel` descritivo do dado.
- Cada segmento traz um `<title>` com label, valor e %, servindo de tooltip e reforço textual.
- Os swatches da legenda são `aria-hidden="true"`; a informação de cor sempre acompanha label e valor em texto na legenda.

## Dependências

**Tokens consumidos** (do `DonutChart.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-font-size-200`, `--dp-font-size-56`, `--dp-font-size-37`, `--dp-font-size-25`, `--dp-font-weight-bold`, `--dp-sem-font-display`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-radius-chip`, `--dp-sem-tracking-caps`, `--dp-space-300`, `--dp-space-75`

Adicionalmente, o `.tsx` aplica inline no anel de fundo (track) o token `--dp-color-surface-container` e usa os `colorVar` recebidos por segmento.

**Componentes do DS usados:** nenhum (SVG puro).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "DonutChart" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

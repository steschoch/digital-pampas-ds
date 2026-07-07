# Gauge

Medidor radial de 0–100 (arco de 270°) em SVG puro; a cor do arco muda conforme a faixa de threshold. Cores via tokens.

## Quando usar

- Mostrar uma métrica única numa escala fixa de 0–100 (ex.: deliverability, domain reputation, health score) onde a cor comunica bom/atenção/crítico.
- Quando você quer um número grande centralizado com contexto visual de faixa (verde/amarelo/vermelho) via `thresholds`.

## Quando NÃO usar

- Para valores sem escala 0–100 natural (contagens, moeda, séries). Use `StatCard` ou `BarChart`.
- Para comparar várias métricas lado a lado como magnitude. Use `BarChart`.
- Para tendência ao longo do tempo. Use `Sparkline`.

## Variantes

Este componente não possui variantes formais. A cor do arco é derivada do `value` vs. `thresholds`:

| Faixa | Cor |
|---|---|
| `value >= good` | `--dp-color-success` |
| `warn <= value < good` | `--dp-color-warning` |
| `value < warn` | `--dp-color-error` |
| sem `thresholds` | `--dp-color-primary` (cor única) |

## Estados

Componente puramente de apresentação, sem estados interativos.

| Estado | Comportamento |
|---|---|
| default | Arco de valor desenhado sobre um track de 270° (`--dp-color-surface-container`). O `value` é clampado em 0–100. O comprimento do arco (`stroke-dasharray`) transiciona via `--dp-sem-motion-layout`. |

*(Sem hover/focus/disabled. A transição do arco é desligada sob `prefers-reduced-motion`.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `number` | — (obrigatória) | Valor de 0 a 100 (clampado internamente). |
| `label` | `string` | `undefined` | Rótulo exibido abaixo do arco e usado no `aria-label`. |
| `thresholds` | `GaugeThresholds` | `undefined` | Faixas de cor. Sem elas, o arco usa a cor primária. |
| `size` | `number` | `140` | Largura/altura do SVG em px. A espessura do traço é derivada do size. |
| `className` | `string` | `undefined` | Classe extra no wrapper. |

Tipo auxiliar exportado:

- `GaugeThresholds` = `{ warn: number; good: number }` — abaixo de `warn` → error; entre `warn` e `good` → warning; `>= good` → success.

## Exemplo de uso

```tsx
import { Gauge } from '@digital-pampas/ds'

<Gauge value={92} label="deliverability" thresholds={{ warn: 70, good: 90 }} />
```

## Acessibilidade

- O `<svg>` tem `role="img"` e `aria-label` no formato `"{label}: {valor} of 100"` (ex.: "deliverability: 92 of 100"), então o número é anunciado com contexto.
- Quando `label` é omitido, o `aria-label` cai para `"Gauge: {valor} of 100"`.
- O número central grande é texto real, não imagem.
- Consumidor deve garantir: definir `thresholds` coerentes com o significado da métrica para que a cor comunique corretamente (a cor sozinha não é o único portador — o número é textual).

## Dependências

**Tokens consumidos** (do `Gauge.module.css`):
`--dp-sem-motion-layout`, `--dp-sem-font-display`, `--dp-font-size-250`, `--dp-font-weight-bold`, `--dp-space-75`, `--dp-sem-font-code`, `--dp-font-size-25`, `--dp-sem-tracking-caps`, `--dp-color-on-surface-variant`

Tokens de cor aplicados via JS inline (no `.tsx`, não no CSS): `--dp-color-primary`, `--dp-color-success`, `--dp-color-warning`, `--dp-color-error`, `--dp-color-surface-container`.

**Componentes do DS usados:** nenhum.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Gauge" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

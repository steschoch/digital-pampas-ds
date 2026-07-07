# StatCard

Card de KPI: label, valor grande, delta opcional (↑/↓ com cor good/bad), slot de badge e um slot livre (ex.: uma `Sparkline`). Renderiza skeletons enquanto `loading`.

## Quando usar

- Exibir um indicador (métrica) por card em dashboards do portal: reply rate, bounce rate, etc.
- Quando você quer mostrar variação (delta) com cor semântica de "bom/ruim" e, opcionalmente, uma mini tendência abaixo.

## Quando NÃO usar

- Prova social da home page de marketing — use a seção `Proof` (tiles de métrica com count-up), não um `StatCard` avulso.
- Empilhar mais de um KPI no mesmo card — um `StatCard` = um KPI; use um grid de vários cards.
- Estado vazio (sem métrica disponível) — use `EmptyState`; o `loading` aqui é só para carregamento.

## Variantes

Este componente não possui prop `variant`. A cor do delta é derivada de `direction` + `positiveIsGood`:

| Situação | Classe / cor |
|---|---|
| Movimento "bom" | `.deltaGood` → `--dp-color-success` |
| Movimento "ruim" | `.deltaBad` → `--dp-color-error` |

"Bom" = `(direction === 'up') === (positiveIsGood ?? true)`. Ex.: bounce rate caindo (`direction: 'down'`, `positiveIsGood: false`) conta como bom → verde.

## Estados

| Estado | Comportamento |
|---|---|
| default | Card com label (muted), valor grande em fonte display, delta e slot opcionais. |
| loading | Com `loading`, renderiza três `Skeleton` (text 50%, rect 70%×32, text 40%) no lugar do conteúdo. |

Não há hover/focus/disabled — o card em si não é interativo (interatividade fica no conteúdo dos slots, se houver).

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | — (obrigatório) | Legenda (caption) do KPI. |
| `value` | `string` | — (obrigatório) | Valor grande já formatado (ex.: `'8.95%'`). |
| `delta` | `StatDelta` | `undefined` | Variação com seta e cor good/bad. |
| `badge` | `ReactNode` | `undefined` | Slot de badge no topo (ex.: um `Badge`). |
| `children` | `ReactNode` | `undefined` | Slot abaixo do valor (ex.: uma `Sparkline`). |
| `loading` | `boolean` | `undefined` | Renderiza skeletons no lugar do conteúdo. |
| `className` | `string` | `undefined` | Classe extra no card. |

`StatDelta`: `{ value: string; direction: 'up' | 'down'; positiveIsGood?: boolean }` (`positiveIsGood` default `true`).

## Exemplo de uso

```tsx
import { StatCard, Sparkline, Badge } from '@digital-pampas/ds'

<StatCard
  label="Reply rate"
  value="8.95%"
  delta={{ value: '2.1%', direction: 'up' }}
  badge={<Badge variant="success">above benchmark</Badge>}
>
  <Sparkline points={[4, 6, 5, 9, 8, 12]} fill />
</StatCard>

// Métrica onde cair é bom (bounce rate):
<StatCard
  label="Bounce rate"
  value="0.4%"
  delta={{ value: '0.3%', direction: 'down', positiveIsGood: false }}
/>
```

## Acessibilidade

- `label` e `value` são nós de texto — legíveis por leitor de tela.
- A seta do delta (`↑`/`↓`) é `aria-hidden="true"`; o percentual (`delta.value`) fica como texto.
- Quando `loading`, os `Skeleton` internos são decorativos (`aria-hidden`); comunique o carregamento na região que contém o card.
- A cor do delta (verde/vermelho) reforça, mas não substitui, a seta + o texto — a direção continua legível sem depender só de cor.

## Dependências

**Tokens consumidos** (do `StatCard.module.css`):
`--dp-color-surface-container-low`, `--dp-color-outline-variant`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-success`, `--dp-color-error`, `--dp-font-size-37`, `--dp-font-size-56`, `--dp-font-size-250`, `--dp-font-weight-medium`, `--dp-font-weight-bold`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-radius-card`, `--dp-sem-stroke-border`, `--dp-sem-tracking-display`, `--dp-space-50`, `--dp-space-75`, `--dp-space-100`, `--dp-space-200`

**Componentes do DS usados:** `Skeleton` (estado de loading). Comumente recebe `Sparkline` e `Badge` via slots (`children`/`badge`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "StatCard" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

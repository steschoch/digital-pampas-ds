# Timeline

Rastreador de fases data-driven renderizado como lista ordenada (`<ol>`). Horizontal/compacto para visões-resumo; vertical/detalhado (datas planejadas vs. reais + entregáveis) para telas de detalhe. Cada fase é um nó com estado.

## Quando usar

- Mostrar o progresso de um projeto/onboarding por fases num painel do portal.
- Visão-resumo compacta no topo de um card (`orientation="horizontal"`, `density="compact"`).
- Dossiê detalhado de uma fase com descrição, datas planejadas/reais e entregáveis (`orientation="vertical"`, `density="detailed"`).
- Faixa mínima só com nós, para cards muito apertados (`density="minimal"`).

## Quando NÃO usar

- Alternar visões do mesmo conteúdo sem noção de progresso — use `Tabs`.
- Séries temporais / métricas ao longo do tempo — use `LineChart`.
- Lista simples de itens sem estado de fase — use uma lista comum ou `DataTable`.

## Variantes

Os eixos configuráveis são `orientation` e `density`:

| Variante | Descrição |
|---|---|
| `orientation="horizontal"` | Fases lado a lado, cada uma `flex: 1`, texto centralizado; conector horizontal entre nós. |
| `orientation="vertical"` | Fases empilhadas em grid `[nó] [conteúdo]`; conector vertical descendo entre nós. |
| `density="minimal"` | Só os nós (20px), sem labels — para cards apertados. |
| `density="compact"` | Nós + label + status (default). |
| `density="detailed"` | Adiciona descrição, datas `Planned`/`Actual` e lista de entregáveis. |

## Estados

Estados **por fase** (prop `status` de cada `TimelinePhase`):

| Estado | Comportamento |
|---|---|
| `done` | Nó preenchido em `--dp-color-primary` com "✓"; conector seguinte fica preenchido (`connectorDone`). Texto de status em ciano. |
| `active` | Nó com anel de 2px em `--dp-color-primary`, fundo tintado (15%) e animação de pulso (`tl-pulse`, 1.8s). Texto de status em ciano. |
| `upcoming` | Nó com borda pontilhada em `--dp-color-outline`, sem preenchimento. Texto de status em `--dp-color-on-surface-variant`. |
| `delayed` | Nó preenchido em `--dp-color-warning` (âmbar) com "!". Texto de status em âmbar. |

*(O pulso do estado `active` é desativado sob `@media (prefers-reduced-motion: reduce)`.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `phases` | `TimelinePhase[]` | — (obrigatório) | Fases a exibir (ver forma abaixo). |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direção do trilho. |
| `density` | `'minimal' \| 'compact' \| 'detailed'` | `'compact'` | Quanto detalhe renderizar por fase. |
| `className` | `string` | `undefined` | Classe extra no `<ol>`. |

**`TimelinePhase`** = `{ id: string; label: string; description?: string; status: PhaseStatus; plannedStart?: string; plannedEnd?: string; startedAt?: string; completedAt?: string; deliverables?: string[] }`
**`PhaseStatus`** = `'done' | 'active' | 'upcoming' | 'delayed'`

*(Datas, descrição e entregáveis só são renderizados quando `density="detailed"`.)*

## Exemplo de uso

```tsx
import { Timeline } from '@digital-pampas/ds'
import type { TimelinePhase } from '@digital-pampas/ds'

const phases: TimelinePhase[] = [
  { id: 'discovery', label: 'Descoberta', status: 'done', completedAt: '2026-05-10' },
  { id: 'build', label: 'Construção', status: 'active', plannedStart: '2026-05-12', plannedEnd: '2026-06-01', startedAt: '2026-05-12',
    description: 'Montagem do motor de outbound.', deliverables: ['ICP mapeado', 'Sequências v1'] },
  { id: 'handoff', label: 'Entrega', status: 'upcoming' },
]

// Resumo compacto num card
<Timeline phases={phases} orientation="horizontal" density="compact" />

// Dossiê detalhado
<Timeline phases={phases} orientation="vertical" density="detailed" />
```

## Acessibilidade

- Renderizado como `<ol>`/`<li>` — a ordem das fases é semântica.
- O status é **texto** visível (não só cor): cada fase mostra `done`/`active`/`upcoming`/`delayed`. Os glifos "✓" e "!" nos nós são `aria-hidden` (decorativos), assim como conectores.
- A animação de pulso do nó `active` respeita `prefers-reduced-motion`.
- Não codifique status apenas por cor — mantenha o texto de status habilitado (evite ocultá-lo via CSS custom).

## Dependências

**Tokens consumidos** (do `Timeline.module.css`):
`--dp-color-on-primary`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-warning`, `--dp-font-size-25`, `--dp-font-size-37`, `--dp-font-size-56`, `--dp-font-size-62`, `--dp-font-weight-bold`, `--dp-font-weight-semibold`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-leading-body`, `--dp-sem-radius-circle`, `--dp-sem-tracking-caps`, `--dp-space-50`, `--dp-space-75`, `--dp-space-150`, `--dp-space-300`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Timeline" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

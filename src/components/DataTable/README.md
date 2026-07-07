# DataTable

Tabela de dados leve com semântica real de `<table>`, ordenação opcional (`aria-sort`), hover/click de linha, skeletons de carregamento e estado vazio embutido. Colapsa em cards empilhados no mobile.

## Quando usar

- Para listar dados tabulares no portal (leads, campanhas, respostas) com colunas configuráveis.
- Quando precisar de ordenação por coluna, células ricas (badges, links) via `render()`, e/ou clique de linha.

## Quando NÃO usar

- Para layout/posicionamento visual: tabelas são só para dados — use CSS grid/flex.
- Para exibir uma métrica única: use `StatCard`.
- Para proporções ou séries: use os componentes de gráfico (`DonutChart`, `BarChart`, `LineChart`).

## Variantes

Este componente não possui variantes. O comportamento é modulado por props (`sortable`, `onRowClick`, `loading`) e a coluna aceita `align` e `width` individuais.

## Estados

| Estado | Comportamento |
|---|---|
| default | Renderiza a `<table>` com header e linhas. |
| loading | Quando `loading` é `true`, mostra skeletons (um header de 44px + 4 linhas de 40px) no lugar da tabela. |
| empty | Quando `rows.length === 0`, renderiza um `EmptyState` com `emptyTitle`/`emptyDescription`. |
| hover (linha) | Só quando `onRowClick` é passado: fundo da linha recebe leve realce (`color-mix` de `on-surface` a 5%). |
| focus (linha) | Só quando `onRowClick` é passado: linha é focável (`tabIndex=0`) com foco visível (`--dp-sem-stroke-focus` em `--dp-color-primary`, offset -2px). |
| ordenação | Com `sortable`, cada header vira um `<button>`; clicar alterna asc/desc e ajusta `aria-sort`. Números ordenam numericamente; o resto via `localeCompare`. |

Precedência de render: `loading` → linhas vazias → tabela. Sob mobile (`max-width: 640px`) a tabela colapsa: `thead` some e cada linha vira um card com rótulos via `data-label`.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `columns` | `DataColumn[]` | — (obrigatório) | Definição das colunas. |
| `rows` | `DataRow[]` | — (obrigatório) | Linhas de dados (`Record<string, unknown>`). |
| `sortable` | `boolean` | — | Torna os headers clicáveis para ordenar. |
| `onRowClick` | `(row: DataRow) => void` | — | Callback ao clicar/Enter numa linha; ativa hover/focus/click. |
| `loading` | `boolean` | — | Exibe skeletons no lugar da tabela. |
| `emptyTitle` | `string` | `'Nothing here yet'` | Título do estado vazio. |
| `emptyDescription` | `string` | — | Descrição do estado vazio. |
| `className` | `string` | — | Classe adicional no wrapper (ou no `EmptyState` quando vazio). |

Tipos auxiliares: `DataColumn` (`key`, `header`, `align?: 'left' \| 'right' \| 'center'`, `width?: string`, `render?: (row) => ReactNode`), `DataRow` (`Record<string, unknown>`). Sem `render`, a célula exibe `String(row[key] ?? '')`.

## Exemplo de uso

```tsx
import { DataTable } from '@digital-pampas/ds'

const columns = [
  { key: 'company', header: 'Company' },
  { key: 'status', header: 'Status', render: (r) => <Badge>{r.status as string}</Badge> },
  { key: 'replied', header: 'Replied', align: 'right' as const },
]

<DataTable columns={columns} rows={rows} sortable onRowClick={openRow} />
```

## Acessibilidade

- Usa `<table>` semântica com `<th scope="col">`; headers ordenáveis carregam `aria-sort` (`ascending`/`descending`) na coluna ativa.
- Ordenação é acionada por `<button>` real (acessível por teclado).
- Com `onRowClick`, a linha recebe `tabIndex=0` e responde ao `Enter` (`onKeyDown`), além do clique.
- Ícones de ordenação (`↑ ↓ ↕`) são `aria-hidden="true"`.
- No mobile, os rótulos de coluna reaparecem via `content: attr(data-label)` para não perder contexto ao colapsar.

## Dependências

**Tokens consumidos** (do `DataTable.module.css`):
`--dp-color-outline-variant`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-primary`, `--dp-font-size-25`, `--dp-font-size-56`, `--dp-font-weight-semibold`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-motion-interactive`, `--dp-sem-radius-card-sm`, `--dp-sem-stroke-border`, `--dp-sem-stroke-divider`, `--dp-sem-stroke-focus`, `--dp-sem-tracking-caps`, `--dp-space-100`, `--dp-space-75`, `--dp-space-50`

**Componentes do DS usados:** `Skeleton` (carregamento), `EmptyState` (sem linhas).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "DataTable" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

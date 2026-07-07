# Tabs

Abas locais de filtro/navegação com sublinhado deslizante ciano e badge de contagem opcional. Implementa o padrão WAI-ARIA `tablist` com navegação por setas.

## Quando usar

- Filtrar uma mesma lista/tabela por segmentos (ex.: "Todos", "Interessados", "Neutros" numa caixa de respostas do portal).
- Alternar entre visões de um mesmo conteúdo dentro de uma página, sem trocar de rota.
- Sempre que a contagem de itens por segmento ajudar a decisão — a prop `count` renderiza um pill neutro ao lado do label.

## Quando NÃO usar

- Navegação primária entre páginas/rotas do produto — use `Nav` (site) ou `Sidebar` (portal). Tabs não troca de rota nem é router-aware.
- Fluxos sequenciais passo a passo (wizard) — o padrão de abas não comunica progresso; use `Timeline` para etapas.
- Uma única opção ou mais de ~6 segmentos — considere `Select` para muitas escolhas.

## Variantes

Este componente não possui variantes. O único eixo de aparência é o estado ativo (`active`) de cada aba.

## Estados

| Estado | Comportamento |
|---|---|
| default | Cor do texto `--dp-color-on-surface-variant`; borda inferior transparente. |
| hover | Texto passa para `--dp-color-on-surface` (`.tab:hover`). |
| ativo (`aria-selected`) | Texto e borda inferior de 2px em `--dp-color-primary` (ciano); só a aba ativa recebe `tabIndex=0`. |
| focus | `:focus-visible` desenha outline de `--dp-sem-stroke-focus` em `--dp-color-primary`, com `outline-offset: var(--dp-focus-offset)` e cantos `--dp-sem-radius-chip`. |

*(Não há estado disabled — `TabItem` não expõe desabilitação.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `tabs` | `TabItem[]` | — (obrigatório) | Lista de abas. Cada `TabItem` = `{ id: string; label: string; count?: number }`. |
| `active` | `string` | — (obrigatório) | `id` da aba atualmente selecionada (componente controlado). |
| `onChange` | `(id: string) => void` | — (obrigatório) | Chamado no clique ou navegação por seta, com o `id` da nova aba. |
| `className` | `string` | `undefined` | Classe extra aplicada ao `tablist`. |
| `aria-label` | `string` | `undefined` | Rótulo acessível do `tablist`. |

## Exemplo de uso

```tsx
import { Tabs } from '@digital-pampas/ds'
import type { TabItem } from '@digital-pampas/ds'
import { useState } from 'react'

const tabs: TabItem[] = [
  { id: 'all', label: 'Todos', count: 24 },
  { id: 'int', label: 'Interessados', count: 8 },
  { id: 'neu', label: 'Neutros' },
]

function RepliesFilter() {
  const [active, setActive] = useState('all')
  return <Tabs tabs={tabs} active={active} onChange={setActive} aria-label="Filtro de respostas" />
}
```

## Acessibilidade

- Container com `role="tablist"`; cada botão com `role="tab"`, `id="tab-<id>"` e `aria-selected` refletindo o estado.
- **Roving tabindex:** só a aba ativa tem `tabIndex=0`; as demais `tabIndex=-1`. Tab entra/sai do grupo em um único stop.
- **Teclado:** `ArrowRight`/`ArrowLeft` movem para a próxima/anterior (com wrap circular), disparam `onChange` e movem o foco para a nova aba.
- Foco sempre visível via `:focus-visible`.
- Passe `aria-label` para descrever o conjunto de abas; a contagem (`count`) é apenas visual — garanta que o label já comunique o segmento.

## Dependências

**Tokens consumidos** (do `Tabs.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-surface-container`, `--dp-focus-offset`, `--dp-font-size-25`, `--dp-font-size-62`, `--dp-font-weight-medium`, `--dp-font-weight-semibold`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-motion-interactive`, `--dp-sem-radius-chip`, `--dp-sem-radius-pill`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-50`, `--dp-space-75`, `--dp-space-100`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Tabs" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

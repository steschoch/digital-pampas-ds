# Select

Dropdown de escolha única implementado como listbox WAI-ARIA custom (NÃO é o `<select>` nativo), com menu flutuante, navegação por teclado e fechamento por clique externo.

## Quando usar

- Escolha de 1 entre N opções onde você precisa de ícone e/ou descrição por opção (o `<select>` nativo não permite conteúdo rico).
- Filtros e seletores em telas de aplicação (portal), como escolher o cliente ativo, uma campanha, um período.

## Quando NÃO usar

- Multi-seleção — este componente é single-choice (`value: string | null`, `onChange: (value: string) => void`); múltipla escolha exige um padrão diferente.
- Poucas opções mutuamente exclusivas que devem estar todas visíveis — prefira um grupo de radios ou `Tabs`.
- Um campo de texto com autocomplete/busca — este componente não filtra por digitação; use um combobox/typeahead dedicado.

## Variantes

| `size` | Descrição |
|---|---|
| `md` (default) | Trigger com altura `--dp-space-500`. |
| `sm` | Trigger mais baixo, altura `--dp-space-400`. |

## Estados

| Estado | Comportamento |
|---|---|
| default (fechado) | Trigger mostra o `label` da opção selecionada ou o `placeholder`; chevron apontando para baixo. |
| open | `aria-expanded="true"`; chevron gira 180°; menu (`role="listbox"`) aparece logo abaixo com sombra `--dp-sem-shadow-dropdown`. |
| active (opção) | A opção sob o cursor de teclado/mouse recebe fundo `--sel-hover` (`.optionActive`). Sincroniza com `mouseenter`. |
| selected (opção) | Opção com `aria-selected="true"` exibe um check (✓) na cor `--dp-color-primary`. |
| hover (trigger) | Borda muda para `--dp-color-outline`. |
| focus | Trigger com `:focus-visible`: anel `--dp-sem-stroke-focus` na cor `--dp-color-primary`, `outline-offset: --dp-focus-offset`. |
| disabled | `opacity: 0.5`, `cursor: not-allowed`; cliques e teclado ignorados. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `options` | `SelectOption[]` | — (obrigatório) | Lista de opções. |
| `value` | `string \| null` | — (obrigatório) | Valor selecionado (controlado). `null` mostra o placeholder. |
| `onChange` | `(value: string) => void` | — (obrigatório) | Chamado ao escolher uma opção. |
| `placeholder` | `string` | `'Select…'` | Texto quando nada está selecionado. |
| `size` | `'sm' \| 'md'` | `'md'` | Altura do trigger. |
| `disabled` | `boolean` | `undefined` | Desabilita a interação. |
| `aria-label` | `string` | `undefined` | Rótulo acessível do trigger e do listbox. |
| `className` | `string` | `undefined` | Classe extra no elemento raiz. |

`SelectOption`: `{ value: string; label: string; icon?: ReactNode; description?: string }`

## Exemplo de uso

```tsx
import { useState } from 'react'
import { Select } from '@digital-pampas/ds'
import type { SelectOption } from '@digital-pampas/ds'

const options: SelectOption[] = [
  { value: 'a', label: 'Acme Corp' },
  { value: 'b', label: 'Globex', description: 'Enterprise' },
]

function ClientPicker() {
  const [value, setValue] = useState<string | null>('a')
  return <Select options={options} value={value} onChange={setValue} aria-label="Client" />
}
```

## Acessibilidade

- Padrão listbox WAI-ARIA custom, não `<select>` nativo. O gatilho é um `<button type="button">` com `aria-haspopup="listbox"` e `aria-expanded` refletindo o estado aberto/fechado.
- O menu é um `<ul role="listbox">` com `tabIndex={-1}`; cada item é `<li role="option">` com `aria-selected`.
- Teclado (handler no trigger): fechado → `Enter`, `Space` ou `ArrowDown` abrem; aberto → `ArrowDown`/`ArrowUp` movem o índice ativo com wrap, `Enter`/`Space` selecionam, `Escape` fecha.
- Fecha ao clicar fora (listener de `mousedown` no documento enquanto aberto).
- O consumidor deve passar `aria-label` (não há `<label>` associado) para o trigger e o listbox terem nome acessível.
- Observação: o índice ativo é controlado por estado interno, mas o componente não emite `aria-activedescendant` — a navegação é anunciada via `aria-selected` do item marcado.

## Dependências

**Tokens consumidos** (do `Select.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-focus-offset`, `--dp-font-size-37`, `--dp-font-size-62`, `--dp-sem-font-body`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-card-sm`, `--dp-sem-radius-chip`, `--dp-sem-shadow-dropdown`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-50`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`, `--dp-space-400`, `--dp-space-500`

Também usa `color-mix(...)` sobre `--dp-color-on-surface` para o fundo hover das opções.

**Componentes do DS usados:** nenhum (chevron é um SVG inline local).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Select" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

# Sidebar

Navegação lateral de aplicação: modo expandido (~240px), modo colapsado só com ícones (~64px) e drawer mobile (overlay + trap de foco + Esc). Router-agnostic via `renderLink`.

## Quando usar

- Navegação principal de telas de aplicação (portal do cliente): lista de itens com ícone + label, item ativo destacado.
- Layouts que precisam alternar entre versão expandida e colapsada, ou abrir como drawer em telas pequenas.

## Quando NÃO usar

- Navegação de marketing/topo do site — use `Nav` (topbar horizontal). A `Sidebar` é para o shell de aplicação.
- Filtros ou navegação local dentro de uma view — use `Tabs`.
- Não faça hardcode de rotas dentro do DS: a `Sidebar` é router-agnostic; passe o roteador via `renderLink`.

## Variantes

Controladas por props booleanas, não por uma prop `variant`:

| Modo | Como ativar | Descrição |
|---|---|---|
| Expandido | default | Largura 240px, ícone + label visíveis. |
| Colapsado | `collapsed` | Largura 64px; labels e texto do footer escondidos, ícones centralizados. |
| Drawer mobile | `mobileOpen` | Overlay `position: fixed` (largura 260px) com backdrop; `role="dialog"` + `aria-modal`. |

## Estados

| Estado | Comportamento |
|---|---|
| default (item) | Cor `--sb-fg` (`--dp-color-on-surface-variant`); borda esquerda transparente. |
| hover (item) | Cor `--sb-fg-hover` (`--dp-color-on-surface`) + leve fundo (`color-mix` de on-surface 5%). |
| active (item) | `item.active` → cor `--dp-color-primary`, fundo de tinta primária 12%, borda esquerda cyan, peso médio, `aria-current="page"`. |
| focus (item) | `:focus-visible`: anel `--dp-sem-stroke-focus` na cor primária, `outline-offset: -2px` (para não vazar do item). |
| drawer aberto | `body` trava scroll (`overflow: hidden`); foco vai para o primeiro `a`/`button`; `Esc` chama `onMobileClose`; backdrop clicável fecha. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `items` | `SidebarItem[]` | — (obrigatório) | Itens de navegação. |
| `logo` | `ReactNode` | `undefined` | Slot no topo. |
| `footer` | `ReactNode` | `undefined` | Slot no rodapé. |
| `collapsed` | `boolean` | `false` | Modo icons-only. |
| `renderLink` | `LinkRenderer` | `<a href>` | Render-prop para integrar o roteador. |
| `mobileOpen` | `boolean` | `false` | Estado controlado do drawer mobile. |
| `onMobileClose` | `() => void` | `undefined` | Chamado por Esc e clique no backdrop. |
| `ariaLabel` | `string` | `'Sidebar'` | Rótulo do `<nav>` e do drawer. |
| `className` | `string` | `undefined` | Classe extra na `<aside>` persistente. |

`SidebarItem`: `{ id: string; label: string; icon?: ReactNode; href: string; active?: boolean }`

`LinkRenderer` é importado de `../BlogCard` (tipo compartilhado de render-prop de link).

## Exemplo de uso

```tsx
import { Sidebar } from '@digital-pampas/ds'
import { Home, BarChart2 } from 'lucide-react'

const items = [
  { id: 'overview', label: 'Overview', href: '/overview', icon: <Home size={18} />, active: true },
  { id: 'campaigns', label: 'Campaigns', href: '/campaigns', icon: <BarChart2 size={18} /> },
]

<Sidebar items={items} />
```

Integração com react-router (padrão router-agnostic) — passe um `renderLink` que renderiza o `<Link>` e repassa `className`/`children`/`aria-*`:

```tsx
import { Link } from 'react-router-dom'
import { Sidebar } from '@digital-pampas/ds'

<Sidebar
  items={items}
  renderLink={({ href, children, ...rest }) => (
    <Link to={href} {...rest}>{children}</Link>
  )}
/>
```

Marque o item ativo com `active: item.href === pathname` (o `pathname` vem do seu roteador, ex.: `useLocation()`), e a `Sidebar` aplica o destaque + `aria-current="page"`.

## Acessibilidade

- A lista fica dentro de `<nav aria-label>`; itens em `<ul role="list">`.
- O item ativo recebe `aria-current="page"`.
- No modo colapsado, cada link ganha `aria-label={item.label}` (o texto visível some), preservando o nome acessível.
- Ícones dos itens são `aria-hidden="true"`.
- Drawer mobile: `role="dialog"` + `aria-modal="true"`; ao abrir, o foco vai para o primeiro elemento focável e `Esc` fecha; backdrop `aria-hidden`.
- Observação (não corrigir aqui): o drawer move o foco inicial para dentro, mas não implementa um focus trap contínuo (Tab pode escapar do drawer) nem devolve o foco ao gatilho ao fechar — o consumidor pode precisar complementar.

## Dependências

**Tokens consumidos** (do `Sidebar.module.css`):
`--dp-color-surface-container-lowest`, `--dp-color-outline-variant`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-primary`, `--dp-color-neutral-black`, `--dp-nav-height`, `--dp-font-size-62`, `--dp-font-weight-medium`, `--dp-sem-font-body`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-shadow-sidebar`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-25`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`

Também usa `color-mix(...)` sobre `--dp-color-primary` (item ativo/hover) e `--dp-color-neutral-black` (backdrop).

**Componentes do DS usados:** nenhum em runtime; importa o tipo `LinkRenderer` de `BlogCard`.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Sidebar" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

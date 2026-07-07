# Nav

Barra de navegação primária, fixa (sticky), com logo, links de desktop, CTA, alternador de tema (dark/light) e um overlay mobile em tela cheia com focus trap e fechamento por Esc. É router-agnostic: passe `pathname` do seu roteador para consciência reativa de rota.

## Quando usar

- Como navegação global do site — singleton, renderizada uma vez por página (normalmente dentro de `PageLayout`).

## Quando NÃO usar

- Dentro de modais, drawers ou layouts aninhados.
- Como navegação lateral de aplicação (portal) — use `Sidebar`.
- Como barra de topo de aplicação com slots de contexto/ações — use `TopBar`.

## Variantes

Este componente não possui variantes de prop. Ele adapta-se por breakpoint (desktop com links + CTA; mobile com hamburger + overlay) e por estado de scroll (`.scrolled`).

## Estados

| Estado | Comportamento |
|---|---|
| default | Fundo `--dp-color-surface` com borda inferior sutil. |
| scrolled | Ao rolar > 8px, ganha `backdrop-filter: blur(12px)`, fundo semitransparente e `--dp-sem-shadow-nav`. No tema claro o fundo fica sólido (sem blur). |
| link hover | Cor passa para `--dp-color-on-surface`. |
| link focus | `:focus-visible` com anel `--dp-sem-stroke-focus` na cor `--dp-color-primary`, offset 2px. |
| link ativo (anchor) | `aria-current="true"` + sublinhado (`::after` com `scaleX(1)`); rastreado por IntersectionObserver. |
| link externo | Cor de destaque `--dp-color-primary-strong`; abre em nova aba (`target="_blank" rel="noopener noreferrer"`). |
| iconBtn / cta / overlay links | Todos com hover e `:focus-visible` visível (anel de foco na cor primária). |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `links` | `NavLink[]` | conjunto Digital Pampas (How it works, Process, Cases, About, Blog) | Cada `NavLink` = `{ label: string; href: string; type: 'anchor' \| 'page' \| 'external' }`. |
| `logoSrc` | `string` | `'/logo-nav.png'` | Imagem do logo para o tema escuro (servida pelo app consumidor). |
| `logoLightSrc` | `string` | `'/logo-nav-light.png'` | Imagem do logo para o tema claro. |
| `ctaLabel` | `string` | `'Book a call'` | Texto do botão de CTA. |
| `ctaAnchor` | `string` | `'#book-call'` | Âncora do CTA (prefixada com `/` quando fora da home). |
| `pathname` | `string` | `window.location.pathname` (fallback) | Rota atual. Consumidores com router devem passar seu path reativo (ex.: `useLocation().pathname`). |

## Exemplo de uso

```tsx
import { Nav } from '@digital-pampas/ds'
import type { NavLink } from '@digital-pampas/ds'

const links: NavLink[] = [
  { label: 'How it works', href: '#how-it-works', type: 'anchor' },
  { label: 'Cases', href: '/case-studies', type: 'page' },
  { label: 'Blog', href: '/blog', type: 'page' },
]

<Nav links={links} ctaLabel="Book a call" />
```

Integração router-agnostic com react-router (passe o `pathname` reativo):

```tsx
import { Nav } from '@digital-pampas/ds'
import { useLocation } from 'react-router-dom'

function SiteNav() {
  const { pathname } = useLocation()
  return <Nav pathname={pathname} />
}
```

## Acessibilidade

- Renderizada como `<nav aria-label="Primary">`; a lista de links usa `role="list"`.
- Link de âncora ativo recebe `aria-current="true"` e indicador visual (sublinhado).
- Botão de tema expõe `aria-pressed` (true no modo claro) e `aria-label` dinâmico ("Switch to light/dark mode").
- Hamburger tem `aria-expanded`, `aria-controls="dp-mobile-menu"` e `aria-label`.
- O overlay mobile é `role="dialog" aria-modal="true"` com **focus trap** (Tab cicla dentro), foca o primeiro elemento ao abrir, fecha com **Esc** e devolve o foco ao botão hamburger; trava o scroll do `body` enquanto aberto.
- Sob `prefers-reduced-motion: reduce`, transições da nav/links/cta e as animações do overlay são desativadas.
- Persiste a escolha de tema em `localStorage['dp-theme']` e aplica `data-color-scheme` no `<html>` — atente que a Nav "possui" esse estado de tema no site.

## Dependências

**Tokens consumidos** (do `Nav.module.css`):
`--dp-space-25`, `--dp-space-37`, `--dp-space-50`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-300`, `--dp-space-400`, `--dp-space-550`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-color-on-primary`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-nav-height`, `--dp-focus-offset`, `--dp-font-size-62`, `--dp-font-size-75`, `--dp-font-size-100`, `--dp-font-size-300`, `--dp-sem-font-body`, `--dp-sem-font-display`, `--dp-sem-radius-button`, `--dp-sem-radius-chip`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-sem-shadow-nav`, `--dp-sem-motion-interactive`, `--dp-sem-motion-layout`, `--dp-sem-motion-component`

**Componentes do DS usados:** nenhum (ícones Sun/Moon/Hamburger/Close são SVGs inline; o logo vem de `logoSrc`/`logoLightSrc`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Nav" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

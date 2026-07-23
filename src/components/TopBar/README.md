# TopBar

Barra superior de aplicação. Renderiza um `<header>` sticky que ganha sombra ao rolar. Traz um slot à esquerda para contexto (seletores) e um à direita para ações; um botão hamburguer aparece no mobile.

## Quando usar

- Topo de telas do portal/aplicação, pareado com a `Sidebar` (o hamburguer abre o drawer da sidebar).
- Expor seletores de contexto à esquerda (ex.: `ClientSelector`/`CampaignSelector`) e ações à direita (`ThemeToggle`, `Avatar`, menu do usuário).

## Quando NÃO usar

- Navegação de marketing do site (logo + links + CTA) — use `Nav`.
- Cabeçalho de conteúdo de uma página (título/eyebrow/subtítulo) — use `PageHeader`; o `TopBar` é a moldura da aplicação, não o título da página.
- Navegação lateral em si — use `Sidebar`.

## Variantes

Este componente não possui variantes. A única mudança visual é o estado rolado (sombra), gerenciado internamente.

## Estados

| Estado | Comportamento |
|---|---|
| default (topo) | `<header>` sticky (`top: 0`), fundo `--dp-color-surface`, borda inferior `--dp-color-outline-variant`, sem sombra. |
| scrolled | Ao rolar além de 4px, ganha a classe `.scrolled` com `box-shadow: var(--dp-sem-shadow-nav)`. |
| menu button hover | O hamburguer passa de `--dp-color-on-surface-variant` para `--dp-color-on-surface`. |
| menu button focus | `:focus-visible` desenha outline `--dp-sem-stroke-focus` em `--dp-color-primary` com `outline-offset: var(--dp-focus-offset)`. |

*(O botão hamburguer só é exibido quando `onMenuClick` é passado E a viewport é ≤ 1024px — `display: none` por padrão, `inline-flex` no breakpoint mobile.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `leading` | `ReactNode` | `undefined` | Slot à esquerda (após o hamburguer) — seletores de contexto. |
| `trailing` | `ReactNode` | `undefined` | Slot à direita — tema, usuário, ações. |
| `onMenuClick` | `() => void` | `undefined` | Handler do hamburguer mobile (abre o drawer da `Sidebar`). Sem ele, o botão não é renderizado. |
| `menuButtonRef` | `Ref<HTMLButtonElement>` | `undefined` | Ref do hamburguer. Fechar um drawer tem que devolver o foco ao controle que o abriu (WCAG 2.4.3); guarde a ref no consumidor e chame `.focus()` ao fechar. |
| `menuButtonLabel` | `string` | `'Open menu'` | Nome acessível do hamburguer. |
| `menuExpanded` | `boolean` | `undefined` | Estado do drawer, exposto como `aria-expanded` no hamburguer. |
| `className` | `string` | `undefined` | Classe extra no `<header>`. |

## Exemplo de uso

```tsx
import { TopBar, ThemeToggle, Avatar, Select } from '@digital-pampas/ds'

<TopBar
  leading={
    <Select
      options={[{ value: 'acme', label: 'Acme Corp' }]}
      value="acme"
      onChange={setClient}
      aria-label="Cliente"
    />
  }
  trailing={
    <>
      <ThemeToggle scheme={scheme} onToggle={toggle} />
      <Avatar name="Esteban Prospero" size={32} />
    </>
  }
  onMenuClick={openSidebarDrawer}
/>
```

## Acessibilidade

- Renderiza um landmark `<header>`.
- O botão hamburguer tem `aria-label="Open menu"` e foco visível via `:focus-visible`.
- Os ícones (SVG do menu) são `aria-hidden`.
- Mantenha o conteúdo enxuto — contexto à esquerda e poucas ações à direita; pareie o hamburguer com o drawer da `Sidebar`.

## Dependências

**Tokens consumidos** (do `TopBar.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-surface`, `--dp-focus-offset`, `--dp-nav-height`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-shadow-nav`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`

**Componentes do DS usados:** nenhum diretamente (o ícone do menu é SVG inline; `leading`/`trailing` recebem componentes do DS como `Select`, `ThemeToggle`, `Avatar` via composição do consumidor)

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "TopBar" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

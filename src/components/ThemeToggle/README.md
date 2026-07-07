# ThemeToggle

Botão-ícone controlado para alternar entre tema escuro e claro. Extraído do `Nav` para que site, portal e showroom compartilhem o mesmo toggle. O app é dono de aplicar `data-color-scheme` no `<html>` e de persistir a escolha.

## Quando usar

- Onde o usuário deve trocar de tema: barras de navegação (`Nav`), barras de aplicação (`TopBar`), telas de configurações.
- Como controle único e coordenado de tema em toda a superfície do produto.

## Quando NÃO usar

- Para guardar/derivar o estado do tema — mantenha-o controlado; o app é quem persiste (ex.: `localStorage`) e aplica `data-color-scheme`. Não renderize dois toggles com estados independentes.
- Para alternâncias que não sejam tema (ligar/desligar features) — use um controle de switch/checkbox apropriado, não este componente.

## Variantes

Este componente não possui variantes. O ícone muda conforme a prop `scheme` (sol no escuro, lua no claro), mas não há eixos de estilo configuráveis.

## Estados

| Estado | Comportamento |
|---|---|
| default | Botão-ícone de 40px, outline em `--dp-color-outline-variant`, ícone em `--dp-color-on-surface-variant`. |
| hover | Ícone passa a `--dp-color-on-surface`; fundo recebe leve tinta (`on-surface` 8%); borda passa a `--dp-color-outline`. |
| focus | `:focus-visible` desenha outline `--dp-sem-stroke-focus` em `--dp-color-primary` com `outline-offset: var(--dp-focus-offset)`. |

*(Não há estado disabled — o toggle está sempre disponível.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `scheme` | `ColorScheme` (`'dark' \| 'light'`) | — (obrigatório) | Esquema atual (controlado). Define o ícone e o `aria-pressed`. |
| `onToggle` | `() => void` | — (obrigatório) | Chamado no clique; o app decide para onde alternar, persistir e aplicar. |
| `className` | `string` | `undefined` | Classe extra no botão. |

## Exemplo de uso

```tsx
import { ThemeToggle } from '@digital-pampas/ds'
import type { ColorScheme } from '@digital-pampas/ds'
import { useState } from 'react'

function Header() {
  const [scheme, setScheme] = useState<ColorScheme>('dark')

  const toggle = () => {
    const next: ColorScheme = scheme === 'dark' ? 'light' : 'dark'
    setScheme(next)
    document.documentElement.setAttribute('data-color-scheme', next)
    localStorage.setItem('color-scheme', next)
  }

  return <ThemeToggle scheme={scheme} onToggle={toggle} />
}
```

## Acessibilidade

- `<button type="button">` com `aria-pressed` refletindo o modo claro (`scheme === 'light'`).
- `aria-label` descritivo e dinâmico: "Switch to light mode" / "Switch to dark mode".
- Ícones SVG (sol/lua) são `aria-hidden` — a informação vem do `aria-label`.
- Foco sempre visível via `:focus-visible`. Alvo de 40×40px atende ao mínimo de touch target.

## Dependências

**Tokens consumidos** (do `ThemeToggle.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-focus-offset`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`

**Componentes do DS usados:** nenhum (os ícones sol/lua são SVG inline internos)

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "ThemeToggle" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

# Button

Dispara uma ação. Renderiza um `<button>` nativo com três variantes, três tamanhos, forma pill opcional e suporte completo a teclado e foco visível.

## Quando usar

- CTA principal — a ação mais importante de uma view.
- Submissão de formulário e confirmações destrutivas.
- Toolbars compactas onde `size="sm"` mantém a densidade adequada.

## Quando NÃO usar

- Links de texto inline dentro de corpo de texto — use `<a>`.
- Indicadores de status não-interativos — use `Badge`.
- Múltiplos CTAs de igual peso lado a lado — cria falsa hierarquia.

## Variantes

Controladas pela prop `variant`:

| Variante | Descrição |
|---|---|
| `primary` (default) | Fundo sólido `action-primary-default`, texto `action-primary-on-default`. Hover e active trocam para os tokens `*-hover`/`*-active`. |
| `secondary` | Contorno: texto `secondary`, borda `outline`, fundo transparente. Hover preenche com `surface-container` e realça a borda. |
| `ghost` | Sem borda/fundo; texto `on-surface`. Hover ganha fundo `surface-container` e texto `primary`. |

Tamanho via `size` (`sm` | `md` | `lg`) — altera padding e `font-size`. Forma via `pill` (`border-radius` → `--dp-sem-radius-pill`).

## Estados

| Estado | Comportamento |
|---|---|
| default | Cores da variante escolhida. |
| hover | Apenas `:not(:disabled)`: cada variante reatribui seus tokens `--btn-*` (ver acima). |
| active | `:active:not(:disabled)` desloca `translateY(1px)`; `primary` também escurece para `action-primary-active`. |
| focus | `:focus-visible` exibe outline `var(--dp-sem-stroke-focus) solid var(--dp-color-primary)` com `outline-offset: 2px`. |
| disabled | `:disabled` usa `cursor: not-allowed`, fundo `surface-container`, texto `text-disabled`, borda `surface-container` (contraste reduzido intencional). Aplicado via atributo HTML `disabled`. |
| reduced-motion | Sob `prefers-reduced-motion: reduce`, transições e o deslocamento em active são removidos. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `ReactNode` | — (obrigatório) | Rótulo e/ou ícones (slots leading/trailing são apenas filhos). |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Estilo visual. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho (padding + font-size). |
| `pill` | `boolean` | `false` | Aplica `border-radius` pill. |
| `className` | `string` | — | Classe extra concatenada às classes internas. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo do `<button>` (de `ButtonHTMLAttributes`). |
| _...rest_ | `ButtonHTMLAttributes<HTMLButtonElement>` | — | Demais atributos nativos (`onClick`, `disabled`, `aria-*`, etc.) são espalhados no `<button>`. |

## Exemplo de uso

```tsx
import { Button } from '@digital-pampas/ds'

// Variantes
<Button variant="primary">Get started</Button>
<Button variant="secondary">Learn more</Button>
<Button variant="ghost">Cancel</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Pill + ícone (ícone é apenas um filho)
<Button pill variant="primary"><Zap size={16} /> Activate</Button>

// Submit de formulário
<Button type="submit" variant="primary">Enviar</Button>

// Desabilitado
<Button disabled>Unavailable</Button>
```

## Acessibilidade

- Renderiza um `<button>` semântico com `type="button"` por padrão (evita submits acidentais).
- Foco visível apenas em `:focus-visible` (2px + cor primária, offset 2px).
- `disabled` usa o atributo HTML nativo — o botão sai da ordem de tabulação e não dispara `onClick`.
- Uso com ícone sem rótulo de texto visível exige `aria-label` no botão (repasse via `...rest`).

## Dependências

**Tokens consumidos** (do `Button.module.css`):
`--dp-color-action-primary-active`, `--dp-color-action-primary-default`, `--dp-color-action-primary-hover`, `--dp-color-action-primary-on-default`, `--dp-color-action-primary-on-hover`, `--dp-color-on-surface`, `--dp-color-outline`, `--dp-color-primary`, `--dp-color-secondary`, `--dp-color-surface-container`, `--dp-color-text-disabled`, `--dp-font-size-75`, `--dp-font-size-100`, `--dp-font-size-150`, `--dp-font-weight-semibold`, `--dp-sem-font-label`, `--dp-sem-leading-ui`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-pill`, `--dp-sem-space-gap-xs`, `--dp-sem-space-inset-xs`, `--dp-sem-space-inset-sm`, `--dp-sem-space-inset-md`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-sem-tracking-ui`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Button" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

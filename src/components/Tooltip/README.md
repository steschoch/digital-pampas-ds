# Tooltip

Dica flutuante exibida no hover E no foco de teclado. É totalmente CSS (sem posicionamento por JS): envolve um elemento focável e mostra a bolha em um dos quatro lados.

## Quando usar

- Esclarecer um ícone-botão ou rótulo abreviado (ex.: "?" ao lado de "Deliverability score").
- Contexto curto e complementar sobre um controle focável.

## Quando NÃO usar

- Informação essencial que o usuário precisa para agir — o tooltip é complementar; coloque o dado essencial visível (ou use `helpText` do `TextField`).
- Conteúdo longo, interativo ou com links — a bolha usa `pointer-events: none` e `white-space: nowrap`; para painéis ricos use `Card`/`EmptyState` ou um popover dedicado.
- Envolver um elemento não focável — sem foco, a dica não aparece para teclado. Garanta que o filho seja focável (ex.: `Button`, `<a>`, `<input>`).

## Variantes

Este componente não possui variantes de estilo. O único eixo é o lado (`side`) onde a bolha aparece:

| `side` | Descrição |
|---|---|
| `top` (default) | Bolha acima do gatilho, centralizada. |
| `bottom` | Bolha abaixo, centralizada. |
| `left` | Bolha à esquerda, centralizada na vertical. |
| `right` | Bolha à direita, centralizada na vertical. |

## Estados

| Estado | Comportamento |
|---|---|
| default (oculto) | Bolha com `opacity: 0`, `visibility: hidden`, `pointer-events: none`. |
| hover | `.wrap:hover .tip` → bolha visível (opacity 1). |
| focus | `.wrap:focus-within .tip` → bolha visível quando o filho recebe foco de teclado. |

*(A transição de opacidade é desativada sob `@media (prefers-reduced-motion: reduce)`.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `content` | `ReactNode` | — (obrigatório) | Conteúdo da bolha (texto curto). |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Lado onde a bolha aparece. |
| `children` | `ReactNode` | — (obrigatório) | Elemento gatilho — deve ser focável. |
| `className` | `string` | `undefined` | Classe extra no wrapper `<span>`. |

## Exemplo de uso

```tsx
import { Tooltip } from '@digital-pampas/ds'
import { Button } from '@digital-pampas/ds'

<Tooltip content="Pontuação de entregabilidade" side="top">
  <Button variant="secondary" size="sm">?</Button>
</Tooltip>
```

## Acessibilidade

- A bolha tem `role="tooltip"`.
- Aparece tanto no `:hover` quanto no `:focus-within`, cobrindo mouse e teclado.
- Como a exibição depende do foco/hover do filho, **envolva sempre um elemento focável**; para um ícone puramente decorativo, torne o gatilho focável (ex.: `Button` com `aria-label`).
- Mantenha o conteúdo curto — a bolha não quebra linha (`white-space: nowrap`) e não recebe eventos de ponteiro.

## Dependências

**Tokens consumidos** (do `Tooltip.module.css`):
`--dp-color-on-surface`, `--dp-color-outline-variant`, `--dp-color-surface-container-highest`, `--dp-font-size-37`, `--dp-sem-font-body`, `--dp-sem-motion-interactive`, `--dp-sem-radius-chip`, `--dp-sem-shadow-tooltip`, `--dp-sem-stroke-border`, `--dp-space-50`, `--dp-space-75`

**Componentes do DS usados:** nenhum (o gatilho é passado via `children`)

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Tooltip" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

# Problem

Seção de contraste "antes/depois": uma coluna "como a categoria faz" (coral/secondary) versus a coluna "o que fazemos" (ciano/sky-blue), enquadrando a declaração central do problema. Entra e sai com animações de scroll via `AnimatedSection`.

## Quando usar

- Uma única vez na home page, como a declaração central do problema (filtro de confiança).

## Quando NÃO usar

- Repetida múltiplas vezes — a tensão visual só funciona como par, uma vez.
- Como lista de features — o tom é deliberadamente sobre exclusões/disqualificação.

## Variantes

Este componente não possui variantes. O conteúdo é totalmente configurável por props (com defaults da Digital Pampas).

## Estados

| Estado | Comportamento |
|---|---|
| default | Renderiza eyebrow + h2 + body, o grid de contraste (bad/good) e o bloco de fechamento com link. |
| entrada (scroll) | Cada bloco anima via `AnimatedSection` (`fade-up`, `slide-left`, `slide-right`) com delays escalonados; `once` (anima só uma vez). |
| light mode | Fundo da seção passa a `--dp-color-surface-container-low`; as tintas dos cards e mini-cards sobem para permanecer visíveis sobre fundo claro. |
| closingLink hover | Opacidade cai para 0.8. |
| closingLink focus | `:focus-visible` com anel `--dp-sem-stroke-focus` na cor `--dp-color-primary`, offset 4px. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `eyebrow` | `string` | `'The real problem with outbound'` | Rótulo em maiúsculas acima do título. |
| `title` | `string` | `'Most agencies buy a list and start blasting.'` | Título `h2` da seção. |
| `body` | `string` | (texto padrão sobre bounce/domínio/ICP) | Parágrafo de apoio. |
| `bad` | `ProblemColumn` | coluna "How the category does it" com 4 itens | Coluna negativa (coral). `ProblemColumn` = `{ header: string; items: string[] }`. |
| `good` | `ProblemColumn` | coluna "What we do instead" com 4 itens | Coluna positiva (ciano). |
| `closing` | `string` | (texto padrão sobre reply rates/ownership) | Parágrafo de fechamento. |
| `closingLabel` | `string` | `'See the full process →'` | Texto do link de fechamento. |
| `closingHref` | `string` | `'#how-it-works'` | Destino do link de fechamento. |
| `id` | `string` | `'problem'` | `id` da `<section>` (âncora). |

## Exemplo de uso

```tsx
import { Problem } from '@digital-pampas/ds'

// Usa os defaults da Digital Pampas
<Problem />

// Ou customizando as colunas
<Problem
  eyebrow="The real problem"
  title="Most agencies buy a list and start blasting."
  bad={{ header: 'How the category does it', items: ['Buy a generic list', 'Blast thousands of emails'] }}
  good={{ header: 'What we do instead', items: ['Qualify by ICP first', 'Verify through 3+ providers'] }}
/>
```

## Acessibilidade

- Ícones ✗/✓ dos cabeçalhos dos cards são decorativos (`aria-hidden="true"`); o significado vem do texto do header.
- As listas de itens usam `role="list"` explícito (mantém a semântica mesmo com `list-style: none`).
- Ordem lógica de heading: `h2` na seção.
- Sob `prefers-reduced-motion: reduce`, a transição do `closingLink` é desativada; as entradas de scroll são governadas pelo `AnimatedSection`, que deve respeitar reduced-motion.

## Dependências

**Tokens consumidos** (do `Problem.module.css`):
`--dp-space-50`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-300`, `--dp-space-350`, `--dp-space-500`, `--dp-space-600`, `--dp-space-800`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-color-surface-bright`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-secondary`, `--dp-color-sky-blue`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-font-size-50`, `--dp-font-size-62`, `--dp-font-size-75`, `--dp-font-size-100`, `--dp-font-size-112`, `--dp-font-size-300`, `--dp-font-size-400`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-radius-button`, `--dp-sem-radius-card`, `--dp-sem-radius-chip`, `--dp-sem-stroke-border`, `--dp-sem-stroke-emphasis`, `--dp-sem-stroke-focus`, `--dp-sem-motion-interactive`

**Componentes do DS usados:** `AnimatedSection`

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Problem" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

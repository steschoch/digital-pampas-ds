# Proof

Seção de prova social do marketing: grid de cards com métricas que fazem count-up ao entrar na viewport, seguido de depoimentos e um link para todos os cases.

## Quando usar

- Prova social da home page — uso único na página, com números reais atrelados a cada case ("40%", "25k").
- Quando você quer combinar métricas de resultado (cards animados) com depoimentos de clientes numa única seção fechada.

## Quando NÃO usar

- Callouts de métrica no meio de outras páginas — o `Proof` é uma seção inteira (header + grid + depoimentos + CTA), pesada demais para isso. Use um bloco de estatística mais simples (por exemplo, os tiles compactos de `MetricsStrip`) ou, no contexto de portal, um `StatCard`.
- Exibir mais de 3 depoimentos ou muitos cases — a seção foi desenhada para 3 cases e 2 depoimentos por padrão; volumes maiores pedem outra composição.

## Variantes

Este componente não possui variantes de API. Cada card recebe um `accent` (`cyan` | `coral` | `indigo`) que só troca a cor do número grande.

| `accent` | Cor do número grande |
|---|---|
| `cyan` | `--dp-color-primary-strong` |
| `coral` | `--dp-color-secondary` |
| `indigo` | `--dp-color-tertiary` |

## Estados

| Estado | Comportamento |
|---|---|
| default | Cards com borda e sombra de card; números iniciam em 0. |
| count-up | Ao entrar na viewport (IntersectionObserver, threshold 0.2), cada número anima de 0 até `numVal` em ~1200ms. Sob `prefers-reduced-motion: reduce`, o número aparece já no valor final, sem animação. |
| hover (card) | Card sobe 4px (`translateY(-4px)`) e troca para `--dp-sem-shadow-card-hover`. Desabilitado sob reduced-motion. |
| hover (caseLink) | Link "Read case →" reduz opacidade para 0.75. |
| focus | Somente o botão "View all case studies →" tem foco visível: anel `--dp-sem-stroke-focus` na cor `--dp-color-primary`, com `outline-offset: --dp-focus-offset`. Os cards em si não são focáveis; os links (`<a>`) usam o foco nativo do navegador. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `eyebrow` | `string` | `'PROOF'` | Rótulo pequeno acima do título. |
| `title` | `string` | `'Real systems. Real numbers.'` | Título (`<h2>`) da seção. |
| `intro` | `string` | `"Every system ships with numbers attached. Did it move the metric? Here's a sample."` | Parágrafo introdutório. |
| `cases` | `ProofCase[]` | `DEFAULT_CASES` (3 cases) | Cards de métrica. |
| `testimonials` | `ProofTestimonial[]` | `DEFAULT_TESTIMONIALS` (2 depoimentos) | Blocos de depoimento. |
| `viewAllLabel` | `string` | `'View all case studies →'` | Texto do botão final. |
| `viewAllHref` | `string` | `'/case-studies'` | Destino do botão final. |
| `id` | `string` | `'cases'` | `id` do `<section>` (âncora de navegação). |

`ProofCase`: `{ client: string; category: string; numVal: number; suffix: string; metric: string; bullet: string; accent: 'cyan' | 'coral' | 'indigo'; href: string }`

`ProofTestimonial`: `{ quote: string; author: string; role: string }`

## Exemplo de uso

```tsx
import { Proof } from '@digital-pampas/ds'
import type { ProofCase } from '@digital-pampas/ds'

const cases: ProofCase[] = [
  { client: 'Tremmun', category: 'B2B SaaS', numVal: 40, suffix: '%', metric: 'reply rate', bullet: '10 qualified meetings booked', accent: 'cyan', href: '/case-studies/tremmun' },
]

<Proof cases={cases} viewAllHref="/case-studies" />
```

Sem props, renderiza com o conteúdo padrão da Digital Pampas:

```tsx
<Proof />
```

## Acessibilidade

- Os valores das métricas são nós de texto (`{count}{suffix}`) — legíveis por leitor de tela.
- Depoimentos usam `<blockquote>` + `<footer>` para semântica de citação.
- O bullet decorativo (`•`) e o marcador de setas ficam `aria-hidden="true"`.
- A animação de count-up e os efeitos de hover respeitam `prefers-reduced-motion: reduce`.
- Consumidor deve garantir `alt` descritivo em qualquer logo de cliente que injetar (o componente não renderiza logos por conta própria).

## Dependências

**Tokens consumidos** (do `Proof.module.css`):
`--dp-color-surface`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-color-secondary`, `--dp-color-tertiary`, `--dp-focus-offset`, `--dp-font-size-50`, `--dp-font-size-56`, `--dp-font-size-75`, `--dp-font-size-87`, `--dp-font-size-100`, `--dp-font-size-225`, `--dp-font-size-300`, `--dp-font-size-400`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-card`, `--dp-sem-shadow-card`, `--dp-sem-shadow-card-hover`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-25`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-250`, `--dp-space-300`, `--dp-space-400`, `--dp-space-500`, `--dp-space-600`, `--dp-space-800`

**Componentes do DS usados:** `AnimatedSection` (wrapper de entrada `fade-up`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Proof" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

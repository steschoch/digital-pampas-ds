# Hero

Seção hero da landing page: copy + CTAs na coluna esquerda, diagrama animado na direita, fundo de rede (canvas) com máscara e uma faixa de métricas full-bleed.

Este diretório exporta dois componentes: **`Hero`** (o principal, documentado aqui) e **`HeroDiagram`** (o visual animado da coluna direita, usado como default de `diagramSlot` e também exportado para uso avulso).

## Quando usar

- Uso único: a primeira seção da home / landing page.
- Quando você precisa de um hero de viewport completo com headline de alto impacto, dois CTAs (primário + ghost) e uma faixa de métricas.

## Quando NÃO usar

- Páginas internas. Use um padrão mais simples de heading + subtítulo.
- Como cabeçalho de conteúdo genérico. O Hero carrega o `<h1>` único da página e um background em canvas; não é um bloco de seção reutilizável.

## Variantes

Este componente não possui variantes. A customização é feita por props de conteúdo e por dois slots de override: `networkSlot` (fundo) e `diagramSlot` (visual direito).

## Estados

Componente de apresentação, sem estados interativos próprios (os CTAs são links `<a>`).

| Estado | Comportamento |
|---|---|
| default | Layout em grid 45fr/55fr (empilha no mobile); fundo de rede animado (`NetworkBgV2`) mascarado; faixa de métricas abaixo. |
| focus | `.btnPrimary:focus-visible` e `.btnGhost:focus-visible` exibem anel via `--dp-sem-stroke-focus` + `--dp-focus-offset`. |
| hover | `.btnGhost:hover` realça o CTA ghost. |

## Props

Todas as props são opcionais (`HeroProps = {}` como default), então `<Hero />` renderiza o conteúdo padrão da Digital Pampas.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `eyebrow` | `ReactNode` | "B2B Outbound Infrastructure · Built on Clay" | Texto sobre o título. |
| `title` | `ReactNode` | "The machine that fills your pipeline." | Primeira linha do headline (h1). |
| `titleAccent` | `ReactNode` | "You keep it when we're done." | Segunda linha do headline, com destaque. |
| `subheadline` | `ReactNode` | (texto de apoio) | Parágrafo abaixo do headline. |
| `primaryCta` | `HeroCTA` | `{ label: 'Book a 15-min call', href: '#book-call' }` | CTA primário. |
| `ghostCta` | `HeroCTA` | `{ label: 'See how we build it →', href: '#how-it-works' }` | CTA ghost. |
| `microcopy` | `ReactNode` | "15-minute call · No pitch deck · No commitment" | Microcopy abaixo dos CTAs. |
| `metrics` | `HeroMetric[]` | `DEFAULT_METRICS` (5 métricas) | Itens da faixa de métricas. |
| `networkSlot` | `ReactNode` | `<NetworkBgV2 />` | Override do canvas de fundo. |
| `diagramSlot` | `ReactNode` | `<HeroDiagram />` | Override do visual da coluna direita. |
| `id` | `string` | `'hero'` | `id` do elemento `<section>`. |

Tipos auxiliares exportados:

- `HeroMetric` = `{ value: string; label: string }`
- `HeroCTA` = `{ label: ReactNode; href: string }`

## Exemplo de uso

```tsx
import { Hero } from '@digital-pampas/ds'

// Conteúdo padrão da Digital Pampas
<Hero />

// Ou customizado
<Hero
  title="Your pipeline, engineered."
  primaryCta={{ label: 'Book a call', href: '#book-call' }}
  metrics={[
    { value: '4.2×', label: 'pipeline growth' },
    { value: '~4 weeks', label: 'to live' },
  ]}
/>
```

`HeroDiagram` pode ser importado separadamente (`import { HeroDiagram } from '@digital-pampas/ds'`) para reuso do visual fora do Hero.

## Acessibilidade

- Carrega o `<h1>` único da página — não usar em páginas que já tenham outro h1.
- A coluna direita (diagrama) tem `aria-hidden="true"` — é puramente decorativa.
- O `networkSlot`/`NetworkBgV2` deve ser decorativo; a animação do canvas respeita `prefers-reduced-motion`.
- Os valores da faixa de métricas são nós de texto (não imagens).
- CTAs são links com rótulos descritivos.

## Dependências

**Tokens consumidos** (do `Hero.module.css`):
`--dp-color-on-primary`, `--dp-color-on-surface`, `--dp-color-on-surface-inverse`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-inverse`, `--dp-color-primary`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-color-surface-inverse-mid`, `--dp-focus-offset`, `--dp-font-size-100`, `--dp-font-size-112`, `--dp-font-size-137`, `--dp-font-size-150`, `--dp-font-size-237`, `--dp-font-size-400`, `--dp-font-size-50`, `--dp-font-size-56`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-radius-button`, `--dp-sem-stroke-accent`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-25`, `--dp-space-250`, `--dp-space-300`, `--dp-space-400`, `--dp-space-50`, `--dp-space-500`, `--dp-space-525`, `--dp-space-600`, `--dp-space-75`, `--dp-space-800`

*(`HeroDiagram.module.css` consome tokens adicionais próprios, incluindo `--dp-sem-shadow-diagram`, `--dp-sem-shadow-header-bar` e `--dp-transition-spring`.)*

**Componentes do DS usados:** `HeroDiagram` (mesmo diretório) e `NetworkBgV2` (de `../NetworkBg`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Hero" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

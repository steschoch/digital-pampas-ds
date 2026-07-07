# WhatWeDontDo

Seção de "filtro honesto": um grid 2×2 de cards com "o que não fazemos", que pré-qualifica visitantes e constrói confiança pela franqueza. Conteúdo Digital Pampas vem como default e é sobrescrevível por props.

## Quando usar

- Uso único na home, logo após a seção `Problem`, como filtro de confiança que desqualifica públicos fora do perfil.
- Comunicar limites e posicionamento com tom candido (o que o serviço NÃO é).

## Quando NÃO usar

- Como lista de features/benefícios — o tom é deliberadamente de exclusões; para modelos de serviço positivos, use `WaysToWork`.
- Para um único card de destaque — use `Card`.
- Para o problema em si (dor do cliente) — use a seção `Problem`.

## Variantes

Este componente não possui variantes. O layout é fixo (grid 2×2 que colapsa para 1 coluna ≤ 768px); os cards não têm eixos de estilo configuráveis.

## Estados

| Estado | Comportamento |
|---|---|
| card default | Fundo `--dp-color-surface-container-low`, borda `--dp-color-outline-variant`, sombra `--dp-sem-shadow-card`. |
| card hover | `translateY(-4px)` + `--dp-sem-shadow-card-hover` + borda `--dp-color-outline`. |

*(Não há estados de foco/disabled — os cards não são interativos, são `<article>` de conteúdo. Sob `@media (prefers-reduced-motion: reduce)`, o lift do hover é neutralizado e a sombra volta ao repouso.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `eyebrow` | `string` | `'Honest Filter'` | Rótulo pequeno em caixa alta acima do título. |
| `title` | `string` | `"What we don't do."` | Título (H2) da seção. |
| `cards` | `WhatWeDontDoCard[]` | 4 cards Digital Pampas (`DEFAULT_CARDS`) | Cards de desqualificação (grid 2×2). |
| `id` | `string` | `'what-we-dont-do'` | `id` da `<section>` para navegação âncora. |

**`WhatWeDontDoCard`** = `{ num: string; title: string; body: string }`

## Exemplo de uso

```tsx
import { WhatWeDontDo } from '@digital-pampas/ds'

// Conteúdo Digital Pampas padrão
<WhatWeDontDo />

// Conteúdo customizado
<WhatWeDontDo
  eyebrow="Filtro honesto"
  title="O que não fazemos."
  cards={[
    { num: '01', title: 'Não somos SDR fracionado.', body: 'Construímos o sistema e entregamos as chaves.' },
    { num: '02', title: 'Não é setup de ferramenta.', body: 'Você recebe um motor documentado, não um login e "boa sorte".' },
    { num: '03', title: 'Não é retainer que some.', body: 'Construímos na semana um; em três meses você tem infra, não dependência.' },
    { num: '04', title: 'Não é para pré-receita.', body: 'Sem ICP claro, outbound só escala a mensagem errada.' },
  ]}
/>
```

## Acessibilidade

- Cada card é um `<article>` com `<h3>` sob o `<h2>` da seção — hierarquia de headings correta.
- Os números dos cards têm `aria-hidden="true"` (decorativos).
- Entradas animam via `AnimatedSection` (`fade-up`, `once`) com stagger de 100ms; o hover-lift é desativado sob `prefers-reduced-motion`.
- Mantenha quatro cards para o grid 2×2 equilibrado e não suavize a copy — o valor está na desqualificação franca.

## Dependências

**Tokens consumidos** (do `WhatWeDontDo.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-secondary`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-font-size-50`, `--dp-font-size-56`, `--dp-font-size-62`, `--dp-font-size-137`, `--dp-font-size-300`, `--dp-font-size-400`, `--dp-grid-max-width`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-motion-component`, `--dp-sem-radius-card`, `--dp-sem-shadow-card`, `--dp-sem-shadow-card-hover`, `--dp-sem-stroke-border`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-300`, `--dp-space-500`, `--dp-space-600`, `--dp-space-800`

**Componentes do DS usados:** `AnimatedSection` (envolve o header e cada card)

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "WhatWeDontDo" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

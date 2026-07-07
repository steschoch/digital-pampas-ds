# CaseStudyCard

Preview de case para a grade de cases: eyebrow de indústria, headline, um par de métricas de resultado (com cor de acento), excerpt e um link "View case →" sobre uma imagem de fundo. É router-agnostic.

## Quando usar

- Na grade índice de case studies do site (um card por case, layout 3 colunas responsivo).
- Para destacar dois resultados verificáveis e fortes de um case, com chamada para a página completa.

## Quando NÃO usar

- Provas na home page: use as métricas compactas da seção `Proof` em vez deste card.
- Preview de post de blog (título, data, tempo de leitura): use `BlogCard`.
- Card genérico de conteúdo sem métricas nem imagem de fundo: use `Card`.

## Variantes

Este componente não possui variantes de layout. A única dimensão configurável é a cor de acento de cada métrica (prop `accent` em `CaseMetricLike`), aplicada inline ao valor da métrica:

| `accent` | Cor aplicada ao valor da métrica |
|---|---|
| `primary` | `var(--dp-color-primary)` |
| `secondary` | `var(--dp-color-secondary)` |
| `tertiary` | `var(--dp-color-tertiary)` |
| `sky` | `var(--dp-color-sky-blue)` |
| `plum` | `var(--dp-color-plum-text)` |
| *(ausente)* | `var(--dp-color-on-surface)` (default via `accentVar()`) |

## Estados

| Estado | Comportamento |
|---|---|
| default | Card em `surface-container-low` com borda, sombra e imagem de fundo decorativa a 9% de opacidade. |
| hover (card) | Sobe 4px (`translateY(-4px)`), sombra passa para `--dp-sem-shadow-card-hover` e a imagem de fundo vai a 13% de opacidade. |
| hover (CTA) | Link "View case →" reduz opacidade para 0.75. |
| focus (CTA) | Foco visível via `:focus-visible`: contorno de 2px em `--dp-color-primary`, offset 3px, raio 4px. |

Sob `prefers-reduced-motion: reduce`, as transições do card e do CTA são desligadas e o hover não translada nem altera a sombra.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `case` | `CaseStudyLike` | — (obrigatório) | Dados do case: `slug`, `industry`, `headline`, `excerpt`, `heroMetrics[]`. |
| `delay` | `number` | `0` | Atraso (ms) da animação de entrada `fade-up` do `AnimatedSection`. |
| `hrefBase` | `string` | `'/case-studies'` | Prefixo do link; a URL final é `${hrefBase}/${case.slug}`. |
| `imageBase` | `string` | `'/images/cases'` | Prefixo da imagem de fundo; usa `${imageBase}/${case.slug}.jpg`. |
| `renderLink` | `LinkRenderer` | renderiza um `<a>` | Render-prop para o link do CTA (permite injetar o `Link` do router). |

Tipos auxiliares: `CaseStudyLike` (`slug`, `industry`, `headline`, `excerpt`, `heroMetrics: CaseMetricLike[]`), `CaseMetricLike` (`value`, `label`, `accent?`), `CaseMetricAccent` (união literal acima). São exibidas apenas as **duas primeiras** métricas de `heroMetrics` (`slice(0, 2)`).

## Exemplo de uso

```tsx
import { CaseStudyCard } from '@digital-pampas/ds'

{caseStudies.map((cs, i) => (
  <CaseStudyCard key={cs.slug} case={cs} delay={(i % 3) * 100} />
))}
```

Router-agnostic com react-router (`renderLink` recebe `href`, `className`, `children` e demais atributos como `aria-label`):

```tsx
import { Link } from 'react-router-dom'
import { CaseStudyCard } from '@digital-pampas/ds'

<CaseStudyCard
  case={cs}
  renderLink={({ href, children, ...rest }) => (
    <Link to={href} {...rest}>{children}</Link>
  )}
/>
```

## Acessibilidade

- O `<article>` recebe `aria-label="Case study: {headline}"` e o link recebe `aria-label="View case study: {headline}"`.
- O valor de cada métrica combina cor de acento **com** um label textual (não depende de cor isolada).
- A imagem de fundo é puramente decorativa (via CSS `--card-bg`, não `<img>`), portanto não precisa de texto alternativo.
- O consumidor deve garantir que as imagens em `${imageBase}/${slug}.jpg` existam; a ausência apenas remove a textura de fundo, sem quebrar o layout.

## Dependências

**Tokens consumidos** (do `CaseStudyCard.module.css`):
`--dp-color-surface-container-low`, `--dp-color-outline-variant`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-sem-radius-card`, `--dp-sem-shadow-card`, `--dp-sem-shadow-card-hover`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-font-display`, `--dp-sem-font-body`, `--dp-sem-font-code`

Adicionalmente, o `.tsx` aplica inline (via `accentVar()`) as cores de acento das métricas: `--dp-color-primary`, `--dp-color-secondary`, `--dp-color-tertiary`, `--dp-color-sky-blue`, `--dp-color-plum-text`, `--dp-color-on-surface`.

**Componentes do DS usados:** `AnimatedSection` (wrapper de entrada); reutiliza o tipo `LinkRenderer` de `BlogCard`.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "CaseStudyCard" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

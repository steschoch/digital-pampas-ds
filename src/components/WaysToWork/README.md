# WaysToWork

Seção de modelos de engajamento em grid de 3 colunas. Cada card traz número, título, corpo e um CTA em forma de botão-ghost; o último card pode ser tintado para destacar o ponto de entrada de baixo compromisso. Conteúdo Digital Pampas vem como default e é sobrescrevível por props.

## Quando usar

- Página/seção de modelo de serviço ("como trabalhar conosco") — uso único por página.
- Apresentar até três opções de engajamento com CTAs distintos por card.

## Quando NÃO usar

- Comparação genérica de features/planos lado a lado — use uma tabela de comparação.
- Mais de três opções — o grid é `repeat(3, 1fr)` e a decisão do usuário piora com excesso de escolhas.
- Um único card isolado de conteúdo — use `Card`.

## Variantes

O único eixo por card é `tinted` (via `Engagement.tinted`):

| Variante | Descrição |
|---|---|
| card padrão | Fundo `--dp-color-surface`, borda `--dp-color-outline-variant`, CTA ghost neutro. |
| card tintado (`tinted: true`) | Fundo e borda em tinta de `--dp-color-primary` (4% / 20%); CTA já em ciano (`cardCtaTinted`). Destaca o ponto de entrada. |

## Estados

| Estado | Comportamento |
|---|---|
| card default | Borda neutra, sem elevação. |
| card hover | `translateY(-4px)` + `--dp-sem-shadow-card-hover` + borda `--dp-color-outline` (no card tintado, borda passa a `primary` 40%). |
| CTA hover | Borda passa a `--dp-color-primary` e texto a `--dp-color-primary-strong`. |
| CTA focus | `:focus-visible` desenha outline `--dp-sem-stroke-focus` em `--dp-color-primary` com `outline-offset: var(--dp-focus-offset)`. |

*(Sob `@media (prefers-reduced-motion: reduce)`, o lift/sombra do hover é neutralizado.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `eyebrow` | `string` | `'WAYS TO WORK TOGETHER'` | Rótulo pequeno em caixa alta acima do título. |
| `title` | `string` | `'Three ways to build with us.'` | Título (H2) da seção. |
| `engagements` | `Engagement[]` | 3 modelos Digital Pampas (`DEFAULT_ENGAGEMENTS`) | Cards de engajamento. |
| `ctaHref` | `string` | `'#book-call'` | Destino (`href`) aplicado ao CTA de todos os cards. |
| `id` | `string` | `'ways'` | `id` da `<section>` para navegação âncora. |

**`Engagement`** = `{ num: string; title: string; body: string; cta: string; tinted?: boolean }`

## Exemplo de uso

```tsx
import { WaysToWork } from '@digital-pampas/ds'

// Conteúdo Digital Pampas padrão
<WaysToWork />

// Conteúdo customizado
<WaysToWork
  eyebrow="COMO TRABALHAMOS"
  title="Três formas de construir com a gente."
  ctaHref="#agendar"
  engagements={[
    { num: '01', title: 'Build completo.', body: 'Montamos o motor e entregamos as chaves.', cta: 'É o meu caso →' },
    { num: '02', title: 'Parceiro técnico.', body: 'Infra de dados por trás das suas campanhas.', cta: 'É o meu caso →' },
    { num: '03', title: 'Auditoria técnica.', body: 'Diagnóstico de uma semana, com plano.', cta: 'Começar aqui →', tinted: true },
  ]}
/>
```

## Acessibilidade

- Cada card é um `<article>` com `<h3>` sob o `<h2>` da seção — hierarquia de headings correta.
- Os CTAs são `<a href>` reais; garanta labels descritivos e **únicos por card** para leitores de tela (o default repete "This is me →" nos dois primeiros cards — customize quando possível).
- Entradas animam via `AnimatedSection` (`fade-up`, `once`) com stagger de 100ms — o próprio `AnimatedSection` respeita `prefers-reduced-motion`, assim como o hover dos cards.

## Dependências

**Tokens consumidos** (do `WaysToWork.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-focus-offset`, `--dp-font-size-50`, `--dp-font-size-62`, `--dp-font-size-75`, `--dp-font-size-150`, `--dp-font-size-300`, `--dp-font-size-400`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-card`, `--dp-sem-shadow-card-hover`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-62`, `--dp-space-75`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-300`, `--dp-space-400`, `--dp-space-500`, `--dp-space-600`, `--dp-space-800`

**Componentes do DS usados:** `AnimatedSection` (envolve o header e cada card)

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "WaysToWork" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

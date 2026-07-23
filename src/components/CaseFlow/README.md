# CaseFlow

O "system map" de um case study como um **diagrama de fluxo animado**: caixas com título (maiúsculas) + bullets (ou chips), posicionadas numa grade por `row`/`col`, ligadas por **flechas SVG reais** que se desenham seguindo o caminho exato. A geometria das flechas é **medida das caixas reais** (via `ResizeObserver`), então continua correta em qualquer largura e colapsa para uma coluna no mobile. Aqui as flechas são a informação (o caminho do sistema), então elas ficam. Respeita `prefers-reduced-motion`.

## Quando usar

- Reproduzir, animado e fiel, o diagrama de arquitetura ("system map") de cada case study do site, com o conteúdo e o caminho exatos do original.
- Qualquer fluxo de caixas + flechas onde a direção/topologia é a mensagem.

## Quando NÃO usar

- Progresso de projeto com estados por fase (done/active/upcoming) — use `Timeline`.
- Progresso/estados de fase (ex.: status de campanha no portal): use `Timeline` (animado).
- Funil com valores e conversão por estágio — use `FunnelChart`.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `nodes` | `CaseFlowNode[]` | — (obrigatório) | Caixas do diagrama (ver forma abaixo). |
| `edges` | `CaseFlowEdge[]` | — (obrigatório) | Flechas dirigidas entre caixas. |
| `columns` | `number` | max `col` | Nº de colunas da grade. |
| `topNote` | `string` | `undefined` | Anotação flutuante acima. |
| `bottomNote` | `string` | `undefined` | Anotação flutuante abaixo. |
| `once` | `boolean` | `true` | Anima 1x; `false` reanima a cada entrada na viewport. |
| `threshold` | `number` (0–1) | `0.25` | Fração de visibilidade que dispara o reveal. |
| `decorative` | `boolean` | `false` | `aria-hidden` quando o mesmo conteúdo aparece como texto por perto. |
| `className` | `string` | `undefined` | Classe extra na `<figure>`. |
| `aria-label` | `string` | `'System flow diagram'` | Nome acessível quando não decorativo. |

**`CaseFlowNode`** = `{ id: string; title: string; bullets?: string[]; chips?: string[]; row: number; col: number; tone?: 'default' | 'gate' | 'outcome' }`
**`CaseFlowEdge`** = `{ from: string; to: string; tone?: 'primary' | 'muted' | 'accent' }`

- `chips` (ex.: "6 signal agents", "V1…V9") renderiza caixinhas pequenas em vez de bullets.
- Node `tone`: `gate` = coral (gate de compliance/exclusão); `outcome` = borda mais forte (caixa final).
- Edge `tone`: `primary` = acento (cyan/setor); `muted` = cinza (a diagonal de quebra); `accent` = coral.

## Cor de acento

Usa `--cf-accent` (default `--dp-color-primary-strong`), sobrescrevível por contexto:

```css
.caseFlow { --cf-accent: var(--case-hue-soft); }
```

## Exemplo de uso

```tsx
import { CaseFlow } from '@steschoch/digital-pampas-ds'

<CaseFlow
  decorative
  topNote="a warm network with no system to work it."
  bottomNote="40% response rate."
  nodes={cs.flow.nodes}
  edges={cs.flow.edges}
/>
```

## Acessibilidade

- Renderizado como `<figure>`; o SVG das flechas é `aria-hidden` (decorativo).
- Use `decorative` quando o mesmo conteúdo aparecer como texto perto, para não ler duas vezes.
- Reveal das caixas e desenho das flechas respeitam `prefers-reduced-motion` (snap para o estado final).
- Não codifique a direção só por cor: a flecha (com ponta) carrega o sentido.

## Dependências

**Tokens consumidos:**
`--dp-color-coral-400`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary-strong`, `--dp-color-surface-container-low`, `--dp-duration-base`, `--dp-duration-fast`, `--dp-duration-slow`, `--dp-easing-default`, `--dp-easing-spring`, `--dp-font-size-37`, `--dp-font-size-56`, `--dp-font-size-62`, `--dp-font-weight-semibold`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-radius-card`, `--dp-sem-radius-chip`, `--dp-sem-tracking-caps`, `--dp-space-50`, `--dp-space-75`, `--dp-space-150`, `--dp-space-200`, `--dp-space-500`, `--dp-space-550`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "CaseFlow" no showroom do DS.*

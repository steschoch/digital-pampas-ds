# Sparkline

Mini linha de tendência (sem eixos, sem tooltip) em SVG puro, pensada para viver dentro de um `StatCard`. Cor via token var, então dark/light funcionam automaticamente.

## Quando usar

- Dar contexto de tendência a um KPI dentro de um `StatCard` (ex.: evolução do reply rate ao longo de semanas).
- Qualquer indicador de trend compacto onde só a forma da curva importa, não os valores exatos.

## Quando NÃO usar

- Como gráfico autônomo com eixos, legendas ou tooltip — use `LineChart`.
- Séries com menos de 2 pontos — o componente retorna `null` (não renderiza nada).

## Variantes

Este componente não possui variantes. O comportamento visual é ajustado por props (`fill`, `colorVar`, `width`, `height`).

## Estados

Este componente não possui estados interativos (sem hover/focus/disabled). É um SVG estático e decorativo.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `points` | `number[]` | — (obrigatório) | Valores da série. Com menos de 2 pontos, renderiza `null`. |
| `colorVar` | `string` | `'var(--dp-color-primary)'` | Cor da linha (e do fill) — passe uma `var()` de token. |
| `width` | `number` | `96` | Largura do SVG em px. |
| `height` | `number` | `28` | Altura do SVG em px. |
| `fill` | `boolean` | `false` | Preenche a área sob a linha com uma tinta fraca (opacidade 0.12). |
| `className` | `string` | `undefined` | Classe extra no `<svg>`. |

## Exemplo de uso

```tsx
import { Sparkline } from '@digital-pampas/ds'

<Sparkline points={[4, 8, 6, 12, 9, 15, 13]} fill />

// Dentro de um StatCard:
<StatCard label="Reply rate" value="8.95%">
  <Sparkline points={[4, 6, 5, 9, 8, 12]} fill />
</StatCard>
```

## Acessibilidade

- Decorativo: o `<svg>` é `aria-hidden="true"`. O valor numérico deve ser exposto pelo container (ex.: o `label`/`value` do `StatCard`), não pela sparkline.
- A cor vem de `colorVar` (token) e escala com o tema; garanta que o token escolhido tenha contraste adequado sobre o fundo do card.

## Dependências

**Tokens consumidos** (do `Sparkline.module.css`): nenhum. O CSS só define `display: block`. A cor da linha vem da prop `colorVar` (default `var(--dp-color-primary)`), aplicada inline no `.tsx`.

**Componentes do DS usados:** nenhum. Normalmente consumido por `StatCard` (relação inversa: o `StatCard` recebe a `Sparkline` via `children`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Sparkline" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

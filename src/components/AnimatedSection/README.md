# AnimatedSection

Wrapper que revela seus filhos com uma animação de entrada disparada pela rolagem, via `IntersectionObserver` e tokens de movimento do DS. Respeita `prefers-reduced-motion`.

## Quando usar

- Cards e itens de grid que devem "anunciar" sua chegada conforme entram na viewport.
- Títulos de seção surgindo (fade-up) à medida que o usuário rola até a seção.
- Listas escalonadas — use `delay={i * 100}` por item para um efeito em cascata.

## Quando NÃO usar

- Conteúdo acima da dobra (já visível no load): causa layout shift percebido — renderize sem o wrapper.
- Componentes altamente interativos, onde a animação de entrada distrai da tarefa.
- Para transições de rota ou animações contínuas — este componente só faz a entrada única/por scroll; não é um sistema de animação geral.

## Variantes

O comportamento de animação é controlado pela prop `animation`:

| Variante (`animation`) | Descrição |
|---|---|
| `fade-up` (default) | Surge com opacidade 0 → 1 e desliza de baixo para cima (`translateY(--dp-space-200)` → `none`). |
| `fade-in` | Apenas opacidade 0 → 1, sem deslocamento. |
| `slide-left` | Opacidade 0 → 1 deslizando a partir da esquerda (`translateX(calc(-1 * var(--dp-space-200)))` → `none`). |
| `slide-right` | Opacidade 0 → 1 deslizando a partir da direita (`translateX(--dp-space-200)` → `none`). |

## Estados

| Estado | Comportamento |
|---|---|
| oculto (inicial) | Estado de partida da variante escolhida (`opacity: 0` + transform correspondente). Antes de `.visible`. |
| visible | Alcançado quando o elemento intersecta a viewport (`isIntersecting`): `opacity: 1; transform: none`. Transição via `--dp-transition-page`. |
| reduced-motion | Sob `prefers-reduced-motion: reduce`, o conteúdo é exibido imediatamente (`opacity: 1; transform: none; transition: none`). |

Com `once={true}` (default), o observer é desconectado após a primeira aparição. Com `once={false}`, o elemento volta ao estado oculto ao sair da viewport e re-anima ao reentrar.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `ReactNode` | — (obrigatório) | Conteúdo a ser revelado. |
| `animation` | `'fade-up' \| 'fade-in' \| 'slide-left' \| 'slide-right'` | `'fade-up'` | Tipo de animação de entrada. |
| `delay` | `number` | `0` | Atraso da transição em milissegundos (aplicado via `transitionDelay` inline). |
| `threshold` | `number` | `0.1` | Fração do elemento visível para disparar (passado ao `IntersectionObserver`). |
| `once` | `boolean` | `true` | Se `true`, anima uma única vez; se `false`, re-anima a cada entrada na viewport. |
| `className` | `string` | — | Classe extra concatenada às classes internas. |
| `as` | `ElementType` | `'div'` | Elemento ou componente a renderizar (ex.: `'section'`). |

## Exemplo de uso

```tsx
import { AnimatedSection } from '@digital-pampas/ds'

// Uso básico
<AnimatedSection>
  <SectionHeader />
</AnimatedSection>

// Cards escalonados
<AnimatedSection delay={0}><Card>…</Card></AnimatedSection>
<AnimatedSection delay={100}><Card>…</Card></AnimatedSection>
<AnimatedSection delay={200}><Card>…</Card></AnimatedSection>

// Slide a partir da esquerda, renderizando como <section>
<AnimatedSection animation="slide-left" as="section">
  <ProcessStep />
</AnimatedSection>

// Re-anima toda vez que entra na viewport
<AnimatedSection once={false}>
  <StatsBar />
</AnimatedSection>
```

## Acessibilidade

- A animação é totalmente suprimida sob `@media (prefers-reduced-motion: reduce)` — o conteúdo aparece imediatamente.
- O estado oculto usa apenas `opacity: 0` (o conteúdo permanece na árvore de acessibilidade; não há `display: none`).
- Não anime conteúdo já visível acima da dobra — evita movimento desnecessário e a percepção de layout shift.

## Dependências

**Tokens consumidos** (do `AnimatedSection.module.css`):
`--dp-space-200`, `--dp-transition-page`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "AnimatedSection" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

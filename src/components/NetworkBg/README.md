# NetworkBg

Fundo decorativo em `<canvas>` 2D: uma rede animada de nós de ferramentas (Clay, Apollo, n8n, Instantly, Make, Lemlist, Apify) conectados por arestas com pulsos que viajam pelas conexões. As cores invertem conforme o tema (`data-color-scheme`). É textura ambiente do Hero — sempre `aria-hidden`.

## Quando usar

- Atrás da cópia/diagrama do Hero, como textura ambiente sutil.

## Quando NÃO usar

- Atrás de texto corrido — os pulsos reduzem o contraste de leitura.
- Em páginas de baixa potência onde uma imagem estática resolveria.
- Rodando a animação em página inteira — pertence apenas ao Hero.

## Variantes

O export principal `NetworkBg` não recebe variante por prop, mas o barrel expõe três variantes independentes (cada uma um componente próprio):

| Variante (export) | Descrição |
|---|---|
| `NetworkBgV1` | "Ghost" — monocromático, linhas finas, dots pequenos. |
| `NetworkBgV2` | "Spectrum" — nós com cor de marca + arestas em gradiente. |
| `NetworkBgV3` | "Flow" — caminhos bezier + anéis orbitais. |

## Estados

| Estado | Comportamento |
|---|---|
| animado (default) | Loop de `requestAnimationFrame`: nós têm drift suave e pulsos viajam pelas arestas. |
| estático | Com `animated={false}`, desenha nós e arestas sem drift nem pulsos. |
| fora da tela | Um `IntersectionObserver` pausa o loop de RAF quando o canvas sai da viewport e retoma ao voltar. |
| resize | Um `ResizeObserver` reescala o canvas pelo `devicePixelRatio` para nitidez. |
| tema | `isDark()` lê `data-color-scheme`; as cores de arestas, bordas, pulsos e logos invertem entre claro e escuro. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `opacity` | `number` | `1` | Opacidade CSS aplicada ao canvas — útil para seções sutis. |
| `blurPx` | `number` | `0` | Blur CSS em px (só aplicado quando > 0). |
| `nodeRadius` | `number` | `26` | Raio dos círculos dos nós em px. |
| `animated` | `boolean` | `true` | Liga/desliga o loop de animação. |
| `className` | `string` | — | Classe extra aplicada ao canvas. |

## Exemplo de uso

```tsx
import { NetworkBg } from '@digital-pampas/ds'

// dentro de um container relativo (Hero)
<div style={{ position: 'relative' }}>
  <NetworkBg opacity={0.85} nodeRadius={26} animated />
  {/* conteúdo do Hero por cima */}
</div>
```

Usando uma variante ou os dados compartilhados:

```tsx
import { NetworkBgV2, TOOLS, EDGES } from '@digital-pampas/ds'
import type { ToolNode } from '@digital-pampas/ds'

<NetworkBgV2 />
```

## Acessibilidade

- O canvas é puramente decorativo: `aria-hidden="true"` e `pointer-events: none` (não recebe foco nem interação).
- O loop pausa automaticamente quando fora da tela (economia de CPU/bateria).
- Para respeitar `prefers-reduced-motion`, o consumidor deve passar `animated={false}` — o componente não detecta a media query sozinho.

## Dependências

**Tokens consumidos** (do `NetworkBg.module.css`):
nenhum token `--dp-*` — o CSS apenas posiciona o canvas (`position: absolute; inset: 0`). As cores do desenho são calculadas em JS como valores `rgba(...)` que invertem por tema, não via tokens.

**Componentes do DS usados:** nenhum

**Exports adicionais do barrel (`index.ts`):** além de `NetworkBg`, exporta `NetworkBgV1`, `NetworkBgV2`, `NetworkBgV3`, os dados `TOOLS`/`EDGES` e o tipo `ToolNode` — todos vindos de `toolsData.ts`.

**Assets externos:** logos das ferramentas em `/logos/*.png` (servidos pelo consumidor). Nós sem logo carregado caem no fallback da inicial.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "NetworkBg" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

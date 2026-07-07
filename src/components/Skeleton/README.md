# Skeleton

Placeholder de carregamento com um shimmer sutil (desligado sob `prefers-reduced-motion`). Sempre decorativo (`aria-hidden`).

## Quando usar

- Sinalizar carregamento no lugar do conteúdo que ainda não chegou, casando a forma do skeleton com o conteúdo que vai substituir (texto, imagem/retângulo, avatar circular).
- Como building block de estados de loading de componentes maiores (ex.: `StatCard` usa `Skeleton` internamente quando `loading`).

## Quando NÃO usar

- Como spinner de ação curta (submit de botão, etc.) — para isso o feedback pertence ao próprio controle, não a um placeholder de layout.
- Deixar skeletons na tela após os dados chegarem — troque pelo conteúdo real assim que disponível.
- Para estado vazio (sem dados) — use `EmptyState`, não um skeleton permanente.

## Variantes

| `variant` | Descrição |
|---|---|
| `text` (default) | Linha de texto (altura `0.75em`). Com `lines > 1`, empilha N linhas; a última fica com 70% de largura. |
| `rect` | Bloco retangular (100% × 100% por padrão), raio `--dp-sem-radius-card-sm`. |
| `circle` | Círculo (`aspect-ratio: 1/1`), raio `--dp-sem-radius-circle`. |

## Estados

| Estado | Comportamento |
|---|---|
| default | Fundo `--sk-base` com gradiente de sheen animado (`sk-shimmer`, 1.4s, infinito) atravessando o elemento. |
| reduced-motion | Sob `prefers-reduced-motion: reduce`, a animação e o gradiente de sheen são removidos (fica só o fundo base). |

Não há estados de hover/focus/disabled — é um elemento puramente decorativo.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `'text' \| 'rect' \| 'circle'` | `'text'` | Forma do placeholder. |
| `width` | `number \| string` | `undefined` | Largura (px se `number`). Para `text` com `lines > 1`, define a largura das linhas cheias. |
| `height` | `number \| string` | `undefined` | Altura (px se `number`). |
| `lines` | `number` | `1` | Só para `variant="text"`: número de linhas empilhadas; a última é mais curta (70%). |
| `className` | `string` | `undefined` | Classe extra. |

## Exemplo de uso

```tsx
import { Skeleton } from '@digital-pampas/ds'

<Skeleton variant="text" lines={3} />
<Skeleton variant="rect" width="60%" height={40} />
<Skeleton variant="circle" width={32} height={32} />
```

## Acessibilidade

- Sempre decorativo: renderiza com `aria-hidden="true"` (tanto o elemento único quanto o wrapper `stack` do multi-linha). Não é anunciado por leitores de tela.
- O container que exibe o skeleton deve comunicar o carregamento por outro meio (ex.: `aria-busy` na região, ou um `role="status"` textual próximo), já que o skeleton em si é silencioso.
- O shimmer respeita `prefers-reduced-motion`.

## Dependências

**Tokens consumidos** (do `Skeleton.module.css`):
`--dp-color-surface-container`, `--dp-color-on-surface`, `--dp-sem-radius-chip`, `--dp-sem-radius-card-sm`, `--dp-sem-radius-circle`

Também usa `color-mix(...)` sobre `--dp-color-on-surface` (sheen do shimmer).

**Componentes do DS usados:** nenhum.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Skeleton" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

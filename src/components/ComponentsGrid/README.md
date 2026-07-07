# ComponentsGrid

> Infraestrutura do showroom — não é exportado no package @digital-pampas/ds.

Grade de cards do showroom: renderiza um catálogo de componentes, cada card com miniatura de preview, badge de categoria, nome e descrição, linkando por âncora (`#id`) para o respectivo `ComponentViewer`.

## Quando usar

- Apenas no showroom do próprio DS, como índice visual dos componentes, alimentada por um catálogo (`COMPONENT_CATALOG` / `PORTAL_CATALOG` de `src/data/componentDocs.tsx`).
- Em par com `ComponentViewer`, que renderiza a página completa de cada item ancorado.

## Quando NÃO usar

- Em produtos (site/portal): não importe — não faz parte do package público.
- Como grade genérica de conteúdo/produtos numa aplicação: componha `Card` + CSS grid do próprio produto.

## Variantes

Não há variantes de estilo. O badge de categoria muda de cor conforme `doc.category`:

| `category` | Classe do badge |
|---|---|
| `Atomic` | `catAtomic` |
| `Layout` | `catLayout` |
| `Pattern` | `catPattern` |

## Estados

O card é um link (`<a href="#id">`). Estados de hover/focus são definidos no `.module.css` (transição via `--dp-sem-motion-interactive`). Não há estado interno em JS.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `catalog` | `CatalogDoc[]` | — (obrigatório) | Lista de documentos; cada um é `{ id: string } & Omit<ComponentViewerProps, 'id'>`. Usa `overviewBlocks[0].content` como miniatura, além de `category`, `name` e `description`. |

Observação: a interface `ComponentsGridProps` **não é exportada** (o `index.ts` só reexporta o componente). O tipo do catálogo deriva de `ComponentViewerProps`.

## Exemplo de uso

Import relativo dentro do showroom do DS (não do package):

```tsx
import { ComponentsGrid } from '../components/ComponentsGrid'
import { COMPONENT_CATALOG } from '../data/componentDocs'

<ComponentsGrid catalog={COMPONENT_CATALOG} />
```

## Acessibilidade

- Cada card é um `<a>` real navegável por teclado, com foco visível via CSS.
- O `previewFade` é `aria-hidden` (decorativo).
- O texto (nome + descrição) fica sempre presente; a categoria é comunicada por texto no badge, não só por cor.

## Dependências

**Tokens consumidos** (do `ComponentsGrid.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-secondary`, `--dp-color-tertiary`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-font-size-112`, `--dp-font-size-56`, `--dp-sem-font-display`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-motion-interactive`, `--dp-sem-radius-card`, `--dp-sem-radius-card-sm`

**Componentes do DS usados:** nenhum diretamente; consome o tipo `ComponentViewerProps` e trabalha em conjunto com `ComponentViewer`.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: infraestrutura (não catalogada como componente). Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

# ComponentViewer

> Infraestrutura do showroom — não é exportado no package @digital-pampas/ds.

Visualizador de documentação de um componente no showroom do DS: header com categoria, abas (Overview, Playground, Anatomy, Prompt, Code, Guidelines), preview responsivo por breakpoint, e um aside com tokens usados e checklist de acessibilidade.

## Quando usar

- Apenas dentro do showroom do próprio DS, para renderizar a página de documentação de cada componente a partir de um objeto `ComponentViewerProps` (os catálogos em `src/data/componentDocs.tsx`).
- Consumido junto de `ComponentsGrid`, que lista os cards e linka para cada `ComponentViewer` por âncora (`#id`).

## Quando NÃO usar

- Em produtos (site/portal): não importe — não faz parte do package público. Para documentar um componente num produto, o lugar é o showroom do DS.
- Para exibir um componente "de verdade" em uso: isto é uma ferramenta de documentação, não um componente de aplicação.

## Variantes

Não há variantes de estilo. O conteúdo se adapta às props:

| Condição | Efeito |
|---|---|
| `category` | Badge colorido: `Atomic`, `Layout` ou `Pattern` (classe `cat{Category}`). |
| `playgroundControls` ausente/vazio | A aba **Playground** é omitida. |
| `noMobile` | No breakpoint Mobile, o Overview mostra um painel "Não existe no mobile". |
| `live` | Bloco extra "Live component (real)" no topo do Overview. |

## Estados

| Estado | Comportamento |
|---|---|
| aba ativa | Estado interno `tab` (default `'overview'`); botões `role="tab"` com `aria-selected`. |
| breakpoint ativo | Estado interno `bp` (default `'desktop'`); switcher com `aria-pressed`, define a largura do preview (375 / 768 / 1280px via `--pw`). |
| toggle (playground) | Controle `role="switch"` com `aria-checked`. |
| copiar código | Botão "Copy" copia `codeSnippet` para o clipboard e exibe "Copied" por 2s. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `id` | `string` | — | Identificador/âncora do componente. |
| `name` | `string` | — | Nome exibido no header. |
| `category` | `'Atomic' \| 'Layout' \| 'Pattern'` | — | Categoria (define o badge). |
| `description` | `string` | — | Descrição curta no header. |
| `overviewBlocks` | `OverviewBlock[]` | — | Blocos de preview (`label` + `content`). |
| `playgroundControls` | `PlaygroundControl[]` | — | Controles do playground; se vazio, a aba some. |
| `playgroundRender` | `(values: ControlValues) => ReactNode` | — | Render do preview do playground a partir dos valores dos controles. |
| `anatomyPreview` | `ReactNode` | — | Preview usado na aba Anatomy. |
| `anatomy` | `AnatomyPart[]` | — | Lista numerada de partes (`id`, `label`, `desc`). |
| `prompt` | `string` | — | Especificação estruturada (aba Prompt). |
| `codeSnippet` | `string` | — | Trecho de uso (aba Code, copiável). |
| `tokens` | `TokenUsage[]` | — | Tokens usados (`name`, `usage`) no aside. |
| `accessibility` | `A11yRule[]` | — | Regras a11y (`rule`, `status: pass \| warn \| fail`); gera o score X/N. |
| `whenToUse` | `string[]` | — | Bullets "When to use" (aba Guidelines). |
| `whenNotToUse` | `string[]` | — | Bullets "When not to use". |
| `guidelines` | `Guideline[]` | — | Itens `do`/`dont`. |
| `live` | `ReactNode` | — | Render ao vivo do componente real no Overview. |
| `noMobile` | `boolean` | — | Mostra painel "não existe no mobile" no breakpoint Mobile. |

Tipos auxiliares exportados: `OverviewBlock`, `PlaygroundControl`, `AnatomyPart`, `TokenUsage`, `A11yRule`, `Guideline`.

## Exemplo de uso

Import relativo dentro do showroom do DS (não do package):

```tsx
import { ComponentViewer } from '../components/ComponentViewer'
import { COMPONENT_CATALOG } from '../data/componentDocs'

const doc = COMPONENT_CATALOG[0]
<ComponentViewer id={doc.id} {...doc} />
```

## Acessibilidade

- Abas seguem WAI-ARIA: `role="tablist"`/`role="tab"` com `aria-selected`, e o corpo é `role="tabpanel"` com `aria-label` da aba ativa.
- O switcher de breakpoint é um `role="group"` com `aria-label`, botões com `aria-label` (ex.: "Mobile (375px)") e `aria-pressed`.
- O toggle do playground é `role="switch"` + `aria-checked`.
- Ícones do lucide-react são decorativos (`aria-hidden`).

## Dependências

**Tokens consumidos** (do `ComponentViewer.module.css`):
`--dp-color-on-primary`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-secondary`, `--dp-color-tertiary`, `--dp-color-surface`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-color-space-grey-500`, `--dp-color-space-grey-950`, `--dp-color-status-error-500`, `--dp-color-status-success-500`, `--dp-color-status-warning-500`, `--dp-font-size-200`, `--dp-font-size-75`, `--dp-font-size-62`, `--dp-font-size-56`, `--dp-font-size-37`, `--dp-sem-font-display`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-radius-card`, `--dp-sem-radius-card-sm`, `--dp-sem-radius-chip`, `--dp-sem-stroke-border`, `--dp-space-400`, `--dp-space-300`, `--dp-space-200`, `--dp-space-150`, `--dp-space-100`, `--dp-space-75`, `--dp-space-50`

**Componentes do DS usados:** `Select` (controles do playground). Ícones de `lucide-react` (`Check`, `X`, `Monitor`, `Tablet`, `Smartphone`, `Copy`, `CheckCheck`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: infraestrutura (não catalogada como componente). Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

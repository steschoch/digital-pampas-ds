# PageHeader

Bloco de título de página consistente: eyebrow + título (`h1`) + subtítulo + um slot lateral alinhado à direita (ex.: um `<LastSync>` ou um botão de ação). É pura composição de layout, router- e data-agnostic.

## Quando usar

- No topo de páginas do portal, para um cabeçalho de página padronizado (título + contexto + freshness/ação).

## Quando NÃO usar

- Como cabeçalho global do site — use `Nav` (site) ou `TopBar` (aplicação).
- Para o herói da landing page — use o `Hero`.
- Não aninhe headings dentro dele: o `h1` deve ser único na página.

## Variantes

Este componente não possui variantes.

## Estados

Componente não interativo — não possui estados de hover/focus/disabled. As seções `eyebrow`, `subtitle` e `aside` só são renderizadas quando as props correspondentes existem.

## Props

### PageHeader

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `ReactNode` | — (obrigatório) | Título principal da página (renderizado como `<h1>`). |
| `eyebrow` | `ReactNode` | — | Rótulo pequeno em maiúsculas acima do título. |
| `subtitle` | `ReactNode` | — | Linha de apoio abaixo do título. |
| `aside` | `ReactNode` | — | Slot à direita — ex.: um `<LastSync>` ou um botão de ação. |
| `className` | `string` | — | Classe extra aplicada ao container. |

### LastSync (export auxiliar, feito para o slot `aside`)

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | — (obrigatório) | Valor de frescor, ex.: `"2h ago"`. |
| `prefix` | `string` | `'Last sync:'` | Prefixo antes do label. |

## Exemplo de uso

```tsx
import { PageHeader, LastSync } from '@digital-pampas/ds'

<PageHeader
  eyebrow="Inbox"
  title="Replies"
  subtitle="Acme Corp · Last 30 days"
  aside={<LastSync label="2h ago" />}
/>
```

## Acessibilidade

- O título é renderizado como um único `<h1>` — mantenha-o único por página e não aninhe outros headings dentro.
- No `LastSync`, o ponto (dot) de status é decorativo: `aria-hidden="true"`; o texto ("Last sync: 2h ago") é lido normalmente.
- O componente não define ARIA no slot `aside`; se colocar um botão ali, garanta o rótulo acessível dele.

## Dependências

**Tokens consumidos** (do `PageHeader.module.css`):
`--dp-space-75`, `--dp-space-100`, `--dp-space-200`, `--dp-space-300`, `--dp-space-37`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-success`, `--dp-font-size-50`, `--dp-font-size-62`, `--dp-font-size-500`, `--dp-font-weight-semibold`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-leading-display`, `--dp-sem-tracking-caps`, `--dp-sem-radius-circle`

**Componentes do DS usados:** nenhum

**Exports do barrel:** `PageHeader` (principal) e `LastSync` (indicador de frescor de dados usado tipicamente no slot `aside`), além dos tipos `PageHeaderProps` e `LastSyncProps`.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "PageHeader" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

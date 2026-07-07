# EmptyState

Placeholder centralizado para telas vazias/em branco: ícone opcional, título, descrição e ação — com tom direto e on-brand.

## Quando usar

- Quando uma lista, tabela ou painel não tem dados ainda (ex.: "No replies yet").
- Para orientar o próximo passo do usuário via slot `action` (ex.: um `Button` de "Refresh").

## Quando NÃO usar

- Para estados de erro que precisam de diagnóstico/detalhe técnico — o EmptyState é para ausência de dados, não para falha.
- Para carregamento: use `Skeleton` (ou o estado `loading` de `ChartPanel`/`DataTable`).
- Dentro de `ChartPanel` e `DataTable` você normalmente não instancia o EmptyState diretamente — esses componentes já o embutem via props (`empty`/`emptyTitle`).

## Variantes

Este componente não possui variantes.

## Estados

Este componente não é interativo — não possui estados hover/focus/disabled. É um contêiner estático anunciado como `role="status"`. Interatividade, quando existe, vem do conteúdo passado em `action`.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `icon` | `ReactNode` | — | Ícone/ilustração opcional, exibido num círculo tingido. |
| `title` | `string` | — (obrigatório) | Título principal. |
| `description` | `string` | — | Texto de apoio (largura máx. 44ch). |
| `action` | `ReactNode` | — | Slot de ação opcional (ex.: um `Button`). |
| `className` | `string` | — | Classe adicional, concatenada à classe raiz. |

## Exemplo de uso

```tsx
import { EmptyState, Button } from '@digital-pampas/ds'
import { Bell } from 'lucide-react'

<EmptyState
  icon={<Bell size={24} />}
  title="No replies yet"
  description="Replies will appear here as your campaign runs."
  action={<Button variant="secondary" size="sm">Refresh</Button>}
/>
```

## Acessibilidade

- O contêiner é `role="status"`, para que leitores de tela anunciem o estado vazio quando ele aparece.
- O ícone é `aria-hidden="true"` (decorativo); a mensagem é sempre textual (título/descrição).
- Garanta que qualquer `action` passada seja acessível por conta própria (o `Button` do DS já é).

## Dependências

**Tokens consumidos** (do `EmptyState.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-primary`, `--dp-font-size-112`, `--dp-font-size-62`, `--dp-font-weight-semibold`, `--dp-sem-font-display`, `--dp-sem-font-body`, `--dp-sem-leading-body`, `--dp-sem-radius-circle`, `--dp-space-500`, `--dp-space-300`, `--dp-space-150`, `--dp-space-100`, `--dp-space-50`

O bloco do ícone deriva fundo e cor via `color-mix` sobre `--dp-color-primary`.

**Componentes do DS usados:** nenhum (o `icon` e a `action` são injetados pelo consumidor). É, por sua vez, usado por `ChartPanel` e `DataTable`.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "EmptyState" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

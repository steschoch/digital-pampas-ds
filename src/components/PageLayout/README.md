# PageLayout

Shell padrão de página: compõe `Nav` + `<main>` + `Footer`. Envolva páginas roteadas com ele para que cabeçalho e rodapé fiquem consistentes em todo o site. É router-agnostic — encaminha o `pathname` para a `Nav`.

## Quando usar

- Em toda página roteada, exceto a home (que compõe suas próprias seções diretamente).

## Quando NÃO usar

- Na home page — ela monta suas seções sem o shell (evita `Nav`/`Footer` duplicados).
- Em telas de aplicação/portal — o shell de aplicação usa `Sidebar` + `TopBar`, não `Nav`/`Footer`.
- Não aninhe uma segunda `Nav` ou `Footer` dentro dos `children`.

## Variantes

Este componente não possui variantes.

## Estados

Componente estrutural, sem estilo próprio e sem estados interativos. Todo comportamento (sticky, scroll, tema, foco) vive dentro da `Nav` e do `Footer`.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `ReactNode` | — (obrigatório) | Conteúdo da página, renderizado dentro de `<main>`. |
| `pathname` | `string` | — | Rota atual, repassada à `Nav` (router-agnostic). |
| `navProps` | `Omit<NavProps, 'pathname'>` | — | Props extras encaminhadas à `Nav` (o `pathname` é controlado pela prop dedicada). |
| `footerProps` | `FooterProps` | — | Props extras encaminhadas ao `Footer`. |

## Exemplo de uso

```tsx
import { PageLayout } from '@digital-pampas/ds'

<PageLayout>
  <BlogIndex />
</PageLayout>
```

Integração router-agnostic com react-router (passe o `pathname` reativo, que segue até a `Nav`):

```tsx
import { PageLayout } from '@digital-pampas/ds'
import { useLocation } from 'react-router-dom'

function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return <PageLayout pathname={pathname}>{children}</PageLayout>
}
```

## Acessibilidade

- Garante a landmark `<main>` única em volta do conteúdo da página, complementando `<nav>` (Nav) e o rodapé (Footer).
- Não introduz ARIA próprio; a acessibilidade de navegação (focus trap do overlay, `aria-current`, toggle de tema) é herdada da `Nav`.
- Mantenha um único `PageLayout` por página para não duplicar landmarks.

## Dependências

**Tokens consumidos:** nenhum — não há `PageLayout.module.css`; o componente é puramente estrutural e delega o estilo à `Nav`, à página e ao `Footer`.

**Componentes do DS usados:** `Nav`, `Footer`

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "PageLayout" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

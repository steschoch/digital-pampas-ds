# Footer

Rodapé do site: banda de newsletter, banda de "got a question" com e-mail, bloco de marca + redes sociais + colunas de links, e uma faixa legal. Todo o conteúdo é dirigido por props, com defaults da Digital Pampas.

## Quando usar

- Em toda página, renderizado uma única vez ao final (dentro de `PageLayout` ou equivalente).
- Quando você precisa de rodapé com captura de newsletter, colunas de navegação secundária e links de redes sociais.

## Quando NÃO usar

- Dentro de modais ou drawers. O rodapé é um landmark `<footer>` de página; não o aninhe em componentes de sobreposição.
- Para uma barra de ações fixa ao final de um card/tela de app. Use um layout próprio do produto.

## Variantes

Este componente não possui variantes. Ele adapta cores por color-scheme (o logo alterna entre `logoDark`/`logoLight`), mas não expõe prop de variante.

## Estados

O componente é majoritariamente estático; a banda de newsletter tem estado interno de submissão:

| Estado | Comportamento |
|---|---|
| newsletter idle | Form com input de e-mail + botão "Submit" visível. |
| newsletter submitted | Após submit com e-mail preenchido, form é substituído por "Thanks! You're on the list." e `onNewsletterSubmit` é chamado. |

Estados dos elementos interativos (do CSS):

| Estado | Comportamento |
|---|---|
| default | Links de coluna em `--dp-color-on-surface-variant`; ícones sociais em estilo neutro. |
| hover | `.colLink:hover` muda a cor para `--dp-color-on-surface`; `.newsletterBtn:hover` e `.emailLink:hover` reduzem opacidade; `.socialIcon:hover` realça. |
| focus | `:focus-visible` em input de newsletter, botões, link de e-mail, ícones sociais, link do logo e links de coluna — anel via `--dp-sem-stroke-focus` + `--dp-focus-offset`. |

*(Não há estado disabled.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `columns` | `FooterColumn[]` | `DEFAULT_COLUMNS` (Services, Company, Resources) | Colunas de links de navegação. |
| `social` | `FooterSocial[]` | `DEFAULT_SOCIAL` (LinkedIn, Email, YouTube) | Links de redes com ícone. |
| `tagline` | `ReactNode` | `"We build the machine. You own it."` | Tagline sob o logo. |
| `email` | `ReactNode` (`string`) | `'hello@digitalpampas.com'` | E-mail de contato usado na banda "Got a question?". |
| `logoSrc` | `string` | `'/logo-footer.png'` | Logo para o modo escuro. |
| `logoLightSrc` | `string` | `'/logo-footer-light.png'` | Logo para o modo claro. |
| `legal` | `string` | `'© 2026 Digital Pampas · B2B outbound infrastructure'` | Texto da faixa legal. |
| `newsletterHeading` | `string` | `'Sign up to our newsletter'` | Título da banda de newsletter. |
| `onNewsletterSubmit` | `(email: string) => void` | `undefined` | Chamado com o e-mail submetido. Se omitido, mostra estado de sucesso local. |
| `id` | `string` | `'about'` | `id` do elemento `<footer>` (âncora). |

Tipos auxiliares exportados:

- `FooterColumn` = `{ title: string; links: { label: string; href: string }[] }`
- `FooterSocial` = `{ label: string; href: string; Icon: ComponentType<{ size?: number }> }`

## Exemplo de uso

```tsx
import { Footer } from '@digital-pampas/ds'
import type { FooterColumn } from '@digital-pampas/ds'

const columns: FooterColumn[] = [
  { title: 'Services', links: [{ label: 'Build', href: '#how-it-works' }] },
]

<Footer
  columns={columns}
  email="hello@digitalpampas.com"
  onNewsletterSubmit={(email) => subscribe(email)}
/>
```

## Acessibilidade

- Renderizado como landmark `<footer>`; a navegação de colunas é um `<nav aria-label="Footer navigation">` com `<ul role="list">`.
- Todos os links têm texto descritivo; o link de e-mail tem `aria-label` no formato "Send email to …".
- O logo tem `alt` em ambas as variantes de color-scheme (a variante clara adicional é `aria-hidden`).
- Ícones sociais recebem `aria-label` a partir do `label` de cada item (o SVG interno é `aria-hidden`). Consumidor deve garantir `label` em todo item de `social`.
- Links externos (href começando com `http`) recebem `target="_blank"` + `rel="noopener noreferrer"` automaticamente.
- Input de newsletter tem `aria-label="Email address"` e é `required`.

## Dependências

**Tokens consumidos** (do `Footer.module.css`):
`--dp-color-on-primary`, `--dp-color-on-surface`, `--dp-color-on-surface-inverse`, `--dp-color-on-surface-variant`, `--dp-color-outline-inverse`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-primary-on-dark`, `--dp-color-surface`, `--dp-color-surface-container-low`, `--dp-color-surface-inverse-mid`, `--dp-focus-offset`, `--dp-font-size-112`, `--dp-font-size-37`, `--dp-font-size-50`, `--dp-font-size-62`, `--dp-font-size-75`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-chip`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-300`, `--dp-space-37`, `--dp-space-400`, `--dp-space-50`, `--dp-space-500`, `--dp-space-525`, `--dp-space-600`, `--dp-space-62`, `--dp-space-75`

**Componentes do DS usados:** nenhum. Os ícones sociais (LinkedIn, Mail, YouTube) são SVG inline no próprio arquivo — decisão deliberada de não depender de brand icons do lucide.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Footer" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

# BlogCard

Card de prévia de artigo para o índice do blog: chips de tags, título, resumo e um rodapé de metadados (data · tempo de leitura) com um link "Read post →". Router-agnostic via `renderLink`.

## Quando usar

- Grade do índice do blog — um card por post.

## Quando NÃO usar

- Um único post em destaque — use um tratamento de herói mais largo em vez do card.
- Não transforme o card inteiro em link — o alvo de foco deve permanecer no "Read post".

## Variantes

Este componente não possui variantes.

## Estados

| Estado | Comportamento |
|---|---|
| default | `<article>` sobre `surface-container-low`, borda `outline-variant` e `--dp-sem-shadow-card`. |
| hover (card) | Eleva `translateY(-4px)` e troca para `--dp-sem-shadow-card-hover` (transição via `--dp-sem-motion-component`). |
| hover (link) | O "Read post" reduz para `opacity: 0.75`. |
| focus (link) | `:focus-visible` no link exibe outline de `2px solid var(--dp-color-primary)` com `outline-offset: 3px`. |
| entrada | O card é envolvido por `AnimatedSection` (`fade-up`, `once`), então revela-se ao entrar na viewport. |
| reduced-motion | Transições do card e do link são removidas; hover não eleva nem troca sombra. |
| responsivo | Em `max-width: 768px`, o rodapé empilha em coluna. |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `post` | `BlogPostLike` | — (obrigatório) | Dados do post: `{ title, excerpt, tags: string[], date, readTime, slug }`. |
| `delay` | `number` | `0` | Atraso da animação de entrada, repassado ao `AnimatedSection` (use `i * 100` para escalonar). |
| `hrefBase` | `string` | `'/blog'` | Base do caminho do link. O `href` final é `` `${hrefBase}/${post.slug}` ``. |
| `renderLink` | `LinkRenderer` | `<a>` simples | Renderizador customizado do link (ex.: um `Link` de router). |

Tipos exportados: `BlogCardProps`, `BlogPostLike`, `LinkRenderer`. O `date` é ISO (`YYYY-MM-DD`) e é formatado internamente para `en-US` (ex.: "March 12, 2026").

## Exemplo de uso

```tsx
import { BlogCard } from '@digital-pampas/ds'

// Dentro da grade do índice do blog — link padrão <a>
{sortedPosts.map((post, i) => (
  <BlogCard key={post.slug} post={post} delay={i * 100} />
))}
```

### Integração router-agnostic (react-router)

O DS nunca importa `react-router`. Para navegação SPA, passe um `renderLink` que use o `Link` do router. O `LinkRenderer` recebe `{ href, className, 'aria-label', children }`:

```tsx
import { BlogCard } from '@digital-pampas/ds'
import { Link } from 'react-router-dom'

<BlogCard
  post={post}
  delay={i * 100}
  renderLink={({ href, children, ...rest }) => (
    <Link to={href} {...rest}>{children}</Link>
  )}
/>
```

## Acessibilidade

- O link "Read post" carrega um `aria-label` descritivo: `` `Read post: ${post.title}` ``.
- A data usa `<time dateTime={post.date}>` para leitura por máquinas.
- O container de tags recebe `aria-label="Tags"`.
- O separador " · " entre data e tempo de leitura é `aria-hidden`.
- Foco visível no link via `:focus-visible` (não anima sob reduced-motion).

## Dependências

**Tokens consumidos** (do `BlogCard.module.css`):
`--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-surface-container-low`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-radius-card`, `--dp-sem-shadow-card`, `--dp-sem-shadow-card-hover`

> Observação: o CSS deste componente ainda usa alguns valores fixos em px (padding, font-sizes, `gap`, `border-radius` das tags) em vez de tokens de espaço/tipografia — reportado, não corrigido aqui.

**Componentes do DS usados:** `AnimatedSection` (wrapper de entrada `fade-up`).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "BlogCard" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

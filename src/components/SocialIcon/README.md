# SocialIcon

Glifos de marca/social da Digital Pampas (LinkedIn, Mail, YouTube, TikTok, X) como SVG inline. NÃO são ícones Lucide — versões recentes do Lucide removeram brand icons, então o DS traz os seus.

## Quando usar

- Links de redes sociais e contato (footer, cards de autor, páginas de contato) que precisam do glifo de marca.
- Sempre que precisar de um dos ícones de marca que o Lucide não oferece mais (linkedin, youtube, tiktok, x) ou do envelope de mail no mesmo conjunto.

## Quando NÃO usar

- Ícones de UI genéricos (setas, menu, check, etc.) — esses vêm do Lucide (`lucide-react`), não daqui.
- Marcas fora do conjunto suportado (`linkedin | mail | youtube | tiktok | x`) — adicione o glifo ao DS primeiro; não improvise um SVG solto no produto.

## Variantes

Não há prop `variant`. O glifo é escolhido pela prop `name`:

| `name` | Glifo |
|---|---|
| `linkedin` | LinkedIn |
| `mail` | Envelope de e-mail (traçado, `stroke`) |
| `youtube` | YouTube |
| `tiktok` | TikTok |
| `x` | X (Twitter) |

## Estados

Este componente não possui estados interativos próprios (sem hover/focus/disabled). A cor segue `currentColor`, então hover/focus são controlados pelo elemento pai (ex.: o link que o envolve).

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `name` | `SocialIconName` | — (obrigatório) | Qual glifo renderizar: `'linkedin' \| 'mail' \| 'youtube' \| 'tiktok' \| 'x'`. |
| `size` | `number` | `--dp-sem-icon-size-md` (20px) | Tamanho em px. Se omitido, usa o token semântico de tamanho de ícone. |
| `title` | `string` | `undefined` | Rótulo acessível. Se presente, o ícone vira `role="img"` com `aria-label` + `<title>`; se ausente, fica decorativo (`aria-hidden`). |
| `className` | `string` | `undefined` | Classe extra no `<svg>`. |

## Exemplo de uso

```tsx
import { SocialIcon } from '@digital-pampas/ds'

// Decorativo (dentro de um link que já tem texto acessível):
<a href="https://linkedin.com/company/..." aria-label="LinkedIn">
  <SocialIcon name="linkedin" />
</a>

// Com rótulo próprio (ícone sozinho):
<SocialIcon name="youtube" size={24} title="YouTube" />
```

## Acessibilidade

- Sem `title`: o SVG recebe `aria-hidden` — trate o ícone como decorativo e garanta o nome acessível no elemento pai (ex.: `aria-label` no `<a>`).
- Com `title`: o SVG recebe `role="img"` + `aria-label={title}` e renderiza um `<title>` interno, ficando anunciável por conta própria.
- Herda cor via `currentColor` (`color: inherit` no CSS), então o contraste depende da cor do container — respeite os pares de token do tema.

## Dependências

**Tokens consumidos** (do `SocialIcon.module.css`): nenhum. O CSS só define layout (`display: inline-block`, `flex-shrink: 0`, `color: inherit`, `vertical-align: middle`). O tamanho padrão vem do token `--dp-sem-icon-size-md`, aplicado inline no `.tsx` como fallback de `size`.

**Componentes do DS usados:** nenhum (glifos são `<path>`/`<g>` SVG inline).

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Social & Brand — não-Lucide (componente SocialIcon)" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

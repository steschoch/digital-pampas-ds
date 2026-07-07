# Avatar

Avatar de usuário/cliente: exibe uma imagem quando `src` é informado; caso contrário, mostra as iniciais derivadas de `name` sobre uma superfície tingida.

## Quando usar

- Representar um usuário ou cliente em barras superiores, listas, comentários ou seletores (ex.: no `TopBar` do portal).
- Situações em que nem sempre há foto: o fallback de iniciais garante uma representação consistente.

## Quando NÃO usar

- Como ícone decorativo genérico ou logotipo — use `SocialIcon`/SVG inline ou os logos do DS.
- Para indicar status/categoria textual — use `Badge`.
- Não confie apenas na cor para distinguir usuários (a tinta é sempre a mesma cor primária); acompanhe de nome/rótulo.

## Variantes

Não há prop `variant`. O componente escolhe automaticamente o modo de renderização:

| Modo | Descrição |
|---|---|
| imagem | Quando `src` está presente: renderiza `<img>` com `object-fit: cover` sobre `--dp-color-surface-container`. |
| iniciais | Sem `src`: renderiza `<span>` com as iniciais derivadas de `name` sobre `--av-bg` (tinta 14% da cor primária). |

Regra de iniciais: nome vazio → `?`; um único termo → duas primeiras letras em maiúsculas; dois ou mais termos → inicial do primeiro + inicial do último, em maiúsculas.

## Estados

Este componente não possui estados interativos (sem hover/focus/disabled). É puramente apresentacional.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `name` | `string` | — (obrigatório) | Nome completo — usado para derivar as iniciais e como `alt`/`aria-label`/`title`. |
| `src` | `string` | — | URL da imagem. Se presente, renderiza `<img>` em vez das iniciais. |
| `size` | `number` | `36` | Largura e altura em px. No modo iniciais, o `font-size` é `Math.round(size * 0.4)`. |
| `className` | `string` | — | Classe extra concatenada às classes internas. |

## Exemplo de uso

```tsx
import { Avatar } from '@digital-pampas/ds'

// Fallback de iniciais (deriva "EP")
<Avatar name="Esteban Prospero" />

// Com imagem, tamanho customizado
<Avatar name="Moai Tech" src="/clients/moai.png" size={48} />
```

## Acessibilidade

- No modo imagem, o `<img>` recebe `alt={name}`.
- No modo iniciais, o `<span>` recebe `role="img"` + `aria-label={name}` (e `title={name}`), garantindo que leitores de tela anunciem o nome mesmo com apenas as iniciais visíveis.
- Passe sempre um `name` significativo — ele é a única fonte do rótulo acessível e das iniciais.
- Não use cor como único diferenciador entre usuários.

## Dependências

**Tokens consumidos** (do `Avatar.module.css`):
`--dp-color-primary`, `--dp-color-outline-variant`, `--dp-color-surface-container`, `--dp-font-weight-semibold`, `--dp-sem-font-display`, `--dp-sem-radius-circle`, `--dp-sem-stroke-border`

> Observação: `--av-bg` é calculado com `color-mix(in srgb, var(--dp-color-primary) 14%, transparent)` no próprio módulo (camada 3).

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Avatar" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

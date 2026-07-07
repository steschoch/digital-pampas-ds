# Icon

Wrapper sobre os ícones do `lucide-react` que padroniza o tamanho por token de escala e aplica a cor semântica de ícone do DS.

## Quando usar

- Sempre que precisar de um ícone de UI (setas, check, chevrons, ferramentas, status) num tamanho consistente com a escala do DS.
- Para garantir que o ícone herde a cor semântica (`--dp-sem-icon-color`) e o `flex-shrink: 0` padrão, em vez de importar `lucide-react` diretamente.

## Quando NÃO usar

- Para brand icons (logos de redes sociais/ferramentas). A versão de lucide do DS não os inclui; use `SocialIcon` do DS ou SVG inline (padrão adotado em `Footer`).
- Quando precisar de um tamanho arbitrário fora da escala. As opções são fixas (`xs`–`2xl`); para dimensões custom, use o ícone lucide diretamente no contexto do produto — mas prefira a escala do DS.

## Variantes

Este componente não possui variantes de estilo. A única dimensão configurável é o `size`, mapeado para pixels:

| `size` | px |
|---|---|
| `xs` | 12 |
| `sm` | 16 |
| `md` | 20 (default) |
| `lg` | 24 |
| `xl` | 32 |
| `2xl` | 48 |

## Estados

Componente de apresentação, sem estados interativos. Se `name` não corresponder a um ícone válido do lucide, o componente renderiza `null` (fail-safe).

## Props

Estende `Omit<LucideProps, 'size'>` — ou seja, aceita todas as props do lucide exceto `size` (que é substituída pela escala do DS). Props explícitas:

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `name` | `IconName` (`keyof typeof import('lucide-react')`) | — (obrigatória) | Nome do ícone lucide (ex.: `'ArrowRight'`, `'Check'`). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Tamanho pela escala do DS. |
| `className` | `string` | `undefined` | Classe extra (concatenada com a classe base `.icon`). |
| `...props` | `Omit<LucideProps, 'size'>` | — | Demais props do lucide (`color`, `strokeWidth`, `aria-*`, etc.). |

O tipo `IconName` é exportado do `Icon.tsx` (mas veja a nota abaixo sobre o barrel).

## Exemplo de uso

```tsx
import { Icon } from '@digital-pampas/ds'

<Icon name="ArrowRight" size="sm" />
<Icon name="Check" size="lg" aria-label="Concluído" />
```

## Acessibilidade

- Os ícones lucide são decorativos por padrão. Quando o ícone carregar significado sozinho (ex.: botão só-ícone), o consumidor deve passar `aria-label` (repassado via `...props`); quando for puramente decorativo ao lado de texto, passar `aria-hidden`.
- A cor herda `--dp-sem-icon-color`, garantindo contraste consistente com o tema; pode ser sobrescrita via `color`.

## Dependências

**Tokens consumidos** (do `Icon.module.css`):
`--dp-sem-icon-color`

**Componentes do DS usados:** nenhum. Depende do pacote externo `lucide-react`.

---
*Fonte da verdade: o código deste diretório. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

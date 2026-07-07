# Badge

Rótulo compacto e não-interativo para status, categoria ou metadado. Oito variantes de cor, formato de chip por padrão, aceita ícone opcional como filho.

## Quando usar

- Rótulos de status: `Live`, `Beta`, `New`, `Deprecated`.
- Tags de categoria em cards e itens de lista.
- Indicadores de contagem ao lado de itens de navegação.

## Quando NÃO usar

- Chips clicáveis de filtro — use `Button` com `pill` em vez disso (Badge não é interativo).
- Frases longas — o texto não quebra (`white-space: nowrap`) e cria UX ruim dentro de um badge.

## Variantes

Controladas pela prop `variant`:

| Variante | Descrição |
|---|---|
| `neutral` (default) | Fundo `surface-container-high`, texto `on-surface-variant`. Rótulo genérico/discreto. |
| `primary` | Fundo `primary-container`, texto `on-primary-container`. |
| `secondary` | Fundo `secondary-container`, texto `on-secondary-container`. |
| `tertiary` | Fundo `tertiary-container`, texto `on-tertiary-container`. |
| `coral` | Cor de apoio coral. Tem override explícito para dark (`coral-900`/`coral-100`), pois usa cor primitiva que não inverte sozinha. |
| `success` | Papel semântico de status; inverte dark/light automaticamente. |
| `warning` | Papel semântico de status; inverte dark/light automaticamente. |
| `error` | Fundo `error-container`, texto `on-error-container`. |

As variantes baseadas em tokens `*-container` são automaticamente dark-aware; `coral` recebe override explícito para `[data-color-scheme="dark"]` e para o fallback `@media (prefers-color-scheme: dark)`.

## Estados

Este componente não possui estados interativos (sem hover/focus/disabled) — é apresentacional. A única variação além das cores de `variant` é a adaptação automática a dark/light descrita acima.

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `ReactNode` | — (obrigatório) | Texto do rótulo e, opcionalmente, um ícone (ex.: `<Check size={10} /> Live`). |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'coral' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'neutral'` | Esquema de cor semântico. |
| `className` | `string` | — | Classe extra concatenada às classes internas. |
| `style` | `CSSProperties` | — | Estilos inline aplicados ao `<span>`. |

## Exemplo de uso

```tsx
import { Badge } from '@digital-pampas/ds'
import { Check } from 'lucide-react'

<Badge variant="primary">New</Badge>
<Badge variant="success"><Check size={10} /> Live</Badge>
<Badge variant="warning">Beta</Badge>
<Badge variant="error">Deprecated</Badge>
<Badge variant="neutral">Draft</Badge>
```

## Acessibilidade

- A cor nunca é o único diferenciador — o texto do rótulo está sempre presente.
- Badge é presentacional; quando usado isolado sem contexto textual próximo, envolva-o em um elemento com `aria-label` para dar sentido ao leitor de tela.
- Ao combinar ícone + texto, o ícone geralmente pode ser decorativo (o texto carrega o significado).

## Dependências

**Tokens consumidos** (do `Badge.module.css`):
`--dp-color-coral-100`, `--dp-color-coral-900`, `--dp-color-error-container`, `--dp-color-on-error-container`, `--dp-color-on-primary-container`, `--dp-color-on-secondary-container`, `--dp-color-on-success-container`, `--dp-color-on-support-coral-container`, `--dp-color-on-surface-variant`, `--dp-color-on-tertiary-container`, `--dp-color-on-warning-container`, `--dp-color-primary-container`, `--dp-color-secondary-container`, `--dp-color-success-container`, `--dp-color-support-coral-container`, `--dp-color-surface-container-high`, `--dp-color-tertiary-container`, `--dp-color-warning-container`, `--dp-font-size-50`, `--dp-font-weight-semibold`, `--dp-sem-font-label`, `--dp-sem-leading-ui`, `--dp-sem-radius-chip`, `--dp-sem-tracking-caps`, `--dp-space-25`, `--dp-space-75`

**Componentes do DS usados:** nenhum

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "Badge" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

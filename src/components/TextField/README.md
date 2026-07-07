# TextField

Campo de entrada de texto/senha com label sempre associado, texto de ajuda ou erro abaixo, slot final opcional e uma variante "terminal" monoespaçada.

## Quando usar

- Coletar entradas de linha única em formulários do produto (e-mail, senha, nome, busca).
- Sempre que precisar de label associado + mensagem de ajuda ou erro acessível (login, agendamento, configurações).
- Campos de estilo "terminal"/técnico onde o prompt `>` e a fonte de código reforçam o tom (use `variant="terminal"`).

## Quando NÃO usar

- Escolha de 1-entre-N opções — use `Select`.
- Texto longo de múltiplas linhas — o componente renderiza um `<input>`, não um `<textarea>` (não há suporte a multiline no DS hoje).
- Rótulo só como placeholder — o `label` é obrigatório e nunca deve ser substituído pelo `placeholder`.

## Variantes

| Variante | Descrição |
|---|---|
| `default` | Fundo `--dp-color-surface-container-low`, borda `--dp-color-outline-variant`, fonte de corpo. |
| `terminal` | Fundo `--dp-color-surface-container`, borda `--dp-color-outline`, prompt `>` em ciano (`aria-hidden`) e input em fonte de código (`--dp-sem-font-code`). |

## Estados

| Estado | Comportamento |
|---|---|
| default | Borda neutra; input transparente sobre o fundo do wrap. |
| focus | `.inputWrap:focus-within`: borda passa a `--dp-color-primary` + halo `box-shadow` de 2px (ciano 30%). |
| error | Com a prop `error`: borda `--dp-color-error`; no foco o halo fica vermelho (30%). Mensagem em `--dp-color-error` com `id` referenciado por `aria-describedby`. |
| disabled | Com a prop `disabled`: `opacity: 0.5` + `pointer-events: none` no wrap. |

*(O foco vive no `:focus-within` do wrapper — o `<input>` interno tem `outline: none` de propósito; o anel visível é o `box-shadow` do wrap.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | — (obrigatório) | Rótulo visível, sempre associado ao input via `htmlFor`/`id`. |
| `type` | `string` | `'text'` | Tipo do `<input>` (`email`, `password`, etc.). |
| `value` | `string` | — (obrigatório) | Valor controlado. |
| `onChange` | `(value: string) => void` | — (obrigatório) | Recebe o novo valor (já desembrulhado de `e.target.value`). |
| `error` | `string` | `undefined` | Mensagem de erro; ativa borda de erro e `aria-invalid`. Tem prioridade sobre `helpText`. |
| `helpText` | `string` | `undefined` | Texto de ajuda abaixo do campo (exibido só quando não há `error`). |
| `placeholder` | `string` | `undefined` | Placeholder do input. |
| `required` | `boolean` | `undefined` | Marca o campo como obrigatório; adiciona `*` (decorativo, `aria-hidden`) ao label. |
| `disabled` | `boolean` | `undefined` | Desabilita o input e aplica o estilo desabilitado. |
| `variant` | `'default' \| 'terminal'` | `'default'` | Estilo visual. |
| `trailing` | `ReactNode` | `undefined` | Slot final (ex.: botão de revelar senha). |
| `autoComplete` | `string` | `undefined` | Passa direto para o `<input>`. |
| `name` | `string` | `undefined` | Atributo `name` do `<input>`. |
| `className` | `string` | `undefined` | Classe extra no container do campo. |

## Exemplo de uso

```tsx
import { TextField } from '@digital-pampas/ds'
import { useState } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  return (
    <>
      <TextField
        label="E-mail"
        type="email"
        value={email}
        onChange={setEmail}
        helpText="Nunca compartilhamos seu e-mail."
        autoComplete="email"
      />
      <TextField
        label="Senha"
        type="password"
        value={pass}
        onChange={setPass}
        error={pass.length > 0 && pass.length < 8 ? 'Mínimo de 8 caracteres.' : undefined}
      />
    </>
  )
}
```

## Acessibilidade

- Label sempre ligado ao input por `htmlFor`/`id` (id gerado via `useId`).
- Ajuda e erro recebem `id` estável e são referenciados por `aria-describedby` (`-help` ou `-error`).
- Em erro, o input recebe `aria-invalid="true"`.
- O asterisco de obrigatório e o prompt `>` da variante terminal são `aria-hidden` (decorativos).
- Foco visível garantido pelo halo do `:focus-within` — não remova o wrapper.
- Escreva mensagens de erro específicas e acionáveis; não use o placeholder como rótulo.

## Dependências

**Tokens consumidos** (do `TextField.module.css`):
`--dp-color-error`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-font-size-37`, `--dp-font-size-56`, `--dp-font-size-62`, `--dp-font-weight-medium`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-label`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-stroke-border`, `--dp-space-50`, `--dp-space-150`, `--dp-space-500`

**Componentes do DS usados:** nenhum (o slot `trailing` aceita qualquer `ReactNode`)

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "TextField" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

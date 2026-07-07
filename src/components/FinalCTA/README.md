# FinalCTA

Seção de call-to-action de fechamento: painel dividido entre um card de agendamento (Cal.com) e um formulário de contato, com estado de sucesso local.

## Quando usar

- CTA de final de página, posicionado logo antes do `Footer`, para converter o visitante em uma call de descoberta de 15 minutos.
- Quando você quer oferecer dois caminhos de conversão lado a lado: agendar direto (link para Cal.com) OU enviar um formulário de contato.

## Quando NÃO usar

- CTAs no meio da página. Para isso use um padrão baseado em `Banner` ou em `Card` com botão, não esta seção de página inteira.
- Como formulário genérico multi-campo (cadastro, checkout). O formulário aqui é fixo em quatro campos (nome, e-mail, site, mensagem); para formulários arbitrários componha os campos com os inputs do DS diretamente.

## Variantes

Este componente não possui variantes. A aparência é fixa; toda a customização é feita por props de conteúdo.

## Estados

O componente tem uma máquina de estados interna de formulário (`FormState = 'idle' | 'submitting' | 'success'`):

| Estado | Comportamento |
|---|---|
| idle | Formulário visível e editável. |
| submitting | Disparado no submit; `onSubmit` é chamado e o botão fica `disabled` exibindo "Sending…". Após ~1s transita para `success`. |
| success | Formulário é substituído por uma mensagem de confirmação com `role="status"`. |

Estados dos elementos interativos (do CSS):

| Estado | Comportamento |
|---|---|
| default | Botão de agendar (`.bookButton`) e botão de envio (`.submit`) em estilo primário; inputs com borda em `--dp-color-outline-variant`. |
| hover | `.bookButton:hover` e `.submit:hover:not(:disabled)` alteram o realce do botão. |
| focus | Inputs/textarea usam `:focus` (borda destacada). Botões e link de agendar usam `:focus-visible` com anel via `--dp-sem-stroke-focus` e afastamento `--dp-focus-offset`. |
| disabled | `.submit:disabled` durante o envio — botão não clicável, rótulo "Sending…". |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `string` | `'Ready to build the machine?'` | Título (h2) da seção. |
| `sub` | `string` | (texto longo de discovery call) | Subtítulo/parágrafo de apoio. |
| `small` | `string` | (texto longo sobre limite de builds) | Parágrafo secundário menor. |
| `bookHref` | `string` | `'https://cal.com'` | URL do botão "Book a call" (abre em nova aba). |
| `onSubmit` | `(fields: { name: string; email: string; website: string; message: string }) => void` | `undefined` | Chamado no submit. Se omitido, um estado de sucesso de demonstração aparece após ~1s. |
| `id` | `string` | `'book-call'` | `id` do elemento `<section>` (âncora). |

## Exemplo de uso

```tsx
import { FinalCTA } from '@digital-pampas/ds'

<FinalCTA
  title="Ready to build your pipeline?"
  bookHref="https://cal.com/digital-pampas"
  onSubmit={(fields) => sendToBackend(fields)}
/>
```

## Acessibilidade

- Todos os inputs têm `<label>` associado via `htmlFor`/`id`; campos obrigatórios usam o atributo HTML `required`.
- O formulário usa `noValidate` (a validação fica a cargo do consumidor/backend).
- A mensagem de sucesso tem `role="status"`, anunciada por leitores de tela.
- O divisor "OR" e os ícones decorativos têm `aria-hidden="true"`.
- O botão de envio fica `disabled` durante o envio, prevenindo submissões duplicadas.
- Consumidor deve garantir: tratamento de erro com `aria-invalid`/`aria-describedby` não está implementado — se precisar de validação inline acessível, adicione via `onSubmit`.

## Dependências

**Tokens consumidos** (do `FinalCTA.module.css`):
`--dp-color-on-primary`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-color-surface`, `--dp-color-surface-bright`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-focus-offset`, `--dp-font-size-100`, `--dp-font-size-112`, `--dp-font-size-137`, `--dp-font-size-150`, `--dp-font-size-300`, `--dp-font-size-37`, `--dp-font-size-400`, `--dp-font-size-50`, `--dp-font-size-56`, `--dp-font-size-62`, `--dp-font-size-75`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-card`, `--dp-sem-radius-circle`, `--dp-sem-stroke-border`, `--dp-sem-stroke-focus`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-25`, `--dp-space-300`, `--dp-space-37`, `--dp-space-400`, `--dp-space-500`, `--dp-space-525`, `--dp-space-600`, `--dp-space-62`, `--dp-space-75`, `--dp-space-800`, `--dp-space-87`

**Componentes do DS usados:** `AnimatedSection` (animações de entrada dos blocos). Os ícones (calendário, check de sucesso) são SVG inline dentro do próprio arquivo.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "FinalCTA" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

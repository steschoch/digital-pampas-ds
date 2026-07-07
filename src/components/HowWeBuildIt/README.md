# HowWeBuildIt

Explorador de processo em 6 fases (01–06): sidebar de abas + card de detalhe controlado por scroll no desktop, e acordeão vertical no mobile/tablet (≤1024px). Cada fase tem cor de destaque, bullets e um sub-painel ilustrativo.

## Quando usar

- Seção de processo/metodologia da landing page, uso único, para explicar o passo-a-passo "do ICP ao inbox".
- Quando você tem exatamente 6 etapas sequenciais, cada uma com título, ferramenta, duração, bullets e um entregável ("YOU GET").

## Quando NÃO usar

- Com mais de 6 fases — o layout (grid, contador "/ 06", budget de scroll) é dimensionado para seis. Para listas maiores use outro padrão de navegação.
- Para conteúdo não-sequencial ou sem relação de progresso. Use um grid de `Card` ou um `Accordion` genérico.

## Conteúdo fixo

Diferente da maioria das seções de marketing do DS, este componente **não recebe props** — as 6 fases, seus textos e sub-painéis são dados internos (constante `PHASES`). Personalização exige editar o componente no DS.

## Variantes

Este componente não possui variantes de prop. Ele tem dois **layouts responsivos** automáticos:

| Layout | Condição | Descrição |
|---|---|---|
| desktop | `> 1024px` | Sidebar sticky de abas (`role="tablist"` vertical) + card de detalhe; a fase ativa avança conforme o scroll (350px por fase). |
| mobile/tablet | `≤ 1024px` | Acordeão vertical (`role="tablist"` com `aria-expanded`); clique abre a fase. |

Cada fase tem uma cor de destaque (accent) por índice: cyan, sky, indigo, plum, coral, cyan.

## Estados

| Estado | Comportamento |
|---|---|
| default | Fase 0 ativa. |
| active | Aba/fase selecionada: card de detalhe correspondente visível; barra e contador de progresso atualizados (`aria-live="polite"`). |
| completed (desktop) | Abas anteriores à ativa mostram um check no lugar do número. |
| hover | `.tab:hover:not(.tabActive)` e `.skipBtn:hover` realçam. |
| focus | `:focus-visible` em abas, botão "Skip", e card de detalhe — anel via `--dp-sem-stroke-focus` + `--dp-focus-offset`. |

Navegação por teclado nas abas do desktop: `ArrowDown`/`ArrowRight` avançam, `ArrowUp`/`ArrowLeft` voltam (com wrap), `Home`/`End` para primeira/última; o foco segue a aba ativa.

## Props

Este componente não recebe props.

## Exemplo de uso

```tsx
import { HowWeBuildIt } from '@digital-pampas/ds'

<HowWeBuildIt />
```

## Acessibilidade

- Abas da sidebar: `role="tab"` + `aria-selected` + `aria-controls`; apenas a aba ativa tem `tabIndex=0` (padrão roving tabindex).
- Cards de detalhe: `role="tabpanel"` + `aria-labelledby` apontando para a aba.
- Acordeão: cada botão tem `aria-expanded` + `aria-controls`.
- Barras de progresso (na sidebar e nos sub-painéis) têm `role="progressbar"` com `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.
- Contador de fase usa `aria-live="polite"` + `aria-atomic`.
- Ícones (check, chevron, bullets) são `aria-hidden`.
- Transições respeitam `prefers-reduced-motion`.
- O avanço por scroll só ocorre no desktop (`> 1024px`); no mobile a navegação é por clique.

## Dependências

**Tokens consumidos** (do `HowWeBuildIt.module.css`):
`--dp-color-neutral-white`, `--dp-color-on-primary`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-outline`, `--dp-color-outline-variant`, `--dp-color-phase-coral`, `--dp-color-phase-violet`, `--dp-color-plum`, `--dp-color-plum-text`, `--dp-color-primary`, `--dp-color-primary-strong`, `--dp-color-secondary`, `--dp-color-sky-blue`, `--dp-color-surface`, `--dp-color-surface-container`, `--dp-color-surface-container-low`, `--dp-color-surface-grey-muted`, `--dp-color-surface-grey-soft`, `--dp-color-surface-grey-subtle`, `--dp-color-tertiary`, `--dp-focus-offset`, `--dp-font-size-100`, `--dp-font-size-200`, `--dp-font-size-25`, `--dp-font-size-250`, `--dp-font-size-300`, `--dp-font-size-37`, `--dp-font-size-400`, `--dp-font-size-50`, `--dp-font-size-56`, `--dp-font-size-62`, `--dp-font-size-75`, `--dp-nav-height`, `--dp-sem-font-body`, `--dp-sem-font-code`, `--dp-sem-font-display`, `--dp-sem-motion-component`, `--dp-sem-motion-interactive`, `--dp-sem-radius-button`, `--dp-sem-radius-card`, `--dp-sem-radius-card-sm`, `--dp-sem-radius-chip`, `--dp-sem-radius-circle`, `--dp-sem-radius-container`, `--dp-sem-radius-pill`, `--dp-sem-stroke-border`, `--dp-sem-stroke-emphasis`, `--dp-sem-stroke-focus`, `--dp-space-100`, `--dp-space-150`, `--dp-space-200`, `--dp-space-25`, `--dp-space-250`, `--dp-space-300`, `--dp-space-37`, `--dp-space-400`, `--dp-space-50`, `--dp-space-500`, `--dp-space-525`, `--dp-space-550`, `--dp-space-600`, `--dp-space-62`, `--dp-space-75`, `--dp-space-800`

Além disso, o accent de cada fase é injetado via variável inline `--phase-accent` (mapeada de `--dp-color-primary`, `--dp-color-sky-blue`, `--dp-color-tertiary`, `--dp-color-plum`, `--dp-color-secondary`).

**Componentes do DS usados:** nenhum. Sub-painéis, ícones (check, chevron) e dados são internos ao arquivo.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "HowWeBuildIt" no showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

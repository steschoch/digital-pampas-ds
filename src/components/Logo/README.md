# Logo

Logo da Digital Pampas, reativo ao tema: mostra o asset branco no modo escuro e o preto no modo claro, sem JS (a troca é feita por CSS ligado a `data-color-scheme`).

## Quando usar

- No wordmark/lockup da `Nav` (variante `full`).
- No rodapé do site (variante `wordmark`).
- Em qualquer lugar que precise da marca oficial da Digital Pampas com troca automática de tema.

## Quando NÃO usar

- Para ícones de UI genéricos (menu, fechar, tema) — use SVG inline ou os ícones já embutidos nos componentes; a `Nav` traz os seus próprios.
- Para logos de ferramentas de terceiros (Clay, Apollo, n8n…) — esses vêm dos assets em `/logos` usados pelo `NetworkBg`, não deste componente.
- Se o consumidor não servir os assets `/logos/*.png`: o componente depende deles e nada aparecerá.

## Variantes

| Variante | Descrição |
|---|---|
| `full` | Lockup completo: ícone + wordmark (usado na Nav). Asset base `dp-logo`. |
| `wordmark` | Somente o wordmark (usado no Footer). Asset base `dp-wordmark`. |
| `icon` | Somente a marca/ícone. Asset base `dp-icon`. |

Para cada variante o componente carrega dois arquivos: `<base>-white.png` e `<base>-black.png`.

## Estados

| Estado | Comportamento |
|---|---|
| modo escuro (default) | Exibe o asset branco (`.white`); o preto fica `display: none`. |
| modo claro | Com `[data-color-scheme="light"]` no `<html>`, exibe o asset preto (`.black`) e oculta o branco. |

*(Componente não interativo — sem hover/focus/disabled.)*

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `LogoVariant` (`'full' \| 'wordmark' \| 'icon'`) | `'full'` | Qual lockup renderizar. |
| `height` | `number` | `24` | Altura renderizada em px (largura automática, proporção preservada). |
| `alt` | `string` | `'Digital Pampas'` | Texto alternativo do asset visível. |
| `className` | `string` | — | Classe extra aplicada ao wrapper `<span>`. |

## Exemplo de uso

```tsx
import { Logo } from '@digital-pampas/ds'

// Lockup completo na navegação
<Logo variant="full" height={24} />

// Wordmark no rodapé
<Logo variant="wordmark" height={20} alt="Digital Pampas" />
```

## Acessibilidade

- O `<img>` branco carrega o `alt` informado; o `<img>` preto tem `alt=""` e `aria-hidden="true"` (é apenas o espelho para o tema claro), evitando leitura duplicada.
- A troca de tema é puramente visual (CSS `display`), então leitores de tela sempre encontram exatamente um rótulo acessível.
- Ambos os assets são carregados no DOM; escolha `height` coerente com o contexto para não deslocar layout.

## Dependências

**Tokens consumidos** (do `Logo.module.css`):
nenhum token `--dp-*` — o CSS trata apenas de layout (`inline-flex`, `object-fit`) e da troca `display` por `data-color-scheme`.

**Componentes do DS usados:** nenhum

**Assets externos:** `/logos/dp-logo-{white,black}.png`, `/logos/dp-wordmark-{white,black}.png`, `/logos/dp-icon-{white,black}.png` — enviados junto ao package e servidos pelo consumidor.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: a marca aparece na Nav e no Footer do showroom do DS. Gerado/atualizado pela skill `ds-docs` em 2026-07-03.*

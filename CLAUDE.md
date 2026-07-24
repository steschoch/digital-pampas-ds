# CLAUDE.md — Digital Pampas Design System

## O que é este projeto

Design System da Digital Pampas: tokens, componentes React e um showroom interativo. É a fonte única de verdade visual dos produtos digitais (`website-digital-pampas` e `client-portal-digital-pampas`), publicado como pacote npm `@steschoch/digital-pampas-ds` no GitHub Packages e consumido por eles via `npm install`.

---

## Estrutura de pastas

```
src/
  globals/
    globals.css       — tokens (Layer 1 primitivos, Layer 2 semânticos) + regras globais
  components/
    <Nome>/
      <Nome>.tsx
      <Nome>.module.css
      index.ts
      README.md        — doc do componente (props, variantes, a11y, tokens)
    index.ts            — barrel: export de todo componente público
  data/
    componentDocs.tsx   — registro do showroom: COMPONENT_CATALOG (Site) + PORTAL_CATALOG (Portal)
  App.tsx                — navegação do showroom (grupos "Components — Site" / "Components — Portal")

public/
  fonts/, logos/         — assets copiados pro dist no build
```

---

## Comandos

```bash
npm run dev              # showroom em dev (localhost, porta padrão do Vite)
npm run build            # build da lib (dist/index.js, dist/styles.css) + types + assets
npm run build:showroom   # build do showroom (deploy separado)
npm run typecheck        # tsc -b
```

**Publicar uma versão nova (depois de aprovada, é ação sensível — release):**
```bash
npm version patch|minor|major --no-git-tag-version   # bugfix / prop nova / breaking
npm run build
npm publish                                           # publishConfig aponta pro GitHub Packages
git add package.json package-lock.json && git commit -m "Release vX.Y.Z — ..." && git push
```
Depois, nos consumidores (site/portal): bump da versão no `package.json`, `npm install` real (não copiar `dist/` manualmente — isso é só truque de preview local sem publicar), typecheck + build antes de considerar pronto.

---

## Regras e convenções

**Arquitetura de 3 camadas:** primitivos → semânticos → componente. Nunca hex direto num componente; token semântico primeiro, se não existir, criar em `globals.css`.

**Todo componente novo tem que aparecer em TRÊS lugares do showroom, não só um:**
1. Na listagem lateral da seção certa — **Site** (`App.tsx`, grupo `id: 'components'`, lista hardcoded) ou **Portal** (`PORTAL_CATALOG`, gerado automático — não precisa mexer na nav manualmente).
2. No **All Components** (`COMPONENT_CATALOG` ou `PORTAL_CATALOG`).
3. Na própria página do componente (registro em `componentDocs.tsx`).

Site vs Portal não é opcional: componente usado pelo site vai em Site; componente usado só pelo portal vai em Portal.

**Estrutura de pasta do componente:** `.tsx` + `.module.css` + `index.ts` + `README.md`, sempre. Exportar em `components/index.ts` (barrel).

**Mudança que muda o comportamento reutilizável sobe pro DS, nunca remendo direto no produto.** Se um produto precisar de um ajuste visual/comportamental num componente do DS, o ajuste é aqui, com nova versão publicada — não um override local no site/portal (isso gera drift, pego pela skill `ds-drift`).

**Props novas em componente existente: sempre aditivas e com default que preserva o comportamento atual.** Backward-compatible por padrão (ex.: `animate?: boolean` default `false` no `Timeline`).

**Cuidado com `prefers-reduced-motion` e a regra global `!important`:** `globals.css` tem uma regra `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; ... } }` que zera SÓ a duração, não o delay nem a property. Qualquer animação com `transition-delay` escalonado (stagger) precisa da própria regra de reduced-motion zerando `transition-property` e `transition-delay` com `!important` também, senão sobra um flash/atraso perceptível. (Ver `Timeline.module.css` como referência de como fazer certo.)

---

## Estado atual (2026-07-24)

**Versão publicada:** v1.10.1 no GitHub Packages.

**v1.10.1 — dois ajustes pedidos pelo cliente em `HowWeBuildIt`:**
- Campaign Dashboard (Launch) na ordem final: Emails Sent | Replies em cima, Reply Rate | Meetings embaixo.
- Travessão removido do preview da fase Sequences ("Curious: are you still…"). **Regra da Ste: travessão (—) é proibido em qualquer texto de produto.** Ao escrever copy em componente do DS, usar vírgula, dois-pontos ou ponto.

**Sessão de 24/07 — `HowWeBuildIt`: demo ao lado da narrativa (v1.10.0):**
- O card de detalhe de cada fase virou grade de 2 colunas (`.cardText` / `.cardDemo`): narrativa à esquerda, sub-painel de demonstração à direita, espelhando `.panel-left`/`.panel-right` do site atual do cliente. Abaixo de 1024px colapsa para uma coluna.
- As pílulas de ferramenta/duração saíram do `.detailTop` e foram para o topo da coluna direita, alinhadas ao número da fase. No mobile não existe segunda coluna, então a flag `badgesOnDemo` as devolve para o topo do card.
- Campaign Dashboard (fase Launch) em 2×2; o array `metrics` segue a ordem visual de leitura, não a do funil, para DOM e olho percorrerem a grade igual.
- **Armadilha aprendida (grid por linha + `fr`):** cada `.prospectRow` é um grid próprio, e track em `fr` puro tem piso automático de `min-content`. Resultado: cada linha dimensionava as colunas pelo próprio conteúdo e o cabeçalho da tabela derivava até 22px das linhas de dados. Quando linhas irmãs precisam compartilhar colunas, ou se usa um grid único / `subgrid`, ou se tira o piso com `minmax(0, …)` e se fixa as colunas de conteúdo variável (aqui, `--pc-cols` no `.prospectTable`).
- Como o card ficou muito mais baixo, a `.section` sticky do desktop passou a centralizar o conteúdo verticalmente.

**Sessão de 23/07 — `MeterBar` + `MeterList` (Portal, categoria Pattern):**
- Uma métrica por linha (bullet chart compacto): rótulo, valor, trilha com barra e marca da meta, benchmark por extenso. Criado para o redesign dos channel cards do portal (Email/LinkedIn), que empilhavam quatro números de peso igual ao lado de um gauge.
- `MeterList` é obrigatório ao empilhar: ele dissolve as linhas (`display: contents`) na própria grade, e é isso que alinha valores, trilhas e notas entre linhas.
- **Armadilha aprendida (container queries):** `container-type` num elemento com `display: contents` cria um container INVÁLIDO que ainda assim sombreia o container válido acima; as regras `@container` param de casar para tudo que está dentro dele. O sintoma foi labels colapsando a zero e a nota vazando pra fora do card no mobile. Solução: `container-type: normal` junto do `display: contents`.
- Cor é exceção, não decoração: linha dentro da meta fica neutra (primary) + ✓; só quem erra a meta ganha warning/error.
- Publicado como **v1.8.0** e já consumido pelo portal (`^1.8.0`, install real, não cópia de `dist/`).

**Sessão de 23/07 (parte 2) — showroom no mobile (publicado como v1.9.0):**
- Abaixo de 768px o showroom perdia a navegação inteira (`.sidebar { display: none }` sem substituto): dava para abrir no celular, mas não para sair da página que tivesse carregado. Agora a sidebar vira **drawer off-canvas** e uma barra fixa no topo (o `TopBar` do DS) traz o hambúrguer, o wordmark e o toggle de tema.
- Drawer se comporta como modal: Esc fecha e devolve o foco ao hambúrguer, Tab fica preso dentro dele, o fundo não rola, o scrim fecha ao toque, e escolher uma página fecha o drawer.
- `TopBar` ganhou três props aditivas: `menuButtonRef`, `menuButtonLabel`, `menuExpanded` (motivo do release v1.9.0). O portal ainda não as usa; quando for mexer no `AppShell` dele, vale ligar o retorno de foco.
- `ComponentViewer` nunca teve media query: era um "desk" de duas colunas que empurrava a página de lado (390px de viewport rolando 898px). Abaixo de 768px cada split vira coluna única, o rail desce para baixo do conteúdo e a barra de abas rola dentro de si.
- **Armadilha aprendida (duas vezes na mesma sessão, o mesmo princípio):** item de flex/grid não encolhe abaixo do conteúdo sem `min-width: 0` — foi o que fez o `.main` esticar a página. E um elemento colocado dentro de um container `display: flex` em row (a barra mobile dentro do `.layout`) fica AO LADO do conteúdo, não acima: a barra precisa ser `position: fixed`.
- Varredura de 42 páginas do showroom a 390px: nenhuma com rolagem horizontal. Desktop (1440) e tablet (820) sem regressão.

**Sessão de 22/07:**
- Criado e depois **removido** o componente `SystemFlow` (era pro portal, mas a Ste esclareceu que o portal já tem o componente certo: `Timeline`, só precisava ser animado — não precisava de componente novo).
- Criado o componente **`CaseFlow`** (categoria Pattern, seção Site): reproduz o "system map" de cada case study do site (caixas + flechas SVG desenhadas, medidas das caixas reais via `ResizeObserver`, caminho exato do diagrama original). Consumido em `website-digital-pampas`.
- `Timeline` ganhou a prop opcional **`animate`**: fases done/active/delayed começam com a aparência "upcoming" (pontilhado/cinza) e revelam a cor real em sequência ao entrar na tela; fases upcoming não precisam de animação (já nascem corretas). Corrigido um bug real de cascata com a regra global de reduced-motion (v1.6.0 → v1.6.1 → v1.6.2, ver histórico de commits). Consumido em `client-portal-digital-pampas` (Overview → Campaign status).

**Próximo:** nenhuma pendência aberta no DS neste momento. Ver `CLAUDE.md` do site e do portal para o que falta lá.

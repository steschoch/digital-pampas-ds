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

## Estado atual (2026-07-22)

**Versão publicada:** v1.6.2 no GitHub Packages.

**Sessão de hoje:**
- Criado e depois **removido** o componente `SystemFlow` (era pro portal, mas a Ste esclareceu que o portal já tem o componente certo: `Timeline`, só precisava ser animado — não precisava de componente novo).
- Criado o componente **`CaseFlow`** (categoria Pattern, seção Site): reproduz o "system map" de cada case study do site (caixas + flechas SVG desenhadas, medidas das caixas reais via `ResizeObserver`, caminho exato do diagrama original). Consumido em `website-digital-pampas`.
- `Timeline` ganhou a prop opcional **`animate`**: fases done/active/delayed começam com a aparência "upcoming" (pontilhado/cinza) e revelam a cor real em sequência ao entrar na tela; fases upcoming não precisam de animação (já nascem corretas). Corrigido um bug real de cascata com a regra global de reduced-motion (v1.6.0 → v1.6.1 → v1.6.2, ver histórico de commits). Consumido em `client-portal-digital-pampas` (Overview → Campaign status).

**Próximo:** nenhuma pendência aberta no DS neste momento. Ver `CLAUDE.md` do site e do portal para o que falta lá.

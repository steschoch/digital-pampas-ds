# Digital Pampas Design System

The single source of truth for every Digital Pampas product. Tokens, components, and
behavioral rules live here. The website and client portal import from this package —
they never duplicate styles.

> **Package:** `@digital-pampas/ds` · **Version:** 1.0.0  
> **Products consuming this DS:** `website-digital-pampas` · `client-portal-digital-pampas`  
> **Figma:** [DS Digital Pampas — Figma](https://www.figma.com/design/FKlBIIIs3aUuwrgWmnCrdR/DS-Digital-Pampas?node-id=7-89&t=DLPHzkE2VkQvXwKY-1)

---

## Architecture

The DS enforces a strict **three-layer token model**:

```
Layer 1 — Primitives        --dp-electric-cyan-400: #26cbf5
                            --dp-coral-400: #eb7874
                            ...raw values, never referenced by components

Layer 2 — Semantic          --dp-color-primary: var(--dp-electric-cyan-400)
                            --dp-color-surface: var(--dp-navy-950)
                            ...role-based aliases consumed by components

Layer 3 — Components        Button, StatCard, Timeline...
                            consume only semantic tokens, never primitives
```

**Rule:** a component that references a primitive directly is a governance failure.
The audit squad catches this automatically (see `skills-auditoria/`).

### Dark / Light theme

Dark mode is the default. Theme is switched by setting `data-color-scheme` on `<html>`:

```html
<!-- Dark (default) -->
<html data-color-scheme="dark">

<!-- Light -->
<html data-color-scheme="light">
```

Both themes are fully specified in `src/globals/globals.css`. Every semantic token
has a dark and a light value — no color is hardcoded.

---

## Components (35)

All components live in `src/components/`, each in its own folder with a `README.md`.
Every component:
- consumes semantic tokens only
- ships with light + dark variants
- is exported via `src/index.ts`

| Category | Components |
|---|---|
| **Layout** | PageLayout, PageHeader, AnimatedSection, NetworkBg |
| **Navigation** | Nav, Sidebar, TopBar, Tabs |
| **Content — site** | Hero, Problem, WhatWeDontDo, HowWeBuildIt, Proof, WaysToWork, FinalCTA, Footer |
| **Content — portal** | StatCard, Timeline, FunnelChart, BarChart, LineChart, DonutChart, Gauge, Sparkline, DataTable, ChartPanel |
| **Shared** | Button, Card, Badge, Avatar, Icon, SocialIcon, Logo, ThemeToggle |
| **Form** | Select, TextField |
| **Feedback** | Skeleton, EmptyState, Tooltip |
| **Showroom** | ComponentViewer, ComponentsGrid |
| **Cards** | BlogCard, CaseStudyCard |

---

## Showroom

The showroom is the live catalogue of all components. Run it locally to browse and
test every component in both themes.

```bash
npm install
npm run dev   # http://localhost:5173
```

The showroom entry point is `src/App.tsx`. It uses `ComponentsGrid` and `ComponentViewer`
to render every exported component in isolation.

---

## Building the package

The site and portal consume the **built** output, not the source directly.

```bash
npm run build
```

This runs three steps:
1. `vite build` — bundles `src/index.ts` → `dist/index.js`
2. `tsc -p tsconfig.build.json` — emits type declarations → `dist/index.d.ts`
3. Copies `globals.css`, `public/fonts/`, `public/logos/` → `dist/`

After building, consuming projects do:

```bash
# website-digital-pampas / client-portal-digital-pampas
npm install   # picks up the built dist/ via file: link
```

---

## Consuming the DS in another project

```ts
// Import components
import { Button, Card, StatCard } from '@digital-pampas/ds'

// Import global tokens (do this once at app root)
import '@digital-pampas/ds/globals.css'
import '@digital-pampas/ds/styles.css'
```

Set the theme attribute at the root:

```tsx
// App.tsx — persist choice in localStorage
useEffect(() => {
  document.documentElement.setAttribute(
    'data-color-scheme',
    localStorage.getItem('dp-theme') ?? 'dark'
  )
}, [])
```

---

## Token reference

All tokens are defined in `src/globals/globals.css`. The file is structured in three
clearly labelled sections:

```css
/* === LAYER 1: PRIMITIVES === */
:root { --dp-electric-cyan-400: #26cbf5; ... }

/* === LAYER 2: SEMANTIC === */
[data-color-scheme="dark"]  { --dp-color-primary: var(--dp-electric-cyan-400); ... }
[data-color-scheme="light"] { --dp-color-primary: var(--dp-sky-600); ... }

/* === LAYER 3 CONVENTIONS === */
/* Each component folder owns its own CSS Module for component-scoped rules */
```

---

## Governance

Consistency is enforced by `skills-auditoria/` — a squad of five Claude Code skills
that audit token adherence, drift between products, WCAG contrast, and documentation
coverage. Last audit: **2026-07-03** — Governance 98 · Drift 85 · A11y 88 · Docs 99.

Run a full audit at any time:

```
/ds-auditoria
```

---

## Stack

| Tool | Version |
|---|---|
| React | 19 |
| TypeScript | ~6.0 |
| Vite | 8 |
| lucide-react | peer |

---

## Project structure

```
ds-digital-pampas/
├── src/
│   ├── globals/
│   │   └── globals.css        # all tokens (3 layers)
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── README.md
│   │   └── ... (35 components total)
│   ├── index.ts               # public API (all exports)
│   ├── App.tsx                # showroom entry
│   └── main.tsx
├── public/
│   ├── fonts/                 # brand typefaces
│   └── logos/                 # brand mark variants
├── dist/                      # built output (consumed by site + portal)
└── package.json               # name: @digital-pampas/ds
```

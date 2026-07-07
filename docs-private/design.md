# Digital Pampas — Design System (design.md)

> Internal DS reference document. Generated following the **Scalable DS in Code Manual**.
> Stack: Vite + React + TypeScript + CSS Modules + lucide-react. Dark + Light mode. No sub-themes.

---

## 1. Foundations & Token Architecture

The system uses **3 layers** of tokens, with the **Layer Rule** strictly enforced:

```
component  →  component token (Layer 3)
           →  MD3 Color Role / semantic token (Layer 2)
           →  primitive (Layer 1)
```

| Layer | File | Rule |
|-------|------|------|
| 1 — Primitives | `src/styles/global.css` | Raw values. **Zero `var()`**. Hex, rem, ms. |
| 2 — Semantic / Color Roles | `src/styles/theme.css` | **Zero hex**. References to primitives only. |
| 3 — Component | `src/styles/theme.css` | `--btn-*`, `--card-*`, `--badge-*`. Reference Layer 2. |
| Components | `*.module.css` | Consume **only** Layer 3 tokens. |

**Theming:** No sub-themes → base selector is `:root`.
- Light: `:root` and `:root[data-color-scheme="light"]`
- Dark: `:root[data-color-scheme="dark"]`
- `<html>` starts with `data-color-scheme="dark"`. Toggle in `App.tsx` via `useState`.

---

## 2. Color

### 2.1 Brand colors (source)

| Role | Name | Source hex | Step |
|-------|------|-----------|------|
| Primary | electric-cyan | `#12c3f4` | 500 |
| Secondary | deep-indigo | `#2f205f` | 500 |
| Tertiary | plum | `#682972` | 500 |
| Support | coral | `#e6615c` | 500 |
| Support | sky-blue | `#aedeed` | 200 |

### 2.2 Primitive scales (50–950)

**Electric Cyan:** 50 `#e6f9fe` · 100 `#c0f0fb` · 200 `#87e4f8` · 300 `#4dd6f6` · 400 `#26cbf5` · **500 `#12c3f4`** · 600 `#0fa6d0` · 700 `#0b86a8` · 800 `#075f78` · 900 `#043a4a` · 950 `#021e27`

**Deep Indigo:** 50 `#f2effb` · 100 `#ddd5f4` · 200 `#bbaae9` · 300 `#9880de` · 400 `#7455d3` · **500 `#2f205f`** · 600 `#271a50` · 700 `#1e1440` · 800 `#150d2f` · 900 `#0c081e` · 950 `#060410`

**Plum:** 50 `#f8edf9` · 100 `#edcdf0` · 200 `#db9be1` · 300 `#c869d1` · 400 `#b63fc2` · **500 `#682972`** · 600 `#57225f` · 700 `#451b4c` · 800 `#321439` · 900 `#200d25` · 950 `#110613`

**Coral:** 50 `#fef1f0` · 100 `#fcd9d7` · 200 `#f9b2af` · 300 `#f08b88` · 400 `#eb7874` · **500 `#e6615c`** · 600 `#d04d48` · 700 `#a83b37` · 800 `#7a2926` · 900 `#4c1a18` · 950 `#280d0c`

**Sky Blue:** 50 `#f0f8fd` · 100 `#daf0f9` · **200 `#aedeed`** · 300 `#82cde1` · 400 `#56bcd5` · 500 `#2aabc9` · 600 `#2291ab` · 700 `#1a728b` · 800 `#12526a` · 900 `#0b3244` · 950 `#051a24`

**Space Grey (cool neutral):** 50 `#f6f7fb` · 100 `#eceef5` · 200 `#d5d9e8` · 300 `#b8bfd6` · 400 `#94a0be` · 500 `#6c7da0` · 600 `#4d5e85` · 700 `#35436a` · 800 `#202d4f` · 900 `#111b35` · 950 `#080e1e`

**Status (50/100/200/500/900):**
- Info: `#eaf3ff` · `#c3dafc` · `#8ab9f9` · `#2e8bfc` · `#091c32`
- Error: `#ffeaed` · `#ffb3bc` · `#ff8093` · `#fc2e49` · `#32090f`
- Success: `#eafff1` · `#b3f5cc` · `#66eba0` · `#2efc73` · `#093217`
- Warning: `#fff7ea` · `#ffe0b3` · `#ffc166` · `#fcad2e` · `#322309`

### 2.3 MD3 Color Roles (Layer 2)

| Role | Light | Dark |
|------|-------|------|
| primary | cyan-500 | cyan-400 |
| on-primary | space-grey-950 | space-grey-950 |
| primary-container | cyan-100 | cyan-800 |
| secondary | indigo-500 | indigo-300 |
| tertiary | plum-500 | plum-300 |
| surface | space-grey-50 | space-grey-950 |
| on-surface | space-grey-900 | space-grey-100 |
| surface-container-low | space-grey-50 | space-grey-900 |
| outline | space-grey-400 | space-grey-600 |
| error | error-500 | error-200 |

Support colors (coral, sky-blue) have their own `--color-support-*` roles and tinted surfaces `--color-surface-{cyan,plum,coral,sky-blue}` that flip between light (50) and dark (950).

---

## 3. Typography

| Use | Family | Font | Weights |
|-----|---------|-------|-------|
| Display / Heading | **Space Grotesk** (Google Fonts) | — | 300, 400, 500, 600, 700 |
| Body / UI / Label / Caption | **Figtree** (local, `@font-face`) | TTF | 300–900 |
| Code | **JetBrains Mono** (Google Fonts) | — | 400, 700 |

Space Grotesk and JetBrains Mono load from Google Fonts (`index.html`, `display=swap`); Figtree loads from local `@font-face` files. All `@font-face` rules use `font-display: swap`.

**Size scale:** 50 (12px) · 75 (14px) · 100 (16px) · 150 (20px) · 200 (24px) · 250 (28px) · 300 (32px) · 400 (40px) · 500 (48px) · 600 (64px) · 700 (80px) · 800 (96px).

**Leading:** tight 1.1 · snug 1.3 · normal 1.6 · loose 1.8.
**Tracking:** tight -0.03em · normal 0 · wide 0.05em · wider 0.10em · widest 0.15em.

Semantic tokens: `--sem-font-display/body/label/code`, `--sem-leading-*`, `--sem-tracking-*`.

---

## 4. Spacing, Border & Layout

**Spacing (4px base):** 0, 25(4) … 100(16) … 300(32) … 600(64) … 950(160).
Semantic: inset (xs–lg), gap (xs–xl), section (sm–lg).

**Radius:** 0 · 25(4) · 50(8) · 75(12) · 100(16) · 150(20) · 200(24) · pill(9999).
Semantic: chip(25), button(50), card-sm(75), card(100), card-lg(150), container(200), pill.

**Stroke:** hairline 0.5px · default 1px · strong 2px → divider/border/focus.

**Layout:** grid 12 cols · gutter 1.5rem · margin 2rem · max-width 1440px.

---

## 5. Motion — Option B (Default)

| Token | Value |
|-------|-------|
| `--duration-fast` | 150ms |
| `--duration-base` | 250ms |
| `--duration-slow` | 400ms |
| `--duration-page` | 600ms |
| `--easing-default` | ease |
| `--easing-page` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--easing-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) |
| `--transition-spring` | 400ms cubic-bezier(0.34, 1.56, 0.64, 1) |

Semantic: `--sem-motion-interactive/component/layout/page`.
**Spring:** the `1.56` creates the overshoot (passes its target and settles back = physical "weight"). Only on elements that *arrive* on screen — cards, modals, tooltips. Never on hover/focus or layout shift.
`fadeInUp` animation + `.animate-on-scroll` utility. All respect `prefers-reduced-motion: reduce`.

---

## 6. Components

### Button (`primary` | `secondary` | `ghost`; size `sm`/`md`/`lg`; `pill` prop)
- Tokens: `--btn-*` (bg/fg/border per state, sizes, radius, stroke, transition).
- States: `:hover`, `:focus-visible` (strong outline), `:active` (translateY 1px), `:disabled`.

### Card (`default` | `outlined` | `elevated`; `onClick` → interactive)
- Tokens: `--card-bg/border/fg/radius/shadow/transition`.
- Interactive: hover lift, `:focus-visible`, keyboard support (Enter/Space), `role="button"`.

### Badge (`primary`/`secondary`/`tertiary`/`coral`/`success`/`warning`/`error`/`neutral`)
- Tokens: base `--badge-*` + one `--badge-{variant}-bg/fg` pair per variant.
- Status badges flip bg/fg in dark mode for contrast.

### AnimatedSection (`fade-up` | `fade-in` | `slide-left` | `slide-right`)
- Scroll-triggered entrance wrapper built on `IntersectionObserver`.
- Props: `animation` (default `fade-up`), `delay` (ms, default 0), `threshold` (default 0.1), `once` (default true — `false` re-animates on re-entry), `className`, `as` (polymorphic element, default `div`).
- Transition uses `--dp-transition-page` (600ms ease-out); starting states offset by `--dp-space-200` (24px). The spring tokens are available for "arrival" emphasis but the default reveal uses the page curve.
- Respects `prefers-reduced-motion: reduce` — shows immediately, no transition.

---

## 7. File Structure

```
ds-pampas/
├── index.html                 ← data-color-scheme="dark", JetBrains Mono
├── public/
│   ├── favicon.svg            ← mate icon (electric-cyan)
│   └── fonts/                 ← Figtree (7, local); Space Grotesk + JetBrains Mono via Google Fonts
├── docs-private/design.md     ← this file
└── src/
    ├── styles/global.css      ← Layer 1 (primitives, @font-face)
    ├── styles/theme.css       ← Layers 2 + 3
    ├── index.css              ← reset
    ├── main.tsx               ← import order: global → theme → index
    ├── App.tsx / App.module.css ← showcase
    └── components/{Button,Card,Badge,AnimatedSection}/
```

### Absolute rules enforced
1. `global.css` with no `var()`. 2. `theme.css` with no hex. 3. Components consume Layer 3 only.
4. Full Layer Rule. 5. All interactive states. 6. `prefers-reduced-motion` on every animation. 7. `font-display: swap` on every `@font-face`.

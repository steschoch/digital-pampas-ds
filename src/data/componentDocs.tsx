import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ComponentViewerProps } from '../components/ComponentViewer'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { AnimatedSection } from '../components/AnimatedSection'
/* Real section/pattern components — rendered live in the showroom Overview. */
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { NetworkBg } from '../components/NetworkBg'
import { Problem } from '../components/Problem'
import { WhatWeDontDo } from '../components/WhatWeDontDo'
import { HowWeBuildIt } from '../components/HowWeBuildIt'
import { Proof } from '../components/Proof'
import { WaysToWork } from '../components/WaysToWork'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { PageLayout } from '../components/PageLayout'
import { BlogCard } from '../components/BlogCard'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { CaseFlow } from '../components/CaseFlow'
import type { CaseFlowNode, CaseFlowEdge } from '../components/CaseFlow'
/* Application / Portal components (§11 client-portal-architecture). */
import { Skeleton } from '../components/Skeleton'
import { ThemeToggle } from '../components/ThemeToggle'
import { EmptyState } from '../components/EmptyState'
import { Tabs } from '../components/Tabs'
import { TextField } from '../components/TextField'
import { Select } from '../components/Select'
import { Avatar } from '../components/Avatar'
import { Tooltip } from '../components/Tooltip'
import { Sparkline } from '../components/Sparkline'
import { LineChart } from '../components/LineChart'
import { DonutChart } from '../components/DonutChart'
import { BarChart } from '../components/BarChart'
import { Gauge } from '../components/Gauge'
import { MeterBar, MeterList } from '../components/MeterBar'
import { FunnelChart } from '../components/FunnelChart'
import { StatCard } from '../components/StatCard'
import { ChartPanel } from '../components/ChartPanel'
import { DataTable } from '../components/DataTable'
import { Timeline } from '../components/Timeline'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar'
import { PageHeader, LastSync } from '../components/PageHeader'
import {
  Zap, ArrowRight, Check, X, Bell,
  AlertTriangle, Home, BarChart2, Users, Settings,
} from 'lucide-react'

/* ─── Shared demo helpers ────────────────────────────────────────── */

const Row = ({ children, gap = 12, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap, ...style }}>
    {children}
  </div>
)

const Col = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {children}
  </div>
)

function SectionMock({
  bg = 'var(--dp-color-surface)',
  children,
  minH = 180,
}: {
  bg?: string
  children: React.ReactNode
  minH?: number
}) {
  return (
    <div style={{
      background: bg,
      minHeight: minH,
      padding: 'var(--dp-space-300) var(--dp-space-400)',
      borderRadius: 'var(--dp-sem-radius-card-sm)',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   BUTTON
══════════════════════════════════════════════════════════════ */

const BUTTON_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Button',
  category: 'Atomic',
  description: 'Triggers an action or navigation. Three variants, three sizes, pill shape, icon slots, and full keyboard + accessibility support.',

  overviewBlocks: [
    {
      label: 'Variants',
      content: (
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </Row>
      ),
    },
    {
      label: 'Sizes',
      content: (
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
      ),
    },
    {
      label: 'Shape',
      content: (
        <Row>
          <Button variant="primary">Default</Button>
          <Button variant="primary" pill>Pill shape</Button>
          <Button variant="secondary" pill>Pill secondary</Button>
        </Row>
      ),
    },
    {
      label: 'With Icons',
      content: (
        <Row>
          <Button variant="primary"><Zap size={15} /> Leading icon</Button>
          <Button variant="primary">Trailing icon <ArrowRight size={15} /></Button>
          <Button variant="secondary" pill><Zap size={15} /> Both <ArrowRight size={15} /></Button>
        </Row>
      ),
    },
    {
      label: 'States',
      content: (
        <Row>
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </Row>
      ),
    },
  ],

  playgroundControls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Primary',   value: 'primary'   },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost',     value: 'ghost'     },
      ],
      defaultValue: 'primary',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small',  value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large',  value: 'lg' },
      ],
      defaultValue: 'md',
    },
    { key: 'label',        label: 'Label',         type: 'text',   defaultValue: 'Get started' },
    { key: 'pill',         label: 'Pill shape',    type: 'toggle', defaultValue: false },
    { key: 'disabled',     label: 'Disabled',      type: 'toggle', defaultValue: false },
    { key: 'leadingIcon',  label: 'Leading icon',  type: 'toggle', defaultValue: false },
    { key: 'trailingIcon', label: 'Trailing icon', type: 'toggle', defaultValue: false },
  ],

  playgroundRender: (v) => (
    <Button
      variant={v.variant as 'primary' | 'secondary' | 'ghost'}
      size={v.size as 'sm' | 'md' | 'lg'}
      pill={v.pill as boolean}
      disabled={v.disabled as boolean}
    >
      {v.leadingIcon  && <Zap size={15} />}
      {v.label as string}
      {v.trailingIcon && <ArrowRight size={15} />}
    </Button>
  ),

  anatomyPreview: (
    <Button variant="primary" size="lg">
      <Zap size={16} /> Get started <ArrowRight size={16} />
    </Button>
  ),

  anatomy: [
    { id: 1, label: 'Container',      desc: 'Flex row — controls height, padding, radius and background via --button-* component tokens.' },
    { id: 2, label: 'Leading icon',   desc: 'Optional slot before the label. Size follows the label line-height (15–18px).' },
    { id: 3, label: 'Label',          desc: 'Text node. Inherits font-family, size, weight from the Button CSS layer.' },
    { id: 4, label: 'Trailing icon',  desc: 'Optional slot after the label. Used for directional affordance (ArrowRight).' },
    { id: 5, label: 'Focus ring',     desc: '2px outline using --dp-sem-stroke-focus + --dp-color-primary. Visible on :focus-visible only.' },
    { id: 6, label: 'Disabled state', desc: 'opacity: 0.45, pointer-events: none, cursor: not-allowed.' },
  ],

  prompt: `## Component: Button
Role: Primary interactive trigger — actions, navigation, form submission.

Props:
  variant   'primary' | 'secondary' | 'ghost'   default: 'primary'
  size      'sm' | 'md' | 'lg'                   default: 'md'
  pill      boolean                               default: false
  disabled  boolean                               default: false
  href      string (optional — renders as <a>)
  children  ReactNode

Token layer (--button-* declared in Button.module.css):
  --button-bg          → var(--dp-color-primary)
  --button-text        → var(--dp-color-on-primary)
  --button-border      → transparent
  --button-radius      → var(--dp-sem-radius-button)
  --button-shadow-hover → var(--dp-sem-shadow-button)

Pill shape: border-radius → var(--dp-sem-radius-pill)

Accessibility contract:
  - href present  → renders <a role="button">
  - no href       → renders <button type="button">
  - disabled      → aria-disabled="true" + pointer-events:none
  - focus ring    → :focus-visible only`,

  codeSnippet: `import { Button } from '@ds/components'

// Variants
<Button variant="primary">Get started</Button>
<Button variant="secondary">Learn more</Button>
<Button variant="ghost">Cancel</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Pill + icons
<Button pill variant="primary">
  <Zap size={16} /> Activate
</Button>

// As anchor (renders <a>)
<Button href="/contact" variant="primary">
  Contact us
</Button>

// Disabled
<Button disabled>Unavailable</Button>`,

  tokens: [
    { name: '--dp-color-primary',          usage: 'Primary variant background' },
    { name: '--dp-color-on-primary',       usage: 'Primary variant label color' },
    { name: '--dp-color-secondary',        usage: 'Secondary variant background' },
    { name: '--dp-sem-radius-button',      usage: 'Border radius (8px)' },
    { name: '--dp-sem-radius-pill',        usage: 'Pill shape (9999px)' },
    { name: '--dp-sem-shadow-button',      usage: 'Hover shadow' },
    { name: '--dp-sem-motion-interactive', usage: 'Hover/focus transition (150ms)' },
    { name: '--dp-sem-stroke-focus',       usage: 'Focus outline width (2px)' },
  ],

  accessibility: [
    { rule: 'Renders <button> or <a> with correct semantics based on href', status: 'pass' },
    { rule: ':focus-visible ring ≥ 3:1 contrast on all variants',           status: 'pass' },
    { rule: 'Contrast ≥ 4.5:1 text on all variant backgrounds',             status: 'pass' },
    { rule: 'Disabled uses aria-disabled, not HTML disabled attribute',      status: 'pass' },
    { rule: 'Icon-only usage requires aria-label on the button element',     status: 'warn' },
  ],

  whenToUse: [
    'Primary CTA — the single most important action on a view',
    'Form submission and destructive confirmations',
    'Navigation with explicit action semantics (use href prop)',
    'Compact toolbars where size="sm" keeps density appropriate',
  ],

  whenNotToUse: [
    'Inline text links within body copy — use <a> instead',
    'Status indicators — use Badge for non-interactive labels',
    'Multiple equal-weight CTAs — creates false hierarchy',
  ],

  guidelines: [
    { type: 'do',   text: 'Use primary for the single most important action per view.' },
    { type: 'do',   text: 'Keep labels short: 1–4 words maximum.' },
    { type: 'do',   text: 'Pair pill shape + icon for hero CTAs to increase emphasis.' },
    { type: 'do',   text: 'Use size="sm" inside data tables and compact toolbars.' },
    { type: 'dont', text: 'Stack two primary buttons side by side — creates false hierarchy.' },
    { type: 'dont', text: 'Use ghost for destructive actions — it lacks visual urgency.' },
    { type: 'dont', text: 'Hardcode colors inside Button consumers — use the token layer.' },
    { type: 'dont', text: 'Use an icon without visible label text unless aria-label is set.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════════════ */

const CARD_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Card',
  category: 'Atomic',
  description: 'Contained surface for grouping related content. Three elevation variants; optional onClick for interactive cards.',

  overviewBlocks: [
    {
      label: 'Variants',
      content: (
        <Row gap={16}>
          <Card variant="default" style={{ flex: '1 1 160px', minWidth: 140 }}>
            <p style={{ fontWeight: 600, margin: '0 0 4px', color: 'var(--dp-color-on-surface)', fontSize: 13 }}>Default</p>
            <p style={{ margin: 0, color: 'var(--dp-color-on-surface-variant)', fontSize: 12 }}>Subtle border. Base layout surface.</p>
          </Card>
          <Card variant="outlined" style={{ flex: '1 1 160px', minWidth: 140 }}>
            <p style={{ fontWeight: 600, margin: '0 0 4px', color: 'var(--dp-color-on-surface)', fontSize: 13 }}>Outlined</p>
            <p style={{ margin: 0, color: 'var(--dp-color-on-surface-variant)', fontSize: 12 }}>Transparent bg, prominent border.</p>
          </Card>
          <Card variant="elevated" style={{ flex: '1 1 160px', minWidth: 140 }}>
            <p style={{ fontWeight: 600, margin: '0 0 4px', color: 'var(--dp-color-on-surface)', fontSize: 13 }}>Elevated</p>
            <p style={{ margin: 0, color: 'var(--dp-color-on-surface-variant)', fontSize: 12 }}>Box-shadow, no border. Emphasis.</p>
          </Card>
        </Row>
      ),
    },
    {
      label: 'Interactive',
      content: (
        <Row gap={16}>
          <Card variant="elevated" onClick={() => {}} style={{ flex: '1 1 200px', minWidth: 160, cursor: 'pointer' }}>
            <p style={{ fontWeight: 600, margin: '0 0 4px', color: 'var(--dp-color-on-surface)', fontSize: 13 }}>
              Interactive card <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </p>
            <p style={{ margin: 0, color: 'var(--dp-color-on-surface-variant)', fontSize: 12 }}>Hover, focus and keyboard enabled.</p>
          </Card>
        </Row>
      ),
    },
    {
      label: 'With content',
      content: (
        <Row gap={16}>
          <Card variant="elevated" style={{ flex: '1 1 200px', minWidth: 160 }}>
            <Row gap={8} style={{ marginBottom: 8 }}>
              <Badge variant="primary">New</Badge>
            </Row>
            <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, margin: '8px 0 4px', color: 'var(--dp-color-on-surface)', fontSize: 15 }}>Feature card</p>
            <p style={{ margin: 0, color: 'var(--dp-color-on-surface-variant)', fontSize: 12 }}>Cards are composable — you control the inner layout.</p>
          </Card>
          <Card variant="outlined" style={{ flex: '1 1 200px', minWidth: 160 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 22, color: 'var(--dp-color-primary)' }}>4.2×</span>
              <Badge variant="success"><Check size={9} /> Live</Badge>
            </div>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>Average pipeline growth</p>
          </Card>
        </Row>
      ),
    },
  ],

  playgroundControls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Default',  value: 'default'  },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Elevated', value: 'elevated' },
      ],
      defaultValue: 'elevated',
    },
    { key: 'interactive', label: 'Interactive (onClick)', type: 'toggle', defaultValue: false },
    { key: 'title',       label: 'Title',                type: 'text',   defaultValue: 'Card title' },
    { key: 'body',        label: 'Body text',            type: 'text',   defaultValue: 'Card content goes here.' },
  ],

  playgroundRender: (v) => (
    <Card
      variant={v.variant as 'default' | 'outlined' | 'elevated'}
      onClick={v.interactive ? () => {} : undefined}
      style={{ width: 260 }}
    >
      <p style={{ fontWeight: 600, color: 'var(--dp-color-on-surface)', margin: '0 0 6px', fontSize: 14 }}>{v.title as string}</p>
      <p style={{ color: 'var(--dp-color-on-surface-variant)', margin: 0, fontSize: 13 }}>{v.body as string}</p>
    </Card>
  ),

  anatomyPreview: (
    <Card variant="elevated" style={{ width: 240 }}>
      <Row gap={8} style={{ marginBottom: 8 }}>
        <Badge variant="primary">Atomic</Badge>
      </Row>
      <p style={{ fontWeight: 700, margin: '0 0 4px', color: 'var(--dp-color-on-surface)', fontSize: 14 }}>Card title</p>
      <p style={{ margin: '0 0 12px', color: 'var(--dp-color-on-surface-variant)', fontSize: 12 }}>Supporting body copy within the card surface.</p>
      <Button size="sm" variant="secondary">Action</Button>
    </Card>
  ),

  anatomy: [
    { id: 1, label: 'Surface',        desc: 'Background and border defined by --card-bg and --card-border. Varies by variant.' },
    { id: 2, label: 'Shadow',         desc: 'box-shadow from --card-shadow. Elevated variant lifts further on hover.' },
    { id: 3, label: 'Content slot',   desc: 'children rendered as-is — Card imposes no layout on its contents.' },
    { id: 4, label: 'Focus ring',     desc: 'Shown only when onClick is present and card is keyboard-focused.' },
    { id: 5, label: 'Border radius',  desc: '--dp-sem-radius-card (16px). Small variant: --dp-sem-radius-card-sm (12px).' },
  ],

  prompt: `## Component: Card
Role: Surface container for grouped related content.

Props:
  variant    'default' | 'outlined' | 'elevated'   default: 'default'
  onClick    function (optional — enables interactive mode)
  className  string
  style      CSSProperties
  children   ReactNode

Variants:
  default  → subtle border, surface bg, no shadow
  outlined → prominent border, transparent bg, no shadow
  elevated → no border, surface bg, box-shadow

Interactive mode (onClick present):
  - Hover → --card-shadow-hover
  - :focus-visible → focus ring`,

  codeSnippet: `import { Card } from '@ds/components'

<Card variant="default">
  <h3>Default card</h3>
  <p>Subtle border, surface background.</p>
</Card>

<Card variant="outlined">
  <h3>Outlined</h3>
</Card>

<Card variant="elevated">
  <h3>Elevated</h3>
  <p>Box-shadow, no border.</p>
</Card>

{/* Interactive */}
<Card variant="elevated" onClick={() => navigate('/detail')}>
  <h3>Click me <ArrowRight size={14} /></h3>
</Card>`,

  tokens: [
    { name: '--dp-color-surface',          usage: 'Default/elevated card background' },
    { name: '--dp-color-outline-variant',  usage: 'Default and outlined border color' },
    { name: '--dp-sem-shadow-card',        usage: 'Elevated resting shadow' },
    { name: '--dp-sem-shadow-card-hover',  usage: 'Interactive card hover shadow' },
    { name: '--dp-sem-radius-card',        usage: 'Border radius (16px)' },
    { name: '--dp-sem-motion-component',   usage: 'Shadow transition (250ms)' },
  ],

  accessibility: [
    { rule: 'Interactive card renders as <button> with correct role',   status: 'pass' },
    { rule: ':focus-visible ring when onClick is provided',             status: 'pass' },
    { rule: 'Card does not swallow child focusable elements',           status: 'pass' },
  ],

  whenToUse: [
    'Feature highlights, testimonials and stat blocks',
    'Grid items that need a distinct visual boundary',
    'Interactive list items — pass onClick for keyboard/click support',
  ],

  whenNotToUse: [
    'Full-page section wrappers — use semantic HTML <section>',
    'Tabular data — use a table component instead',
    'Nesting cards inside cards — creates confusing depth hierarchy',
  ],

  guidelines: [
    { type: 'do',   text: 'Use elevated for the most important card in a set.' },
    { type: 'do',   text: 'Keep content density consistent across cards in the same grid.' },
    { type: 'dont', text: 'Nest cards inside cards.' },
    { type: 'dont', text: 'Use Card as a layout row — prefer table or list for tabular data.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   BADGE
══════════════════════════════════════════════════════════════ */

const BADGE_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Badge',
  category: 'Atomic',
  description: 'Compact status or category label. Eight color variants, pill shape by default, optional leading icon.',

  overviewBlocks: [
    {
      label: 'Color variants',
      content: (
        <Row gap={8}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="tertiary">Tertiary</Badge>
          <Badge variant="coral">Coral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </Row>
      ),
    },
    {
      label: 'With icon',
      content: (
        <Row gap={8}>
          <Badge variant="success"><Check size={10} /> Live</Badge>
          <Badge variant="error"><X size={10} /> Offline</Badge>
          <Badge variant="warning"><AlertTriangle size={10} /> Degraded</Badge>
          <Badge variant="primary"><Zap size={10} /> Beta</Badge>
          <Badge variant="neutral"><Bell size={10} /> Draft</Badge>
        </Row>
      ),
    },
    {
      label: 'In context',
      content: (
        <Row gap={16} style={{ alignItems: 'stretch', flexWrap: 'wrap' }}>
          <Card variant="outlined" style={{ flex: '1 1 160px', minWidth: 140 }}>
            <Row gap={6} style={{ marginBottom: 6 }}>
              <Badge variant="primary">New</Badge>
              <Badge variant="neutral">v2.0</Badge>
            </Row>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--dp-color-on-surface)' }}>Feature card</p>
          </Card>
          <Card variant="outlined" style={{ flex: '1 1 160px', minWidth: 140 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--dp-color-on-surface)' }}>Pipeline engine</p>
              <Badge variant="success"><Check size={9} /> Active</Badge>
            </div>
          </Card>
        </Row>
      ),
    },
  ],

  playgroundControls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Primary',   value: 'primary'   },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary',  value: 'tertiary'  },
        { label: 'Coral',     value: 'coral'     },
        { label: 'Success',   value: 'success'   },
        { label: 'Warning',   value: 'warning'   },
        { label: 'Error',     value: 'error'     },
        { label: 'Neutral',   value: 'neutral'   },
      ],
      defaultValue: 'primary',
    },
    { key: 'label',    label: 'Label',        type: 'text',   defaultValue: 'Badge' },
    { key: 'showIcon', label: 'Leading icon', type: 'toggle', defaultValue: false },
  ],

  playgroundRender: (v) => (
    <Badge variant={v.variant as 'primary' | 'secondary' | 'tertiary' | 'coral' | 'success' | 'warning' | 'error' | 'neutral'}>
      {v.showIcon && <Zap size={10} />}
      {v.label as string}
    </Badge>
  ),

  anatomyPreview: (
    <Badge variant="success" style={{ fontSize: 13, padding: '4px 12px' }}>
      <Check size={12} /> Live
    </Badge>
  ),

  anatomy: [
    { id: 1, label: 'Container',     desc: 'Pill-shaped flex row. Background and color from --badge-bg and --badge-text (component tokens).' },
    { id: 2, label: 'Leading icon',  desc: 'Optional slot. Recommended 10–12px. Inherits color from container text color.' },
    { id: 3, label: 'Label text',    desc: '11px / var(--dp-font-size-37). Sentence case for readability.' },
  ],

  prompt: `## Component: Badge
Role: Non-interactive label for status, category, or metadata.

Props:
  variant   'primary' | 'secondary' | 'tertiary' | 'coral' | 'success' | 'warning' | 'error' | 'neutral'
  children  ReactNode (text + optional icon)

Token layer:
  --badge-bg    → color-mix of variant color + transparent (tinted pill)
  --badge-text  → variant color (full opacity on tinted bg)
  --badge-radius → var(--dp-sem-radius-pill)

NOT interactive — for clickable chips, use Button with pill shape.`,

  codeSnippet: `import { Badge } from '@ds/components'
import { Check, Zap } from 'lucide-react'

<Badge variant="primary">Primary</Badge>
<Badge variant="success"><Check size={10} /> Live</Badge>
<Badge variant="warning">Beta</Badge>
<Badge variant="error">Deprecated</Badge>
<Badge variant="neutral">Draft</Badge>`,

  tokens: [
    { name: '--dp-color-primary',   usage: 'Primary variant tint + text' },
    { name: '--dp-color-secondary', usage: 'Secondary variant' },
    { name: '--dp-sem-radius-pill', usage: 'Pill border radius (9999px)' },
    { name: '--dp-font-size-37',    usage: 'Label size (11px)' },
    { name: '--dp-space-25',        usage: 'Vertical padding (2px)' },
    { name: '--dp-space-100',       usage: 'Horizontal padding (16px)' },
  ],

  accessibility: [
    { rule: 'Color is never the only differentiator — label text always present', status: 'pass' },
    { rule: 'Contrast ≥ 4.5:1 text on tinted background for all variants',        status: 'pass' },
    { rule: 'Badge is presentational — wrap in aria-label when standalone',        status: 'warn' },
  ],

  whenToUse: [
    'Status labels: Live, Beta, New, Deprecated',
    'Category tags on cards and list items',
    'Count indicators alongside navigation items',
  ],

  whenNotToUse: [
    'Clickable filtering chips — use Button pill shape instead',
    'Long phrases — truncation creates poor UX inside a badge',
  ],

  guidelines: [
    { type: 'do',   text: 'Use a single badge per item to maintain visual hierarchy.' },
    { type: 'do',   text: 'Pair icon + text for status badges (Check + "Live").' },
    { type: 'dont', text: 'Use badge text longer than 2–3 words.' },
    { type: 'dont', text: 'Make a badge interactive — use Button pill for clickable chips.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED SECTION
══════════════════════════════════════════════════════════════ */

const ANIMATED_SECTION_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'AnimatedSection',
  category: 'Atomic',
  description: 'Scroll-triggered entrance wrapper driven by IntersectionObserver and DS motion tokens. Respects prefers-reduced-motion.',

  overviewBlocks: [
    {
      label: 'Animation types',
      content: (
        <Row gap={12}>
          {(['fade-up', 'fade-in', 'slide-left', 'slide-right'] as const).map(a => (
            <AnimatedSection key={a} animation={a} once={false}>
              <Card variant="outlined" style={{ padding: '12px 16px', minWidth: 110 }}>
                <p style={{ margin: 0, fontSize: 12, fontFamily: 'var(--dp-sem-font-code)', color: 'var(--dp-color-primary)' }}>{a}</p>
              </Card>
            </AnimatedSection>
          ))}
        </Row>
      ),
    },
    {
      label: 'Stagger (0 / 100 / 200ms delay)',
      content: (
        <Row gap={12}>
          {[0, 100, 200].map(d => (
            <AnimatedSection key={d} delay={d} once={false}>
              <Card variant="elevated" style={{ padding: '12px 16px', minWidth: 100 }}>
                <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 600, color: 'var(--dp-color-on-surface)' }}>delay {d}ms</p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>Staggered</p>
              </Card>
            </AnimatedSection>
          ))}
        </Row>
      ),
    },
  ],

  anatomyPreview: (
    <div style={{ border: '1px dashed var(--dp-color-outline-variant)', borderRadius: 12, padding: 16, minWidth: 200, position: 'relative' }}>
      <span style={{ position: 'absolute', top: -10, left: 12, background: 'var(--dp-color-surface)', padding: '0 6px', fontSize: 10, fontFamily: 'var(--dp-sem-font-code)', color: 'var(--dp-color-primary)' }}>AnimatedSection wrapper</span>
      <Card variant="elevated">
        <p style={{ margin: 0, fontSize: 13, color: 'var(--dp-color-on-surface)' }}>Any children here</p>
      </Card>
    </div>
  ),

  anatomy: [
    { id: 1, label: 'Wrapper element', desc: 'Rendered as the tag from the "as" prop (default: div). Applies .hidden / .visible CSS classes.' },
    { id: 2, label: '.hidden state',   desc: 'Initial state: opacity 0, translateY 16px (or slide offset). Applied before intersection.' },
    { id: 3, label: '.visible state',  desc: 'After IntersectionObserver fires: opacity 1, translateY 0. Transition uses --dp-sem-motion-layout.' },
    { id: 4, label: 'Children',        desc: 'Any ReactNode. The wrapper imposes no layout — only handles opacity and transform.' },
    { id: 5, label: 'Reduced motion',  desc: '@media (prefers-reduced-motion: reduce) removes transition — content appears instantly.' },
  ],

  prompt: `## Component: AnimatedSection
Role: Scroll-triggered entrance animation wrapper.

Props:
  animation   'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'   default: 'fade-up'
  delay       number (ms)                                              default: 0
  threshold   number (0–1)                                             default: 0.1
  once        boolean                                                  default: true
  as          keyof JSX.IntrinsicElements                             default: 'div'
  children    ReactNode

Stagger pattern:
  {items.map((item, i) => (
    <AnimatedSection key={item.id} delay={i * 100} once>
      <Card>{item.title}</Card>
    </AnimatedSection>
  ))}`,

  codeSnippet: `import { AnimatedSection } from '@ds/components'

{/* Staggered grid */}
{items.map((item, i) => (
  <AnimatedSection key={item.id} delay={i * 100} once>
    <Card variant="elevated">{item.title}</Card>
  </AnimatedSection>
))}

{/* Slide from left */}
<AnimatedSection animation="slide-left" once>
  <h2>Section heading</h2>
</AnimatedSection>

{/* Replay on scroll-out */}
<AnimatedSection animation="fade-in" once={false}>
  <StatBlock value="4.2×" label="Pipeline growth" />
</AnimatedSection>`,

  tokens: [
    { name: '--dp-sem-motion-layout',    usage: 'Entrance transition (400ms ease)' },
    { name: '--dp-sem-motion-component', usage: 'Smaller component variant (250ms)' },
  ],

  accessibility: [
    { rule: 'Animation suppressed via @media (prefers-reduced-motion)',  status: 'pass' },
    { rule: 'Hidden state uses opacity:0 — no a11y tree impact',         status: 'pass' },
    { rule: 'Never animate content already visible above the fold',      status: 'warn' },
  ],

  whenToUse: [
    'Cards and grid items that should announce their arrival on scroll',
    'Section headings fading up as the user scrolls into a section',
    'Staggered lists — use delay={i * 100} per item',
  ],

  whenNotToUse: [
    'Content above the fold — it causes perceived layout shift',
    'Highly interactive components where entrance animation distracts from task',
  ],

  guidelines: [
    { type: 'do',   text: 'Set once={true} for content that should not re-animate.' },
    { type: 'do',   text: 'Keep stagger delays ≤ 300ms total — longer feels sluggish.' },
    { type: 'dont', text: 'Animate content already visible on page load.' },
    { type: 'dont', text: 'Layer multiple AnimatedSections with conflicting animations.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════ */

const NAV_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Nav',
  category: 'Layout',
  description: 'Sticky navigation bar with logo, desktop links, primary CTA, theme toggle, and a mobile full-screen overlay menu.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock minH={80}>
          <div style={{ display: 'flex', alignItems: 'center', height: 72, gap: 32 }}>
            <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 15, color: 'var(--dp-color-primary)', letterSpacing: '-0.01em' }}>Digital Pampas</span>
            <div style={{ flex: 1 }} />
            {['Results', 'Process', 'Cases', 'Blog'].map(l => (
              <span key={l} style={{ fontSize: 14, color: 'var(--dp-color-on-surface-variant)', cursor: 'pointer' }}>{l}</span>
            ))}
            <Button size="sm" variant="primary">Book a call</Button>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px) — hamburger',
      content: (
        <SectionMock minH={80}>
          <div style={{ display: 'flex', alignItems: 'center', height: 72 }}>
            <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 14, color: 'var(--dp-color-primary)', flex: 1 }}>Digital Pampas</span>
            <div style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid var(--dp-color-outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dp-color-on-surface)', fontSize: 18 }}>☰</div>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile — overlay open',
      content: (
        <SectionMock minH={240}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 72, borderBottom: '1px solid var(--dp-color-outline-variant)' }}>
              <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 14, color: 'var(--dp-color-primary)', flex: 1 }}>Digital Pampas</span>
              <div style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid var(--dp-color-outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dp-color-on-surface)' }}>✕</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingTop: 8 }}>
              {['Results', 'Process', 'Cases', 'Blog'].map(l => (
                <div key={l} style={{ padding: '14px 0', borderBottom: '1px solid var(--dp-color-outline-variant)', fontSize: 18, fontWeight: 600, color: 'var(--dp-color-on-surface)', fontFamily: 'var(--dp-sem-font-display)' }}>{l}</div>
              ))}
              <div style={{ paddingTop: 16 }}><Button variant="primary">Book a call</Button></div>
            </div>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Scrolled state (backdrop blur)',
      content: (
        <SectionMock bg="var(--dp-color-surface-container-low)" minH={80}>
          <div style={{ display: 'flex', alignItems: 'center', height: 72, gap: 32, background: 'color-mix(in srgb, var(--dp-color-surface) 80%, transparent)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--dp-color-outline-variant)', padding: '0 16px', borderRadius: 8 }}>
            <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 14, color: 'var(--dp-color-primary)', flex: 1 }}>Digital Pampas</span>
            {['Results', 'Process', 'Cases'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'var(--dp-color-on-surface-variant)' }}>{l}</span>
            ))}
            <Button size="sm" variant="primary">Book a call</Button>
          </div>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={70}>
      <div style={{ display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
        <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 13, color: 'var(--dp-color-primary)' }}>DP</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: 'var(--dp-color-on-surface-variant)' }}>Process</span>
        <span style={{ fontSize: 12, color: 'var(--dp-color-on-surface-variant)' }}>Cases</span>
        <Button size="sm" variant="primary">Book</Button>
        <div style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--dp-color-outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>☀</div>
      </div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Nav bar',         desc: 'sticky container, height 72px. Gets .scrolled class on scroll — adds backdrop-filter: blur(12px).' },
    { id: 2, label: 'Logo / Wordmark', desc: '<a> wrapping the DP logo. Always visible on all breakpoints.' },
    { id: 3, label: 'Desktop links',   desc: 'Flex row of <a>. Hidden on mobile (≤ 767px). Active page: aria-current="page".' },
    { id: 4, label: 'Theme toggle',    desc: '28×28px icon button. Toggles data-color-scheme on <html>.' },
    { id: 5, label: 'CTA button',      desc: 'Primary size="sm". Visible on desktop. In mobile overlay footer.' },
    { id: 6, label: 'Hamburger',       desc: 'Icon button visible only on mobile. Opens full-screen overlay. aria-expanded + aria-controls.' },
    { id: 7, label: 'Mobile overlay',  desc: 'Full-screen <div> with large links, theme toggle, CTA. Focus-trapped, Escape to close.' },
  ],

  prompt: `## Component: Nav
Role: Global sticky navigation bar — singleton, rendered once per page.

Behavior:
  - position: sticky, top: 0
  - .scrolled: backdrop-filter: blur(12px), box-shadow added
  - Mobile (≤ 767px): links + CTA hidden; hamburger + overlay shown
  - Theme toggle: sets data-color-scheme on <html>

Accessibility:
  - <nav aria-label="Main">
  - Active: aria-current="page"
  - Hamburger: aria-expanded, aria-controls="mobile-menu"
  - Overlay focus trap: Tab cycles within
  - Overlay closes on Escape`,

  codeSnippet: `// Nav is a singleton — rendered once in App.tsx or Layout
import { Nav } from '@/components/Nav'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}`,

  tokens: [
    { name: '--dp-color-surface',        usage: 'Nav background' },
    { name: '--dp-sem-shadow-nav',       usage: 'Scrolled shadow' },
    { name: '--dp-sem-motion-layout',    usage: 'Backdrop-filter transition' },
    { name: '--dp-color-outline-variant', usage: 'Bottom border (1px)' },
  ],

  accessibility: [
    { rule: 'Rendered as <nav aria-label="Main">',                   status: 'pass' },
    { rule: 'Active link has aria-current="page"',                   status: 'pass' },
    { rule: 'Mobile overlay traps focus (Tab cycles within)',        status: 'pass' },
    { rule: 'Hamburger has aria-expanded + aria-controls',           status: 'pass' },
    { rule: 'Overlay dismissible via Escape key',                    status: 'pass' },
    { rule: 'All interactive elements have :focus-visible outlines', status: 'pass' },
  ],

  whenToUse: ['Every page — global navigation singleton.'],
  whenNotToUse: ['Inside modals, drawers, or nested layouts.'],

  guidelines: [
    { type: 'do',   text: 'Keep nav links to ≤ 5 items.' },
    { type: 'do',   text: 'Always include the CTA in the mobile overlay.' },
    { type: 'dont', text: 'Add dropdown sub-menus — keep navigation flat.' },
    { type: 'dont', text: 'Remove the CTA from the mobile overlay.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */

const HERO_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Hero',
  category: 'Layout',
  description: 'Full-viewport landing section. Two-column layout, animated network canvas, headline, dual CTAs, metrics strip.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock bg="var(--dp-color-surface)" minH={260}>
          <div style={{ display: 'grid', gridTemplateColumns: '45fr 55fr', gap: 32, paddingTop: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dp-color-secondary)', marginBottom: 12 }}>OUTBOUND · AI · GTM</p>
              <h1 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--dp-color-on-surface)', margin: '0 0 14px' }}>Your pipeline,<br />engineered.</h1>
              <p style={{ fontSize: 14, color: 'var(--dp-color-on-surface-variant)', lineHeight: 1.6, margin: '0 0 20px' }}>Not campaigns. The infrastructure that identifies the right people and books qualified calls.</p>
              <Row gap={10}>
                <Button variant="primary" size="sm">Book a call</Button>
                <Button variant="ghost" size="sm">See the process</Button>
              </Row>
            </div>
            <div style={{ background: 'var(--dp-color-surface-container)', borderRadius: 16, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dp-color-on-surface-variant)', fontSize: 12, fontFamily: 'var(--dp-sem-font-code)' }}>
              HeroDiagram canvas
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--dp-color-outline-variant)' }}>
            {[['4.2×', 'Pipeline growth'], ['62h', 'Saved/week'], ['89%', 'ICP match'], ['3 wks', 'First meeting']].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dp-color-primary)', margin: 0 }}>{v}</p>
                <p style={{ fontSize: 10, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock bg="var(--dp-color-surface)" minH={240}>
          <Col gap={14}>
            <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dp-color-secondary)', margin: 0 }}>OUTBOUND · AI</p>
            <h1 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 26, fontWeight: 700, lineHeight: 1.08, color: 'var(--dp-color-on-surface)', margin: 0 }}>Your pipeline, engineered.</h1>
            <p style={{ fontSize: 13, color: 'var(--dp-color-on-surface-variant)', lineHeight: 1.5, margin: 0 }}>The infrastructure that identifies the right people and books qualified calls.</p>
            <Col gap={8}>
              <Button variant="primary" size="lg">Book a call</Button>
              <Button variant="ghost" size="lg">See the process</Button>
            </Col>
          </Col>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={120}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>
        <div style={{ border: '1px dashed var(--dp-color-outline-variant)', borderRadius: 6, padding: 8, textAlign: 'center' }}>Copy column</div>
        <div style={{ border: '1px dashed var(--dp-color-outline-variant)', borderRadius: 6, padding: 8, textAlign: 'center', background: 'var(--dp-color-surface-container)' }}>Diagram + canvas</div>
      </div>
      <div style={{ marginTop: 12, border: '1px dashed var(--dp-color-outline-variant)', borderRadius: 6, padding: 8, textAlign: 'center', fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>metricsStrip (full-width)</div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Section',       desc: 'min-height: 100dvh, position: relative. Contains canvas and content.' },
    { id: 2, label: 'NetworkBg',     desc: 'Canvas element with animated nodes/edges. z-index: 0. aria-hidden="true".' },
    { id: 3, label: 'Content grid',  desc: '45fr / 55fr grid. Copy left, HeroDiagram right. Stacks on mobile.' },
    { id: 4, label: 'H1 headline',   desc: '60px Space Grotesk. Letter-spacing -0.02em. Max 2 lines recommended.' },
    { id: 5, label: 'CTAs',          desc: 'Primary + ghost button. Max 2 CTAs. Ghost uses 1.5px accent border.' },
    { id: 6, label: 'MetricsStrip',  desc: 'Full-width band with 4 proof metrics. Scrollable on mobile.' },
  ],

  prompt: `## Component: Hero
Role: Page-level hero — used once, above the fold.

Layout:
  Desktop: 45fr/55fr grid | Copy left | HeroDiagram right | metricsStrip below
  Mobile:  Stacked columns | Diagram hidden or below copy | metricsStrip scrollable

Key:
  - NetworkBg canvas (z-index 0) — always aria-hidden
  - H1 60px display type
  - 2 CTAs maximum: primary + ghost
  - metricsStrip: 4 KPI items`,

  codeSnippet: `// Hero is a page-level singleton
import { Hero } from '@/components/Hero'

export default function Home() {
  return <Hero />
}`,

  tokens: [
    { name: '--dp-color-primary',          usage: 'H1 + metric values' },
    { name: '--dp-color-on-surface',       usage: 'Body copy' },
    { name: '--dp-color-on-surface-variant', usage: 'Sub-headline, metric labels' },
    { name: '--dp-color-surface-container', usage: 'HeroDiagram bg' },
    { name: '--dp-color-outline-variant',  usage: 'metricsStrip border-top' },
    { name: '--dp-sem-motion-layout',      usage: 'Canvas + CTA transitions' },
  ],

  accessibility: [
    { rule: 'Single H1 per page',                                          status: 'pass' },
    { rule: 'NetworkBg canvas has aria-hidden="true"',                     status: 'pass' },
    { rule: 'CTA labels are descriptive',                                  status: 'pass' },
    { rule: 'Canvas animation pauses on prefers-reduced-motion',           status: 'pass' },
    { rule: 'MetricsStrip values are text nodes, not images',              status: 'pass' },
  ],

  whenToUse: ['Single use — the first section of the home / landing page.'],
  whenNotToUse: ['Interior pages — use a simpler heading + subtitle pattern.'],

  guidelines: [
    { type: 'do',   text: 'Keep H1 under 60 characters — display type is high-impact.' },
    { type: 'do',   text: 'Limit to 2 CTAs: one primary, one ghost.' },
    { type: 'dont', text: 'Add more than 4 metrics to the strip.' },
    { type: 'dont', text: 'Swap the canvas for static imagery without reviewing forceDark.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   PROBLEM
══════════════════════════════════════════════════════════════ */

const PROBLEM_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Problem',
  category: 'Layout',
  description: 'Contrast grid showing manual outbound (before) vs. the Digital Pampas approach (after).',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock minH={240}>
          <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dp-color-secondary)', marginBottom: 10 }}>The problem</p>
          <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 22, fontWeight: 700, lineHeight: 1.1, color: 'var(--dp-color-on-surface)', marginBottom: 20, maxWidth: 400 }}>Manual outbound wastes time. We replace the whole process.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { c: 'var(--dp-color-secondary)', label: '✕ Status quo',    items: ['Spray & pray lists', 'Generic copy', 'Hours of manual research'] },
              { c: 'var(--dp-color-primary)',   label: '✓ Our approach',  items: ['ICP-verified leads', 'AI-written 1:1 copy', 'Full automation'] },
            ].map(({ c, label, items }) => (
              <div key={label} style={{ padding: 20, borderRadius: 14, background: `color-mix(in srgb, ${c} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 20%, transparent)` }}>
                <p style={{ fontWeight: 600, color: c, marginBottom: 10, fontSize: 13 }}>{label}</p>
                {items.map(i => (
                  <div key={i} style={{ padding: '6px 10px', marginBottom: 6, borderLeft: `3px solid ${c}`, fontSize: 12, color: 'var(--dp-color-on-surface)', background: 'color-mix(in srgb, var(--dp-color-on-surface) 5%, transparent)', borderRadius: '0 4px 4px 0' }}>{i}</div>
                ))}
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock minH={200}>
          <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, lineHeight: 1.1, color: 'var(--dp-color-on-surface)', marginBottom: 16 }}>Manual outbound wastes time.</h2>
          <Col gap={12}>
            {[
              { c: 'var(--dp-color-secondary)', label: '✕ Status quo',   items: ['Spray & pray', 'Generic copy'] },
              { c: 'var(--dp-color-primary)',   label: '✓ Our approach', items: ['ICP-verified', 'AI-written copy'] },
            ].map(({ c, label, items }) => (
              <div key={label} style={{ padding: 16, borderRadius: 12, background: `color-mix(in srgb, ${c} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 20%, transparent)` }}>
                <p style={{ fontWeight: 600, color: c, marginBottom: 8, fontSize: 12 }}>{label}</p>
                {items.map(i => <div key={i} style={{ padding: '5px 8px', marginBottom: 4, borderLeft: `3px solid ${c}`, fontSize: 11, color: 'var(--dp-color-on-surface)' }}>{i}</div>)}
              </div>
            ))}
          </Col>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={100}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 11 }}>
        <div style={{ padding: 12, borderRadius: 10, border: '1px solid color-mix(in srgb, var(--dp-color-secondary) 25%, transparent)', background: 'color-mix(in srgb, var(--dp-color-secondary) 8%, transparent)', color: 'var(--dp-color-secondary)' }}>✕ Bad column</div>
        <div style={{ padding: 12, borderRadius: 10, border: '1px solid color-mix(in srgb, var(--dp-color-primary) 25%, transparent)', background: 'color-mix(in srgb, var(--dp-color-primary) 8%, transparent)', color: 'var(--dp-color-primary)' }}>✓ Good column</div>
      </div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Section',       desc: 'padding-block 96px. Background adapts in light mode.' },
    { id: 2, label: 'Eyebrow',       desc: 'Code-font uppercase label. color: --dp-secondary.' },
    { id: 3, label: 'H2',            desc: '40px display heading. max-width: 640px for readability.' },
    { id: 4, label: 'Contrast grid', desc: '1fr / 1fr grid. Bad left, Good right. Stacks on mobile.' },
    { id: 5, label: 'Item',          desc: 'List item with 3px left accent border. Background uses color-mix.' },
  ],

  prompt: `## Component: Problem
Role: Before/after contrast section — single use on home page.

Bad column  → --dp-secondary (coral) tint
Good column → --dp-primary (electric-cyan) tint
Item border → 3px solid var(accent)

Mobile: stacked (Bad above, Good below)`,

  codeSnippet: `import { Problem } from '@/components/Problem'

<Problem />`,

  tokens: [
    { name: '--dp-color-secondary',       usage: 'Bad column accent (coral)' },
    { name: '--dp-color-primary',         usage: 'Good column accent (cyan)' },
    { name: '--dp-color-on-surface',      usage: 'Item text' },
    { name: '--dp-color-outline-variant', usage: 'Section border when applicable' },
  ],

  accessibility: [
    { rule: 'Contrast grid uses color + text label (not color alone)', status: 'pass' },
    { rule: 'H2 present with logical heading hierarchy',               status: 'pass' },
  ],

  whenToUse: ['Single use — core problem statement on the home page.'],
  whenNotToUse: ['Repeated multiple times — visual tension only works as a pair.'],

  guidelines: [
    { type: 'do',   text: 'Keep bullet lists balanced — same count on both sides.' },
    { type: 'dont', text: 'Add a third column — visual tension only works as a pair.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   HOW WE BUILD IT
══════════════════════════════════════════════════════════════ */

const HOW_WE_BUILD_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'HowWeBuildIt',
  category: 'Pattern',
  description: 'Scroll-driven 6-phase explorer. Sticky sidebar on desktop; accordion on tablet/mobile (≤ 1024px).',

  overviewBlocks: [
    {
      label: 'Desktop — sidebar + detail card',
      content: (
        <SectionMock minH={260}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['01', 'Define ICP', 'var(--dp-color-primary)'], ['02', 'Build List', 'var(--dp-color-secondary)'], ['03', 'Enrich', 'var(--dp-color-tertiary)'], ['04', 'AI Score', '#A855F7'], ['05', 'Sequences', '#0EA5E9'], ['06', 'Launch', 'var(--dp-color-primary)']].map(([num, name, c], i) => (
                <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: i === 0 ? `color-mix(in srgb, ${c} 10%, var(--dp-color-surface-container))` : 'transparent', borderLeft: `3px solid ${i === 0 ? c : 'transparent'}` }}>
                  <span style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, color: i === 0 ? c : 'var(--dp-color-on-surface-variant)' }}>{num}</span>
                  <span style={{ fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--dp-color-on-surface)' : 'var(--dp-color-on-surface-variant)' }}>{name}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: 20, borderRadius: 20, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface)', borderTop: '2px solid var(--dp-color-primary)' }}>
              <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dp-color-primary)', margin: '0 0 6px' }}>Phase 01</p>
              <h3 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: '0 0 14px' }}>Define ICP</h3>
              {['Firmographics', 'Tech stack', 'Behavioral signals'].map(l => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', marginBottom: 6, borderRadius: 6, background: 'var(--dp-color-surface-container-low)', fontSize: 11, color: 'var(--dp-color-on-surface)' }}>
                  <span>{l}</span><span style={{ color: 'var(--dp-color-primary)' }}>✓</span>
                </div>
              ))}
            </div>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile / iPad — accordion (≤ 1024px)',
      content: (
        <SectionMock minH={200}>
          <div style={{ border: '1px solid var(--dp-color-outline-variant)', borderRadius: 14, overflow: 'hidden' }}>
            {[['01', 'Define ICP', 'var(--dp-color-primary)', true], ['02', 'Build List', 'var(--dp-color-secondary)', false], ['03', 'Enrich', 'var(--dp-color-tertiary)', false]].map(([num, name, c, open]) => (
              <div key={num as string} style={{ borderBottom: '1px solid var(--dp-color-outline-variant)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: open ? `color-mix(in srgb, ${c} 8%, var(--dp-color-surface))` : 'var(--dp-color-surface)', cursor: 'pointer' }}>
                  <span style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, color: c as string }}>{num}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: open ? 600 : 400, color: 'var(--dp-color-on-surface)' }}>{name}</span>
                  <span style={{ fontSize: 12, color: 'var(--dp-color-on-surface-variant)', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
                </div>
                {open && (
                  <div style={{ padding: '12px 16px', background: 'var(--dp-color-surface-container-low)', borderTop: '1px solid var(--dp-color-outline-variant)' }}>
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>Define your ICP using firmographics, tech stack and behavioral signals…</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, padding: 16, background: 'var(--dp-color-surface-container-low)', borderRadius: 12 }}>
      <div style={{ borderRadius: 8, padding: 8, border: '1px solid var(--dp-color-outline-variant)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', textAlign: 'center' }}>Sidebar pills</div>
      <div style={{ borderRadius: 12, padding: 12, border: '1px solid var(--dp-color-outline-variant)', borderTop: '2px solid var(--dp-color-primary)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>Detail card</div>
    </div>
  ),

  anatomy: [
    { id: 1, label: 'Section',        desc: 'Full-width. Sticky sidebar on desktop (position: sticky).' },
    { id: 2, label: 'Sticky sidebar', desc: '240px width. Pills for each phase. top: --dp-nav-height. Hidden ≤ 1024px.' },
    { id: 3, label: 'Phase pill',     desc: 'Tab button with phase number + name. Accent border-left on active.' },
    { id: 4, label: 'Detail card',    desc: '24px radius container. border-top 2px in phase accent color.' },
    { id: 5, label: 'Progress bar',   desc: '3px track, pill radius. Animated fill via CSS width transition.' },
    { id: 6, label: 'Accordion',      desc: 'Mobile/iPad fallback. Each phase is a collapsible button + panel. role="tab".' },
  ],

  prompt: `## Component: HowWeBuildIt
Role: 6-phase process explorer — scroll-driven on desktop, accordion on mobile.

> 1024px  → sticky sidebar (240px) + detail card (flex: 1)
≤ 1024px  → vertical accordion (role="tablist" + aria-expanded)

Each phase: num (01–06), name, accent color, detail card content`,

  codeSnippet: `import { HowWeBuildIt } from '@/components/HowWeBuildIt'

<HowWeBuildIt />`,

  tokens: [
    { name: '--dp-color-primary',         usage: 'Phase 01 + 06 accent' },
    { name: '--dp-color-secondary',       usage: 'Phase 02 accent' },
    { name: '--dp-color-tertiary',        usage: 'Phase 03 accent' },
    { name: '--dp-color-outline-variant', usage: 'Sidebar + accordion borders' },
    { name: '--dp-sem-radius-card',       usage: 'Detail card border-radius (24px)' },
  ],

  accessibility: [
    { rule: 'Sidebar pills: role="tab" + aria-selected + aria-controls', status: 'pass' },
    { rule: 'Detail cards: role="tabpanel" + aria-labelledby',           status: 'pass' },
    { rule: 'Accordion: aria-expanded + aria-controls',                  status: 'pass' },
    { rule: 'Progress bars have aria-valuenow/min/max',                  status: 'pass' },
  ],

  whenToUse: ['Process/methodology section — single use.'],
  whenNotToUse: ['More than 6 phases — visual complexity increases rapidly.'],

  guidelines: [
    { type: 'do',   text: 'Use exactly 6 phases — layout is designed for this count.' },
    { type: 'dont', text: 'Add more than 3 sub-panels per detail card.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   PROOF
══════════════════════════════════════════════════════════════ */

const PROOF_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Proof',
  category: 'Layout',
  description: 'Social proof section with a metrics grid (large numerals) and testimonial quotes.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock minH={220}>
          <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dp-color-secondary)', marginBottom: 10 }}>Proof</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            {[['4.2×', 'Pipeline growth'], ['62h', 'Saved/week'], ['89%', 'ICP match'], ['3 wks', 'First meeting']].map(([v, l]) => (
              <div key={l} style={{ padding: 18, borderRadius: 14, border: '1px solid var(--dp-color-outline-variant)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 26, fontWeight: 700, color: 'var(--dp-color-primary)', margin: '0 0 3px' }}>{v}</p>
                <p style={{ fontSize: 10, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: 20, borderRadius: 14, border: '1px solid var(--dp-color-outline-variant)', background: 'color-mix(in srgb, var(--dp-color-primary) 4%, transparent)' }}>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--dp-color-on-surface)', margin: '0 0 10px' }}>"Digital Pampas replaced our entire SDR team workflow in 6 weeks. Qualified meetings up 3×."</p>
            <p style={{ fontSize: 11, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>— Head of Sales, Series B SaaS</p>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock minH={200}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[['4.2×', 'Pipeline'], ['62h', 'Saved'], ['89%', 'ICP match'], ['3 wks', 'First mtg']].map(([v, l]) => (
              <div key={l} style={{ padding: 12, borderRadius: 10, border: '1px solid var(--dp-color-outline-variant)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dp-color-primary)', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: 9, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={100}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 10 }}>
        <div style={{ padding: 12, borderRadius: 10, border: '1px solid var(--dp-color-outline-variant)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, color: 'var(--dp-color-primary)', margin: 0 }}>4.2×</p>
          <p style={{ fontSize: 9, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>Pipeline growth</p>
        </div>
        <div style={{ padding: 12, borderRadius: 10, border: '1px solid var(--dp-color-outline-variant)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, color: 'var(--dp-color-primary)', margin: 0 }}>89%</p>
          <p style={{ fontSize: 9, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>ICP match rate</p>
        </div>
      </div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Section',      desc: 'padding-block: 96px. Container max-width 1440px.' },
    { id: 2, label: 'Stats grid',   desc: 'auto-fill grid with 4 stat cards. Equal height via align-items: stretch.' },
    { id: 3, label: 'Big number',   desc: '52px numeral. Color: --dp-primary.' },
    { id: 4, label: 'Testimonials', desc: 'Flex row of <blockquote> + <cite> cards.' },
  ],

  prompt: `## Component: Proof
Role: Social proof — metrics grid + testimonials. Single use.

Stats: real numbers — "4.2×" not "more pipeline"
Testimonials: <blockquote> + <cite> for semantics

Desktop: 4-col stats grid + testimonial card
Mobile:  2-col stats grid + stacked testimonials`,

  codeSnippet: `import { Proof } from '@/components/Proof'

<Proof />`,

  tokens: [
    { name: '--dp-color-primary',         usage: 'Big numbers' },
    { name: '--dp-color-on-surface',      usage: 'Quote text' },
    { name: '--dp-color-on-surface-variant', usage: 'Attribution, stat labels' },
    { name: '--dp-color-outline-variant', usage: 'Card borders' },
  ],

  accessibility: [
    { rule: 'Stat values are text nodes — readable by screen reader', status: 'pass' },
    { rule: 'Testimonials use <blockquote> + <cite>',                 status: 'pass' },
    { rule: 'Client logos have descriptive alt text',                 status: 'pass' },
  ],

  whenToUse: ['Home page social proof — single use.'],
  whenNotToUse: ['Mid-page callouts — use a simpler stat block component.'],

  guidelines: [
    { type: 'do',   text: 'Use specific numbers — "4.2×" beats "more pipeline".' },
    { type: 'dont', text: 'Show more than 3 testimonials at once.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   WAYS TO WORK
══════════════════════════════════════════════════════════════ */

const WAYS_TO_WORK_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'WaysToWork',
  category: 'Layout',
  description: 'Three-column service model grid: Sprint, Ongoing, and Embedded engagement options.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock bg="var(--dp-color-surface-container-low)" minH={220}>
          <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dp-color-secondary)', marginBottom: 8 }}>Ways to work</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { badge: 'Sprint',   title: 'Launchpad',  accent: 'var(--dp-color-primary)' },
              { badge: 'Ongoing',  title: 'Engine',     accent: 'var(--dp-color-secondary)' },
              { badge: 'Embedded', title: 'Co-founder', accent: 'var(--dp-color-tertiary)' },
            ].map(({ badge, title, accent }) => (
              <div key={badge} style={{ padding: 20, borderRadius: 14, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface)' }}>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent, display: 'inline-block', marginBottom: 10 }}>{badge}</span>
                <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 16, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: '0 0 6px' }}>{title}</p>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--dp-color-outline-variant)' }}>
                  <div style={{ height: 32, borderRadius: 6, border: '1px solid var(--dp-color-outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>Learn more</div>
                </div>
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock bg="var(--dp-color-surface-container-low)" minH={200}>
          <Col gap={12}>
            {[
              { badge: 'Sprint',  title: 'Launchpad', c: 'var(--dp-color-primary)' },
              { badge: 'Ongoing', title: 'Engine',    c: 'var(--dp-color-secondary)' },
            ].map(({ badge, title, c }) => (
              <div key={badge} style={{ padding: 16, borderRadius: 12, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface)' }}>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, background: `color-mix(in srgb, ${c} 12%, transparent)`, color: c, display: 'inline-block', marginBottom: 8 }}>{badge}</span>
                <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 15, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: 0 }}>{title}</p>
              </div>
            ))}
          </Col>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: 12, background: 'var(--dp-color-surface-container-low)', borderRadius: 10 }}>
      {['Sprint', 'Ongoing'].map(b => (
        <div key={b} style={{ padding: 12, borderRadius: 10, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface)' }}>
          <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 9999, background: 'color-mix(in srgb, var(--dp-color-primary) 12%, transparent)', color: 'var(--dp-color-primary)', display: 'inline-block', marginBottom: 6 }}>{b}</span>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: 'var(--dp-color-on-surface)' }}>Title</p>
        </div>
      ))}
    </div>
  ),

  anatomy: [
    { id: 1, label: 'Section heading', desc: 'H2 + eyebrow + intro paragraph above the grid.' },
    { id: 2, label: 'Service grid',    desc: '3-column grid. Cards have equal height via align-items: stretch.' },
    { id: 3, label: 'Engagement badge', desc: 'Small Badge indicating Sprint / Ongoing / Embedded.' },
    { id: 4, label: 'Card body',       desc: 'Title, description, deliverables list.' },
    { id: 5, label: 'Card CTA',        desc: 'Ghost or outline button at card bottom. Unique label per card.' },
  ],

  prompt: `## Component: WaysToWork
Role: Service model / pricing options — 3 engagement types.

Cards: Sprint (Launchpad) | Ongoing (Engine) | Embedded (Co-founder)
Each: engagement badge, title, description, deliverables, CTA

CTA labels must be unique per card for screen reader accessibility.`,

  codeSnippet: `import { WaysToWork } from '@/components/WaysToWork'

<WaysToWork />`,

  tokens: [
    { name: '--dp-color-primary',         usage: 'Sprint accent' },
    { name: '--dp-color-secondary',       usage: 'Ongoing accent' },
    { name: '--dp-color-tertiary',        usage: 'Embedded accent' },
    { name: '--dp-color-outline-variant', usage: 'Card borders' },
    { name: '--dp-color-surface',         usage: 'Card backgrounds' },
  ],

  accessibility: [
    { rule: 'Card CTAs have unique, descriptive labels per card', status: 'warn' },
    { rule: 'H3 inside section H2 — correct hierarchy',          status: 'pass' },
  ],

  whenToUse: ['Service model / pricing page — single use.'],
  whenNotToUse: ['Generic feature comparison — use a comparison table instead.'],

  guidelines: [
    { type: 'do',   text: 'Highlight the recommended option with elevated card variant.' },
    { type: 'dont', text: 'Add more than 3 options — decision paralysis increases.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA
══════════════════════════════════════════════════════════════ */

const FINAL_CTA_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'FinalCTA',
  category: 'Layout',
  description: 'End-of-page conversion section: trust signals on the left, booking form or Calendly on the right.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock bg="var(--dp-color-surface-container-low)" minH={220}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 22, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: '0 0 10px' }}>Ready to build your pipeline?</h2>
              <p style={{ fontSize: 13, color: 'var(--dp-color-on-surface-variant)', margin: '0 0 16px' }}>Join 40+ B2B SaaS companies that replaced manual prospecting.</p>
              {['ICP definition in week 1', 'First meetings within 3 weeks', 'Full pipeline visibility'].map(i => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, fontSize: 12, color: 'var(--dp-color-on-surface)' }}>
                  <Check size={12} style={{ color: 'var(--dp-color-primary)', flexShrink: 0 }} /> {i}
                </div>
              ))}
            </div>
            <div>
              {['First name', 'Work email'].map(l => (
                <div key={l} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', marginBottom: 5 }}>{l}</label>
                  <div style={{ height: 40, borderRadius: 7, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface)', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--dp-color-on-surface-variant)' }}>—</div>
                </div>
              ))}
              <Button variant="primary" size="lg">Book a strategy call</Button>
            </div>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock bg="var(--dp-color-surface-container-low)" minH={220}>
          <Col gap={14}>
            <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: 0 }}>Ready to build your pipeline?</h2>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', marginBottom: 5 }}>Work email</label>
              <div style={{ height: 48, borderRadius: 8, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface)' }} />
            </div>
            <Button variant="primary" size="lg">Book a strategy call</Button>
          </Col>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock bg="var(--dp-color-surface-container-low)" minH={100}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 11 }}>
        <div style={{ border: '1px dashed var(--dp-color-outline-variant)', borderRadius: 6, padding: 8, color: 'var(--dp-color-on-surface-variant)', textAlign: 'center' }}>Trust panel</div>
        <div style={{ border: '1px dashed var(--dp-color-outline-variant)', borderRadius: 6, padding: 8, color: 'var(--dp-color-on-surface-variant)', textAlign: 'center' }}>Form panel</div>
      </div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Section',       desc: 'padding-inline: --dp-grid-margin. Background: --dp-surface-container-low.' },
    { id: 2, label: 'Left panel',    desc: 'H2 + sub-text + trust bullet list (max 4 items).' },
    { id: 3, label: 'Divider',       desc: 'Vertical 1px line between panels. Hidden on mobile.' },
    { id: 4, label: 'Form panel',    desc: 'Name + email inputs, submit button (52px height).' },
    { id: 5, label: 'Input',         desc: '10px / 14px padding. 1px border. :focus shows primary outline.' },
    { id: 6, label: 'Submit button', desc: 'Primary, 52px height. Full-width on mobile.' },
  ],

  prompt: `## Component: FinalCTA
Role: End-of-page conversion section — used once, just before Footer.

Layout:
  Desktop: 2-column — trust list left, form right
  Mobile:  Stacked — heading, then form

Form: ≤ 3 fields (name + email optimal)
All inputs must have <label> elements`,

  codeSnippet: `import { FinalCTA } from '@/components/FinalCTA'

<FinalCTA />`,

  tokens: [
    { name: '--dp-color-primary',                   usage: 'Trust check icons' },
    { name: '--dp-color-on-surface',                usage: 'Heading + trust items' },
    { name: '--dp-color-on-surface-variant',        usage: 'Form labels' },
    { name: '--dp-color-outline-variant',           usage: 'Input borders' },
    { name: '--dp-color-surface-container-low',     usage: 'Section background' },
  ],

  accessibility: [
    { rule: 'All inputs have associated <label> elements',              status: 'pass' },
    { rule: 'Required fields marked with aria-required="true"',         status: 'pass' },
    { rule: 'Form submission provides success feedback (aria-live)',    status: 'pass' },
    { rule: 'Error states: aria-invalid + aria-describedby',            status: 'warn' },
  ],

  whenToUse: ['End-of-page CTA — positioned just before the Footer.'],
  whenNotToUse: ['Mid-page CTAs — use a Banner or Card-based CTA pattern.'],

  guidelines: [
    { type: 'do',   text: 'Keep the form to ≤ 3 fields.' },
    { type: 'do',   text: 'Use specific heading: "Ready to build your pipeline?" not "Contact us".' },
    { type: 'dont', text: 'Add more than 5 trust bullets in the left panel.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */

const FOOTER_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'Footer',
  category: 'Layout',
  description: 'Site footer with email band, four-column link grid, and legal row. Dark panel in light mode for visual rhythm.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock bg="var(--dp-color-surface)" minH={200}>
          <div style={{ borderBottom: '1px solid var(--dp-color-outline-variant)', height: 52, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: 'var(--dp-color-on-surface-variant)' }}>Ready to talk?</span>
            <span style={{ fontSize: 14, color: 'var(--dp-color-primary)', fontWeight: 500 }}>hello@digitalpampas.com</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 24, paddingBottom: 20, borderBottom: '1px solid var(--dp-color-outline-variant)', marginBottom: 14 }}>
            <div>
              <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 14, color: 'var(--dp-color-on-surface)', marginBottom: 6 }}>Digital Pampas</p>
              <p style={{ fontSize: 11, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>Outbound AI, engineered.</p>
            </div>
            {[['Services', ['Launchpad', 'Engine', 'Co-founder']], ['Company', ['About', 'Blog', 'Careers']], ['Legal', ['Privacy', 'Terms']]].map(([title, links]) => (
              <div key={title as string}>
                <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dp-color-on-surface-variant)', marginBottom: 8 }}>{title as string}</p>
                {(links as string[]).map(l => <p key={l} style={{ fontSize: 12, color: 'var(--dp-color-on-surface-variant)', margin: '0 0 5px' }}>{l}</p>)}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--dp-color-on-surface-variant)' }}>
            <span>© 2025 Digital Pampas</span>
            <span>Privacy · Terms</span>
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock bg="var(--dp-color-surface)" minH={180}>
          <div style={{ borderBottom: '1px solid var(--dp-color-outline-variant)', paddingBottom: 14, marginBottom: 16 }}>
            <p style={{ fontSize: 11, color: 'var(--dp-color-on-surface-variant)', margin: '0 0 4px' }}>Ready to talk?</p>
            <p style={{ fontSize: 13, color: 'var(--dp-color-primary)', fontWeight: 500, margin: 0 }}>hello@digitalpampas.com</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Services', ['Launchpad', 'Engine']], ['Company', ['About', 'Blog']]].map(([t, ls]) => (
              <div key={t as string}>
                <p style={{ fontSize: 9, fontFamily: 'var(--dp-sem-font-code)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dp-color-on-surface-variant)', marginBottom: 6 }}>{t as string}</p>
                {(ls as string[]).map(l => <p key={l} style={{ fontSize: 11, color: 'var(--dp-color-on-surface-variant)', margin: '0 0 4px' }}>{l}</p>)}
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={100}>
      <div style={{ borderBottom: '1px solid var(--dp-color-outline-variant)', marginBottom: 10, paddingBottom: 6, fontSize: 11, color: 'var(--dp-color-primary)' }}>Email band</div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
        <div style={{ borderRadius: 6, border: '1px dashed var(--dp-color-outline-variant)', padding: 8, fontSize: 10, color: 'var(--dp-color-on-surface-variant)', textAlign: 'center' }}>Logo + tagline</div>
        <div style={{ borderRadius: 6, border: '1px dashed var(--dp-color-outline-variant)', padding: 8, fontSize: 10, color: 'var(--dp-color-on-surface-variant)', textAlign: 'center' }}>Links</div>
        <div style={{ borderRadius: 6, border: '1px dashed var(--dp-color-outline-variant)', padding: 8, fontSize: 10, color: 'var(--dp-color-on-surface-variant)', textAlign: 'center' }}>Links</div>
      </div>
      <div style={{ borderTop: '1px solid var(--dp-color-outline-variant)', paddingTop: 6, fontSize: 10, color: 'var(--dp-color-on-surface-variant)', display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2025</span><span>Legal links</span>
      </div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Email band',   desc: '52px strip with email prompt and clickable address. 1px bottom border.' },
    { id: 2, label: 'Body columns', desc: '4-column grid: Logo col (2fr) + 3 link cols (1fr each). 48px gap.' },
    { id: 3, label: 'Column title', desc: '9px uppercase code-font label. 16px margin-bottom.' },
    { id: 4, label: 'Footer link',  desc: '15px body links. :hover changes color to on-surface.' },
    { id: 5, label: 'Legal row',    desc: 'border-top 1px, copyright text left, privacy/terms links right.' },
    { id: 6, label: 'Light mode',   desc: 'Uses --dp-surface-inverse (dark panel) for visual rhythm against body.' },
  ],

  prompt: `## Component: Footer
Role: Site-wide footer — singleton rendered once per page.

Layout:
  Desktop: email band (52px) | columns grid | legal row
  Mobile:  email, 2×2 link grid, legal

Light mode: footer bg → --dp-surface-inverse (#080E1E)
  Links → on-surface-inverse colors, cyan for email

Accessibility:
  <footer> landmark
  Email: aria-label="Send email to hello@digitalpampas.com"`,

  codeSnippet: `import { Footer } from '@/components/Footer'

<Footer />`,

  tokens: [
    { name: '--dp-color-primary',         usage: 'Email address link color' },
    { name: '--dp-color-on-surface',      usage: 'Wordmark text' },
    { name: '--dp-color-on-surface-variant', usage: 'Footer links, labels' },
    { name: '--dp-color-outline-variant', usage: 'Band borders (1px)' },
    { name: '--dp-color-surface',         usage: 'Section background (dark in light mode)' },
  ],

  accessibility: [
    { rule: 'Footer landmark: rendered as <footer>',                    status: 'pass' },
    { rule: 'All links have descriptive text',                          status: 'pass' },
    { rule: 'Logo has alt text in all color-scheme variants',           status: 'pass' },
    { rule: 'Email link has aria-label with "Send email to…"',         status: 'warn' },
  ],

  whenToUse: ['Every page — rendered once at the bottom.'],
  whenNotToUse: ['Inside modals or drawers.'],

  guidelines: [
    { type: 'do',   text: 'Keep column link count consistent (5–7 per column).' },
    { type: 'dont', text: 'Add social icons without accessible aria-label.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   WHAT WE DON'T DO
══════════════════════════════════════════════════════════════ */

const WHAT_WE_DONT_DO_CARDS = [
  { num: '01', title: 'Not a fractional SDR.',        body: 'We build the system that sends — then hand you the keys.' },
  { num: '02', title: 'Not a tool setup service.',    body: 'You get a working engine, documented — not a Clay login and “good luck.”' },
  { num: '03', title: 'Not a vanishing retainer.',    body: 'Three months in, you own infrastructure — not a dependency on us.' },
  { num: '04', title: 'Not for pre-revenue guessing.',body: 'No clear ICP yet? Outbound just scales the wrong message faster.' },
]

const WHAT_WE_DONT_DO_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'WhatWeDontDo',
  category: 'Layout',
  description: 'Honest-filter section — a 2×2 grid of “what we don’t do” cards that pre-qualifies visitors and builds trust through candor.',

  overviewBlocks: [
    {
      label: 'Desktop (1280px)',
      content: (
        <SectionMock minH={260}>
          <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dp-color-on-surface-variant)', marginBottom: 8 }}>Honest Filter</p>
          <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 22, fontWeight: 700, lineHeight: 1.15, color: 'var(--dp-color-on-surface)', marginBottom: 18 }}>What we don’t do.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {WHAT_WE_DONT_DO_CARDS.map(c => (
              <div key={c.num} style={{ padding: 16, borderRadius: 14, background: 'var(--dp-color-surface-container-low)', border: '1px solid var(--dp-color-outline-variant)', boxShadow: 'var(--dp-sem-shadow-card)' }}>
                <span style={{ display: 'block', fontFamily: 'var(--dp-sem-font-code)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', opacity: 0.5, marginBottom: 8 }}>{c.num}</span>
                <h3 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 15, fontWeight: 700, lineHeight: 1.25, color: 'var(--dp-color-secondary)', margin: '0 0 6px' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 12, lineHeight: 1.6, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </SectionMock>
      ),
    },
    {
      label: 'Mobile (375px)',
      content: (
        <SectionMock minH={200}>
          <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, color: 'var(--dp-color-on-surface)', marginBottom: 14 }}>What we don’t do.</h2>
          <Col gap={10}>
            {WHAT_WE_DONT_DO_CARDS.slice(0, 2).map(c => (
              <div key={c.num} style={{ padding: 14, borderRadius: 12, background: 'var(--dp-color-surface-container-low)', border: '1px solid var(--dp-color-outline-variant)' }}>
                <span style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', opacity: 0.5 }}>{c.num}</span>
                <h3 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 14, fontWeight: 700, color: 'var(--dp-color-secondary)', margin: '6px 0 4px' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 11, lineHeight: 1.6, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </Col>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={120}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 11 }}>
        {['01', '02'].map(n => (
          <div key={n} style={{ padding: 12, borderRadius: 10, border: '1px solid var(--dp-color-outline-variant)', background: 'var(--dp-color-surface-container-low)' }}>
            <span style={{ fontFamily: 'var(--dp-sem-font-code)', color: 'var(--dp-color-on-surface-variant)', opacity: 0.5 }}>{n}</span>
            <p style={{ color: 'var(--dp-color-secondary)', fontWeight: 700, margin: '4px 0 0' }}>Card title</p>
          </div>
        ))}
      </div>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Section',   desc: 'padding-block 96px (space-24). Background: --dp-surface.' },
    { id: 2, label: 'Eyebrow',   desc: 'Code-font uppercase label. color: --dp-on-surface-variant.' },
    { id: 3, label: 'H2',        desc: '3xl display heading. “What we don’t do.”' },
    { id: 4, label: '2×2 grid',  desc: '1fr / 1fr, stretch-aligned. Collapses to 1 column ≤768px.' },
    { id: 5, label: 'Card',      desc: 'Number + coral title + body. Hover: lift + card-hover shadow.' },
  ],

  prompt: `## Component: WhatWeDontDo
Role: Honest-filter / disqualifier section — single use on home page.

Structure: eyebrow + H2 + 2×2 card grid (4 cards).
Each card: number (01–04, muted), title (--dp-secondary coral), body.
Card surface: --dp-surface-container-low, 1px --dp-outline-variant, shadow-card.
Hover: translateY(-4px) + shadow-card-hover.
Mobile: single column.

Tone: candid, confident. States what the service is NOT to pre-qualify buyers.`,

  codeSnippet: `import WhatWeDontDo from '@/components/WhatWeDontDo/WhatWeDontDo'

<WhatWeDontDo />`,

  tokens: [
    { name: '--dp-color-secondary',              usage: 'Card title (coral)' },
    { name: '--dp-color-surface-container-low',  usage: 'Card background' },
    { name: '--dp-color-outline-variant',        usage: 'Card border' },
    { name: '--dp-color-on-surface-variant',     usage: 'Eyebrow, number, body text' },
    { name: '--dp-sem-shadow-card',              usage: 'Card elevation (+ card-hover on hover)' },
  ],

  accessibility: [
    { rule: 'Card numbers marked aria-hidden (decorative)',        status: 'pass' },
    { rule: 'Logical heading order — H2 section, H3 per card',     status: 'pass' },
    { rule: 'Hover lift disabled under prefers-reduced-motion',    status: 'pass' },
  ],

  whenToUse: ['Single use — trust-building filter after the Problem section.'],
  whenNotToUse: ['As a features list — the tone is deliberately about exclusions.'],

  guidelines: [
    { type: 'do',   text: 'Keep to four cards — a balanced 2×2 grid.' },
    { type: 'dont', text: 'Soften the copy — the value is in candid disqualification.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   NETWORK BACKGROUND
══════════════════════════════════════════════════════════════ */

const NETWORK_BG_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'NetworkBg',
  category: 'Pattern',
  description: 'Canvas-based animated network of tool nodes (Clay, Apollo, n8n…) connected by edges with travelling pulses. Decorative background for the Hero. Ships in three variants: Ghost, Spectrum, Flow.',

  overviewBlocks: [
    {
      label: 'Network (static preview)',
      content: (
        <SectionMock minH={220} bg="var(--dp-color-surface-container-low)">
          <svg viewBox="0 0 320 180" width="100%" height="180" role="img" aria-label="Network of connected tool nodes">
            {[
              [60, 40, 160, 30], [160, 30, 260, 60], [260, 60, 230, 130],
              [230, 130, 120, 140], [120, 140, 60, 40], [160, 30, 230, 130],
              [60, 40, 120, 140],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--dp-color-on-surface)" strokeOpacity={0.35} strokeWidth={1.5} />
            ))}
            {[
              { x: 60, y: 40, t: 'C' }, { x: 160, y: 30, t: 'A' }, { x: 260, y: 60, t: 'n8' },
              { x: 230, y: 130, t: 'M' }, { x: 120, y: 140, t: 'L' },
            ].map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r={20} fill="color-mix(in srgb, var(--dp-color-on-surface) 5%, transparent)" stroke="var(--dp-color-on-surface)" strokeOpacity={0.45} strokeWidth={1.5} />
                <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fontFamily="var(--dp-sem-font-display)" fontSize={12} fontWeight={600} fill="var(--dp-color-on-surface)">{n.t}</text>
              </g>
            ))}
            <circle cx={110} cy={35} r={3} fill="var(--dp-color-primary)" />
            <circle cx={245} cy={95} r={3} fill="var(--dp-color-primary)" />
          </svg>
        </SectionMock>
      ),
    },
    {
      label: 'Variants',
      content: (
        <Row gap={10}>
          {[
            { name: 'Ghost (V1)',    desc: 'Monochrome, thin lines, tiny dots' },
            { name: 'Spectrum (V2)', desc: 'Brand-coloured nodes + gradient edges' },
            { name: 'Flow (V3)',     desc: 'Bezier paths + orbital rings' },
          ].map(v => (
            <div key={v.name} style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 10, background: 'var(--dp-color-surface-container)', border: '1px solid var(--dp-color-outline-variant)' }}>
              <p style={{ fontFamily: 'var(--dp-sem-font-display)', fontWeight: 700, fontSize: 13, color: 'var(--dp-color-on-surface)', margin: '0 0 4px' }}>{v.name}</p>
              <p style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 11, lineHeight: 1.5, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </Row>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={120} bg="var(--dp-color-surface-container-low)">
      <svg viewBox="0 0 200 100" width="100%" height="90" aria-hidden="true">
        <line x1={40} y1={30} x2={140} y2={60} stroke="var(--dp-color-on-surface)" strokeOpacity={0.35} strokeWidth={1.5} />
        <circle cx={40} cy={30} r={16} fill="none" stroke="var(--dp-color-on-surface)" strokeOpacity={0.45} strokeWidth={1.5} />
        <circle cx={140} cy={60} r={16} fill="none" stroke="var(--dp-color-on-surface)" strokeOpacity={0.45} strokeWidth={1.5} />
        <circle cx={90} cy={45} r={3} fill="var(--dp-color-primary)" />
      </svg>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Canvas',   desc: '<canvas aria-hidden> filling its wrapper. DPR-scaled via ResizeObserver.' },
    { id: 2, label: 'Node',     desc: '7 tool nodes: transparent fill + ring + clipped logo (or initial fallback).' },
    { id: 3, label: 'Edge',     desc: '11 connections drawn as lines (V2 gradient, V3 bezier).' },
    { id: 4, label: 'Pulse',    desc: 'Radial-gradient particles travelling each edge on a loop.' },
    { id: 5, label: 'Observer', desc: 'IntersectionObserver pauses the RAF loop when off-screen.' },
  ],

  prompt: `## Component: NetworkBg
Role: Decorative animated background (canvas 2D) for the Hero right side.

Nodes: 7 tools (Clay, Apollo, n8n, Instantly, Make, Lemlist, Apify), normalised [0,1] positions.
Edges: 11 fixed connections. Pulses travel edges on requestAnimationFrame.
Colours flip on data-color-scheme (dark: white α; light: ink α).
Performance: ResizeObserver for DPR sizing; IntersectionObserver pauses off-screen.
A11y: aria-hidden; must respect prefers-reduced-motion (set animated=false).

Props: opacity, blurPx, nodeRadius, animated, className.
Variants: V1 Ghost (mono), V2 Spectrum (brand colours), V3 Flow (bezier + orbits).`,

  codeSnippet: `import NetworkBg from '@/components/NetworkBg/NetworkBg'
// or a variant: NetworkBgV1 / NetworkBgV2 / NetworkBgV3

<NetworkBg opacity={0.85} nodeRadius={26} animated />`,

  tokens: [
    { name: '--dp-color-primary',    usage: 'Pulse glow accent (V2/V3)' },
    { name: '--dp-color-on-surface', usage: 'Node ring + edge colour (alpha-mixed per mode)' },
    { name: '--dp-color-surface',    usage: 'Canvas backdrop context' },
  ],

  accessibility: [
    { rule: 'Canvas is decorative — aria-hidden="true"',                 status: 'pass' },
    { rule: 'Animation loop pauses when scrolled off-screen',            status: 'pass' },
    { rule: 'Honour prefers-reduced-motion — pass animated={false}',     status: 'warn' },
  ],

  whenToUse: ['Behind the Hero copy/diagram as ambient texture.'],
  whenNotToUse: ['Behind body text — pulses reduce reading contrast.', 'On low-power pages where a static image would do.'],

  guidelines: [
    { type: 'do',   text: 'Keep opacity subtle (≤0.85) so foreground copy stays legible.' },
    { type: 'dont', text: 'Run the animation full-page — it belongs to the Hero only.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   PAGE LAYOUT
══════════════════════════════════════════════════════════════ */

const PAGE_LAYOUT_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'PageLayout',
  category: 'Layout',
  description: 'The page shell — composes Nav, a <main> content slot, and Footer. Wraps every route except the home page so the header and footer stay consistent site-wide.',

  overviewBlocks: [
    {
      label: 'Structure',
      content: (
        <SectionMock minH={220}>
          <Col gap={8}>
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--dp-color-surface-container)', border: '1px solid var(--dp-color-outline-variant)', fontFamily: 'var(--dp-sem-font-code)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>&lt;Nav /&gt;</div>
            <div style={{ padding: '32px 14px', borderRadius: 8, background: 'color-mix(in srgb, var(--dp-color-primary) 6%, transparent)', border: '1px dashed color-mix(in srgb, var(--dp-color-primary) 40%, transparent)', textAlign: 'center', fontFamily: 'var(--dp-sem-font-body)', fontSize: 12, color: 'var(--dp-color-on-surface)' }}>
              <strong style={{ fontFamily: 'var(--dp-sem-font-code)' }}>&lt;main&gt;</strong>
              <span style={{ display: 'block', marginTop: 4, color: 'var(--dp-color-on-surface-variant)' }}>{'{ children } — page content'}</span>
            </div>
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--dp-color-surface-container)', border: '1px solid var(--dp-color-outline-variant)', fontFamily: 'var(--dp-sem-font-code)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>&lt;Footer /&gt;</div>
          </Col>
        </SectionMock>
      ),
    },
  ],

  anatomyPreview: (
    <SectionMock minH={120}>
      <Col gap={6}>
        <div style={{ padding: 8, borderRadius: 6, background: 'var(--dp-color-surface-container)', fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, color: 'var(--dp-color-on-surface-variant)' }}>Nav</div>
        <div style={{ padding: 20, borderRadius: 6, background: 'color-mix(in srgb, var(--dp-color-primary) 6%, transparent)', textAlign: 'center', fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, color: 'var(--dp-color-on-surface)' }}>main · children</div>
        <div style={{ padding: 8, borderRadius: 6, background: 'var(--dp-color-surface-container)', fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, color: 'var(--dp-color-on-surface-variant)' }}>Footer</div>
      </Col>
    </SectionMock>
  ),

  anatomy: [
    { id: 1, label: 'Nav',      desc: 'Site header, rendered first. Fixed/sticky handled inside Nav.' },
    { id: 2, label: 'main',     desc: 'Semantic landmark wrapping {children} — the routed page.' },
    { id: 3, label: 'Footer',   desc: 'Site footer, rendered last.' },
  ],

  prompt: `## Component: PageLayout
Role: Standard page shell for all non-home routes (blog, case studies…).

Composition: <Nav /> + <main>{children}</main> + <Footer />.
Single prop: children (React.ReactNode).
No own styling — delegates spacing to Nav, the page, and Footer.
Home page composes sections directly and does NOT use this wrapper.`,

  codeSnippet: `import PageLayout from '@/components/PageLayout/PageLayout'

<Route path="/blog" element={
  <PageLayout>
    <BlogListPage />
  </PageLayout>
} />`,

  tokens: [
    { name: '—', usage: 'No tokens — purely structural. Styling lives in Nav, page, Footer.' },
  ],

  accessibility: [
    { rule: 'Wraps content in a <main> landmark',            status: 'pass' },
    { rule: 'Single Nav + Footer per page (no duplication)', status: 'pass' },
  ],

  whenToUse: ['Every routed page except the home page.'],
  whenNotToUse: ['The home page — it composes its own sections directly.'],

  guidelines: [
    { type: 'do',   text: 'Put page-specific content as children — keep the shell dumb.' },
    { type: 'dont', text: 'Nest a second Nav or Footer inside children.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   BLOG CARD
══════════════════════════════════════════════════════════════ */

const BLOG_CARD_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'BlogCard',
  category: 'Pattern',
  description: 'Article preview card for the blog index — tag chips, title, excerpt, and a meta footer (date · read time) with a “Read post →” link.',

  overviewBlocks: [
    {
      label: 'Card',
      content: (
        <div style={{ maxWidth: 340, padding: 20, borderRadius: 'var(--dp-sem-radius-card)', background: 'var(--dp-color-surface-container-low)', border: '1px solid var(--dp-color-outline-variant)', boxShadow: 'var(--dp-sem-shadow-card)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {['Clay', 'Outbound'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 8px', borderRadius: 9999, background: 'color-mix(in srgb, var(--dp-color-primary) 12%, transparent)', color: 'var(--dp-color-primary)' }}>{t}</span>
            ))}
          </div>
          <h2 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, lineHeight: 1.25, color: 'var(--dp-color-on-surface)', margin: '0 0 8px' }}>Why bounce rate is your domain’s credit score</h2>
          <p style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--dp-color-on-surface-variant)', margin: '0 0 16px' }}>Verification layers exist for one reason: protect the sender reputation that makes every future campaign land.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--dp-color-outline-variant)', paddingTop: 12 }}>
            <span style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>March 12, 2026 · 6 min</span>
            <span style={{ fontFamily: 'var(--dp-sem-font-label)', fontSize: 12, fontWeight: 600, color: 'var(--dp-color-primary)' }}>Read post →</span>
          </div>
        </div>
      ),
    },
  ],

  anatomyPreview: (
    <div style={{ maxWidth: 300, padding: 16, borderRadius: 'var(--dp-sem-radius-card)', background: 'var(--dp-color-surface-container-low)', border: '1px solid var(--dp-color-outline-variant)' }}>
      <span style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, padding: '2px 8px', borderRadius: 9999, background: 'color-mix(in srgb, var(--dp-color-primary) 12%, transparent)', color: 'var(--dp-color-primary)' }}>Tag</span>
      <h3 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 15, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: '10px 0 6px' }}>Title</h3>
      <p style={{ fontSize: 12, color: 'var(--dp-color-on-surface-variant)', margin: 0 }}>Excerpt…</p>
    </div>
  ),

  anatomy: [
    { id: 1, label: 'Article',   desc: 'Semantic <article> card. Hover: lift + card-hover shadow.' },
    { id: 2, label: 'Tag chips', desc: 'Code-font pills — one per post tag (see Badge).' },
    { id: 3, label: 'Title',     desc: 'Display heading (H2 in list context).' },
    { id: 4, label: 'Excerpt',   desc: 'Body copy, muted, ~2–3 lines.' },
    { id: 5, label: 'Footer',    desc: 'Meta (date · read time) + “Read post →” link with aria-label.' },
  ],

  prompt: `## Component: BlogCard
Role: Article preview in the blog index grid.

Props: post (title, excerpt, tags[], date ISO, readTime, slug), delay (stagger).
Structure: <article> → tag chips → H2 title → excerpt → footer(meta + Read link).
Link: /blog/:slug, aria-label="Read post: {title}".
Surface: --dp-surface-container-low, 1px --dp-outline-variant, shadow-card.
Wrap in AnimatedSection (fade-up, delay = i*100) for staggered entrance.`,

  codeSnippet: `// Rendered inside the blog index grid
{sortedPosts.map((post, i) => (
  <BlogCard key={post.slug} post={post} delay={i * 100} />
))}`,

  tokens: [
    { name: '--dp-color-primary',                usage: 'Tag chips + “Read post” link' },
    { name: '--dp-color-surface-container-low',  usage: 'Card background' },
    { name: '--dp-color-outline-variant',        usage: 'Card border + footer divider' },
    { name: '--dp-color-on-surface',             usage: 'Title' },
    { name: '--dp-color-on-surface-variant',     usage: 'Excerpt + meta' },
    { name: '--dp-sem-radius-card',              usage: 'Card corner radius' },
  ],

  accessibility: [
    { rule: 'Link carries descriptive aria-label with post title', status: 'pass' },
    { rule: '<time dateTime> used for the publication date',        status: 'pass' },
    { rule: 'Tag container labelled aria-label="Tags"',            status: 'pass' },
  ],

  whenToUse: ['Blog index grid — one card per post.'],
  whenNotToUse: ['A single featured post — use a wider hero treatment instead.'],

  guidelines: [
    { type: 'do',   text: 'Keep excerpts to 2–3 lines so card heights stay even.' },
    { type: 'dont', text: 'Make the whole card a link — keep the focus target on “Read post”.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY CARD
══════════════════════════════════════════════════════════════ */

const CASE_STUDY_CARD_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'CaseStudyCard',
  category: 'Pattern',
  description: 'Case study preview for the cases grid — industry eyebrow, headline, a two-metric result pair with accent colours, excerpt, and a “View case →” link over a background image.',

  overviewBlocks: [
    {
      label: 'Card',
      content: (
        <div style={{ maxWidth: 340, padding: 20, borderRadius: 'var(--dp-sem-radius-card)', background: 'var(--dp-color-surface-container-low)', border: '1px solid var(--dp-color-outline-variant)', boxShadow: 'var(--dp-sem-shadow-card)' }}>
          <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dp-color-on-surface-variant)', margin: '0 0 8px' }}>Cybersecurity</p>
          <h3 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, lineHeight: 1.2, color: 'var(--dp-color-on-surface)', margin: '0 0 16px' }}>From 0 to 12 qualified meetings in 30 days</h3>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
            {[
              { v: '12', l: 'Meetings booked', c: 'var(--dp-color-primary)' },
              { v: '0.4%', l: 'Bounce rate', c: 'var(--dp-color-secondary)' },
            ].map(m => (
              <div key={m.l}>
                <span style={{ display: 'block', fontFamily: 'var(--dp-sem-font-display)', fontSize: 24, fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.v}</span>
                <span style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>{m.l}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--dp-color-on-surface-variant)', margin: '0 0 16px' }}>A verified-lead pipeline for a security vendor breaking into the US mid-market.</p>
          <span style={{ fontFamily: 'var(--dp-sem-font-label)', fontSize: 12, fontWeight: 600, color: 'var(--dp-color-primary)' }}>View case →</span>
        </div>
      ),
    },
    {
      label: 'Metric accents',
      content: (
        <Row gap={10}>
          {[
            { l: 'primary',   c: 'var(--dp-color-primary)' },
            { l: 'secondary', c: 'var(--dp-color-secondary)' },
            { l: 'tertiary',  c: 'var(--dp-color-tertiary)' },
          ].map(m => (
            <div key={m.l} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--dp-color-outline-variant)' }}>
              <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 18, fontWeight: 700, color: m.c }}>99%</span>
              <span style={{ display: 'block', fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, color: 'var(--dp-color-on-surface-variant)' }}>{m.l}</span>
            </div>
          ))}
        </Row>
      ),
    },
  ],

  anatomyPreview: (
    <div style={{ maxWidth: 300, padding: 16, borderRadius: 'var(--dp-sem-radius-card)', background: 'var(--dp-color-surface-container-low)', border: '1px solid var(--dp-color-outline-variant)' }}>
      <p style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: 10, textTransform: 'uppercase', color: 'var(--dp-color-on-surface-variant)', margin: '0 0 6px' }}>Industry</p>
      <h3 style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 14, fontWeight: 700, color: 'var(--dp-color-on-surface)', margin: '0 0 10px' }}>Headline</h3>
      <div style={{ display: 'flex', gap: 16 }}>
        <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dp-color-primary)' }}>12</span>
        <span style={{ fontFamily: 'var(--dp-sem-font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dp-color-secondary)' }}>0.4%</span>
      </div>
    </div>
  ),

  anatomy: [
    { id: 1, label: 'Article',     desc: 'Card with background image via --card-bg custom property.' },
    { id: 2, label: 'Eyebrow',     desc: 'Industry label, code-font uppercase.' },
    { id: 3, label: 'Headline',    desc: 'Case outcome as a display H3.' },
    { id: 4, label: 'Metric pair', desc: 'First two hero metrics — value in accent colour + label.' },
    { id: 5, label: 'CTA',         desc: '“View case →” link to /case-studies/:slug.' },
  ],

  prompt: `## Component: CaseStudyCard
Role: Case preview in the case-studies grid (3-col responsive).

Props: case (industry, headline, excerpt, heroMetrics[], slug), delay.
Metric accent enum → CSS var: primary|secondary|tertiary|sky|plum (accentVar()).
Show the first TWO hero metrics: big value (accent colour) + small label.
Background image: style={{ '--card-bg': url(/images/cases/{slug}.jpg) }}.
Link: /case-studies/:slug, aria-label="View case study: {headline}".
Wrap in AnimatedSection (fade-up, delay = (i%3)*100).`,

  codeSnippet: `{caseStudies.map((cs, i) => (
  <CaseStudyCard key={cs.slug} case={cs} delay={(i % 3) * 100} />
))}`,

  tokens: [
    { name: '--dp-color-primary',                usage: 'Metric accent + CTA link' },
    { name: '--dp-color-secondary',              usage: 'Metric accent (coral)' },
    { name: '--dp-color-tertiary',               usage: 'Metric accent (indigo)' },
    { name: '--dp-color-surface-container-low',  usage: 'Card background' },
    { name: '--dp-color-on-surface-variant',     usage: 'Eyebrow, label, excerpt' },
    { name: '--dp-sem-radius-card',              usage: 'Card corner radius' },
  ],

  accessibility: [
    { rule: 'Card + link carry aria-label with the headline',      status: 'pass' },
    { rule: 'Metric values pair colour with a text label (not colour alone)', status: 'pass' },
    { rule: 'Background image is decorative (CSS, not <img>)',      status: 'pass' },
  ],

  whenToUse: ['Case-studies index grid — one card per case.'],
  whenNotToUse: ['Home-page proof — use the Proof section’s compact metric tiles instead.'],

  guidelines: [
    { type: 'do',   text: 'Lead with the two strongest, verifiable metrics.' },
    { type: 'dont', text: 'Show more than two metrics — save the rest for the case page.' },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE  (shared UI atom — used by the site Nav and the portal)
══════════════════════════════════════════════════════════════ */

const THEME_TOGGLE_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'ThemeToggle',
  category: 'Atomic',
  description: 'Standalone dark/light switch (controlled). Extracted from Nav so the site, the portal and the showroom all share one toggle. The app applies data-color-scheme and persists the choice.',
  overviewBlocks: [
    {
      label: 'States',
      content: (
        <Row>
          <ThemeToggle scheme="dark" onToggle={() => {}} />
          <ThemeToggle scheme="light" onToggle={() => {}} />
        </Row>
      ),
    },
  ],
  anatomyPreview: <ThemeToggle scheme="dark" onToggle={() => {}} />,
  anatomy: [
    { id: 1, label: 'Button', desc: 'Icon button, 40px, outlined.' },
    { id: 2, label: 'Icon', desc: 'Sun in dark mode, moon in light mode.' },
  ],
  prompt: '## ThemeToggle\nControlled dark/light switch. Props: scheme, onToggle. The app applies data-color-scheme on <html> and persists (localStorage). Shared by site Nav and portal.',
  codeSnippet: `<ThemeToggle scheme={scheme} onToggle={() => setScheme(s => s === 'dark' ? 'light' : 'dark')} />`,
  tokens: [
    { name: '--dp-color-outline-variant', usage: 'Border' },
    { name: '--dp-color-primary', usage: 'Focus ring' },
    { name: '--dp-color-on-surface-variant', usage: 'Icon color' },
  ],
  accessibility: [
    { rule: 'aria-pressed reflects light mode', status: 'pass' },
    { rule: 'Descriptive aria-label; keyboard focusable', status: 'pass' },
  ],
  whenToUse: ['Anywhere the user should switch theme — nav bars, app top bars, settings.'],
  whenNotToUse: ['To store theme state — keep it controlled; the app owns persistence.'],
  guidelines: [
    { type: 'do', text: 'Keep it controlled — the app persists + applies the scheme.' },
    { type: 'dont', text: 'Render two uncoordinated toggles with separate state.' },
  ],
}

/* ─── Catalog ─────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════
   CASE FLOW
══════════════════════════════════════════════════════════════ */

const CF_TREMMUN_NODES: CaseFlowNode[] = [
  { id: 'n1', title: 'Dormant network', bullets: ['500+ past contacts', 'years of relationships', 'no follow-up system'], row: 1, col: 1 },
  { id: 'n2', title: 'Segmentation', bullets: ['by relationship strength', 'industry + potential value', 'qualification scoring'], row: 1, col: 2 },
  { id: 'n3', title: 'AI personalization', bullets: ['per-contact context', 'message tuned to history', 'Clay enrich + Apollo CRM'], row: 1, col: 3 },
  { id: 'n4', title: 'Outreach sequences', bullets: ['structured reactivation', 'Make.com workflows', 'human in the loop'], row: 2, col: 2 },
  { id: 'n5', title: 'Meetings', bullets: ['10 qualified meetings', '1 deal closed', '30 days end to end'], row: 2, col: 3, tone: 'outcome' },
]
const CF_TREMMUN_EDGES: CaseFlowEdge[] = [
  { from: 'n1', to: 'n2', tone: 'primary' },
  { from: 'n2', to: 'n3', tone: 'primary' },
  { from: 'n3', to: 'n4', tone: 'muted' },
  { from: 'n4', to: 'n5', tone: 'primary' },
]

const CASE_FLOW_DOC: Omit<ComponentViewerProps, 'id'> = {
  name: 'CaseFlow',
  category: 'Pattern',
  description:
    'The case-study "system map" as an animated flow diagram: boxes with a title + bullets placed on a grid, connected by real SVG arrows that draw along the exact path. Arrow geometry is measured from the live boxes, so it stays correct at any width and collapses to a single column on mobile. Arrows are the information (the flow path), so they stay. Respects prefers-reduced-motion.',

  overviewBlocks: [
    {
      label: 'Tremmun — network reactivation (scroll re-triggers)',
      content: (
        <div style={{ width: '100%', padding: '8px 4px' }}>
          <CaseFlow
            once={false}
            topNote="a warm network with no system to work it."
            bottomNote="40% response rate."
            nodes={CF_TREMMUN_NODES}
            edges={CF_TREMMUN_EDGES}
          />
        </div>
      ),
    },
    {
      label: 'Custom accent (coral) + a compliance gate node',
      content: (
        <div style={{ width: '100%', padding: '8px 4px', ['--cf-accent' as string]: 'var(--dp-color-coral-400)' }}>
          <CaseFlow
            once={false}
            nodes={[
              { id: 'a', title: 'Company universe', bullets: ['target CX buyers', '859 companies scored'], row: 1, col: 1 },
              { id: 'b', title: 'BPO exclusion gate', bullets: ['5-layer exclusion', 'clean target list'], row: 1, col: 2, tone: 'gate' },
              { id: 'c', title: '6 signal agents', chips: ['Hiring', 'Expansion', 'Review pressure', 'Tech stack', 'Regulatory', 'Seasonal'], row: 1, col: 3 },
            ]}
            edges={[
              { from: 'a', to: 'b', tone: 'primary' },
              { from: 'b', to: 'c', tone: 'accent' },
            ]}
          />
        </div>
      ),
    },
  ],

  anatomyPreview: (
    <div style={{ width: '100%', maxWidth: 460, padding: 8 }}>
      <CaseFlow
        once={false}
        nodes={[
          { id: 'x', title: 'Input', bullets: ['raw list'], row: 1, col: 1 },
          { id: 'y', title: 'Process', bullets: ['enrich + score'], row: 1, col: 2 },
          { id: 'z', title: 'Outcome', bullets: ['meetings'], row: 1, col: 3, tone: 'outcome' },
        ]}
        edges={[{ from: 'x', to: 'y' }, { from: 'y', to: 'z' }]}
      />
    </div>
  ),

  anatomy: [
    { id: 1, label: 'Box', desc: 'Título (maiúsculas) + bullets ou chips, posicionado por row/col numa grade. Faz fade-up em sequência.' },
    { id: 2, label: 'Arrow (SVG)', desc: 'Linha reta medida da borda de uma caixa até a próxima, com ponta de flecha. Se "desenha" (stroke-dashoffset) após o nó de origem aparecer.' },
    { id: 3, label: 'Tones', desc: 'Edge: primary (acento) / muted (cinza, a quebra diagonal) / accent (coral). Node: default / gate (coral) / outcome.' },
    { id: 4, label: 'Notes', desc: 'topNote e bottomNote flutuantes (mono), como no diagrama original.' },
    { id: 5, label: 'Responsivo', desc: 'No mobile a grade colapsa em coluna única e as flechas são remedidas (viram verticais).' },
  ],

  tokens: [
    { name: '--cf-accent', usage: 'Bordas/títulos default, flechas primary e topNote (default: --dp-color-primary-strong; sobrescrevível)' },
    { name: '--cf-accent2', usage: 'Nós/flechas de tom gate/accent e bottomNote (--dp-color-coral-400)' },
    { name: '--cf-muted', usage: 'Flecha da quebra diagonal (--dp-color-outline)' },
    { name: '--dp-easing-spring', usage: 'Pop das caixas ao aparecer' },
  ],

  accessibility: [
    { rule: 'Renderizado como <figure>; SVG das flechas é aria-hidden (decorativo)', status: 'pass' },
    { rule: 'decorative → aria-hidden quando o mesmo conteúdo aparece como texto perto', status: 'pass' },
    { rule: 'Reveal + desenho das flechas respeitam prefers-reduced-motion', status: 'pass' },
  ],

  guidelines: [
    { type: 'do', text: 'Reproduza o conteúdo e o caminho EXATOS do diagrama do case (títulos, bullets, quem aponta pra quem).' },
    { type: 'do', text: 'Sobrescreva --cf-accent para herdar a cor do setor do case (--case-hue-soft).' },
    { type: 'dont', text: 'Não use para progresso com estados por fase (done/pending) — isso é Timeline.' },
    { type: 'dont', text: 'Não remova as flechas: aqui elas são a informação (o caminho do sistema).' },
  ],

  prompt: `## Component: CaseFlow
Role: Animated "system map" flow diagram for a case study.

Props:
  nodes       { id, title, bullets?, chips?, row, col, tone? }[]   (required)
  edges       { from, to, tone? }[]                                (required)
  columns     number   default: max node col
  topNote     string   free-floating annotation above
  bottomNote  string   free-floating annotation below
  once        boolean  default: true
  threshold   number   default: 0.25
  decorative  boolean  default: false
  className   string
  aria-label  string

node.tone: 'default' | 'gate' (coral) | 'outcome'
edge.tone: 'primary' (accent) | 'muted' (grey diagonal) | 'accent' (coral)
Accent: set --cf-accent to recolor. Arrows carry the path — never remove them.`,

  codeSnippet: `import { CaseFlow } from '@steschoch/digital-pampas-ds'

<CaseFlow
  decorative
  topNote="a warm network with no system to work it."
  bottomNote="40% response rate."
  nodes={cs.flow.nodes}
  edges={cs.flow.edges}
/>`,
}

export const COMPONENT_CATALOG: Array<{ id: string } & Omit<ComponentViewerProps, 'id'>> = [
  { id: 'button',           ...BUTTON_DOC },
  { id: 'card',             ...CARD_DOC },
  { id: 'badge',            ...BADGE_DOC },
  { id: 'animated-section', ...ANIMATED_SECTION_DOC },
  { id: 'nav',              ...NAV_DOC },
  { id: 'hero',             ...HERO_DOC },
  { id: 'problem',          ...PROBLEM_DOC },
  { id: 'how-we-build-it',  ...HOW_WE_BUILD_DOC },
  { id: 'proof',            ...PROOF_DOC },
  { id: 'what-we-dont-do',  ...WHAT_WE_DONT_DO_DOC },
  { id: 'ways-to-work',     ...WAYS_TO_WORK_DOC },
  { id: 'final-cta',        ...FINAL_CTA_DOC },
  { id: 'footer',           ...FOOTER_DOC },
  { id: 'theme-toggle',     ...THEME_TOGGLE_DOC },
  { id: 'network-bg',       ...NETWORK_BG_DOC },
  { id: 'page-layout',      ...PAGE_LAYOUT_DOC },
  { id: 'blog-card',        ...BLOG_CARD_DOC },
  { id: 'case-study-card',  ...CASE_STUDY_CARD_DOC },
  { id: 'case-flow',        ...CASE_FLOW_DOC },
]

/* ─── Live previews ───────────────────────────────────────────────
   Real component instances shown at the top of each Overview tab.
   Scaled + clipped; the transform also contains any position:fixed
   descendants (e.g. Nav) inside the frame. Pointer events disabled. */

function LivePreview({
  children,
  scale = 1,
}: {
  children: React.ReactNode
  /** Deprecated — kept for call-site compatibility; height is now automatic. */
  h?: number
  /** Maximum scale (never scales UP past this; scales DOWN to fit width). */
  scale?: number
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return
    const fit = () => {
      const cw = outer.clientWidth
      const nw = inner.scrollWidth || 1
      const s = Math.min(scale, cw / nw) // shrink to fit width; never grow past `scale`
      inner.style.transform = s < 1 ? `scale(${s})` : 'none'
      inner.style.transformOrigin = 'top left'
      // Auto height so the WHOLE component shows — never clipped.
      outer.style.height = `${inner.scrollHeight * s}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(outer)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [scale])

  return (
    <div
      ref={outerRef}
      style={{
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 'var(--dp-sem-radius-card-sm)',
        border: '1px solid var(--dp-color-outline-variant)',
        background: 'var(--dp-color-surface)',
        width: '100%',
      }}
    >
      <div ref={innerRef} style={{ transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

/* FramePreview — renders children inside an <iframe> (its own viewport), so the
   component's real @media rules fire (true responsive/mobile). Copies the DS
   stylesheets into the frame, syncs the theme, and auto-sizes its height. */
function FramePreview({ children, minHeight = 120 }: { children: React.ReactNode; minHeight?: number }) {
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
  const [height, setHeight] = useState(minHeight)
  const doc = frame?.contentDocument
  const body = doc?.body

  useEffect(() => {
    if (!doc || !body) return
    document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
      doc.head.appendChild(node.cloneNode(true))
    })
    body.style.margin = '0'
    const sync = () =>
      doc.documentElement.setAttribute(
        'data-color-scheme',
        document.documentElement.getAttribute('data-color-scheme') || 'dark',
      )
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-scheme'] })
    const ro = new ResizeObserver(() => setHeight(Math.max(minHeight, body.scrollHeight)))
    ro.observe(body)
    setReady(true)
    return () => {
      mo.disconnect()
      ro.disconnect()
    }
  }, [doc, body, minHeight])

  return (
    <iframe
      ref={setFrame}
      title="Responsive preview"
      style={{
        width: '100%',
        height,
        border: '1px solid var(--dp-color-outline-variant)',
        borderRadius: 'var(--dp-sem-radius-card-sm)',
        background: 'var(--dp-color-surface)',
        display: 'block',
      }}
    >
      {ready && body ? createPortal(children, body) : null}
    </iframe>
  )
}

const SAMPLE_POST = {
  title: "Why bounce rate is your domain's credit score",
  excerpt:
    'Verification layers exist for one reason: protect the sender reputation that makes every future campaign land.',
  tags: ['Clay', 'Outbound'],
  date: '2026-03-12',
  readTime: '6 min read',
  slug: 'bounce-rate-credit-score',
}

const SAMPLE_CASE = {
  slug: 'cybersecurity',
  industry: 'Cybersecurity',
  headline: 'From 0 to 12 qualified meetings in 30 days',
  excerpt: 'A verified-lead pipeline for a security vendor breaking into the US mid-market.',
  heroMetrics: [
    { value: '12', label: 'Meetings booked', accent: 'primary' as const },
    { value: '0.4%', label: 'Bounce rate', accent: 'secondary' as const },
  ],
}

/** id → live render of the real component (used by the Overview tab in App.tsx). */
export const LIVE_COMPONENTS: Record<string, React.ReactNode> = {
  'nav':              <LivePreview h={150}><Nav /></LivePreview>,
  'hero':             <LivePreview h={520}><Hero /></LivePreview>,
  'network-bg':       <LivePreview h={300} scale={0.9}><div style={{ position: 'relative', height: 320, background: 'var(--dp-color-surface-container-low)' }}><NetworkBg /></div></LivePreview>,
  'problem':          <LivePreview h={460}><Problem /></LivePreview>,
  'what-we-dont-do':  <LivePreview h={440}><WhatWeDontDo /></LivePreview>,
  'how-we-build-it':  <LivePreview h={520}><HowWeBuildIt /></LivePreview>,
  'proof':            <LivePreview h={520}><Proof /></LivePreview>,
  'ways-to-work':     <LivePreview h={440}><WaysToWork /></LivePreview>,
  'final-cta':        <LivePreview h={560}><FinalCTA /></LivePreview>,
  'footer':           <LivePreview h={440}><Footer /></LivePreview>,
  'page-layout':      <LivePreview h={480}><PageLayout><div style={{ padding: '96px 32px', minHeight: 240 }}>Page content goes here.</div></PageLayout></LivePreview>,
  'blog-card':        <LivePreview h={300} scale={0.85}><div style={{ padding: 24, maxWidth: 440 }}><BlogCard post={SAMPLE_POST} /></div></LivePreview>,
  'case-study-card':  <LivePreview h={340} scale={0.85}><div style={{ padding: 24, maxWidth: 440 }}><CaseStudyCard case={SAMPLE_CASE} /></div></LivePreview>,
}

/* ═══════════════════════════════════════════════════════════════
   APPLICATION / PORTAL COMPONENTS (client-portal-architecture §11)
══════════════════════════════════════════════════════════════ */

type PortalDocCfg = {
  name: string
  category: 'Atomic' | 'Layout' | 'Pattern'
  description: string
  live: React.ReactNode
  anatomy: { id: number; label: string; desc: string }[]
  prompt: string
  code: string
  tokens: { name: string; usage: string }[]
  a11y: { rule: string; status: 'pass' | 'warn' | 'fail' }[]
  guidelines: { type: 'do' | 'dont'; text: string }[]
}

function portalDoc(cfg: PortalDocCfg): Omit<ComponentViewerProps, 'id'> {
  return {
    name: cfg.name,
    category: cfg.category,
    description: cfg.description,
    overviewBlocks: [{ label: 'Live component (real)', content: cfg.live }],
    anatomyPreview: cfg.live,
    anatomy: cfg.anatomy,
    prompt: cfg.prompt,
    codeSnippet: cfg.code,
    tokens: cfg.tokens,
    accessibility: cfg.a11y,
    guidelines: cfg.guidelines,
  }
}

/* ── Sample data for previews ── */
const P_LINE = [
  { label: 'Sends', colorVar: 'var(--dp-color-primary)', points: [
    { date: 'Jun 1', value: 120 }, { date: 'Jun 8', value: 210 }, { date: 'Jun 15', value: 180 },
    { date: 'Jun 22', value: 320 }, { date: 'Jun 29', value: 290 },
  ] },
  { label: 'Replies', colorVar: 'var(--dp-color-secondary)', points: [
    { date: 'Jun 1', value: 8 }, { date: 'Jun 8', value: 18 }, { date: 'Jun 15', value: 14 },
    { date: 'Jun 22', value: 31 }, { date: 'Jun 29', value: 26 },
  ] },
]
const P_DONUT = [
  { label: 'Interested', value: 42, colorVar: 'var(--dp-color-primary)' },
  { label: 'Neutral', value: 30, colorVar: 'var(--dp-color-plum-text)' },
  { label: 'Not now', value: 28, colorVar: 'var(--dp-color-secondary)' },
]
const P_BARS = [
  { label: 'Finance', value: 82 }, { label: 'Health', value: 64 },
  { label: 'SaaS', value: 91 }, { label: 'Logistics', value: 47 },
]
const P_FUNNEL = [
  { label: 'Sourced', value: 12690 }, { label: 'Verified', value: 9820 },
  { label: 'Qualified', value: 3617 }, { label: 'Replied', value: 452 },
]
const P_TABLE_COLS = [
  { key: 'company', header: 'Company' },
  { key: 'title', header: 'Title' },
  { key: 'status', header: 'Status' },
  { key: 'replied', header: 'Replied', align: 'right' as const },
]
const P_TABLE_ROWS = [
  { company: 'Tremmun', title: 'Founder', status: 'Interested', replied: 'Yes' },
  { company: 'Moai Tech', title: 'Head of Data', status: 'Neutral', replied: 'Yes' },
  { company: 'Acme Sec', title: 'VP Sales', status: 'Not now', replied: 'No' },
]
const P_SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', href: '#', icon: <Home size={18} />, active: true },
  { id: 'campaigns', label: 'Campaigns', href: '#', icon: <BarChart2 size={18} /> },
  { id: 'replies', label: 'Replies', href: '#', icon: <Users size={18} /> },
  { id: 'settings', label: 'Settings', href: '#', icon: <Settings size={18} /> },
]
const P_TIMELINE = [
  { id: '1', label: 'Define ICP', status: 'done' as const, plannedStart: 'Wk 1', completedAt: 'Wk 1' },
  { id: '2', label: 'Build List', status: 'done' as const, plannedStart: 'Wk 1', completedAt: 'Wk 2' },
  { id: '3', label: 'Enrich', status: 'active' as const, plannedStart: 'Wk 2' },
  { id: '4', label: 'Launch', status: 'upcoming' as const, plannedStart: 'Wk 3' },
]

const PORTAL_DOCS: PortalDocCfg[] = [
  {
    name: 'Skeleton', category: 'Atomic',
    description: 'Loading placeholder with a subtle shimmer (off under reduced-motion). Decorative (aria-hidden).',
    live: <LivePreview h={140} scale={1}><div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}><Skeleton variant="text" lines={3} /><Skeleton variant="rect" width="60%" height={40} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Shape', desc: 'variant text / rect / circle.' }, { id: 2, label: 'Shimmer', desc: 'Animated sheen; disabled under prefers-reduced-motion.' }],
    prompt: '## Skeleton\nLoading placeholder. Props: variant text|rect|circle, width, height, lines. Always aria-hidden.',
    code: `<Skeleton variant="text" lines={3} />\n<Skeleton variant="rect" width="60%" height={40} />`,
    tokens: [{ name: '--dp-color-surface-container', usage: 'Base fill' }, { name: '--dp-sem-radius-chip', usage: 'Corner radius' }],
    a11y: [{ rule: 'Decorative — aria-hidden', status: 'pass' }, { rule: 'Shimmer respects reduced-motion', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Match the skeleton shape to the content it replaces.' }, { type: 'dont', text: 'Leave skeletons up after data arrives.' }],
  },
  {
    name: 'EmptyState', category: 'Atomic',
    description: 'Centered placeholder for empty views: icon, title, description, optional action.',
    live: <LivePreview h={220} scale={1}><EmptyState icon={<Bell size={24} />} title="No replies yet" description="Replies will appear here as your campaign runs." action={<Button variant="secondary" size="sm">Refresh</Button>} /></LivePreview>,
    anatomy: [{ id: 1, label: 'Icon', desc: 'Optional, in a tinted circle.' }, { id: 2, label: 'Title + description', desc: 'Direct, on-brand copy.' }, { id: 3, label: 'Action', desc: 'Optional slot (e.g. Button).' }],
    prompt: '## EmptyState\nProps: icon?, title, description?, action?. Centered.',
    code: `<EmptyState title="No replies yet" description="…" action={<Button>Refresh</Button>} />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Icon bubble' }, { name: '--dp-color-on-surface-variant', usage: 'Description' }],
    a11y: [{ rule: 'role="status"', status: 'pass' }, { rule: 'Icon decorative', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Offer a next step when possible.' }, { type: 'dont', text: 'Use for error states — those need diagnostics.' }],
  },
  {
    name: 'Tabs', category: 'Atomic',
    description: 'Local filter/navigation tabs with a sliding cyan underline and count badges. WAI-ARIA tablist.',
    live: <LivePreview h={100} scale={1}><div style={{ padding: 24 }}><Tabs tabs={[{ id: 'all', label: 'All', count: 24 }, { id: 'int', label: 'Interested', count: 8 }, { id: 'neu', label: 'Neutral' }]} active="all" onChange={() => {}} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Tablist', desc: 'Row of tabs over a divider.' }, { id: 2, label: 'Active underline', desc: 'Cyan indicator under the active tab.' }, { id: 3, label: 'Count', desc: 'Optional neutral pill.' }],
    prompt: '## Tabs\nProps: tabs {id,label,count?}[], active, onChange. WAI-ARIA tablist + arrow keys.',
    code: `<Tabs tabs={tabs} active={active} onChange={setActive} />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Active tab + underline' }, { name: '--dp-color-surface-container', usage: 'Count badge' }],
    a11y: [{ rule: 'role tablist/tab, arrow-key nav', status: 'pass' }, { rule: 'Roving tabindex', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Keep labels short.' }, { type: 'dont', text: 'Use for primary page navigation.' }],
  },
  {
    name: 'TextField', category: 'Atomic',
    description: 'Labelled text/password input with help/error text and a "terminal" variant.',
    live: <LivePreview h={200} scale={1}><div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}><TextField label="Email" type="email" value="you@company.com" onChange={() => {}} helpText="We'll never share it." /><TextField label="Password" type="password" value="secret" onChange={() => {}} error="Too short" /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Label', desc: 'Always associated with the input.' }, { id: 2, label: 'Input', desc: 'Focus ring cyan; error border/message.' }, { id: 3, label: 'Help/Error', desc: 'One line below.' }],
    prompt: '## TextField\nProps: label, type?, value, onChange, error?, helpText?, variant default|terminal. Label associated; aria-invalid on error.',
    code: `<TextField label="Email" type="email" value={v} onChange={setV} error={err} />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Focus ring' }, { name: '--dp-color-error', usage: 'Error state' }, { name: '--dp-color-surface-container-low', usage: 'Field background' }],
    a11y: [{ rule: 'Label + aria-describedby/aria-invalid', status: 'pass' }, { rule: 'Focus visible', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Write specific error messages.' }, { type: 'dont', text: 'Use placeholder as the label.' }],
  },
  {
    name: 'Select', category: 'Atomic',
    description: 'Single-choice dropdown (WAI-ARIA listbox) with keyboard nav and a floating menu.',
    live: <LivePreview h={120} scale={1}><div style={{ padding: 24, maxWidth: 280 }}><Select options={[{ value: 'a', label: 'Acme Corp' }, { value: 'b', label: 'Globex' }]} value="a" onChange={() => {}} aria-label="Client" /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Trigger', desc: 'Selected label + chevron.' }, { id: 2, label: 'Menu', desc: 'Floating listbox with check on selected.' }],
    prompt: '## Select\nProps: options {value,label,icon?,description?}[], value, onChange, placeholder?, size?. WAI-ARIA listbox; arrows/Enter/Esc.',
    code: `<Select options={opts} value={value} onChange={setValue} />`,
    tokens: [{ name: '--dp-sem-shadow-dropdown', usage: 'Menu elevation' }, { name: '--dp-color-primary', usage: 'Selected check' }],
    a11y: [{ rule: 'combobox/listbox pattern', status: 'pass' }, { rule: 'Closes on outside click + Esc', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Use for 1-of-N choices.' }, { type: 'dont', text: 'Use for multi-select (needs a different pattern).' }],
  },
  {
    name: 'Avatar', category: 'Atomic',
    description: 'User/client avatar — image when given, otherwise initials from the name on a tinted surface.',
    live: <LivePreview h={100} scale={1}><div style={{ padding: 24, display: 'flex', gap: 12, alignItems: 'center' }}><Avatar name="Esteban Prospero" /><Avatar name="Moai Tech" size={48} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Circle', desc: 'Tinted surface + outline.' }, { id: 2, label: 'Initials', desc: 'Derived from name; or image via src.' }],
    prompt: '## Avatar\nProps: name (initials), src?, size?.',
    code: `<Avatar name="Esteban Prospero" />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Initials + tint' }, { name: '--dp-color-outline-variant', usage: 'Border' }],
    a11y: [{ rule: 'role img + aria-label = name', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Pass the full name for good initials.' }, { type: 'dont', text: 'Rely on color alone to distinguish users.' }],
  },
  {
    name: 'Tooltip', category: 'Atomic',
    description: 'Floating hint shown on hover AND keyboard focus. CSS-driven; wrap a focusable element.',
    live: <LivePreview h={120} scale={1}><div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}><Tooltip content="Deliverability score" side="top"><Button variant="secondary" size="sm">Hover me</Button></Tooltip></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Trigger', desc: 'The wrapped focusable child.' }, { id: 2, label: 'Tip', desc: 'Floating bubble, 4 sides.' }],
    prompt: '## Tooltip\nProps: content, side? top|bottom|left|right, children. Shows on hover + focus.',
    code: `<Tooltip content="Score"><button>?</button></Tooltip>`,
    tokens: [{ name: '--dp-sem-shadow-tooltip', usage: 'Elevation' }, { name: '--dp-color-surface-container-highest', usage: 'Bubble bg' }],
    a11y: [{ rule: 'role="tooltip", shows on focus', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Keep content short.' }, { type: 'dont', text: 'Put essential info only in a tooltip.' }],
  },
  {
    name: 'Sparkline', category: 'Pattern',
    description: 'Tiny trend line (no axes) for use inside StatCard. Pure SVG; color via token.',
    live: <LivePreview h={90} scale={1}><div style={{ padding: 24 }}><Sparkline points={[4, 8, 6, 12, 9, 15, 13]} fill /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Line', desc: 'Polyline scaled to min/max.' }, { id: 2, label: 'Fill', desc: 'Optional faint area under the line.' }],
    prompt: '## Sparkline\nProps: points number[], colorVar?, width?, height?, fill?. No axes/tooltip.',
    code: `<Sparkline points={[4,8,6,12,9]} fill />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Default line color' }],
    a11y: [{ rule: 'Decorative — aria-hidden (value shown by StatCard)', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Use inside a StatCard for context.' }, { type: 'dont', text: 'Use as a standalone chart — use LineChart.' }],
  },
  {
    name: 'LineChart', category: 'Pattern',
    description: '1–3 time series as pure SVG. Colors via tokens; native hover tooltips; sr-only data table.',
    live: <LivePreview h={260} scale={1}><div style={{ padding: 16 }}><LineChart series={P_LINE} yFormat={(v) => String(v)} ariaLabel="Sends vs replies" /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Grid + axes', desc: 'Reference lines (count via gridLines), mono labels.' }, { id: 2, label: 'Series', desc: '1–3 lines, token colors.' }, { id: 3, label: 'Area', desc: 'Optional soft fade under the FIRST series, for volume.' }, { id: 4, label: 'Data table', desc: 'Visually-hidden, for screen readers.' }],
    prompt: '## LineChart\nProps: series {label,colorVar,points{date,value}[]}[], height?, yFormat?, showGrid?, showDots?, area?, gridLines?. Pure SVG, no lib.',
    code: `<LineChart series={series} yFormat={fmt} area gridLines={3} showDots={false} />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Series color (via colorVar)' }, { name: '--dp-color-outline-variant', usage: 'Grid' }],
    a11y: [{ rule: 'role img + label; hidden data table', status: 'pass' }, { rule: 'Per-point native tooltip', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Limit to 3 series for legibility.' }, { type: 'do', text: 'On dense daily series, drop showDots and use area: the dots only add serration.' }, { type: 'dont', text: 'Plot unaligned x-axes across series.' }, { type: 'dont', text: 'Keep five reference lines when three carry the same reading.' }],
  },
  {
    name: 'DonutChart', category: 'Pattern',
    description: 'Proportions as a pure-SVG ring with a centered total and a legend (value + %).',
    live: <LivePreview h={220} scale={1}><div style={{ padding: 20 }}><DonutChart segments={P_DONUT} centerValue="100" centerLabel="replies" /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Ring', desc: 'Segments via stroke-dasharray.' }, { id: 2, label: 'Center', desc: 'Optional total value + label.' }, { id: 3, label: 'Legend', desc: 'Value + % per segment.' }],
    prompt: '## DonutChart\nProps: segments {label,value,colorVar}[], centerLabel?, centerValue?, size?.',
    code: `<DonutChart segments={segments} centerValue="100" centerLabel="replies" />`,
    tokens: [{ name: '--dp-color-surface-container', usage: 'Track' }, { name: '--dp-color-primary', usage: 'Segment (via colorVar)' }],
    a11y: [{ rule: 'role img + per-segment titles', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Keep to a handful of segments.' }, { type: 'dont', text: 'Use for time series.' }],
  },
  {
    name: 'BarChart', category: 'Pattern',
    description: 'Comparisons/distributions as token-colored bars. Vertical or horizontal.',
    live: <LivePreview h={240} scale={1}><div style={{ padding: 16, height: 200 }}><BarChart bars={P_BARS} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Bar', desc: 'Height/width proportional to max.' }, { id: 2, label: 'Label + value', desc: 'Under/beside each bar.' }],
    prompt: '## BarChart\nProps: bars {label,value,colorVar?}[], orientation? vertical|horizontal, yFormat?.',
    code: `<BarChart bars={bars} />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Default bar color' }, { name: '--dp-color-surface-container', usage: 'Track (horizontal)' }],
    a11y: [{ rule: 'role img + per-bar title', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Sort bars meaningfully.' }, { type: 'dont', text: 'Truncate the value axis and mislead.' }],
  },
  {
    name: 'Gauge', category: 'Pattern',
    description: 'Radial 0–100 meter (270° arc). Color shifts by threshold band. Pure SVG.',
    live: <LivePreview h={180} scale={1}><div style={{ padding: 16, display: 'flex', gap: 24 }}><Gauge value={92} label="deliverability" thresholds={{ warn: 70, good: 90 }} /><Gauge value={64} label="reputation" thresholds={{ warn: 70, good: 90 }} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Track', desc: '270° background arc.' }, { id: 2, label: 'Value arc', desc: 'Color by threshold (success/warning/error).' }, { id: 3, label: 'Center', desc: 'Number + label.' }],
    prompt: '## Gauge\nProps: value 0–100, label?, thresholds? {warn,good}, size?.',
    code: `<Gauge value={92} label="deliverability" thresholds={{ warn: 70, good: 90 }} />`,
    tokens: [{ name: '--dp-color-status-success-500', usage: 'Good band' }, { name: '--dp-color-status-warning-500', usage: 'Warn band' }, { name: '--dp-color-error', usage: 'Low band' }],
    a11y: [{ rule: 'role img + "X of 100" label', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Set thresholds so color is meaningful.' }, { type: 'dont', text: 'Use for values without a 0–100 scale.' }],
  },
  {
    name: 'MeterBar', category: 'Pattern',
    description: 'One metric per line: label, value, a track with the value bar and a target marker, and the benchmark in words. Compact bullet chart — the alternative to a gauge when several metrics must be read against their goals at once. Stack them inside MeterList so all rows share one grid.',
    live: <LivePreview h={240} scale={1}><div style={{ padding: 20, maxWidth: 520 }}><MeterList><MeterBar label="Reply rate" value={4.1} target={3} format={(v) => `${v}%`} emphasis="lead" /><MeterBar label="Open rate" value={57.7} target={50} max={100} format={(v) => `${v}%`} /><MeterBar label="Bounce rate" value={2.6} target={2} better="lower" format={(v) => `${v}%`} /><MeterBar label="Deliverability" value={98} target={95} max={100} format={(v) => `${v}%`} /></MeterList></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Label + value', desc: 'Name left, value right-aligned in tabular figures.' }, { id: 2, label: 'Track + bar', desc: 'Bar width = value on a scale that defaults to 1.5× the target.' }, { id: 3, label: 'Target marker', desc: 'Tick at the benchmark. Rows on the default scale share a ruler, so their markers align; metrics with a natural ceiling take max={100}.' }, { id: 4, label: 'Note', desc: 'The benchmark in words, plus a ✓ when it is met.' }, { id: 5, label: 'MeterList', desc: 'Container that collapses every row into one shared grid, so columns and markers align across rows.' }],
    prompt: '## MeterBar / MeterList\nMeterBar props: label, value, target?, better? higher|lower, max?, format?, targetLabel?, note?, emphasis? default|lead, tone? auto|neutral|success|warning|error. Wrap a stack in <MeterList> so rows share columns. Bar is aria-hidden (row is text).',
    code: `<MeterList>\n  <MeterBar label="Reply rate" value={4.1} target={3} format={pct} emphasis="lead" />\n  <MeterBar label="Bounce rate" value={1.1} target={2} better="lower" format={pct} />\n</MeterList>`,
    tokens: [{ name: '--dp-color-primary', usage: 'Bar, on target' }, { name: '--dp-color-warning', usage: 'Bar, near miss' }, { name: '--dp-color-error', usage: 'Bar, off target' }, { name: '--dp-color-surface-container', usage: 'Track' }, { name: '--dp-color-on-surface', usage: 'Target marker' }],
    a11y: [{ rule: 'Bar aria-hidden — label, value and target are real text', status: 'pass' }, { rule: 'Target met announced as "target met", not by the ✓ glyph alone', status: 'pass' }, { rule: 'Tabular figures keep values aligned without a table', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Always wrap a stack in MeterList — loose MeterBars each size their own columns and the markers stop lining up.' }, { type: 'do', text: 'Stack several in one card: the aligned target markers are what make the group readable.' }, { type: 'do', text: 'Use emphasis="lead" on at most one row per group — the metric that answers "is this working?".' }, { type: 'do', text: 'Set better="lower" on metrics where less is better (bounce rate), so the tone is computed correctly.' }, { type: 'dont', text: 'Leave a percentage-of-a-whole on the default scale — pass max={100} so the bar is honest.' }, { type: 'dont', text: 'Use it for a single hero number with no benchmark — that is StatCard or Gauge.' }],
  },
  {
    name: 'FunnelChart', category: 'Pattern',
    description: 'Decreasing horizontal bars for a conversion funnel, with stage value and % vs. previous.',
    live: <LivePreview h={280} scale={1}><div style={{ padding: 20 }}><FunnelChart stages={P_FUNNEL} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Stage bar', desc: 'Width = value / top stage.' }, { id: 2, label: 'Conversion', desc: '% vs. the previous stage.' }],
    prompt: '## FunnelChart\nProps: stages {label,value,colorVar?}[]. Decreasing bars + conversion %.',
    code: `<FunnelChart stages={stages} />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Default bar color' }, { name: '--dp-color-surface-container', usage: 'Track' }],
    a11y: [{ rule: 'role img + per-bar title', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Order stages from widest to narrowest.' }, { type: 'dont', text: 'Use for non-sequential categories.' }],
  },
  {
    name: 'StatCard', category: 'Pattern',
    description: 'KPI card: label, big value, optional delta (↑/↓ good/bad color), badge, and a Sparkline slot.',
    live: <LivePreview h={200} scale={1}><div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 460 }}><StatCard label="Reply rate" value="8.95%" delta={{ value: '2.1%', direction: 'up' }} badge={<Badge variant="success">above benchmark</Badge>}><Sparkline points={[4, 6, 5, 9, 8, 12]} fill /></StatCard><StatCard label="Bounce rate" value="0.4%" delta={{ value: '0.3%', direction: 'down', positiveIsGood: false }} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Label', desc: 'Caption, muted.' }, { id: 2, label: 'Value', desc: 'Big display number; 40px under emphasis="hero".' }, { id: 3, label: 'Delta', desc: '↑/↓ + %, green/red by good/bad.' }, { id: 4, label: 'Slot', desc: 'Optional Sparkline/badge.' }],
    prompt: '## StatCard\nProps: label, value, delta? {value,direction,positiveIsGood?}, badge?, children? (sparkline), emphasis? (default|hero), loading?.',
    code: `<StatCard label="Meetings booked" value="14" emphasis="hero" />`,
    tokens: [{ name: '--dp-color-status-success-500', usage: 'Positive delta' }, { name: '--dp-color-error', usage: 'Negative delta' }, { name: '--dp-color-surface-container-low', usage: 'Card bg' }],
    a11y: [{ rule: 'Delta arrow decorative; % is text', status: 'pass' }, { rule: 'Skeleton when loading', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Set positiveIsGood so color matches meaning (bounce down = good).' }, { type: 'do', text: 'Use emphasis="hero" on AT MOST one card per view — the point is that one figure leads.' }, { type: 'dont', text: 'Cram more than one KPI per card.' }],
  },
  {
    name: 'ChartPanel', category: 'Pattern',
    description: 'Standard framing for a chart: header (title + legend + action) over a Card, with loading/empty states.',
    live: <LivePreview h={320} scale={1}><div style={{ padding: 16 }}><ChartPanel title="Sends vs replies" legend={[{ label: 'Sends', colorVar: 'var(--dp-color-primary)' }, { label: 'Replies', colorVar: 'var(--dp-color-secondary)' }]}><LineChart series={P_LINE} /></ChartPanel></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Header', desc: 'Title + legend + optional action.' }, { id: 2, label: 'Body', desc: 'The chart, or skeleton/empty.' }],
    prompt: '## ChartPanel\nProps: title, legend? {label,colorVar}[], action?, children, loading?, empty?. Base Card.',
    code: `<ChartPanel title="Sends" legend={legend}><LineChart series={s} /></ChartPanel>`,
    tokens: [{ name: '--dp-sem-shadow-card', usage: 'Card elevation (via Card)' }, { name: '--dp-color-on-surface', usage: 'Title' }],
    a11y: [{ rule: 'Heading + legend text', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Use its empty/loading states instead of ad-hoc ones.' }, { type: 'dont', text: 'Nest panels inside panels.' }],
  },
  {
    name: 'DataTable', category: 'Pattern',
    description: 'Light data table with real <table> semantics, optional sorting, row click, loading/empty. Stacks on mobile.',
    live: <FramePreview minHeight={240}><div style={{ padding: 16 }}><DataTable columns={P_TABLE_COLS} rows={P_TABLE_ROWS} sortable /></div></FramePreview>,
    anatomy: [{ id: 1, label: 'Header', desc: 'Caption-caps; sortable buttons with aria-sort.' }, { id: 2, label: 'Rows', desc: 'Hover + optional click.' }, { id: 3, label: 'Mobile', desc: 'Collapses to stacked cards.' }],
    prompt: '## DataTable\nProps: columns {key,header,align?,width?,render?}[], rows, sortable?, onRowClick?, loading?. Real <table>.',
    code: `<DataTable columns={cols} rows={rows} sortable onRowClick={open} />`,
    tokens: [{ name: '--dp-color-outline-variant', usage: 'Dividers' }, { name: '--dp-color-on-surface-variant', usage: 'Header text' }],
    a11y: [{ rule: 'Semantic table + scope + aria-sort', status: 'pass' }, { rule: 'Row click also keyboard (Enter)', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Provide render() for rich cells (badges, links).' }, { type: 'dont', text: 'Use for layout — tables are for data.' }],
  },
  {
    name: 'Timeline', category: 'Pattern',
    description: 'Data-driven phase tracker. Horizontal/compact for overviews, vertical/detailed for detail views. Optional animate prop reveals done/active/delayed phases in sequence on scroll (refresh the page to replay).',
    live: <LivePreview h={160} scale={1}><div style={{ padding: 24 }}><Timeline phases={P_TIMELINE} orientation="horizontal" density="compact" animate /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Node', desc: 'done ✓ / active (pulsing) / upcoming (dotted) / delayed (amber).' }, { id: 2, label: 'Connector', desc: 'Line between nodes; filled when done.' }, { id: 3, label: 'Detail', desc: 'Vertical density: dates + deliverables.' }, { id: 4, label: 'Animate', desc: 'Opt-in: done/active/delayed phases start looking "upcoming" and reveal in sequence on scroll into view. Pending phases never move — they already read as not-done.' }],
    prompt: '## Timeline\nProps: phases {id,label,description?,status,plannedStart?,plannedEnd?,startedAt?,completedAt?,deliverables?[]}[], orientation, density, animate?.',
    code: `<Timeline phases={phases} orientation="horizontal" density="compact" animate />`,
    tokens: [{ name: '--dp-color-primary', usage: 'Done/active nodes' }, { name: '--dp-color-status-warning-500', usage: 'Delayed' }, { name: '--dp-color-outline', usage: 'Upcoming' }],
    a11y: [{ rule: 'Ordered list; status is text', status: 'pass' }, { rule: 'Active pulse respects reduced-motion', status: 'pass' }, { rule: 'animate reveal skipped under prefers-reduced-motion (final state shown immediately)', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Use compact on overview, detailed on the dossier.' }, { type: 'do', text: 'Use animate on the Campaign status overview, where the reveal is the first thing the client sees.' }, { type: 'dont', text: 'Encode status with color only.' }, { type: 'dont', text: 'Use animate on a timeline nested deep in a page — the scroll trigger needs it above the fold to feel intentional.' }],
  },
  {
    name: 'Sidebar', category: 'Layout',
    description: 'Application side navigation: expanded / collapsed icons-only / mobile drawer. Router-agnostic via renderLink.',
    live: <LivePreview h={360} scale={0.85}><div style={{ height: 400, display: 'flex' }}><Sidebar items={P_SIDEBAR_ITEMS} logo={<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><img src="/logos/dp-wordmark-white.png" alt="Digital Pampas" style={{ height: 18, width: 'auto', objectFit: 'contain' }} /><span style={{ fontFamily: 'var(--dp-sem-font-body)', fontSize: 11, color: 'var(--dp-color-on-surface-variant)' }}>Portal do Cliente</span></div>} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Logo', desc: 'Top slot.' }, { id: 2, label: 'Items', desc: 'Icon + label; active = cyan tint + left border.' }, { id: 3, label: 'Footer', desc: 'Bottom slot.' }],
    prompt: '## Sidebar\nProps: items {id,label,icon,href,active}[], logo?, footer?, collapsed?, renderLink, mobileOpen?, onMobileClose?. Router-agnostic.',
    code: `<Sidebar items={items} renderLink={({href,...p}) => <Link to={href} {...p} />} />`,
    tokens: [{ name: '--dp-sem-shadow-sidebar', usage: 'Panel shadow' }, { name: '--dp-color-primary', usage: 'Active item' }],
    a11y: [{ rule: 'nav + aria-current on active', status: 'pass' }, { rule: 'Drawer: focus trap + Esc', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Pass a router Link via renderLink for SPA nav.' }, { type: 'dont', text: 'Hardcode routes inside the DS.' }],
  },
  {
    name: 'TopBar', category: 'Layout',
    description: 'Application top bar. Sticky, gains a shadow on scroll. Left slot for context, right slot for actions.',
    live: <LivePreview h={120} scale={1}><div style={{ height: 140 }}><TopBar leading={<Select options={[{ value: 'a', label: 'Acme Corp' }]} value="a" onChange={() => {}} aria-label="Client" />} trailing={<><ThemeToggle scheme="dark" onToggle={() => {}} /><Avatar name="Esteban Prospero" size={32} /></>} onMenuClick={() => {}} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Menu button', desc: 'Hamburger on mobile (onMenuClick).' }, { id: 2, label: 'Leading', desc: 'Context selectors.' }, { id: 3, label: 'Trailing', desc: 'Theme, user, actions.' }],
    prompt: '## TopBar\nProps: leading?, trailing?, onMenuClick?. Height --dp-nav-height, sticky, shadow on scroll.',
    code: `<TopBar leading={<ClientSelector />} trailing={<UserMenu />} onMenuClick={openDrawer} />`,
    tokens: [{ name: '--dp-nav-height', usage: 'Height' }, { name: '--dp-sem-shadow-nav', usage: 'Shadow on scroll' }],
    a11y: [{ rule: 'header landmark; labelled menu button', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'Pair the hamburger with the Sidebar drawer.' }, { type: 'dont', text: 'Overfill it — keep to context + a few actions.' }],
  },
  {
    name: 'PageHeader', category: 'Layout',
    description: 'Consistent page title block: eyebrow + title + subtitle + right-aligned aside slot (e.g. LastSync). Router- and data-agnostic.',
    live: <LivePreview h={160} scale={1}><div style={{ padding: 24 }}><PageHeader eyebrow="Inbox" title="Replies" subtitle="Acme Corp · Last 30 days" aside={<LastSync label="2h ago" />} /></div></LivePreview>,
    anatomy: [{ id: 1, label: 'Eyebrow', desc: 'Optional uppercase kicker.' }, { id: 2, label: 'Title', desc: 'h1, display font.' }, { id: 3, label: 'Subtitle', desc: 'Optional supporting line.' }, { id: 4, label: 'Aside', desc: 'Right slot — LastSync or an action.' }],
    prompt: '## PageHeader\nProps: title, eyebrow?, subtitle?, aside?. Pairs with LastSync (label, prefix?). Pure layout.',
    code: `<PageHeader eyebrow="Inbox" title="Replies" subtitle="Acme Corp · Last 30 days" aside={<LastSync label="2h ago" />} />`,
    tokens: [{ name: '--dp-color-on-surface', usage: 'Title' }, { name: '--dp-color-on-surface-variant', usage: 'Eyebrow / subtitle' }, { name: '--dp-color-success', usage: 'LastSync dot' }],
    a11y: [{ rule: 'Title is a single h1 per page', status: 'pass' }, { rule: 'LastSync dot is decorative (aria-hidden)', status: 'pass' }],
    guidelines: [{ type: 'do', text: 'One PageHeader per page, at the top.' }, { type: 'dont', text: 'Nest headings inside — keep the h1 unique.' }],
  },
]

export const PORTAL_CATALOG: Array<{ id: string } & Omit<ComponentViewerProps, 'id'>> = PORTAL_DOCS.map((d) => ({
  id: d.name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase(),
  ...portalDoc(d),
}))

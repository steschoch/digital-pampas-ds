import { useState, useRef, useEffect } from 'react'
import {
  Sun, Moon, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  ChevronRight, ChevronDown, Menu, X, ExternalLink, Home,
  Plus, Minus, Edit, Trash2, Copy, Download, Upload,
  Share2, Search, Filter, Settings, RefreshCw,
  Check, CheckCircle, AlertCircle, AlertTriangle,
  Info, XCircle, Eye, EyeOff, Lock, Unlock,
  BarChart2, Database, Cpu, Activity, Layers,
  Target, Zap, Globe, Code, Terminal,
  Image, Video, File, FileText, Folder,
  Mail, Phone, MessageSquare, Bell, User, Users, Star, Heart,
} from 'lucide-react'
import { Badge } from './components/Badge/Badge'
import { TopBar } from './components/TopBar'
import { ComponentViewer } from './components/ComponentViewer'
import { ComponentsGrid } from './components/ComponentsGrid'
import { SocialIcon, type SocialIconName } from './components/SocialIcon'
import { Logo } from './components/Logo'
import { COMPONENT_CATALOG, LIVE_COMPONENTS, PORTAL_CATALOG } from './data/componentDocs'
import styles from './App.module.css'

type Scheme = 'dark' | 'light'

/* ── Data ──────────────────────────────────────────────────────── */

type NavItem = { id: string; label: string }
type NavSubgroup = { label: string; items: NavItem[] }
type NavGroup = {
  id: string
  label: string
  items?: NavItem[]
  subgroups?: NavSubgroup[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    items: [
      { id: 'gs-overview',     label: 'Overview' },
      { id: 'gs-principles',   label: 'Principles' },
      { id: 'gs-contributing', label: 'Contributing' },
      { id: 'gs-changelog',    label: 'Change Log' },
      { id: 'gs-impact',       label: 'Impact' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    subgroups: [
      {
        label: 'Primitives',
        items: [
          { id: 'paletas', label: 'Brand Palettes' },
          { id: 'neutral', label: 'Neutral & Alpha' },
          { id: 'status', label: 'Status Colors' },
          { id: 'tipografia', label: 'Typography' },
          { id: 'espacamento', label: 'Spacing' },
          { id: 'radius', label: 'Border Radius' },
          { id: 'stroke', label: 'Stroke' },
          { id: 'sombras', label: 'Shadows' },
          { id: 'motion', label: 'Motion' },
        ],
      },
      {
        label: 'Semantic',
        items: [
          { id: 'color-roles',    label: 'Color Roles' },
          { id: 'breakpoints',    label: 'Breakpoints' },
          { id: 'sem-typography', label: 'Typography' },
          { id: 'sem-spacing',    label: 'Spacing' },
          { id: 'sem-radius',     label: 'Border Radius' },
          { id: 'sem-stroke',     label: 'Stroke' },
          { id: 'sem-shadows',    label: 'Shadows' },
          { id: 'sem-motion',     label: 'Motion' },
          { id: 'sem-iconography', label: 'Iconography' },
          { id: 'logo-brand',     label: 'Logo & Brand' },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components — Site',
    items: [
      { id: 'all-components',   label: 'All Components' },
      { id: 'button',           label: 'Button' },
      { id: 'card',             label: 'Card' },
      { id: 'badge',            label: 'Badge' },
      { id: 'animated-section', label: 'Animated Section' },
      { id: 'theme-toggle',     label: 'ThemeToggle' },
      { id: 'icons',            label: 'Icon Library' },
      { id: 'nav',              label: 'Nav' },
      { id: 'hero',             label: 'Hero' },
      { id: 'network-bg',       label: 'NetworkBg' },
      { id: 'problem',          label: 'Problem' },
      { id: 'what-we-dont-do',  label: 'WhatWeDontDo' },
      { id: 'how-we-build-it',  label: 'HowWeBuildIt' },
      { id: 'proof',            label: 'Proof' },
      { id: 'ways-to-work',     label: 'WaysToWork' },
      { id: 'final-cta',        label: 'FinalCTA' },
      { id: 'footer',           label: 'Footer' },
      { id: 'page-layout',      label: 'PageLayout' },
      { id: 'blog-card',        label: 'BlogCard' },
      { id: 'case-study-card',  label: 'CaseStudyCard' },
      { id: 'case-flow',        label: 'CaseFlow' },
    ],
  },
  {
    id: 'application',
    label: 'Components — Portal',
    items: [
      { id: 'all-application', label: 'All Components' },
      ...PORTAL_CATALOG.map((d) => ({ id: d.id, label: d.name })),
    ],
  },
]

/* Which accordion group a given page id belongs to */
const GROUP_OF_PAGE: Record<string, string> = Object.fromEntries(
  NAV_GROUPS.flatMap((g) => {
    const ids = g.items
      ? g.items.map((i) => i.id)
      : (g.subgroups ?? []).flatMap((sg) => sg.items.map((i) => i.id))
    return ids.map((id) => [id, g.id])
  }),
)

const BRAND_SCALES = [
  { name: 'Electric Cyan', token: 'electric-cyan', role: 'Primary', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'Coral', token: 'coral', role: 'Secondary', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'Deep Indigo', token: 'deep-indigo', role: 'Tertiary', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'Plum', token: 'plum', role: 'Support', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'Sky Blue', token: 'sky-blue', role: 'Support', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'Space Grey', token: 'space-grey', role: 'Neutral', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
]

const STATUS_SCALES = [
  { name: 'Info', token: 'status-info', steps: [50, 100, 200, 500, 900] },
  { name: 'Success', token: 'status-success', steps: [50, 100, 200, 500, 900] },
  { name: 'Warning', token: 'status-warning', steps: [50, 100, 200, 500, 900] },
  { name: 'Error', token: 'status-error', steps: [50, 100, 200, 500, 900] },
]

const NEUTRAL_SCALES = [
  { name: 'Alpha Dark', token: 'alpha-dark', steps: ['05', '10', '20', '40', '50', '60', '80', '90'] },
  { name: 'Alpha Light', token: 'alpha-light', steps: ['05', '10', '20', '40', '50', '60', '80', '90'] },
]

const SPACE_STEPS = [25, 37, 50, 62, 75, 87, 100, 150, 200, 250, 300, 350, 400, 500, 525, 550, 600, 700, 800]

const RADIUS_STEPS = [
  { name: '0', token: '0' },
  { name: '4px', token: '25' },
  { name: '8px', token: '50' },
  { name: '12px', token: '75' },
  { name: '16px', token: '100' },
  { name: '20px', token: '150' },
  { name: '24px', token: '200' },
  { name: 'pill', token: 'pill' },
]

const STROKE_STEPS = [
  { name: 'hairline', token: 'hairline', value: '0.5px' },
  { name: 'default', token: 'default', value: '1px' },
  { name: 'strong', token: 'strong', value: '2px' },
]

const SHADOW_STEPS = [
  { name: 'xs', token: 'xs' },
  { name: 'sm', token: 'sm' },
  { name: 'md', token: 'md' },
  { name: 'lg', token: 'lg' },
  { name: 'xl', token: 'xl' },
  { name: '2xl', token: '2xl' },
  { name: 'inner', token: 'inner' },
]

const SEM_TYPOGRAPHY = [
  { group: 'Font Family', items: [
    { token: '--dp-sem-font-display', value: 'Space Grotesk', preview: 'Display / Heading', family: 'var(--dp-sem-font-display)' },
    { token: '--dp-sem-font-body',    value: 'Figtree',        preview: 'Body copy',         family: 'var(--dp-sem-font-body)' },
    { token: '--dp-sem-font-label',   value: 'Figtree',        preview: 'UI Labels',         family: 'var(--dp-sem-font-label)' },
    { token: '--dp-sem-font-code',    value: 'JetBrains Mono', preview: 'Code / Mono',       family: 'var(--dp-sem-font-code)' },
  ]},
  { group: 'Line Height', items: [
    { token: '--dp-sem-leading-display', value: '1.1',  preview: 'Display text' },
    { token: '--dp-sem-leading-ui',      value: '1.25', preview: 'Buttons, labels' },
    { token: '--dp-sem-leading-body',    value: '1.5',  preview: 'Paragraphs' },
    { token: '--dp-sem-leading-long',    value: '1.65', preview: 'Long-form reading' },
  ]},
  { group: 'Letter Spacing', items: [
    { token: '--dp-sem-tracking-display', value: '-0.03em', preview: 'Hero headlines' },
    { token: '--dp-sem-tracking-body',    value: '0em',     preview: 'Body, labels' },
    { token: '--dp-sem-tracking-ui',      value: '0.04em',  preview: 'Buttons, captions' },
    { token: '--dp-sem-tracking-caps',    value: '0.12em',  preview: 'ALL CAPS eyebrow' },
  ]},
]

const SEM_SPACING = [
  { group: 'Insets (padding shorthand)', items: [
    { token: '--dp-sem-space-inset-xs', primitive: 'space-25 × space-75',   desc: '2px 12px — small badges, tight chips' },
    { token: '--dp-sem-space-inset-sm', primitive: 'space-75 × space-150',  desc: '12px 24px — default button padding' },
    { token: '--dp-sem-space-inset-md', primitive: 'space-100 × space-200', desc: '16px 32px — card inner padding' },
    { token: '--dp-sem-space-inset-lg', primitive: 'space-150 × space-300', desc: '24px 48px — panel / hero padding' },
  ]},
  { group: 'Gaps (flex / grid)', items: [
    { token: '--dp-sem-space-gap-xs', primitive: 'space-50',  desc: '4px — icon + label, tight chip row' },
    { token: '--dp-sem-space-gap-sm', primitive: 'space-100', desc: '16px — button row, inline form elements' },
    { token: '--dp-sem-space-gap-md', primitive: 'space-200', desc: '32px — card grid columns' },
    { token: '--dp-sem-space-gap-lg', primitive: 'space-400', desc: '64px — section content gap' },
    { token: '--dp-sem-space-gap-xl', primitive: 'space-600', desc: '96px — hero columns' },
  ]},
  { group: 'Section Padding (block)', items: [
    { token: '--dp-sem-space-section-sm', primitive: 'space-400', desc: '64px — compact sections (mobile)' },
    { token: '--dp-sem-space-section-md', primitive: 'space-600', desc: '96px — standard section padding' },
    { token: '--dp-sem-space-section-lg', primitive: 'space-800', desc: '128px — hero / landing header' },
  ]},
]

const SEM_RADIUS_STEPS = [
  { token: 'chip',      value: '4px',    desc: 'Badges, tags, status pills' },
  { token: 'button',    value: '8px',    desc: 'Buttons, inputs, dropdowns' },
  { token: 'card-sm',   value: '12px',   desc: 'Compact cards, panels' },
  { token: 'card',      value: '16px',   desc: 'Standard cards' },
  { token: 'card-lg',   value: '20px',   desc: 'Feature cards, hero containers' },
  { token: 'container', value: '24px',   desc: 'Section containers, modals' },
  { token: 'pill',      value: '9999px', desc: 'Progress bars, toggles, pill buttons' },
  { token: 'circle',    value: '50%',    desc: 'Avatars, icon bubbles, circular badges' },
]

const SEM_STROKE_STEPS = [
  { token: 'divider',  primitive: 'stroke-hairline', value: '0.5px', desc: 'Subtle rules, table dividers' },
  { token: 'border',   primitive: 'stroke-default',  value: '1px',   desc: 'Default borders, card edges' },
  { token: 'accent',   primitive: 'stroke-accent',   value: '1.5px', desc: 'Ghost buttons, emphasis borders' },
  { token: 'focus',    primitive: 'stroke-strong',   value: '2px',   desc: 'Focus rings, active tab indicators' },
  { token: 'emphasis', primitive: 'stroke-thick',    value: '3px',   desc: 'Left-accent borders, callout bars' },
]

const SEM_SHADOW_STEPS = [
  { token: 'none',       desc: 'No shadow — flat surfaces' },
  { token: 'button',     desc: 'Raised buttons — subtle lift' },
  { token: 'card',       desc: 'Default card elevation' },
  { token: 'card-hover', desc: 'Card on hover — deeper lift' },
  { token: 'tooltip',    desc: 'Tooltip & popover' },
  { token: 'dropdown',   desc: 'Dropdown menus' },
  { token: 'sidebar',    desc: 'Sidebar panels' },
  { token: 'modal',      desc: 'Modals and dialogs' },
  { token: 'nav',        desc: 'Nav bar on scroll (dark/light variants)' },
  { token: 'header-bar', desc: 'Diagram header bar' },
  { token: 'diagram',    desc: 'Hero diagram glow (light only)' },
]

const SEM_MOTION_STEPS = [
  { token: '--dp-sem-motion-interactive', value: '150ms ease',              desc: 'Hover, focus — immediate feedback' },
  { token: '--dp-sem-motion-component',   value: '250ms ease',              desc: 'Open/close components (dropdowns)' },
  { token: '--dp-sem-motion-layout',      value: '400ms ease',              desc: 'Layout shifts, page transitions' },
  { token: '--dp-sem-motion-page',        value: '600ms cubic-bezier(…)',   desc: 'Full-page enter/exit animations' },
]

const COLOR_ROLE_GROUPS = [
  {
    group: 'Brand Colors',
    roles: [
      { role: 'primary', label: 'Primary', desc: 'Electric Cyan · primary action / fill' },
      { role: 'primary-strong', label: 'Primary Strong', desc: 'Primary como TEXTO em superfície clara — AA 4.5:1 (light: cyan-800)' },
      { role: 'secondary', label: 'Secondary', desc: 'Coral · alternative action' },
      { role: 'tertiary', label: 'Tertiary', desc: 'Deep Indigo · support action' },
    ],
  },
  {
    group: 'Status Colors',
    roles: [
      { role: 'error', label: 'Error', desc: 'Red status' },
      { role: 'success', label: 'Success', desc: 'Green status' },
      { role: 'warning', label: 'Warning', desc: 'Amber status' },
      { role: 'info', label: 'Info', desc: 'Blue status' },
    ],
  },
  {
    group: 'Surface Colors',
    roles: [
      { role: 'surface', label: 'Surface', desc: 'Container surface' },
      { role: 'surface-variant', label: 'Surface Variant', desc: 'Alternative surface' },
      { role: 'surface-sky', label: 'Surface Sky', desc: 'Sky Blue 200 — tinted surface' },
      { role: 'surface-coral', label: 'Surface Coral', desc: 'Coral 200 — tinted surface' },
      { role: 'surface-cyan-deep', label: 'Surface Cyan Deep', desc: 'Electric Cyan 900 — dark accent surface' },
      { role: 'surface-grey-muted', label: 'Surface Grey Muted', desc: 'Space Grey 400 — denser neutral panel' },
      { role: 'surface-grey-soft', label: 'Surface Grey Soft', desc: 'Space Grey 300 — mid neutral panel' },
      { role: 'surface-grey-subtle', label: 'Surface Grey Subtle', desc: 'Space Grey 200 — lightest neutral panel' },
      { role: 'surface-inverse', label: 'Surface Inverse', desc: 'Dark panel within light page' },
      { role: 'surface-inverse-sub', label: 'Surface Inverse Sub', desc: 'Lighter dark inverse panel' },
      { role: 'surface-inverse-mid', label: 'Surface Inverse Mid', desc: 'Space Grey 800 — mid dark inverse panel' },
      { role: 'outline', label: 'Outline', desc: 'Borders and dividers' },
    ],
  },
  {
    group: 'Accent Colors',
    roles: [
      { role: 'sky-blue', label: 'Sky Blue', desc: 'Accent — metrics & case highlights' },
      { role: 'plum', label: 'Plum', desc: 'Accent — plum surface/emphasis' },
      { role: 'plum-text', label: 'Plum Text', desc: 'Accent — plum text (light on dark)' },
      { role: 'primary-on-dark', label: 'Primary on Dark', desc: 'Electric Cyan 400 — links/accents on dark panels' },
      { role: 'outline-inverse', label: 'Outline Inverse', desc: 'Border on dark inverse panels' },
    ],
  },
  {
    group: 'Phase Colors (diagram)',
    roles: [
      { role: 'phase-cyan',       label: 'Phase Cyan',       desc: 'Define ICP / Launch — dark: electric-cyan-400 · light: electric-cyan-700' },
      { role: 'phase-sky',        label: 'Phase Sky',        desc: 'Build List — dark: sky-blue-500 · light: sky-blue-700' },
      { role: 'phase-violet',     label: 'Phase Violet',     desc: 'Enrich — deep-indigo-400 (both modes)' },
      { role: 'phase-plum',       label: 'Phase Plum',       desc: 'AI Score — plum-500 (both modes)' },
      { role: 'phase-plum-light', label: 'Phase Plum Light', desc: 'AI Score badge — dark: plum-300 · light: plum-400' },
      { role: 'phase-coral',      label: 'Phase Coral',      desc: 'Sequences — dark: coral-400 · light: coral-700' },
    ],
  },
]

const BREAKPOINTS = [
  { token: 'sm', value: '576px', desc: 'Mobile landscape' },
  { token: 'md', value: '768px', desc: 'Tablet portrait' },
  { token: 'lg', value: '1024px', desc: 'Tablet landscape / small desktop' },
  { token: 'xl', value: '1280px', desc: 'Desktop' },
  { token: '2xl', value: '1536px', desc: 'Large desktop' },
]

const ICON_CATALOG = [
  {
    category: 'Navigation',
    icons: [
      { name: 'ArrowRight', Component: ArrowRight },
      { name: 'ArrowLeft', Component: ArrowLeft },
      { name: 'ArrowUp', Component: ArrowUp },
      { name: 'ArrowDown', Component: ArrowDown },
      { name: 'ChevronRight', Component: ChevronRight },
      { name: 'ChevronDown', Component: ChevronDown },
      { name: 'Menu', Component: Menu },
      { name: 'X', Component: X },
      { name: 'ExternalLink', Component: ExternalLink },
      { name: 'Home', Component: Home },
    ],
  },
  {
    category: 'Actions',
    icons: [
      { name: 'Plus', Component: Plus },
      { name: 'Minus', Component: Minus },
      { name: 'Edit', Component: Edit },
      { name: 'Trash2', Component: Trash2 },
      { name: 'Copy', Component: Copy },
      { name: 'Download', Component: Download },
      { name: 'Upload', Component: Upload },
      { name: 'Share2', Component: Share2 },
      { name: 'Search', Component: Search },
      { name: 'Filter', Component: Filter },
      { name: 'Settings', Component: Settings },
      { name: 'RefreshCw', Component: RefreshCw },
    ],
  },
  {
    category: 'Status / Feedback',
    icons: [
      { name: 'Check', Component: Check },
      { name: 'CheckCircle', Component: CheckCircle },
      { name: 'AlertCircle', Component: AlertCircle },
      { name: 'AlertTriangle', Component: AlertTriangle },
      { name: 'Info', Component: Info },
      { name: 'XCircle', Component: XCircle },
      { name: 'Eye', Component: Eye },
      { name: 'EyeOff', Component: EyeOff },
      { name: 'Lock', Component: Lock },
      { name: 'Unlock', Component: Unlock },
    ],
  },
  {
    category: 'Data & Tech',
    icons: [
      { name: 'BarChart2', Component: BarChart2 },
      { name: 'Database', Component: Database },
      { name: 'Cpu', Component: Cpu },
      { name: 'Activity', Component: Activity },
      { name: 'Layers', Component: Layers },
      { name: 'Target', Component: Target },
      { name: 'Zap', Component: Zap },
      { name: 'Globe', Component: Globe },
      { name: 'Code', Component: Code },
      { name: 'Terminal', Component: Terminal },
    ],
  },
  {
    category: 'Media & Files',
    icons: [
      { name: 'Image', Component: Image },
      { name: 'Video', Component: Video },
      { name: 'File', Component: File },
      { name: 'FileText', Component: FileText },
      { name: 'Folder', Component: Folder },
    ],
  },
  {
    category: 'Communication',
    icons: [
      { name: 'Mail', Component: Mail },
      { name: 'Phone', Component: Phone },
      { name: 'MessageSquare', Component: MessageSquare },
      { name: 'Bell', Component: Bell },
      { name: 'User', Component: User },
      { name: 'Users', Component: Users },
      { name: 'Star', Component: Star },
      { name: 'Heart', Component: Heart },
    ],
  },
]

/* ── Sub-components ────────────────────────────────────────────── */

function Swatch({ token, step }: { token: string; step: number | string }) {
  return (
    <div className={styles.swatch}>
      <div
        className={styles.swatchChip}
        style={{ background: `var(--dp-color-${token}-${step})` }}
      />
      <span className={styles.swatchLabel}>{step}</span>
    </div>
  )
}

function AlphaSwatch({ token, step }: { token: string; step: number | string }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchChipAlpha}>
        <div
          className={styles.swatchChipAlphaOverlay}
          style={{ background: `var(--dp-color-${token}-${step})` }}
        />
      </div>
      <span className={styles.swatchLabel}>{step}</span>
    </div>
  )
}

function TokenChip({ name, children }: { name: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(`var(${name})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <button className={styles.tokenChip} onClick={copy} title={`Copy var(${name})`}>
      {children}
      <span className={styles.tokenName}>{name}</span>
      {copied && <span className={styles.copiedBadge}>copied!</span>}
    </button>
  )
}

function SectionHeader({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <header className={styles.sectionHeader} id={id}>
      <span className={styles.kicker}>{kicker}</span>
      <h2 className={styles.h2}>{title}</h2>
    </header>
  )
}

/* Single-page router: renders its children only when its id is the active page */
function Page({ id, active, children }: { id: string; active: string; children: React.ReactNode }) {
  if (id !== active) return null
  return <section className={styles.section}>{children}</section>
}

/* ── App ───────────────────────────────────────────────────────── */

export default function App() {
  const [scheme, setScheme] = useState<Scheme>(
    (document.documentElement.getAttribute('data-color-scheme') as Scheme) ?? 'dark',
  )
  const [activeId, setActiveId] = useState<string>('gs-overview')
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set([GROUP_OF_PAGE['gs-overview']]),
  )
  const [navOpen, setNavOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  /* Mobile drawer: below 768px the sidebar is off-canvas and the TopBar's
     hamburger is the only way in. While it is open the drawer behaves like a
     modal — Escape closes it, the page behind it does not scroll, and Tab stays
     inside it, so a keyboard or screen-reader user is never left tabbing through
     content hidden behind the overlay. */
  useEffect(() => {
    if (!navOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    drawerRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNavOpen(false)
        menuBtnRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !drawerRef.current) return
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [navOpen])

  const toggleScheme = () => {
    const next: Scheme = scheme === 'dark' ? 'light' : 'dark'
    setScheme(next)
    document.documentElement.setAttribute('data-color-scheme', next)
  }

  /* Select a page: set it active and scroll the content back to the top. On
     mobile this also closes the drawer — picking a page IS the reason it was
     opened, so leaving it up would hide the answer behind the question. */
  const selectPage = (id: string) => {
    setActiveId(id)
    setNavOpen(false)
    mainRef.current?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
  }

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  return (
    <div className={styles.layout}>

      {/* ── Mobile bar (hidden from 769px up) ─────────────────── */}
      <div className={styles.mobileBar}>
        <TopBar
          onMenuClick={() => setNavOpen(true)}
          menuButtonRef={menuBtnRef}
          menuButtonLabel="Open navigation"
          menuExpanded={navOpen}
          leading={
            <img
              src={scheme === 'dark' ? '/logos/dp-wordmark-white.png' : '/logos/dp-wordmark-black.png'}
              alt="Digital Pampas Design System"
              className={styles.mobileBarWordmark}
            />
          }
          trailing={
            <button
              className={styles.mobileThemeToggle}
              onClick={toggleScheme}
              aria-label={scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {scheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          }
        />
      </div>

      {/* Scrim: closes the drawer on tap and dims what is behind it. */}
      {navOpen && (
        <div className={styles.scrim} onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}

      {/* ── Sidebar (drawer on mobile) ────────────────────────── */}
      <aside
        ref={drawerRef}
        tabIndex={-1}
        className={`${styles.sidebar} ${navOpen ? styles.sidebarOpen : ''}`}
        aria-label="Design System navigation"
      >

        {/* Logo */}
        <div className={styles.sidebarBrand}>
          <img
            src="/logos/dp-icon-black.png"
            alt="Digital Pampas icon"
            className={`${styles.mateIcon} ${scheme === 'dark' ? styles.mateIconDark : ''}`}
          />
          <img
            src={scheme === 'dark' ? '/logos/dp-wordmark-white.png' : '/logos/dp-wordmark-black.png'}
            alt="Digital Pampas"
            className={styles.wordmarkImg}
          />
          <span className={styles.dsVersion}>Design System · v1.0</span>
        </div>

        {/* Nav — accordion */}
        <nav className={styles.nav}>
          {NAV_GROUPS.map((group) => {
            const isOpen = openGroups.has(group.id)
            const navItem = (item: NavItem) => (
              <button
                key={item.id}
                className={`${styles.navItem} ${activeId === item.id ? styles.navItemActive : ''}`}
                onClick={() => selectPage(item.id)}
              >
                {item.label}
              </button>
            )
            return (
              <div key={group.id} className={styles.navGroup}>
                <button
                  className={styles.navGroupBtn}
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.navGroupLabel}>{group.label}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.navChevron} ${isOpen ? styles.navChevronOpen : ''}`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className={styles.navGroupItems}>
                    {group.items?.map(navItem)}
                    {group.subgroups?.map((sg) => (
                      <div key={sg.label} className={styles.navSubgroup}>
                        <span className={styles.navSubgroupLabel}>{sg.label}</span>
                        {sg.items.map(navItem)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Theme toggle */}
        <div className={styles.sidebarFooter}>
          <button className={styles.themeToggle} onClick={toggleScheme}>
            {scheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {scheme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────── */}
      <main className={styles.main} ref={mainRef}>
        <div className={styles.mainInner}>

        {/* Overview */}
        <Page id="gs-overview" active={activeId}>
          <SectionHeader id="gs-overview" kicker="G1" title="Overview" />
          <div className={styles.gsSection}>
            <p className={styles.sectionNote}>
              The Digital Pampas Design System is the visual and component infrastructure behind
              digitalpampas.com and future products. It provides a single source of truth for
              colors, typography, spacing, motion, and reusable UI components — built to reflect
              the brand's core values: precision, transparency, and builder identity.
            </p>
            <div className={styles.gsStatGrid}>
              <div className={styles.gsStat}>
                <span className={styles.gsStatValue}>12</span>
                <span className={styles.gsStatLabel}>Components documented</span>
              </div>
              <div className={styles.gsStat}>
                <span className={styles.gsStatValue}>3</span>
                <span className={styles.gsStatLabel}>Token layers (Primitives → Semantic → Component)</span>
              </div>
              <div className={styles.gsStat}>
                <span className={styles.gsStatValue}>6</span>
                <span className={styles.gsStatLabel}>Brand color scales</span>
              </div>
              <div className={styles.gsStat}>
                <span className={styles.gsStatValue}>2</span>
                <span className={styles.gsStatLabel}>Color modes (Dark default · Light)</span>
              </div>
              <div className={styles.gsStat}>
                <span className={styles.gsStatValue}>100%</span>
                <span className={styles.gsStatLabel}>Token-based — zero hardcoded hex values</span>
              </div>
              <div className={styles.gsStat}>
                <span className={styles.gsStatValue}>v1.0</span>
                <span className={styles.gsStatLabel}>Current version — July 2026</span>
              </div>
            </div>
            <div className={styles.gsCard}>
              <h3 className={styles.gsCardTitle}>Stack</h3>
              <p className={styles.gsCardBody}>
                Vite · React 18 · TypeScript · CSS Modules. All tokens use the{' '}
                <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>--dp-</code>{' '}
                prefix. Semantic tokens map directly to primitive values — never used in components directly.
                The DS lives at <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>ds-digital-pampas/</code>{' '}
                and the website at <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>website-digital-pampas/</code> —
                both share the same globals and component library.
              </p>
            </div>
          </div>
        </Page>

        {/* Principles */}
        <Page id="gs-principles" active={activeId}>
          <SectionHeader id="gs-principles" kicker="G2" title="Principles" />
          <div className={styles.gsSection}>
            <p className={styles.sectionNote}>
              Five principles that guide every decision in this design system — from token naming
              to component architecture.
            </p>
            <ul className={styles.gsPrincipleList}>
              <li className={styles.gsPrincipleItem}>
                <span className={styles.gsPrincipleTitle}>Precision over decoration</span>
                <span className={styles.gsPrincipleDesc}>
                  Every token has a reason. Every spacing value, color step, and radius was chosen
                  to serve a specific context — not to fill a grid. If it can't be explained, it
                  doesn't belong in the system.
                </span>
              </li>
              <li className={styles.gsPrincipleItem}>
                <span className={styles.gsPrincipleTitle}>Semantic over primitive</span>
                <span className={styles.gsPrincipleDesc}>
                  Components never reference raw color values. They use semantic tokens
                  (<code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>--dp-color-primary</code>,
                  {' '}<code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>--dp-color-surface</code>) that
                  adapt automatically to dark and light modes without a line of JavaScript.
                </span>
              </li>
              <li className={styles.gsPrincipleItem}>
                <span className={styles.gsPrincipleTitle}>Ownership-first architecture</span>
                <span className={styles.gsPrincipleDesc}>
                  The system is transparent by design. Any developer can inspect it, understand
                  every decision, and extend it without reverse-engineering. The architecture
                  mirrors what Digital Pampas builds for clients: infrastructure you can own.
                </span>
              </li>
              <li className={styles.gsPrincipleItem}>
                <span className={styles.gsPrincipleTitle}>Dark mode as the canonical baseline</span>
                <span className={styles.gsPrincipleDesc}>
                  The brand lives on dark surfaces. Light mode is a first-class citizen and every
                  semantic token has a light-mode value — but dark is the reference context for
                  design decisions. All components are validated in dark mode first.
                </span>
              </li>
              <li className={styles.gsPrincipleItem}>
                <span className={styles.gsPrincipleTitle}>Builder identity</span>
                <span className={styles.gsPrincipleDesc}>
                  The DS is built like the product: layer by layer, verified at every step.
                  Decisions are documented, not assumed. When a token choice isn't obvious from
                  its name, the reason lives in this viewer — not in a tribal-knowledge Notion doc.
                </span>
              </li>
            </ul>
          </div>
        </Page>

        {/* Contributing */}
        <Page id="gs-contributing" active={activeId}>
          <SectionHeader id="gs-contributing" kicker="G3" title="Contributing" />
          <div className={styles.gsSection}>
            <p className={styles.sectionNote}>
              The DS is maintained by the Digital Pampas team. This guide covers the workflow
              for adding tokens, creating components, and updating documentation.
            </p>
            <div className={styles.gsCard}>
              <h3 className={styles.gsCardTitle}>Adding a token</h3>
              <ol className={styles.gsStepList}>
                <li className={styles.gsStep}>
                  <span className={styles.gsStepNum} />
                  <span className={styles.gsStepText}>
                    <strong>Define the primitive</strong> in{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>globals.css</code>{' '}
                    under the appropriate color scale. Use the existing naming convention:{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>--dp-color-[scale]-[step]</code>.
                  </span>
                </li>
                <li className={styles.gsStep}>
                  <span className={styles.gsStepNum} />
                  <span className={styles.gsStepText}>
                    <strong>Map to a semantic token</strong> — add both a light-mode and
                    dark-mode value in the respective{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>:root</code>{' '}
                    and{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>[data-color-scheme="dark"]</code>{' '}
                    blocks. Never hardcode hex — always reference the primitive.
                  </span>
                </li>
                <li className={styles.gsStep}>
                  <span className={styles.gsStepNum} />
                  <span className={styles.gsStepText}>
                    <strong>Document in Color Roles</strong> — add an entry to the{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>COLOR_ROLES</code>{' '}
                    array in App.tsx with a description of the intended usage context.
                  </span>
                </li>
              </ol>
            </div>
            <div className={styles.gsCard}>
              <h3 className={styles.gsCardTitle}>Creating a component</h3>
              <ol className={styles.gsStepList}>
                <li className={styles.gsStep}>
                  <span className={styles.gsStepNum} />
                  <span className={styles.gsStepText}>
                    <strong>Create the folder</strong>:{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>src/components/ComponentName/</code>{' '}
                    with <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>ComponentName.tsx</code>,{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>ComponentName.module.css</code>, and{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>index.ts</code>.
                  </span>
                </li>
                <li className={styles.gsStep}>
                  <span className={styles.gsStepNum} />
                  <span className={styles.gsStepText}>
                    <strong>Use only semantic tokens</strong> in the CSS module — no hex values,
                    no primitive references. Define a local{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>--cn-*</code>{' '}
                    token layer at the root selector to map semantics to component-local names.
                  </span>
                </li>
                <li className={styles.gsStep}>
                  <span className={styles.gsStepNum} />
                  <span className={styles.gsStepText}>
                    <strong>Document in componentDocs.tsx</strong> — add a{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>ComponentViewerProps</code>{' '}
                    object with all required fields (overviewBlocks, anatomy, prompt, tokens,
                    accessibility, whenToUse, whenNotToUse, guidelines) and push to{' '}
                    <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>COMPONENT_CATALOG</code>.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </Page>

        {/* Change Log */}
        <Page id="gs-changelog" active={activeId}>
          <SectionHeader id="gs-changelog" kicker="G4" title="Change Log" />
          <div className={styles.gsChangeLog}>
            <div className={styles.gsVersion}>
              <div className={styles.gsVersionHeader}>
                <span className={styles.gsVersionTag}>v1.0</span>
                <span className={styles.gsVersionDate}>July 2026 — Initial Release</span>
              </div>
              <ul className={styles.gsVersionChanges}>
                <li className={styles.gsVersionChange}>
                  3-layer token architecture: Primitives → Semantic → Component tokens
                </li>
                <li className={styles.gsVersionChange}>
                  12 components documented with overview, playground, anatomy, tokens, and accessibility specs
                </li>
                <li className={styles.gsVersionChange}>
                  6 brand color scales (Electric Cyan, Coral, Deep Indigo, Plum, Sky Blue, Space Grey) with 11 steps each
                </li>
                <li className={styles.gsVersionChange}>
                  Full dark mode and light mode support via{' '}
                  <code style={{ fontFamily: 'var(--dp-sem-font-code)', fontSize: '11px', color: 'var(--dp-color-primary)' }}>data-color-scheme</code>{' '}
                  attribute — dark is the default baseline
                </li>
                <li className={styles.gsVersionChange}>
                  Semantic typography, spacing, radius, stroke, shadow, and motion token layers
                </li>
                <li className={styles.gsVersionChange}>
                  Interactive ComponentViewer with Playground, Anatomy, Code, Tokens, and Accessibility tabs
                </li>
                <li className={styles.gsVersionChange}>
                  All Components grid with scaled component previews, category badges, and direct navigation
                </li>
                <li className={styles.gsVersionChange}>
                  Icon library — 46 icons from lucide-react organized by category
                </li>
                <li className={styles.gsVersionChange}>
                  Getting Started section: Overview, Principles, Contributing guide, Change Log, and Impact
                </li>
              </ul>
            </div>
          </div>
        </Page>

        {/* Impact */}
        <Page id="gs-impact" active={activeId}>
          <SectionHeader id="gs-impact" kicker="G5" title="Impact" />
          <div className={styles.gsSection}>
            <p className={styles.sectionNote}>
              Metrics and goals that define the design system's success — from design-to-code
              consistency to accessibility coverage and developer experience.
            </p>
            <div className={styles.gsImpactGrid}>
              <div className={styles.gsImpactCard}>
                <span className={styles.gsImpactValue}>0</span>
                <span className={styles.gsImpactLabel}>Hardcoded hex values</span>
                <span className={styles.gsImpactDesc}>Every color in every component flows through the token pipeline.</span>
              </div>
              <div className={styles.gsImpactCard}>
                <span className={styles.gsImpactValue}>100%</span>
                <span className={styles.gsImpactLabel}>Dark / Light coverage</span>
                <span className={styles.gsImpactDesc}>Every semantic token has a value for both modes. No component breaks when toggling.</span>
              </div>
              <div className={styles.gsImpactCard}>
                <span className={styles.gsImpactValue}>12</span>
                <span className={styles.gsImpactLabel}>Components documented</span>
                <span className={styles.gsImpactDesc}>From atomic (Button) to full-page patterns (Hero, Footer). Each with tokens + a11y specs.</span>
              </div>
              <div className={styles.gsImpactCard}>
                <span className={styles.gsImpactValue}>WCAG</span>
                <span className={styles.gsImpactLabel}>AA Accessibility target</span>
                <span className={styles.gsImpactDesc}>All interactive components meet or exceed WCAG 2.1 AA contrast and focus requirements.</span>
              </div>
              <div className={styles.gsImpactCard}>
                <span className={styles.gsImpactValue}>1×</span>
                <span className={styles.gsImpactLabel}>Token update = site-wide change</span>
                <span className={styles.gsImpactDesc}>Update one semantic token to rebrand a role across every component simultaneously.</span>
              </div>
              <div className={styles.gsImpactCard}>
                <span className={styles.gsImpactValue}>AI</span>
                <span className={styles.gsImpactLabel}>Ready for AI generation</span>
                <span className={styles.gsImpactDesc}>Every component includes a structured prompt template for AI-assisted code generation.</span>
              </div>
            </div>
          </div>
        </Page>

        {/* Brand Palettes */}
        <Page id="paletas" active={activeId}>
          <SectionHeader id="paletas" kicker="01" title="Brand Palettes" />
          {BRAND_SCALES.map((p) => (
            <div key={p.token} className={styles.paletteBlock}>
              <div className={styles.paletteHeader}>
                <span className={styles.paletteName}>{p.name}</span>
                <Badge variant={p.role === 'Primary' ? 'primary' : p.role === 'Secondary' ? 'secondary' : p.role === 'Tertiary' ? 'tertiary' : 'neutral'}>
                  {p.role}
                </Badge>
              </div>
              <div className={styles.scaleRow}>
                {p.steps.map((s) => <Swatch key={s} token={p.token} step={s} />)}
              </div>
            </div>
          ))}
        </Page>

        {/* Neutral & Alpha */}
        <Page id="neutral" active={activeId}>
          <SectionHeader id="neutral" kicker="02" title="Neutral & Alpha" />
          <div className={styles.paletteBlock}>
            <span className={styles.paletteName}>Neutral</span>
            <div className={styles.scaleRow}>
              <div className={styles.swatch}>
                <div className={styles.swatchChip} style={{ background: 'var(--dp-color-neutral-white)', border: '1px solid var(--dp-color-outline-variant)' }} />
                <span className={styles.swatchLabel}>white</span>
              </div>
              <div className={styles.swatch}>
                <div className={styles.swatchChip} style={{ background: 'var(--dp-color-neutral-black)' }} />
                <span className={styles.swatchLabel}>black</span>
              </div>
            </div>
          </div>
          {NEUTRAL_SCALES.map((p) => (
            <div key={p.token} className={styles.paletteBlock}>
              <span className={styles.paletteName}>{p.name}</span>
              <div className={styles.scaleRow}>
                {p.steps.map((s) => (
                  p.token.startsWith('alpha') ? (
                    <AlphaSwatch key={s} token={p.token} step={s} />
                  ) : (
                    <div key={s} className={styles.swatch}>
                      <div
                        className={styles.swatchChip}
                        style={{
                          background: `var(--dp-color-${p.token}-${s})`,
                          border: '1px solid var(--dp-color-outline-variant)',
                        }}
                      />
                      <span className={styles.swatchLabel}>{s}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </Page>

        {/* Status Colors */}
        <Page id="status" active={activeId}>
          <SectionHeader id="status" kicker="03" title="Status Colors" />
          {STATUS_SCALES.map((p) => (
            <div key={p.token} className={styles.paletteBlock}>
              <span className={styles.paletteName}>{p.name}</span>
              <div className={styles.scaleRow}>
                {p.steps.map((s) => <Swatch key={s} token={p.token} step={s} />)}
              </div>
            </div>
          ))}
        </Page>

        {/* Typography */}
        <Page id="tipografia" active={activeId}>
          <SectionHeader id="tipografia" kicker="04" title="Typography" />
          <div className={styles.typeGrid}>
            <div className={styles.typeRow}>
              <span className={styles.typeMeta}>Space Grotesk / Display · 700</span>
              <p className={styles.typeDisplay}>Vast open terrain</p>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeMeta}>Space Grotesk / Heading · 600</span>
              <p className={styles.typeHeading}>Precision at every layer</p>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeMeta}>Figtree / Body · 400</span>
              <p className={styles.typeBody}>
                Not email campaigns. Not generic sequences. They build the infrastructure —
                the machine that identifies the right people and delivers qualified leads.
              </p>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeMeta}>Figtree / Label · 600</span>
              <p className={styles.typeLabel}>Qualified Pipeline Ownership</p>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeMeta}>JetBrains Mono / Code · 400</span>
              <pre className={styles.typeCode}>{`const pipeline = buildEngine({ icp, verify: true })`}</pre>
            </div>
          </div>

          <div className={styles.tokenTable}>
            <div className={styles.tokenTableHead}>
              <span>Token</span><span>Family</span><span>Preview</span>
            </div>
            {[
              { token: '--dp-font-family-heading', value: 'Space Grotesk', sample: 'Build engines' },
              { token: '--dp-font-family-body', value: 'Figtree', sample: 'Build engines' },
              { token: '--dp-font-family-code', value: 'JetBrains Mono', sample: 'Build engines' },
            ].map((r) => (
              <div key={r.token} className={styles.tokenTableRow}>
                <code className={styles.tokenCode}>{r.token}</code>
                <span className={styles.tokenValue}>{r.value}</span>
                <span style={{ fontFamily: `var(${r.token})` }}>{r.sample}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Spacing */}
        <Page id="espacamento" active={activeId}>
          <SectionHeader id="espacamento" kicker="05" title="Spacing" />
          <div className={styles.spaceStack}>
            {SPACE_STEPS.map((s) => (
              <div key={s} className={styles.spaceRow}>
                <code className={styles.spaceLabel}>--dp-space-{s}</code>
                <div
                  className={styles.spaceBar}
                  style={{ width: `var(--dp-space-${s})` }}
                />
                <span className={styles.spaceValue}>
                  {s <= 100 ? `${s / 16 * 16}px` : ''}
                </span>
              </div>
            ))}
          </div>
        </Page>

        {/* Border Radius */}
        <Page id="radius" active={activeId}>
          <SectionHeader id="radius" kicker="06" title="Border Radius" />
          <div className={styles.radiusGrid}>
            {RADIUS_STEPS.map((r) => (
              <div key={r.token} className={styles.radiusItem}>
                <div
                  className={styles.radiusBox}
                  style={{ borderRadius: `var(--dp-radius-${r.token})` }}
                />
                <code className={styles.swatchLabel}>--dp-radius-{r.token}</code>
                <span className={styles.swatchLabel}>{r.name}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Stroke */}
        <Page id="stroke" active={activeId}>
          <SectionHeader id="stroke" kicker="07" title="Stroke" />
          <div className={styles.strokeStack}>
            {STROKE_STEPS.map((s) => (
              <div key={s.token} className={styles.strokeRow}>
                <code className={styles.spaceLabel}>--dp-stroke-{s.token}</code>
                <div
                  className={styles.strokeLine}
                  style={{ borderTopWidth: `var(--dp-stroke-${s.token})` }}
                />
                <span className={styles.swatchLabel}>{s.value}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Shadows */}
        <Page id="sombras" active={activeId}>
          <SectionHeader id="sombras" kicker="08" title="Shadows" />
          <div className={styles.shadowGrid}>
            {SHADOW_STEPS.map((s) => (
              <div key={s.token} className={styles.shadowItem}>
                <div
                  className={styles.shadowBox}
                  style={{ boxShadow: `var(--dp-shadow-${s.token})` }}
                />
                <code className={styles.swatchLabel}>--dp-shadow-{s.name}</code>
              </div>
            ))}
          </div>
        </Page>

        {/* Motion */}
        <Page id="motion" active={activeId}>
          <SectionHeader id="motion" kicker="09" title="Motion" />
          <div className={styles.tokenTable}>
            <div className={styles.tokenTableHead}>
              <span>Token</span><span>Value</span>
            </div>
            {[
              { token: '--dp-duration-fast', value: '150ms' },
              { token: '--dp-duration-base', value: '250ms' },
              { token: '--dp-duration-slow', value: '400ms' },
              { token: '--dp-duration-page', value: '600ms' },
              { token: '--dp-easing-default', value: 'ease' },
              { token: '--dp-easing-page', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
              { token: '--dp-easing-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
              { token: '--dp-transition-fast', value: '150ms ease' },
              { token: '--dp-transition-base', value: '250ms ease' },
              { token: '--dp-transition-slow', value: '400ms ease' },
              { token: '--dp-transition-page', value: '600ms cubic-bezier(…)' },
              { token: '--dp-transition-spring', value: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)' },
            ].map((r) => (
              <div key={r.token} className={styles.tokenTableRow}>
                <code className={styles.tokenCode}>{r.token}</code>
                <span className={styles.tokenValue}>{r.value}</span>
              </div>
            ))}
          </div>
          <p className={styles.sectionNote} style={{ marginTop: '1.5rem' }}>
            <strong>Spring</strong> overshoots its target and settles back, giving a sense of
            physical weight. Use sparingly — only on elements that <em>arrive</em> on screen
            (cards, modals, tooltips). Never on hover/focus or layout shifts.
          </p>
          <div className={styles.motionDemo}>
            <p className={styles.typeMeta}>Demo — hover the boxes</p>
            <div className={styles.motionRow}>
              <div className={styles.motionBox}>
                <span className={styles.motionBoxLabel}>base</span>
              </div>
              <div className={`${styles.motionBox} ${styles.motionBoxSpring}`}>
                <span className={styles.motionBoxLabel}>spring</span>
              </div>
            </div>
          </div>
        </Page>

        {/* Color Roles */}
        <Page id="color-roles" active={activeId}>
          <SectionHeader id="color-roles" kicker="10" title="Color Roles" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dp-space-400)' }}>
            {COLOR_ROLE_GROUPS.map((grp) => (
              <div key={grp.group} className={styles.paletteBlock}>
                <span className={styles.showroomLabel}>{grp.group}</span>
                <div className={styles.colorRolesGrid}>
                  {grp.roles.map((r) => (
                    <TokenChip key={r.role} name={`--dp-color-${r.role}`}>
                      <div
                        className={styles.roleChip}
                        style={{ background: `var(--dp-color-${r.role})` }}
                      >
                        <span
                          className={styles.roleLabel}
                          style={{ color: `var(--dp-color-on-${r.role})` }}
                        >
                          {r.label}
                        </span>
                      </div>
                      <span className={styles.roleDesc}>{r.desc}</span>
                    </TokenChip>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.tokenTable} style={{ marginTop: '2rem' }}>
            <div className={styles.tokenTableHead}>
              <span>Role</span><span>Light</span><span>Dark</span>
            </div>
            {[
              { role: 'Primary', light: 'electric-cyan-700', dark: 'electric-cyan-400' },
              { role: 'Primary Strong', light: 'electric-cyan-800', dark: 'electric-cyan-400' },
              { role: 'Secondary', light: 'coral-500', dark: 'coral-400' },
              { role: 'Tertiary', light: 'deep-indigo-500', dark: 'deep-indigo-300' },
              { role: 'Error', light: 'status-error-500', dark: 'status-error-200' },
              { role: 'Success', light: 'status-success-500', dark: 'status-success-200' },
              { role: 'Warning', light: 'status-warning-500', dark: 'status-warning-200' },
              { role: 'Info', light: 'status-info-500', dark: 'status-info-200' },
              { role: 'Surface', light: 'space-grey-50', dark: 'space-grey-950' },
              { role: 'Surface Sky', light: 'sky-blue-200', dark: '—' },
              { role: 'Surface Coral', light: 'coral-200', dark: '—' },
              { role: 'Surface Cyan Deep', light: 'electric-cyan-900', dark: 'surface-cyan' },
              { role: 'Surface Grey Muted',  light: 'space-grey-400', dark: 'surface-container-high' },
              { role: 'Surface Grey Soft',   light: 'space-grey-300', dark: 'surface-container' },
              { role: 'Surface Grey Subtle', light: 'space-grey-200', dark: 'surface-container-low' },
              { role: 'Surface Inverse', light: 'space-grey-950', dark: 'surface' },
              { role: 'Surface Inverse Sub', light: 'space-grey-900', dark: 'surface-container-low' },
              { role: 'Outline', light: 'space-grey-400', dark: 'space-grey-600' },
            ].map((r) => (
              <div key={r.role} className={styles.tokenTableRow}>
                <span className={styles.tokenValue}>{r.role}</span>
                <code className={styles.tokenCode}>{r.light}</code>
                <code className={styles.tokenCode}>{r.dark}</code>
              </div>
            ))}
          </div>
        </Page>

        {/* Breakpoints */}
        <Page id="breakpoints" active={activeId}>
          <SectionHeader id="breakpoints" kicker="11" title="Breakpoints" />
          <p className={styles.sectionNote}>
            CSS custom properties don't work in <code>@media</code> queries — use the values
            directly. The tokens below serve as documented reference.
          </p>
          <div className={styles.bpStack}>
            {BREAKPOINTS.map((bp) => (
              <div key={bp.token} className={styles.bpRow}>
                <code className={styles.tokenCode}>--dp-bp-{bp.token}</code>
                <div
                  className={styles.bpBar}
                  style={{ width: `${parseInt(bp.value) / 16}%` }}
                />
                <span className={styles.spaceValue}>{bp.value}</span>
                <span className={styles.roleDesc}>{bp.desc}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Semantic Typography */}
        <Page id="sem-typography" active={activeId}>
          <SectionHeader id="sem-typography" kicker="12" title="Typography" />
          <p className={styles.sectionNote}>
            Semantic roles that map font families, line-heights and tracking to usage contexts.
            Consume these tokens in components — never the raw primitive values.
          </p>
          {SEM_TYPOGRAPHY.map((group) => (
            <div key={group.group} className={styles.paletteBlock}>
              <span className={styles.paletteName}>{group.group}</span>
              <div className={styles.tokenTable}>
                <div className={styles.tokenTableHead}>
                  <span>Token</span><span>Value</span><span>Preview</span>
                </div>
                {group.items.map((item) => (
                  <div key={item.token} className={styles.tokenTableRow}>
                    <code className={styles.tokenCode}>{item.token}</code>
                    <span className={styles.tokenValue}>{item.value}</span>
                    <span style={'family' in item ? { fontFamily: item.family } : {}}>{item.preview}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Page>

        {/* Semantic Spacing */}
        <Page id="sem-spacing" active={activeId}>
          <SectionHeader id="sem-spacing" kicker="13" title="Spacing" />
          <p className={styles.sectionNote}>
            Named spacing roles for consistent layout: insets (padding), gaps (flex/grid) and section
            padding blocks. Each maps to one or two primitive space tokens.
          </p>
          {SEM_SPACING.map((group) => (
            <div key={group.group} className={styles.paletteBlock}>
              <span className={styles.paletteName}>{group.group}</span>
              <div className={styles.tokenTable}>
                <div className={styles.tokenTableHead}>
                  <span>Token</span><span>Primitive(s)</span><span>Usage</span>
                </div>
                {group.items.map((item) => (
                  <div key={item.token} className={styles.tokenTableRow}>
                    <code className={styles.tokenCode}>{item.token}</code>
                    <code className={styles.tokenCode}>{item.primitive}</code>
                    <span className={styles.roleDesc}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Page>

        {/* Semantic Border Radius */}
        <Page id="sem-radius" active={activeId}>
          <SectionHeader id="sem-radius" kicker="14" title="Border Radius" />
          <p className={styles.sectionNote}>
            Each token maps to a named usage context. Prefer these over the raw primitive scale.
          </p>
          <div className={styles.radiusGrid}>
            {SEM_RADIUS_STEPS.map((r) => (
              <div key={r.token} className={styles.radiusItem}>
                <div
                  className={styles.radiusBox}
                  style={{ borderRadius: `var(--dp-sem-radius-${r.token})` }}
                />
                <code className={styles.swatchLabel}>--dp-sem-radius-{r.token}</code>
                <span className={styles.swatchLabel}>{r.value}</span>
                <span className={styles.roleDesc}>{r.desc}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Semantic Stroke */}
        <Page id="sem-stroke" active={activeId}>
          <SectionHeader id="sem-stroke" kicker="15" title="Stroke" />
          <p className={styles.sectionNote}>
            Border width roles — each maps to a primitive stroke token and describes its intended use.
          </p>
          <div className={styles.strokeStack}>
            {SEM_STROKE_STEPS.map((s) => (
              <div key={s.token} className={styles.strokeRow}>
                <code className={styles.spaceLabel}>--dp-sem-stroke-{s.token}</code>
                <div
                  className={styles.strokeLine}
                  style={{ borderTopWidth: `var(--dp-sem-stroke-${s.token})` }}
                />
                <span className={styles.swatchLabel}>{s.value}</span>
                <span className={styles.roleDesc}>{s.desc}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Semantic Shadows */}
        <Page id="sem-shadows" active={activeId}>
          <SectionHeader id="sem-shadows" kicker="16" title="Shadows" />
          <p className={styles.sectionNote}>
            Named elevation roles. <code>nav</code>, <code>header-bar</code> and{' '}
            <code>diagram</code> have separate light / dark mode values defined in the globals.
          </p>
          <div className={styles.shadowGrid}>
            {SEM_SHADOW_STEPS.map((s) => (
              <div key={s.token} className={styles.shadowItem}>
                <div
                  className={styles.shadowBox}
                  style={{ boxShadow: s.token === 'none' ? 'none' : `var(--dp-sem-shadow-${s.token})` }}
                />
                <code className={styles.swatchLabel}>--dp-sem-shadow-{s.token}</code>
                <span className={styles.roleDesc}>{s.desc}</span>
              </div>
            ))}
          </div>
        </Page>

        {/* Semantic Motion */}
        <Page id="sem-motion" active={activeId}>
          <SectionHeader id="sem-motion" kicker="17" title="Motion" />
          <p className={styles.sectionNote}>
            Four timing roles for interaction feedback. Map to the primitive duration + easing
            tokens. Use <strong>interactive</strong> for hover/focus, <strong>component</strong>{' '}
            for open/close, <strong>layout</strong> for structural shifts.
          </p>
          <div className={styles.tokenTable}>
            <div className={styles.tokenTableHead}>
              <span>Token</span><span>Value</span><span>Usage</span>
            </div>
            {SEM_MOTION_STEPS.map((r) => (
              <div key={r.token} className={styles.tokenTableRow}>
                <code className={styles.tokenCode}>{r.token}</code>
                <span className={styles.tokenValue}>{r.value}</span>
                <span className={styles.roleDesc}>{r.desc}</span>
              </div>
            ))}
          </div>
          <div className={styles.motionDemo} style={{ marginTop: '2rem' }}>
            <p className={styles.typeMeta}>Demo — hover the boxes</p>
            <div className={styles.motionRow}>
              <div className={styles.motionBox}>
                <span className={styles.motionBoxLabel}>interactive</span>
              </div>
              <div className={`${styles.motionBox} ${styles.motionBoxSpring}`}>
                <span className={styles.motionBoxLabel}>component</span>
              </div>
            </div>
          </div>
        </Page>

        {/* All Components grid */}
        <Page id="all-components" active={activeId}>
          <SectionHeader id="all-components" kicker="00" title="All Components" />
          <div className={styles.catalogIntro}>
            <p className={styles.catalogKicker}>Library Components</p>
            <p className={styles.catalogBody}>
              {COMPONENT_CATALOG.length} components — from atomic UI primitives to full-page
              layout patterns. Each is documented with usage guidelines, design tokens,
              accessibility specs, and an AI prompt template for code generation.
            </p>
          </div>
          <ComponentsGrid catalog={COMPONENT_CATALOG} onSelect={selectPage} />
        </Page>

        {/* Component showroom — one page per catalogued component */}
        {COMPONENT_CATALOG.map((doc, i) => (
          <Page key={doc.id} id={doc.id} active={activeId}>
            <SectionHeader id={doc.id} kicker={String(1 + i).padStart(2, '0')} title={doc.name} />
            <ComponentViewer {...doc} live={LIVE_COMPONENTS[doc.id]} />
          </Page>
        ))}

        {/* Icon Library */}
        <Page id="icons" active={activeId}>
          <SectionHeader id="icons" kicker={String(1 + COMPONENT_CATALOG.length).padStart(2, '0')} title="Icon Library" />
          <p className={styles.sectionNote}>
            Powered by <strong>lucide-react</strong>. Size tokens: <code>--dp-sem-icon-size-xs/sm/md/lg/xl</code>.
          </p>
          {ICON_CATALOG.map((cat) => (
            <div key={cat.category} className={styles.iconCategory}>
              <span className={styles.showroomLabel}>{cat.category}</span>
              <div className={styles.iconGrid}>
                {cat.icons.map(({ name, Component }) => (
                  <div key={name} className={styles.iconItem} title={name}>
                    <Component size={20} />
                    <span className={styles.iconName}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Social & brand icons — NOT Lucide (Lucide dropped brand icons). */}
          <div className={styles.iconCategory}>
            <span className={styles.showroomLabel}>Social &amp; Brand — não-Lucide (componente SocialIcon)</span>
            <p className={styles.sectionNote}>
              Ícones de marca (Lucide removeu os brand icons). Usam <code>currentColor</code> e os
              tokens <code>--dp-sem-icon-size-*</code>. Import: <code>{'import { SocialIcon } from \'@digital-pampas/ds\''}</code>
            </p>
            <div className={styles.iconGrid}>
              {(['linkedin', 'mail', 'youtube', 'tiktok', 'x'] as SocialIconName[]).map((name) => (
                <div key={name} className={styles.iconItem} title={name}>
                  <SocialIcon name={name} size={20} />
                  <span className={styles.iconName}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Page>

        {/* Semantic Iconography */}
        <Page id="sem-iconography" active={activeId}>
          <SectionHeader id="sem-iconography" kicker="IC" title="Iconography" />
          <p className={styles.sectionNote}>
            Ícones herdam a cor via <code>currentColor</code> — o tema vem do contexto. Duas famílias:{' '}
            <strong>Lucide</strong> (UI genérica) e <strong>Social Icons</strong> (marca, não-Lucide —
            componente <code>SocialIcon</code>).
          </p>

          {/* ── Icon sizes (semantic) ── */}
          <div className={styles.paletteBlock}>
            <span className={styles.showroomLabel}>Icon Sizes (--dp-sem-icon-size-*)</span>
            <div className={styles.tokenTable}>
              <div className={styles.tokenTableHead}>
                <span>Token</span><span>Value</span><span>Preview</span>
              </div>
              {[
                { token: '--dp-sem-icon-size-xs', value: '12px', size: 12 },
                { token: '--dp-sem-icon-size-sm', value: '16px', size: 16 },
                { token: '--dp-sem-icon-size-md', value: '20px', size: 20 },
                { token: '--dp-sem-icon-size-lg', value: '24px', size: 24 },
                { token: '--dp-sem-icon-size-xl', value: '32px', size: 32 },
              ].map((r) => (
                <div key={r.token} className={styles.tokenTableRow}>
                  <code className={styles.tokenCode}>{r.token}</code>
                  <span className={styles.tokenValue}>{r.value}</span>
                  <span style={{ display: 'inline-flex', gap: 'var(--dp-space-150)', alignItems: 'center' }}>
                    <Target size={r.size} />
                    <SocialIcon name="linkedin" size={r.size} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Lucide gallery (curated for DP content) ── */}
          <div className={styles.iconCategory} style={{ marginTop: 'var(--dp-space-400)' }}>
            <span className={styles.showroomLabel}>Lucide Icons — curados p/ conteúdo Digital Pampas</span>
            <p className={styles.sectionNote}>
              Powered by <strong>lucide-react</strong> — usáveis em qualquer material da Digital Pampas.
              Import: <code>{'import { Icon } from \'@digital-pampas/ds\''}</code>. Biblioteca completa em{' '}
              <strong>Components → Icon Library</strong>.
            </p>
            <div className={styles.iconGrid}>
              {[
                { name: 'Target', C: Target }, { name: 'Zap', C: Zap }, { name: 'Database', C: Database },
                { name: 'Cpu', C: Cpu }, { name: 'Activity', C: Activity }, { name: 'BarChart2', C: BarChart2 },
                { name: 'Layers', C: Layers }, { name: 'Globe', C: Globe }, { name: 'Code', C: Code },
                { name: 'Terminal', C: Terminal }, { name: 'Mail', C: Mail }, { name: 'Phone', C: Phone },
                { name: 'MessageSquare', C: MessageSquare }, { name: 'Users', C: Users }, { name: 'Search', C: Search },
                { name: 'Filter', C: Filter }, { name: 'Settings', C: Settings }, { name: 'RefreshCw', C: RefreshCw },
                { name: 'CheckCircle', C: CheckCircle }, { name: 'Bell', C: Bell }, { name: 'ArrowRight', C: ArrowRight },
              ].map(({ name, C }) => (
                <div key={name} className={styles.iconItem} title={name}>
                  <C size={20} />
                  <span className={styles.iconName}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Social icons (brand, NOT Lucide) ── */}
          <div className={styles.iconCategory} style={{ marginTop: 'var(--dp-space-400)' }}>
            <span className={styles.showroomLabel}>Social Icons — não-Lucide (componente SocialIcon)</span>
            <p className={styles.sectionNote}>
              Glifos de marca próprios (o Lucide removeu brand icons). Import:{' '}
              <code>{'import { SocialIcon } from \'@digital-pampas/ds\''}</code>
            </p>
            <div className={styles.iconGrid}>
              {(['linkedin', 'mail', 'youtube', 'tiktok', 'x'] as SocialIconName[]).map((name) => (
                <div key={name} className={styles.iconItem} title={name}>
                  <SocialIcon name={name} size={20} />
                  <span className={styles.iconName}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Page>

        {/* Logo & Brand */}
        <Page id="logo-brand" active={activeId}>
          <SectionHeader id="logo-brand" kicker="LB" title="Logo &amp; Brand" />
          <p className={styles.sectionNote}>
            Dois tipos de logo (o <strong>full</strong> — ícone + wordmark, usado no Nav; e o{' '}
            <strong>wordmark</strong> — só o logotipo, usado no Footer), cada um em versão branca e preta.
            O componente <code>Logo</code> é tema-reativo (branco no dark, preto no light). Os assets
            ficam em <code>/logos/*</code> e são servidos pelo consumidor. Import:{' '}
            <code>{'import { Logo } from \'@digital-pampas/ds\''}</code>
          </p>

          <div className={styles.paletteBlock}>
            <span className={styles.paletteName}>Variantes (tema-reativo)</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dp-space-400)', alignItems: 'flex-end', padding: 'var(--dp-space-300)', background: 'var(--dp-color-surface-container-low)', borderRadius: 'var(--dp-sem-radius-card-sm)' }}>
              {([
                { v: 'full' as const, label: 'full (Nav — ícone + wordmark)' },
                { v: 'wordmark' as const, label: 'wordmark (Footer — só logotipo)' },
                { v: 'icon' as const, label: 'icon (só o ícone)' },
              ]).map(({ v, label }) => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dp-space-100)', alignItems: 'center' }}>
                  <Logo variant={v} height={v === 'icon' ? 40 : 28} />
                  <code className={styles.swatchLabel}>{label}</code>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tokenTable} style={{ marginTop: '2rem' }}>
            <div className={styles.tokenTableHead}>
              <span>Token</span><span>Dark</span><span>Light</span>
            </div>
            {[
              { token: '--dp-logo-full', dark: 'dp-logo-white.png', light: 'dp-logo-black.png' },
              { token: '--dp-logo-wordmark', dark: 'dp-wordmark-white.png', light: 'dp-wordmark-black.png' },
              { token: '--dp-logo-icon', dark: 'dp-icon-white.png', light: 'dp-icon-black.png' },
            ].map((r) => (
              <div key={r.token} className={styles.tokenTableRow}>
                <code className={styles.tokenCode}>{r.token}</code>
                <span className={styles.tokenValue}>{r.dark}</span>
                <span className={styles.tokenValue}>{r.light}</span>
              </div>
            ))}
          </div>
          <p className={styles.sectionNote} style={{ marginTop: '1rem' }}>
            Os tokens são <code>url()</code> que trocam por tema — use em qualquer material via
            <code> background-image: var(--dp-logo-full)</code>. Requer servir os assets em <code>/logos/</code>.
          </p>
        </Page>

        {/* Application / Portal — overview grid */}
        <Page id="all-application" active={activeId}>
          <SectionHeader id="all-application" kicker="A0" title="All Components" />
          <div className={styles.catalogIntro}>
            <p className={styles.catalogKicker}>Portal Components</p>
            <p className={styles.catalogBody}>
              {PORTAL_CATALOG.length} components built for the client portal — data visualization,
              navigation, forms, and feedback patterns.
            </p>
          </div>
          <ComponentsGrid catalog={PORTAL_CATALOG} onSelect={selectPage} />
        </Page>

        {/* Application / Portal components — individual pages */}
        {PORTAL_CATALOG.map((doc, i) => (
          <Page key={doc.id} id={doc.id} active={activeId}>
            <SectionHeader id={doc.id} kicker={`A${i + 1}`} title={doc.name} />
            <ComponentViewer {...doc} />
          </Page>
        ))}

        <footer className={styles.footer}>
          <span>Digital Pampas Design System · v1.0</span>
          <span className={styles.footerMono}>3 layers · MD3 · dark/light</span>
        </footer>
        </div>{/* /mainInner */}
      </main>
    </div>
  )
}

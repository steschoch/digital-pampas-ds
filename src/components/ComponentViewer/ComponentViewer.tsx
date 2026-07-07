import { useState, useCallback } from 'react'
import { Check, X, Monitor, Tablet, Smartphone, Copy, CheckCheck } from 'lucide-react'
import { Select } from '../Select'
import styles from './ComponentViewer.module.css'

/* ── Types ─────────────────────────────────────────────────────── */

type Tab = 'overview' | 'playground' | 'anatomy' | 'prompt' | 'code' | 'guidelines'
type Breakpoint = 'mobile' | 'tablet' | 'desktop'
type ControlValues = Record<string, string | boolean>

export interface OverviewBlock {
  label: string
  content: React.ReactNode
}

export interface PlaygroundControl {
  key: string
  label: string
  type: 'select' | 'toggle' | 'text'
  options?: { label: string; value: string }[]
  defaultValue: string | boolean
}

export interface AnatomyPart {
  id: number
  label: string
  desc: string
}

export interface TokenUsage {
  name: string
  usage: string
}

export interface A11yRule {
  rule: string
  status: 'pass' | 'warn' | 'fail'
}

export interface Guideline {
  type: 'do' | 'dont'
  text: string
}

export interface ComponentViewerProps {
  id: string
  name: string
  category: 'Atomic' | 'Layout' | 'Pattern'
  description: string
  overviewBlocks: OverviewBlock[]
  playgroundControls?: PlaygroundControl[]
  playgroundRender?: (values: ControlValues) => React.ReactNode
  anatomyPreview: React.ReactNode
  anatomy: AnatomyPart[]
  prompt: string
  codeSnippet: string
  tokens: TokenUsage[]
  accessibility: A11yRule[]
  whenToUse?: string[]
  whenNotToUse?: string[]
  guidelines: Guideline[]
  /** Live render of the real component (shown at the top of the Overview tab). */
  live?: React.ReactNode
  /** When true, the Mobile breakpoint shows a "não existe no mobile" panel. */
  noMobile?: boolean
}

/* ── Constants ─────────────────────────────────────────────────── */

const BPS: { id: Breakpoint; Icon: typeof Monitor; label: string; width: number }[] = [
  { id: 'mobile',  Icon: Smartphone, label: 'Mobile (375px)',   width: 375  },
  { id: 'tablet',  Icon: Tablet,     label: 'iPad (768px)',     width: 768  },
  { id: 'desktop', Icon: Monitor,    label: 'Desktop (1280px)', width: 1280 },
]

const ALL_TABS: { id: Tab; label: string }[] = [
  { id: 'overview',   label: 'Overview'  },
  { id: 'playground', label: 'Playground'},
  { id: 'anatomy',    label: 'Anatomy'   },
  { id: 'prompt',     label: 'Prompt'    },
  { id: 'code',       label: 'Code'      },
  { id: 'guidelines', label: 'Guidelines'},
]

/* ── Sub-components ────────────────────────────────────────────── */

function BpSwitcher({ bp, onChange }: { bp: Breakpoint; onChange: (b: Breakpoint) => void }) {
  return (
    <div className={styles.bpSwitcher} role="group" aria-label="Breakpoint">
      {BPS.map(b => (
        <button
          key={b.id}
          aria-label={b.label}
          aria-pressed={bp === b.id}
          className={`${styles.bpBtn} ${bp === b.id ? styles.bpBtnActive : ''}`}
          onClick={() => onChange(b.id)}
        >
          <b.Icon size={14} aria-hidden />
        </button>
      ))}
    </div>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
    >
      <span className={styles.toggleKnob} />
    </button>
  )
}

/* ── ComponentViewer ───────────────────────────────────────────── */

export function ComponentViewer(props: ComponentViewerProps) {
  const hasPg = !!props.playgroundControls?.length

  const tabs = hasPg ? ALL_TABS : ALL_TABS.filter(t => t.id !== 'playground')

  const [tab,  setTab] = useState<Tab>('overview')
  const [bp,   setBp]  = useState<Breakpoint>('desktop')
  const [copied, setCopied] = useState(false)

  // Playground state — initialised from control defaults
  const [vals, setVals] = useState<ControlValues>(() => {
    const init: ControlValues = {}
    for (const c of props.playgroundControls ?? []) {
      init[c.key] = c.defaultValue
    }
    return init
  })

  const setVal = useCallback((key: string, value: string | boolean) => {
    setVals(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(props.codeSnippet).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [props.codeSnippet])

  const bpWidth = BPS.find(b => b.id === bp)!.width

  const a11yPass  = props.accessibility.filter(r => r.status === 'pass').length
  const a11yTotal = props.accessibility.length

  return (
    <div className={styles.viewer}>

      {/* ── Header ──────────────────────────────────────────── */}
      <div className={styles.viewerHeader}>
        <span className={`${styles.categoryBadge} ${styles[`cat${props.category}`]}`}>
          {props.category}
        </span>
        <h3 className={styles.compName}>{props.name}</h3>
        <p className={styles.compDesc}>{props.description}</p>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────── */}
      <div className={styles.tabBar} role="tablist">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Main ──────────────────────────────────────────── */}
        <div className={styles.main} role="tabpanel" aria-label={tab}>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div className={styles.overviewWrap}>
              <div className={styles.overviewTopBar}>
                <span className={styles.overviewTopLabel}>Preview</span>
                <BpSwitcher bp={bp} onChange={setBp} />
              </div>
              {bp === 'mobile' && props.noMobile ? (
                <div className={styles.noMobile}>
                  <div className={styles.noMobileFrame}>
                    <Smartphone size={28} aria-hidden />
                    <p className={styles.noMobileText}>Não existe no mobile</p>
                  </div>
                </div>
              ) : (
                <div className={styles.overviewBlocks}>
                  {props.live && (
                    <div className={styles.overviewBlock}>
                      <span className={styles.overviewBlockLabel}>Live component (real)</span>
                      <div
                        className={styles.overviewBlockContent}
                        style={{ '--pw': `${bpWidth}px` } as React.CSSProperties}
                      >
                        {props.live}
                      </div>
                    </div>
                  )}
                  {props.overviewBlocks.map((block, i) => (
                    <div key={i} className={styles.overviewBlock}>
                      <span className={styles.overviewBlockLabel}>{block.label}</span>
                      <div
                        className={styles.overviewBlockContent}
                        style={{ '--pw': `${bpWidth}px` } as React.CSSProperties}
                      >
                        {block.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PLAYGROUND */}
          {tab === 'playground' && hasPg && (
            <div className={styles.pgLayout}>
              {/* Controls */}
              <div className={styles.pgControls}>
                <p className={styles.pgControlsTitle}>Controls</p>
                {props.playgroundControls!.map(ctrl => (
                  <div key={ctrl.key} className={styles.pgControl}>
                    {ctrl.type === 'toggle' ? (
                      <div className={styles.pgToggleRow}>
                        <span className={styles.pgControlLabel}>{ctrl.label}</span>
                        <Toggle
                          on={vals[ctrl.key] as boolean}
                          onChange={v => setVal(ctrl.key, v)}
                        />
                      </div>
                    ) : (
                      <>
                        <label className={styles.pgControlLabel} htmlFor={`pg-${ctrl.key}`}>
                          {ctrl.label}
                        </label>
                        {ctrl.type === 'select' ? (
                          <Select
                            options={ctrl.options!}
                            value={vals[ctrl.key] as string}
                            onChange={v => setVal(ctrl.key, v)}
                            size="sm"
                            aria-label={ctrl.label}
                          />
                        ) : (
                          <input
                            id={`pg-${ctrl.key}`}
                            type="text"
                            className={styles.pgInput}
                            value={vals[ctrl.key] as string}
                            onChange={e => setVal(ctrl.key, e.target.value)}
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Preview */}
              <div className={styles.pgPreview}>
                <div className={styles.pgPreviewTop}>
                  <span className={styles.pgPreviewLabel}>Live preview</span>
                  <BpSwitcher bp={bp} onChange={setBp} />
                </div>
                <div className={styles.pgCanvas}>
                  <div
                    className={styles.pgCanvasInner}
                    style={{ '--pw': `${bpWidth}px` } as React.CSSProperties}
                  >
                    {props.playgroundRender?.(vals)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ANATOMY */}
          {tab === 'anatomy' && (
            <div className={styles.anatomyLayout}>
              <div className={styles.anatomyVisual}>
                <p className={styles.anatomyVisualLabel}>Component</p>
                <div className={styles.anatomyPreviewBox}>
                  {props.anatomyPreview}
                </div>
              </div>
              <div className={styles.anatomyCallouts}>
                <p className={styles.anatomyCalloutsLabel}>Anatomy</p>
                {props.anatomy.map(part => (
                  <div key={part.id} className={styles.anatomyRow}>
                    <span className={styles.anatomyNum}>{part.id}</span>
                    <div>
                      <strong className={styles.anatomyPartLabel}>{part.label}</strong>
                      <p className={styles.anatomyPartDesc}>{part.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROMPT */}
          {tab === 'prompt' && (
            <div className={styles.promptWrap}>
              <p className={styles.promptNote}>
                Structured specification for this component. Use as AI prompt, design brief, or handoff reference.
              </p>
              <pre className={styles.promptBox}>{props.prompt}</pre>
            </div>
          )}

          {/* CODE */}
          {tab === 'code' && (
            <div className={styles.codeWrap}>
              <div className={styles.codeTopBar}>
                <span className={styles.codeTopLabel}>Usage</span>
                <button
                  className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
                  onClick={handleCopy}
                  aria-label="Copy code"
                >
                  {copied
                    ? <><CheckCheck size={13} aria-hidden /> Copied</>
                    : <><Copy size={13} aria-hidden /> Copy</>
                  }
                </button>
              </div>
              <pre className={styles.codeBlock}><code>{props.codeSnippet}</code></pre>
            </div>
          )}

          {/* GUIDELINES */}
          {tab === 'guidelines' && (
            <div className={styles.guidelinesWrap}>
              {(!!props.whenToUse?.length || !!props.whenNotToUse?.length) && (
                <div className={styles.usageSection}>
                  {!!props.whenToUse?.length && (
                    <div className={styles.usageBlock}>
                      <h4 className={styles.usageHeading}>
                        <Check size={14} className={styles.iconGreen} aria-hidden /> When to use
                      </h4>
                      <ul className={styles.usageList}>
                        {props.whenToUse.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                  {!!props.whenNotToUse?.length && (
                    <div className={styles.usageBlock}>
                      <h4 className={styles.usageHeading}>
                        <X size={14} className={styles.iconRed} aria-hidden /> When not to use
                      </h4>
                      <ul className={styles.usageList}>
                        {props.whenNotToUse.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className={styles.doDontGrid}>
                {(['do', 'dont'] as const).map(type => (
                  <div key={type} className={type === 'do' ? styles.doCol : styles.dontCol}>
                    <div className={styles.doDontHead}>
                      {type === 'do'
                        ? <><Check size={13} className={styles.iconGreen} aria-hidden /> Do</>
                        : <><X size={13} className={styles.iconRed} aria-hidden /> Don't</>
                      }
                    </div>
                    {props.guidelines.filter(g => g.type === type).map((g, i) => (
                      <div key={i} className={styles.doDontItem}>{g.text}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Aside ───────────────────────────────────────────── */}
        <aside className={styles.aside}>

          <div className={styles.asidePanel}>
            <h4 className={styles.asidePanelTitle}>Tokens used</h4>
            {props.tokens.map((t, i) => (
              <div key={i} className={styles.tokenItem}>
                <code className={styles.tokenName}>{t.name}</code>
                <span className={styles.tokenUsage}>{t.usage}</span>
              </div>
            ))}
          </div>

          <div className={styles.asidePanel}>
            <h4 className={styles.asidePanelTitle}>
              Accessibility
              <span className={`${styles.a11yScore} ${a11yPass === a11yTotal ? styles.a11yScorePass : ''}`}>
                {a11yPass}/{a11yTotal}
              </span>
            </h4>
            {props.accessibility.map((r, i) => (
              <div key={i} className={styles.a11yItem}>
                <span className={`${styles.a11yDot} ${
                  r.status === 'pass' ? styles.dotPass :
                  r.status === 'warn' ? styles.dotWarn : styles.dotFail
                }`} />
                <span className={styles.a11yRule}>{r.rule}</span>
              </div>
            ))}
          </div>

        </aside>
      </div>
    </div>
  )
}

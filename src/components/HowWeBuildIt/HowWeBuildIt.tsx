import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './HowWeBuildIt.module.css';

/* ── Phase accent names by index ─────────────────────────────────── */
const ACCENTS = ['cyan', 'sky', 'indigo', 'plum', 'coral', 'cyan'] as const;
type Accent = (typeof ACCENTS)[number];

/* ── Data types ──────────────────────────────────────────────────── */
interface Phase {
  num: string;
  name: string;
  title: string;
  tool: string;
  dur: string;
  bullets: [string, string, string];
  youGet: string;
  panel: () => React.ReactElement;
}

/* ── Sub-panel components ──────────────────────────────────────────── */

function IcpPanel() {
  const rows: [string, string][] = [
    ['Role', 'VP Sales · Founder · Head of Revenue'],
    ['Company size', '50 – 500 employees'],
    ['Tech stack', 'HubSpot or Salesforce + Clay'],
    ['Geography', 'US · DACH · LatAm'],
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>ICP CRITERIA: TARGETING ACTIVE</span>
      </div>
      <div className={styles.tableRows}>
        {rows.map(([k, v]) => (
          <div key={k} className={styles.tableRow}>
            <span className={styles.tableKey}>{k}</span>
            <span className={styles.tableVal}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProspectPanel() {
  const rows = [
    { name: 'Sarah Chen', company: 'Veritas SaaS', role: 'VP Sales', fit: '96%' },
    { name: 'Marco Duarte', company: 'Axio Growth', role: 'Founder', fit: '91%' },
    { name: 'Anna Kowalski', company: 'Pipeline Co.', role: 'Head of Revenue', fit: '88%' },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>NAME / COMPANY</span>
        <span className={styles.subPanelTitle}>ROLE</span>
        <span className={styles.subPanelTitle}>ICP FIT</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className={styles.prospectRow}>
          <div className={styles.prospectCell}>
            <span className={styles.prospectName}>{r.name}</span>
            <span className={styles.prospectCompany}>{r.company}</span>
          </div>
          <span className={styles.prospectRole}>{r.role}</span>
          <span className={styles.fitBadge}>{r.fit}</span>
        </div>
      ))}
    </div>
  );
}

function VerificationPanel() {
  const bars = [
    { label: 'Hunter.io', value: '78%', pct: 78 },
    { label: 'Apollo', value: '+13%', pct: 13 },
    { label: 'Prospeo', value: '+4%', pct: 4 },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>VERIFICATION CHAIN</span>
      </div>
      <div className={styles.verBars}>
        {bars.map((b) => (
          <div key={b.label} className={styles.verRow}>
            <span className={styles.verLabel}>{b.label}</span>
            <div className={styles.verTrack} role="progressbar" aria-valuenow={b.pct} aria-valuemin={0} aria-valuemax={100}>
              <div className={`${styles.verFill} ${styles.verFillIndigo}`} style={{ width: `${b.pct}%` }} />
            </div>
            <span className={styles.verVal}>{b.value}</span>
          </div>
        ))}
        <div className={styles.verTotal}>
          <span>Total verified:</span>
          <span className={styles.verTotalVal}>95%+</span>
        </div>
      </div>
    </div>
  );
}

function ScorePanel() {
  const bars: { label: string; pct: number; dim: boolean }[] = [
    { label: 'High fit (85+)', pct: 32, dim: false },
    { label: 'Medium (60–84)', pct: 45, dim: false },
    { label: 'Low (< 60)', pct: 23, dim: true },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>AI SCORE DISTRIBUTION</span>
      </div>
      <div className={styles.scoreBars}>
        {bars.map((b) => (
          <div key={b.label} className={styles.scoreRow}>
            <span className={styles.scoreLabel}>{b.label}</span>
            <div className={styles.scoreTrack} role="progressbar" aria-valuenow={b.pct} aria-valuemin={0} aria-valuemax={100}>
              <div
                className={`${styles.scoreFill} ${b.dim ? styles.scoreFillDim : styles.scoreFillPlum}`}
                style={{ width: `${b.pct}%` }}
              />
            </div>
            <span className={styles.scoreVal}>{b.pct}%</span>
          </div>
        ))}
      </div>
      <div className={styles.scoreFooter}>
        <span className={styles.scoreFooterLabel}>Entering sequences</span>
        <span className={styles.scoreFooterVal}>High fit only</span>
      </div>
    </div>
  );
}

function SequencePanel() {
  const steps = [
    { n: '1', action: 'Email, personalized opener', day: 'Day 0' },
    { n: '2', action: 'LinkedIn connect + message', day: 'Day 3' },
    { n: '3', action: 'Email follow-up, value add', day: 'Day 7' },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>SEQUENCE STRUCTURE</span>
      </div>
      <div className={styles.seqSteps}>
        {steps.map((s) => (
          <div key={s.n} className={styles.seqStep}>
            <span className={styles.seqNum} aria-hidden="true">{s.n}</span>
            <span className={styles.seqAction}>{s.action}</span>
            <span className={styles.seqDay}>{s.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaunchPanel() {
  const metrics: { value: string; label: string; accent: 'cyan' | 'coral' }[] = [
    { value: '40%', label: 'reply rate', accent: 'cyan' },
    { value: '1.2%', label: 'bounce rate', accent: 'coral' },
    { value: '12', label: 'meetings / wk', accent: 'cyan' },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>LIVE METRICS</span>
        <span className={styles.liveIndicator} aria-label="Status: live">● LIVE</span>
      </div>
      <div className={styles.liveGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={`${styles.liveMetric} ${styles[`liveMetric-${m.accent}`]}`}>
            <span className={styles.liveVal}>{m.value}</span>
            <span className={styles.liveLbl}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Phase data ───────────────────────────────────────────────────── */

const PHASES: Phase[] = [
  {
    num: '01',
    name: 'Define ICP',
    title: 'Define Your ICP',
    tool: 'Strategy Call',
    dur: '~1h',
    bullets: [
      'Analyze your best existing customers to extract common patterns',
      'Define firmographic and technographic criteria (role, size, tech, region)',
      'Map the decision-makers and influencers in your target accounts',
    ],
    youGet: 'A crystal-clear ICP document, the foundation every phase builds on.',
    panel: IcpPanel,
  },
  {
    num: '02',
    name: 'Build List',
    title: 'Build Your Prospect List',
    tool: 'Apollo · LinkedIn Sales Nav',
    dur: '~2h',
    bullets: [
      'Pull verified contacts from Apollo and LinkedIn Sales Navigator',
      'Filter by ICP criteria: role, company size, tech stack, region',
      'Cross-reference sources to deduplicate and rank by fit',
    ],
    youGet: 'A clean, ICP-qualified prospect list, ready for enrichment.',
    panel: ProspectPanel,
  },
  {
    num: '03',
    name: 'Enrich',
    title: 'Enrich With Deep Data',
    tool: 'Waterfall Enrichment',
    dur: '~2-3h',
    bullets: [
      'Waterfall email verification: Hunter.io → Apollo → Prospeo',
      'Enrich firmographic data: headcount, funding stage, tech stack',
      'Flag behavioral signals: job changes, hiring posts, tech adoption',
    ],
    youGet: 'Verified contacts with 95%+ email accuracy + full enrichment data.',
    panel: VerificationPanel,
  },
  {
    num: '04',
    name: 'AI Score',
    title: 'AI-Powered Lead Prioritization',
    tool: 'Claude · Clay AI',
    dur: '~2-3h',
    bullets: [
      'Score each contact against your ICP with Claude running inside Clay',
      'Surface behavioral buying signals from enrichment data',
      'Rank and filter, only best-fit leads enter sequences',
    ],
    youGet: 'A prioritized, scored list, your highest-fit contacts go first.',
    panel: ScorePanel,
  },
  {
    num: '05',
    name: 'Sequences',
    title: 'Craft Your Outreach Sequences',
    tool: 'Instantly · Smartlead',
    dur: '~2-3h',
    bullets: [
      'Write personalized multi-step sequences (email + LinkedIn)',
      'A/B test subject lines and core messaging angles',
      'Configure domain warming, send limits, and unsubscribe handling',
    ],
    youGet: 'Campaign-ready sequences loaded in your sending tool.',
    panel: SequencePanel,
  },
  {
    num: '06',
    name: 'Launch',
    title: 'Launch & Continuously Improve',
    tool: 'Campaign Dashboard',
    dur: 'ongoing',
    bullets: [
      'Go live on your own domains, you control every send',
      'Monitor reply rate, bounce rate, and meetings booked per week',
      'Iterate on copy and targeting with real send data',
    ],
    youGet: 'A live outbound engine, documented, deployed, owned by you.',
    panel: LaunchPanel,
  },
];

/* ── Icon ─────────────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M2 6.5L4.5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Accent → CSS variable map ────────────────────────────────────── */
const accentToVar: Record<Accent, string> = {
  cyan:   'var(--dp-color-primary)',
  sky:    'var(--dp-color-sky-blue)',
  indigo: 'var(--dp-color-tertiary)',
  plum:   'var(--dp-color-plum)',
  coral:  'var(--dp-color-secondary)',
};

/* ── Main component ────────────────────────────────────────────────── */

const SCROLL_STEP = 350; // px of scroll per phase advance (desktop only)

export function HowWeBuildIt() {
  const [active, setActive] = useState(0);
  const tabRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobileLayout, setIsMobileLayout] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 1024
  );

  // Scroll-driven phase advancement, desktop only (> 1024px)
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth <= 1024) return;
      const track = trackRef.current;
      if (!track) return;
      const { top } = track.getBoundingClientRect();
      const scrolledPast = Math.max(0, 72 - top); // 72px = nav height
      const next = Math.min(PHASES.length - 1, Math.floor(scrolledPast / SCROLL_STEP));
      setActive(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect mobile/tablet layout (≤1024px), switches sidebar → accordion
  useEffect(() => {
    const check = () => setIsMobileLayout(window.innerWidth <= 1024);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const panelId = `hwbi-panel-${active}`;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let next = index;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        next = (index + 1) % PHASES.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        next = (index - 1 + PHASES.length) % PHASES.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        next = PHASES.length - 1;
      } else {
        return;
      }
      setActive(next);
      tabRefs.current[next]?.focus();
    },
    []
  );

  /* Shared detail card, used by both desktop panel and accordion */
  const renderDetailCard = (phaseIdx: number): React.ReactElement => {
    const p = PHASES[phaseIdx];
    const a: Accent = ACCENTS[phaseIdx];
    const Pnl = p.panel;
    const pid = `hwbi-panel-${phaseIdx}`;
    return (
      <div
        id={pid}
        role="tabpanel"
        aria-labelledby={`hwbi-tab-${phaseIdx}`}
        tabIndex={0}
        className={`${styles.detailCard} ${styles[`detail-${a}`]}`}
        key={phaseIdx}
      >
        {/* Top row: phase num + title + badges */}
        <div className={styles.detailTop}>
          <div className={styles.detailTopLeft}>
            <span className={`${styles.phaseNum} ${styles[`color-${a}`]}`}>{p.num}</span>
            <h3 className={styles.phaseTitle}>{p.title}</h3>
          </div>
          <div className={styles.badges}>
            <span className={styles.badge}>{p.tool}</span>
            <span className={styles.badge}>{p.dur}</span>
          </div>
        </div>

        {/* Bullets */}
        <ul className={styles.bullets} aria-label="What we do in this phase">
          {p.bullets.map((b) => (
            <li key={b} className={styles.bullet}>
              <span className={`${styles.bulletDot} ${styles[`color-${a}`]}`} aria-hidden="true">
                ●
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* YOU GET box */}
        <div className={styles.youGetBox}>
          <span className={styles.youGetLabel}>YOU GET:</span>
          <p className={styles.youGetText}>{p.youGet}</p>
        </div>

        {/* Sub-panel */}
        <Pnl />
      </div>
    );
  };

  return (
    <div ref={trackRef} className={styles.scrollTrack}>
    <section className={styles.section} id="how-it-works">

      <div className={styles.container}>

        {/* ── Section header ── */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>HOW WE BUILD IT</p>
          <h2 className={styles.h2}>From ICP to inbox. Six phases, documented.</h2>
          <div className={styles.stepsRow} aria-label="Process overview">
            {(['Audit what you have', 'Build the engine', 'Hand you the keys'] as const).map(
              (step, i, arr) => (
                <span key={step} className={styles.stepGroup}>
                  <span className={styles.stepText}>{step}</span>
                  {i < arr.length - 1 && (
                    <span className={styles.stepArrow} aria-hidden="true">→</span>
                  )}
                </span>
              )
            )}
          </div>
        </header>

        {/* ── Body: accordion (mobile/iPad) or sidebar+panel (desktop) ── */}
        <div className={styles.body}>

          {isMobileLayout ? (
            /* ── Accordion (≤1024px) ── */
            <div className={styles.accordion} role="tablist" aria-label="Build phases">
              {PHASES.map((p, i) => {
                const a: Accent = ACCENTS[i];
                const isOpen = i === active;
                return (
                  <div
                    key={p.num}
                    className={styles.accordionItem}
                    style={isOpen ? { '--phase-accent': accentToVar[a] } as React.CSSProperties : undefined}
                  >
                    <button
                      id={`hwbi-tab-${i}`}
                      role="tab"
                      aria-selected={isOpen}
                      aria-expanded={isOpen}
                      aria-controls={`hwbi-panel-${i}`}
                      className={`${styles.accordionBtn} ${isOpen ? styles.accordionBtnActive : ''}`}
                      onClick={() => setActive(i)}
                    >
                      <span className={`${styles.accordionNum} ${styles[`color-${a}`]}`}>
                        {p.num}
                      </span>
                      <span className={styles.accordionName}>{p.name}</span>
                      <svg
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {isOpen && (
                      <div className={styles.accordionContent}>
                        {renderDetailCard(i)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {/* Left: phase tabs */}
              <nav className={styles.sidebar} aria-label="Build phases">
                <ul
                  className={styles.tabList}
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {PHASES.map((p, i) => {
                    const isActive = i === active;
                    const isCompleted = i < active;
                    const a: Accent = ACCENTS[i];
                    return (
                      <li key={p.num} role="presentation">
                        <button
                          id={`hwbi-tab-${i}`}
                          ref={(el) => { tabRefs.current[i] = el; }}
                          role="tab"
                          aria-selected={isActive}
                          aria-controls={isActive ? panelId : undefined}
                          tabIndex={isActive ? 0 : -1}
                          className={[
                            styles.tab,
                            isActive ? styles.tabActive : '',
                            isCompleted ? styles.tabCompleted : '',
                            isActive ? styles[`tab-${a}`] : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => setActive(i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                        >
                          <span
                            className={[
                              styles.tabCircle,
                              isCompleted ? styles.circleCompleted : '',
                              isActive ? styles[`circle-${a}`] : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            aria-hidden="true"
                          >
                            {isCompleted ? <CheckIcon /> : p.num}
                          </span>
                          <span className={styles.tabName}>{p.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Progress counter + bar */}
                <div className={styles.progress}>
                  <div className={styles.progressMeta}>
                    <span className={styles.progressCount} aria-live="polite" aria-atomic="true">
                      {String(active + 1).padStart(2, '0')} / 06
                    </span>
                    <button
                      className={styles.skipBtn}
                      onClick={() =>
                        document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })
                      }
                      aria-label="Skip phases, scroll to proof section"
                    >
                      Skip ↓
                    </button>
                  </div>
                  <div
                    className={styles.progressBar}
                    role="progressbar"
                    aria-valuenow={active + 1}
                    aria-valuemin={1}
                    aria-valuemax={6}
                    aria-label={`Phase ${active + 1} of 6`}
                  >
                    <div
                      className={styles.progressFill}
                      style={{ width: `${((active + 1) / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </nav>

              {/* Right: detail card */}
              <div className={styles.detail}>
                {renderDetailCard(active)}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
    {/* Scroll budget: 5 phase transitions × 350px = 1750px (desktop only) */}
    <div className={styles.scrollSpacer} aria-hidden="true" />
    </div>
  );
}

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
  tools: string[];
  dur: string;
  bullets: [string, string, string];
  youGet: string;
  panel: () => React.ReactElement;
}

/* ── Sub-panel components ──────────────────────────────────────────── */
/* Each panel mirrors the demonstration shown on the current
   digitalpampas.com "How I build" section, faithfully. */

function IcpPanel() {
  const cards: { n: string; title: string; rows: [string, string][] }[] = [
    { n: '01', title: 'Firmographics',   rows: [['SIZE', '50-500 employees'], ['INDUSTRY', 'B2B SaaS'], ['REVENUE', '$1M-$50M ARR']] },
    { n: '02', title: 'Technographics',  rows: [['CRM', 'HubSpot, Salesforce'], ['TOOLS', 'Clay, Apollo'], ['STACK', 'Modern automation']] },
    { n: '03', title: 'Behavioral',      rows: [['DECISIONS', 'Data-driven'], ['ACTIVE', 'On LinkedIn'], ['CYCLE', '2-4 weeks']] },
    { n: '04', title: 'Success Signals', rows: [['PAIN', 'Manual work'], ['GOAL', 'Scale sales'], ['TRIGGERS', 'Funding, hiring']] },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>ICP Criteria</span>
        <span className={styles.liveIndicator} aria-label="Status: targeting active">● ICP TARGETING ACTIVE</span>
      </div>
      <div className={styles.icpGrid}>
        {cards.map((c) => (
          <div key={c.n} className={styles.icpCard}>
            <div className={styles.icpCardHead}>
              <span className={styles.icpCardNum} aria-hidden="true">{c.n}</span>
              <span className={styles.icpCardTitle}>{c.title}</span>
            </div>
            <div className={styles.icpRows}>
              {c.rows.map(([k, v]) => (
                <div key={k} className={styles.icpRow}>
                  <span className={styles.icpKey}>{k}</span>
                  <span className={styles.icpVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProspectPanel() {
  const rows: [string, string, string, string, string][] = [
    ['001', 'TechFlow', 'Sarah Chen, VP', 'SaaS', 'Qualified'],
    ['002', 'DataSync', 'Mike Rodriguez', 'Analytics', 'Qualified'],
    ['003', 'CloudVenture', 'Emma Thompson', 'Cloud', 'Qualified'],
    ['004', 'GrowthStack', 'James Park', 'MarTech', 'Qualified'],
    ['005', 'AutomateIO', 'Lisa Wang', 'Automation', 'Qualified'],
  ];
  const totals: [string, string][] = [['1,247', 'Total Prospects'], ['892', 'ICP Match'], ['98%', 'Data Quality']];
  return (
    <div className={styles.subPanel}>
      <div className={styles.prospectTable}>
        <div className={`${styles.prospectRow} ${styles.prospectHead}`}>
          <span className={styles.pcHash}>#</span>
          <span className={styles.pcCompany}>COMPANY</span>
          <span className={styles.pcContact}>CONTACT</span>
          <span className={styles.pcIndustry}>INDUSTRY</span>
          <span className={styles.pcStatus}>STATUS</span>
        </div>
        {rows.map((r) => (
          <div key={r[0]} className={styles.prospectRow}>
            <span className={styles.pcHash}>{r[0]}</span>
            <span className={styles.pcCompany}>{r[1]}</span>
            <span className={styles.pcContact}>{r[2]}</span>
            <span className={styles.pcIndustry}>{r[3]}</span>
            <span className={styles.pcStatus}><span className={styles.statusPill}>{r[4]}</span></span>
          </div>
        ))}
      </div>
      <div className={styles.prospectTotals}>
        {totals.map(([v, l]) => (
          <div key={l} className={styles.totalCell}>
            <span className={styles.totalVal}>{v}</span>
            <span className={styles.totalLbl}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnrichmentPanel() {
  const steps: { n: string; title: string; tools: string[]; result: string }[] = [
    { n: '1', title: 'Email Verification Waterfall', tools: ['Apollo', 'FindyMail', 'BetterContact'], result: 'Verified: sarah.chen@techflow.io (95% confidence)' },
    { n: '2', title: 'LinkedIn Profile Enrichment', tools: ['LinkedIn', 'Clay'], result: 'Profile: VP of Sales · 8 years exp · Stanford MBA' },
    { n: '3', title: 'Company Intelligence', tools: ['Clearbit', 'Crunchbase', 'BuiltWith'], result: '250 employees · $15M funding · HubSpot + Salesforce stack' },
    { n: '4', title: 'Buying Signals Detection', tools: ['AI Analysis', 'News API'], result: 'Hired 3 SDRs · Job posted for Sales Ops Manager' },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.enrichSteps}>
        {steps.map((s) => (
          <div key={s.n} className={styles.enrichStep}>
            <span className={styles.enrichNum} aria-hidden="true">{s.n}</span>
            <div className={styles.enrichBody}>
              <div className={styles.enrichTop}>
                <span className={styles.enrichTitle}>{s.title}</span>
                <span className={styles.chipRow}>
                  {s.tools.map((t) => (
                    <span key={t} className={styles.toolChip}>{t}</span>
                  ))}
                </span>
              </div>
              <span className={styles.enrichResult}>{s.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScorePanel() {
  const leads: { name: string; score: string; points: string[] }[] = [
    { name: 'TechFlow Solutions', score: '95', points: ['Perfect ICP fit: B2B SaaS, 250 employees, $15M funding', 'Hiring signal: 3 new SDRs, looking for Sales Ops Manager', 'Tech stack match: Using HubSpot + Salesforce'] },
    { name: 'CloudVenture Labs', score: '88', points: ['Strong fit: Cloud services, 180 employees, Series A', 'Funding signal: Just raised $10M Series A'] },
    { name: 'GrowthStack Inc', score: '82', points: ['Good fit: MarTech company, 120 employees', 'Using modern stack: Clay, Apollo already implemented'] },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>AI-Scored Leads</span>
      </div>
      <div className={styles.scoreLeads}>
        {leads.map((l) => (
          <div key={l.name} className={styles.leadCard}>
            <div className={styles.leadHead}>
              <span className={styles.leadName}>{l.name}</span>
              <span className={styles.leadScore}>{l.score}</span>
            </div>
            <ul className={styles.leadPoints}>
              {l.points.map((p) => (
                <li key={p} className={styles.leadPoint}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SequencePanel() {
  const touches: { day: string; channel: string; subject: string; preview: string }[] = [
    { day: 'Day 1', channel: 'EMAIL', subject: 'Quick question about your sales ops at {{company}}', preview: 'Hi {{first_name}}, Saw you recently hired {{hiring_signal}}. Curious — are you still manually qualifying leads?' },
    { day: 'Day 3', channel: 'LINKEDIN', subject: 'Connection Request + Note', preview: "Hi {{first_name}}, noticed we're both focused on scaling B2B sales. Would love to connect!" },
    { day: 'Day 6', channel: 'EMAIL', subject: 'Re: Quick question about your sales ops', preview: '{{first_name}}, I know {{company}} is focused on {{pain_point}}. Quick 15-min call this week?' },
    { day: 'Day 10', channel: 'EMAIL', subject: '[Case Study] How {{similar_company}} automated their pipeline', preview: '{{first_name}}, {{similar_company}} went from 0 to 10 qualified meetings in 30 days using our system.' },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.seqTouches}>
        {touches.map((t, i) => (
          <div key={i} className={styles.seqTouch}>
            <div className={styles.seqMeta}>
              <span className={styles.seqDayTag}>{t.day}</span>
              <span className={`${styles.seqChannel} ${t.channel === 'LINKEDIN' ? styles.seqChannelLi : styles.seqChannelEmail}`}>
                {t.channel}
              </span>
            </div>
            <span className={styles.seqSubject}>{t.subject}</span>
            <span className={styles.seqPreview}>{t.preview}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaunchPanel() {
  const metrics: { value: string; label: string; accent: 'cyan' | 'coral' }[] = [
    { value: '847', label: 'Emails Sent', accent: 'cyan' },
    { value: '156', label: 'Replies', accent: 'cyan' },
    { value: '18%', label: 'Reply Rate', accent: 'cyan' },
    { value: '12', label: 'Meetings', accent: 'coral' },
  ];
  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <span className={styles.subPanelTitle}>Campaign Dashboard</span>
        <span className={styles.liveIndicator} aria-label="Status: live">● LIVE</span>
      </div>
      <div className={styles.launchGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={`${styles.liveMetric} ${styles[`liveMetric-${m.accent}`]}`}>
            <span className={styles.liveVal}>{m.value}</span>
            <span className={styles.liveLbl}>{m.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.launchBanner}>
        <span className={styles.launchBannerTitle}>Campaign Performance: Exceeding Targets</span>
        <span className={styles.launchBannerText}>
          12 qualified meetings booked this week. 7 hot leads in active conversation. 2 deals moved to proposal stage.
        </span>
      </div>
    </div>
  );
}

/* ── Phase data ───────────────────────────────────────────────────── */
/* Narrative copy (title, description, bullets, YOU GET) is intentionally
   generic — no specific tool is named in the prose, since the process
   can run on many tools. Tool names live only in the demo chips/panels. */

const PHASES: Phase[] = [
  {
    num: '01',
    name: 'ICP Definition',
    title: 'Define Your Ideal Customer Profile',
    tools: ['Strategy Call'],
    dur: '~1 hour',
    bullets: [
      'Analyze your best customers and identify patterns',
      'Define key firmographic and demographic criteria',
      'Map decision-maker personas and pain points',
    ],
    youGet: 'Crystal-clear ICP document with targeting parameters',
    panel: IcpPanel,
  },
  {
    num: '02',
    name: 'List Building',
    title: 'Build Your Prospect List',
    tools: ['Apollo', 'LinkedIn Sales Nav'],
    dur: '~2 hours',
    bullets: [
      'Source prospects from multiple databases and platforms',
      'Apply ICP filters automatically for perfect matches',
      'Remove duplicates and clean bad data',
    ],
    youGet: '500-2000+ qualified prospects matching your ICP',
    panel: ProspectPanel,
  },
  {
    num: '03',
    name: 'Enrichment',
    title: 'Enrich With Deep Data',
    tools: ['Apollo', 'FindyMail', 'BetterContact', 'Clay Enrichment'],
    dur: '~2-3 hours',
    bullets: [
      'Triple-verify emails with waterfall enrichment approach',
      'Add LinkedIn profiles and detailed company information',
      'Detect buying signals like hiring, funding, and tech stack',
    ],
    youGet: '95%+ email accuracy with rich personalization data on every lead',
    panel: EnrichmentPanel,
  },
  {
    num: '04',
    name: 'AI Scoring',
    title: 'AI-Powered Lead Prioritization',
    tools: ['Claude AI', 'GPT-4', 'Clay AI'],
    dur: '~2-3 hours',
    bullets: [
      'Score leads by ICP fit and buying intent',
      'Detect pain points and trigger events automatically',
      'Generate unique personalization variables for each lead',
    ],
    youGet: 'Leads ranked by fit score with AI-generated talking points',
    panel: ScorePanel,
  },
  {
    num: '05',
    name: 'Sequences',
    title: 'Craft Your Outreach Sequences',
    tools: ['Instantly', 'Smartlead'],
    dur: '~2-3 hours',
    bullets: [
      'Write personalized email templates with variable insertion',
      'Set up multi-touch sequences (email + LinkedIn)',
      'Configure sending schedules and daily limits',
    ],
    youGet: 'Battle-tested email sequences ready to send',
    panel: SequencePanel,
  },
  {
    num: '06',
    name: 'Launch',
    title: 'Launch & Continuously Improve',
    tools: ['Campaign Dashboard'],
    dur: 'Ongoing',
    bullets: [
      'Monitor campaign performance daily with real-time dashboards',
      'Handle replies and qualify hot leads immediately',
      'Run A/B tests and iterate messaging based on data',
    ],
    youGet: '5-10 qualified conversations per week on autopilot',
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
            {p.tools.map((t) => (
              <span key={t} className={styles.badge}>{t}</span>
            ))}
            <span className={`${styles.badge} ${styles.badgeDur}`}>{p.dur}</span>
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
                      Skip
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

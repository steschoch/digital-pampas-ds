import { useState, useEffect } from 'react';
import styles from './HeroDiagram.module.css';

/* Inline glyphs — the DS does not depend on lucide brand icons. */
function Mail({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

function Linkedin({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

// ── Layout constants (px) ──────────────────────────────────────────
const CARD_H    = 40;             // height of each phase card
const CARD_GAP  = 2;              // gap between cards (Paper: gap 2px)
const SLOT      = CARD_H + CARD_GAP;  // 42px per slot
const STACK_PAD = 12;             // top padding inside stageBody
// 5 rows × 42px SLOT = 210px — must match translateY(-210px) in HeroDiagram.module.css

// ── Phase data ────────────────────────────────────────────────────
interface PhaseData {
  num:        string;
  name:       string;
  tool:       string;
  accent:     string;
  badgeBg:    string;
  badgeColor: string;
  isLaunch?:  true;
}

const PHASES: PhaseData[] = [
  { num: '01', name: 'Define ICP',  tool: 'Strategy Call',         accent: 'var(--dp-color-phase-cyan)',   badgeBg: 'color-mix(in srgb, var(--dp-color-phase-cyan) 12%, transparent)',        badgeColor: 'var(--dp-color-phase-cyan)' },
  { num: '02', name: 'Build List',  tool: 'Apollo · LinkedIn',     accent: 'var(--dp-color-phase-sky)',    badgeBg: 'color-mix(in srgb, var(--dp-color-phase-sky) 12%, transparent)',         badgeColor: 'var(--dp-color-phase-sky)' },
  { num: '03', name: 'Enrich',      tool: 'Waterfall',             accent: 'var(--dp-color-phase-violet)', badgeBg: 'color-mix(in srgb, var(--dp-color-phase-violet) 12%, transparent)',      badgeColor: 'var(--dp-color-phase-violet)' },
  { num: '04', name: 'AI Score',    tool: 'Claude · Clay AI',      accent: 'var(--dp-color-phase-plum)',   badgeBg: 'color-mix(in srgb, var(--dp-color-phase-plum-light) 12%, transparent)', badgeColor: 'var(--dp-color-phase-plum-light)' },
  { num: '05', name: 'Sequences',   tool: 'Instantly · Smartlead', accent: 'var(--dp-color-phase-coral)',  badgeBg: 'color-mix(in srgb, var(--dp-color-phase-coral) 12%, transparent)',       badgeColor: 'var(--dp-color-phase-coral)' },
  { num: '06', name: 'Launch',      tool: '',                      accent: 'var(--dp-color-phase-cyan)',   badgeBg: '',                                                                       badgeColor: 'var(--dp-color-phase-cyan)', isLaunch: true },
];

// ── Send icons (alternating Mail / LinkedIn, phase accent colours) ─
type IconType = 'mail' | 'linkedin';
const SEND_ICONS: { type: IconType; accent: string }[] = [
  { type: 'mail',     accent: 'var(--dp-color-phase-cyan)' },
  { type: 'linkedin', accent: 'var(--dp-color-phase-sky)' },
  { type: 'mail',     accent: 'var(--dp-color-phase-violet)' },
  { type: 'linkedin', accent: 'var(--dp-color-phase-plum-light)' },
  { type: 'mail',     accent: 'var(--dp-color-phase-coral)' },
  { type: 'linkedin', accent: 'var(--dp-color-phase-cyan)' },
];

// ── Timing (ms) ──────────────────────────────────────────────────
const PHASE_DELAYS = [200, 880, 1560, 2240, 2920, 3600] as const;
const SCROLL_START = 2920;  // phase 05 appears → stack starts scrolling
const SENDS_START  = 4900;  // sends content fades in after 1.8s scroll
const ICON_STRIDE  = 300;   // ms between each icon appearing
const BOOKED_AT    = 6900;  // Meeting Booked card appears
const COUNT_START  = 7250;  // count ticks 0 → 12 in first stat box
const CYCLE_MS     = 11000;

// ── Phase card (Paper visual, absolutely positioned) ──────────────
function PhaseCard({ phase, index }: { phase: PhaseData; index: number }) {
  const top = STACK_PAD + index * SLOT;
  return (
    <div
      className={`${styles.phaseCard} ${phase.isLaunch ? styles.phaseCardLaunch : ''}`}
      style={{
        top:             `${top}px`,
        '--row-accent':  phase.accent,
        '--badge-bg':    phase.badgeBg,
        '--badge-color': phase.badgeColor,
      } as React.CSSProperties}
    >
      <span className={styles.phaseNum}>{phase.num}</span>
      <span className={`${styles.phaseName} ${phase.isLaunch ? styles.phaseNameLaunch : ''}`}>
        {phase.name}
      </span>
      {phase.isLaunch ? (
        <span className={styles.launchLive}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
          </svg>
          Live
        </span>
      ) : (
        <span className={styles.badge}>{phase.tool}</span>
      )}
    </div>
  );
}

// ── Sends section ─────────────────────────────────────────────────
interface SendsProps {
  iconCount: number;
  booked:    boolean;
  count:     number;
  noAnim?:   boolean;
}

function SendsSection({ iconCount, booked, count, noAnim }: SendsProps) {
  const sendsTop = STACK_PAD + CARD_H + 14; // 66px — just below Launch card
  return (
    <div
      className={`${styles.sendsContent} ${noAnim ? styles.sendsNoAnim : ''}`}
      style={{ top: `${sendsTop}px` }}
    >
      <span className={styles.sendsArrow} aria-hidden="true">↓</span>

      <div className={styles.iconsRow}>
        {SEND_ICONS.slice(0, iconCount).map(({ type, accent }, i) => (
          <div
            key={i}
            className={`${styles.iconBubble} ${noAnim ? styles.iconNoAnim : ''}`}
            style={{ '--bubble-accent': accent } as React.CSSProperties}
          >
            {type === 'mail'
              ? <Mail size={12} />
              : <Linkedin size={12} />}
          </div>
        ))}
      </div>

      {booked && (
        <>
          <span className={styles.sendsArrow} aria-hidden="true">↓</span>

          <div className={`${styles.meetingCard} ${noAnim ? styles.meetingNoAnim : ''}`}>
            <div className={styles.meetingCheck} aria-hidden="true">✓</div>
            <span className={styles.meetingTitle}>Meeting Booked</span>
          </div>

          <div className={`${styles.statsGrid} ${noAnim ? styles.statsNoAnim : ''}`}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{count}</span>
              <span className={styles.statDesc}>qualified meetings booked this week</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>7</span>
              <span className={styles.statDesc}>hot leads in active conversation</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>2</span>
              <span className={styles.statDesc}>deals moved to proposal stage</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Diagram header (shared) ───────────────────────────────────────
function DiagramHeader() {
  return (
    <div className={styles.header}>
      <span className={styles.headerLabel}>OUTBOUND MACHINE</span>
      <div className={styles.headerDots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={`${styles.dot} ${styles.dotCyan}`} />
      </div>
    </div>
  );
}

// ── Static fallback (prefers-reduced-motion) ──────────────────────
function StaticDiagram() {
  return (
    <div aria-hidden="true" className={styles.container}>
      <DiagramHeader />
      <div className={styles.stageBody}>
        <div className={`${styles.phaseStack} ${styles.phaseStackFinal}`}>
          {PHASES.map((p, i) => <PhaseCard key={p.num} phase={p} index={i} />)}
        </div>
        <SendsSection iconCount={6} booked count={12} noAnim />
      </div>
    </div>
  );
}

// ── Animated diagram ──────────────────────────────────────────────
function AnimatedDiagram() {
  const [phaseCount,  setPhaseCount]  = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showSends,   setShowSends]   = useState(false);
  const [iconCount,   setIconCount]   = useState(0);
  const [booked,      setBooked]      = useState(false);
  const [count,       setCount]       = useState(0);
  const [cycleKey,    setCycleKey]    = useState(0);

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    const q = (fn: () => void, ms: number) => ids.push(setTimeout(fn, ms));

    setPhaseCount(0);
    setIsScrolling(false);
    setShowSends(false);
    setIconCount(0);
    setBooked(false);
    setCount(0);

    PHASE_DELAYS.forEach((ms, i) => q(() => setPhaseCount(i + 1), ms));

    q(() => setIsScrolling(true),  SCROLL_START);
    q(() => setShowSends(true),    SENDS_START);

    for (let i = 0; i < 6; i++) {
      const n = i + 1;
      q(() => setIconCount(n), SENDS_START + 200 + i * ICON_STRIDE);
    }

    q(() => setBooked(true), BOOKED_AT);

    for (let n = 1; n <= 12; n++) {
      q(() => setCount(n), COUNT_START + (n - 1) * 65);
    }

    q(() => setCycleKey(k => k + 1), CYCLE_MS);

    return () => ids.forEach(clearTimeout);
  }, [cycleKey]);

  return (
    <div aria-hidden="true" className={styles.container}>
      <DiagramHeader />
      <div className={styles.stageBody}>

        <div className={`${styles.phaseStack} ${isScrolling ? styles.phaseStackScrolling : ''}`}>
          {PHASES.slice(0, phaseCount).map((p, i) => (
            <PhaseCard key={p.num} phase={p} index={i} />
          ))}
        </div>

        {showSends && (
          <SendsSection iconCount={iconCount} booked={booked} count={count} />
        )}

      </div>
    </div>
  );
}

// ── Export ────────────────────────────────────────────────────────
export function HeroDiagram() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);
  return reduced ? <StaticDiagram /> : <AnimatedDiagram />;
}

import { useState, useEffect, useRef } from 'react'
import { AnimatedSection } from '../AnimatedSection'
import styles from './Proof.module.css'

type Accent = 'cyan' | 'coral' | 'indigo'

export interface ProofCase {
  client: string
  category: string
  numVal: number
  suffix: string
  metric: string
  bullet: string
  accent: Accent
  href: string
}

export interface ProofTestimonial {
  quote: string
  author: string
  role: string
}

export interface ProofProps {
  eyebrow?: string
  title?: string
  intro?: string
  cases?: ProofCase[]
  testimonials?: ProofTestimonial[]
  viewAllLabel?: string
  viewAllHref?: string
  id?: string
}

const DEFAULT_CASES: ProofCase[] = [
  { client: 'Tremmun', category: 'B2B SaaS', numVal: 40, suffix: '%', metric: 'reply rate', bullet: '10 qualified meetings booked', accent: 'cyan', href: '/case-studies/tremmun' },
  { client: 'Swiss Outbound Agency', category: 'Multi-language infrastructure', numVal: 6, suffix: '', metric: 'campaigns running in parallel', bullet: '3 languages · 1 infrastructure', accent: 'coral', href: '/case-studies/swiss-agency' },
  { client: 'Elite Cybersecurity', category: 'Enterprise outbound', numVal: 25, suffix: 'k', metric: 'contacts · 12 campaigns · 9 wks', bullet: 'Full infrastructure handed over', accent: 'indigo', href: '/case-studies/cybersecurity' },
]

const DEFAULT_TESTIMONIALS: ProofTestimonial[] = [
  { quote: 'The system was live in 3 weeks. We started booking meetings in week four.', author: 'Esteban Prospero', role: 'Co-founder, Tremmun' },
  { quote: 'Best investment we made in outbound. The data quality alone was worth it.', author: 'Arthur Flores Duarte', role: 'Senior Data Analytics Engineer, Moai Tech' },
]

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    started.current = true
    const steps = 40
    const stepMs = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current++
      setCount(Math.round((current / steps) * target))
      if (current >= steps) clearInterval(timer)
    }, stepMs)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return count
}

function CaseCard({ c, delay }: { c: ProofCase; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); ob.disconnect() }
    }, { threshold: 0.2 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  const count = useCountUp(c.numVal, inView)

  return (
    <AnimatedSection animation="fade-up" delay={delay} once className={styles.cardWrapper}>
      <div ref={ref} className={styles.card}>
        <span className={styles.clientName}>{c.client}</span>
        <span className={styles.clientCategory}>{c.category}</span>
        <div className={[styles.bigNumber, styles[`num-${c.accent}` as `num-${Accent}`]].join(' ')}>
          {count}{c.suffix}
        </div>
        <p className={styles.metricLabel}>{c.metric}</p>
        <p className={styles.bullet}>
          <span aria-hidden="true">•</span> {c.bullet}
        </p>
        <a href={c.href} className={styles.caseLink}>Read case →</a>
      </div>
    </AnimatedSection>
  )
}

/**
 * Proof — social proof section: animated metric cards (count-up) + testimonials.
 */
export function Proof({
  eyebrow = 'PROOF',
  title = 'Real systems. Real numbers.',
  intro = "Every system ships with numbers attached. Did it move the metric? Here's a sample.",
  cases = DEFAULT_CASES,
  testimonials = DEFAULT_TESTIMONIALS,
  viewAllLabel = 'View all case studies →',
  viewAllHref = '/case-studies',
  id = 'cases',
}: ProofProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>

        <AnimatedSection animation="fade-up" once>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.intro}>{intro}</p>
        </AnimatedSection>

        <div className={styles.grid}>
          {cases.map((c, i) => (
            <CaseCard key={c.client} c={c} delay={i * 100} />
          ))}
        </div>

        <div className={styles.testimonials}>
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 120} once>
              <blockquote className={styles.testimonial}>
                <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>
                <footer className={styles.attribution}>
                  {t.author} &middot; {t.role}
                </footer>
              </blockquote>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-up" once delay={200} className={styles.viewAllRow}>
          <a href={viewAllHref} className={styles.viewAllBtn}>{viewAllLabel}</a>
        </AnimatedSection>

      </div>
    </section>
  )
}

import { useState } from 'react'
import { AnimatedSection } from '../AnimatedSection'
import styles from './FinalCTA.module.css'

type FormState = 'idle' | 'submitting' | 'success'

export interface FinalCTAProps {
  title?: string
  sub?: string
  small?: string
  bookHref?: string
  /** Called on form submit. If omitted, a demo success state is shown after ~1s. */
  onSubmit?: (fields: { name: string; email: string; website: string; message: string }) => void
  id?: string
}

function CalendarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="32" height="28" rx="4" stroke="var(--dp-color-primary)" strokeWidth="2" />
      <path d="M4 16H36" stroke="var(--dp-color-primary)" strokeWidth="2" />
      <path d="M13 4V10" stroke="var(--dp-color-primary)" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 4V10" stroke="var(--dp-color-primary)" strokeWidth="2" strokeLinecap="round" />
      <rect x="11" y="22" width="5" height="5" rx="1" fill="var(--dp-color-primary)" />
      <rect x="19" y="22" width="5" height="5" rx="1" fill="var(--dp-color-primary)" opacity="0.5" />
      <rect x="27" y="22" width="5" height="5" rx="1" fill="var(--dp-color-primary)" opacity="0.5" />
    </svg>
  )
}

/**
 * FinalCTA — closing call-to-action. Split panel: a booking card (Cal.com) and
 * a contact form. Pass `onSubmit` to wire the form to a backend.
 */
export function FinalCTA({
  title = 'Ready to build the machine?',
  sub = "Start with a 15-minute discovery call. No pitch deck. No commitment. We'll look at what you have and tell you, honestly, whether outbound infrastructure is the right move for you right now.",
  small = 'We take on a limited number of builds each month, just two or three, so every system gets built right. Either way, you leave with a clear read on your ICP, your domain health, and where your pipeline is leaking. Yours to keep, even if we never work together.',
  bookHref = 'https://cal.com',
  onSubmit,
  id = 'book-call',
}: FinalCTAProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({ name: '', email: '', website: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    onSubmit?.(fields)
    setTimeout(() => setFormState('success'), 1000)
  }

  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>

        <AnimatedSection animation="fade-up" once>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.sub}>{sub}</p>
          <p className={styles.small}>{small}</p>
        </AnimatedSection>

        <div className={styles.split}>
          <AnimatedSection animation="slide-left" once delay={80} className={styles.panelWrapper}>
            <div className={styles.panel}>
              <CalendarIcon />
              <h3 className={styles.panelTitle}>Book a call</h3>
              <p className={styles.panelSub}>15 minutes · Pick a time that works for you</p>
              <a href={bookHref} target="_blank" rel="noopener noreferrer" className={styles.bookButton}>
                Book a call
              </a>
              <p className={styles.poweredBy}>Powered by Cal.com</p>
            </div>
          </AnimatedSection>

          <div className={styles.divider} aria-hidden="true">
            <div className={styles.dividerLine} />
            <span className={styles.dividerOr}>OR</span>
            <div className={styles.dividerLine} />
          </div>

          <AnimatedSection animation="slide-right" once delay={160} className={styles.panelWrapper}>
            {formState === 'success' ? (
              <div className={styles.successMsg} role="status">
                <span className={styles.successCheck} aria-hidden="true">✓</span>
                <p className={styles.successBody}>
                  Got it. We'll get back to you within one business day. Check your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h3 className={styles.formHeading}>Prefer email?</h3>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="cta-name" className={styles.label}>Name</label>
                    <input id="cta-name" name="name" type="text" required autoComplete="name" className={styles.input} value={fields.name} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="cta-email" className={styles.label}>Email</label>
                    <input id="cta-email" name="email" type="email" required autoComplete="email" className={styles.input} value={fields.email} onChange={handleChange} />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="cta-website" className={styles.label}>Company website</label>
                  <input id="cta-website" name="website" type="url" autoComplete="url" className={styles.input} value={fields.website} onChange={handleChange} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="cta-message" className={styles.label}>What are you trying to fix?</label>
                  <textarea id="cta-message" name="message" required rows={4} className={styles.textarea} value={fields.message} onChange={handleChange} />
                </div>

                <button type="submit" className={styles.submit} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Sending…' : 'Send'}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>

      </div>
    </section>
  )
}

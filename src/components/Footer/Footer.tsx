import { useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import styles from './Footer.module.css'

/* Inline social icons — the DS does not depend on brand icons (recent lucide
   versions dropped them). Each bakes in aria-hidden and accepts a `size`. */
type SocialIconProps = { size?: number }

function LinkedinIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function MailIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  )
}

function YoutubeIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  )
}

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterSocial {
  label: string
  href: string
  Icon: ComponentType<{ size?: number }>
}

export interface FooterFounder {
  name: string
  role: string
  location: string
  linkedinHref: string
  photoSrc: string
  /** Alt text for the photo. Defaults to the founder's name. */
  photoAlt?: string
}

export interface FooterProps {
  columns?: FooterColumn[]
  social?: FooterSocial[]
  tagline?: ReactNode
  /** Contact email used in the "Got a question?" band. */
  email?: string
  logoSrc?: string
  logoLightSrc?: string
  legal?: string
  newsletterHeading?: string
  /** Called with the submitted email. If omitted, a local success state is shown. */
  onNewsletterSubmit?: (email: string) => void
  /** Optional founder/person card shown in the brand column. Omit to hide. */
  founder?: FooterFounder
  /** Optional client portal link (login CTA) shown in the brand column. Omit to hide. */
  portalHref?: string
  portalLabel?: string
  id?: string
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Full-stack build', href: '#how-it-works' },
      { label: 'Agency partner', href: '#how-it-works' },
      { label: 'Technical audit', href: '#how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '#book-call' },
    ],
  },
  {
    title: 'Resources',
    links: [{ label: 'Blog', href: '/blog' }],
  },
]

const DEFAULT_SOCIAL: FooterSocial[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/digital-pampas', Icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hello@digitalpampas.com', Icon: MailIcon },
  { label: 'YouTube', href: 'https://youtube.com/@digitalpampas', Icon: YoutubeIcon },
]

function NewsletterBand({
  heading,
  onSubmit,
}: {
  heading: string
  onSubmit?: (email: string) => void
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    onSubmit?.(email)
    setSubmitted(true)
  }

  return (
    <div className={styles.newsletterBand}>
      <div className={styles.newsletterInner}>
        {submitted ? (
          <p className={styles.newsletterSuccess}>Thanks! You're on the list.</p>
        ) : (
          <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
            <h2 className={styles.newsletterHeading}>{heading}</h2>
            <input
              type="email"
              placeholder="your@email.com"
              className={styles.newsletterInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" className={styles.newsletterBtn}>Submit</button>
          </form>
        )}
      </div>
    </div>
  )
}

/**
 * Footer — site footer: newsletter band, "got a question" email band, brand +
 * social + link columns, and a legal strip. All content is prop-driven with
 * Digital Pampas defaults.
 */
export function Footer({
  columns = DEFAULT_COLUMNS,
  social = DEFAULT_SOCIAL,
  tagline = 'We build the machine. You own it.',
  email = 'hello@digitalpampas.com',
  logoSrc = '/logo-footer.png',
  logoLightSrc = '/logo-footer-light.png',
  legal = '© 2026 Digital Pampas · B2B outbound infrastructure',
  newsletterHeading = 'Sign up to our newsletter',
  onNewsletterSubmit,
  founder,
  portalHref,
  portalLabel = 'Client Portal',
  id = 'about',
}: FooterProps) {
  return (
    <footer className={styles.footer} id={id}>
      <NewsletterBand heading={newsletterHeading} onSubmit={onNewsletterSubmit} />

      <div className={styles.emailBand}>
        <div className={styles.emailBandInner}>
          <span className={styles.emailPrompt}>Got a question?</span>
          <a href={`mailto:${email}`} className={styles.emailLink} aria-label={`Send email to ${email}`}>
            Send us an email&nbsp;→
          </a>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <div className={styles.brand}>
            <a href="/" className={styles.logoRow} aria-label="Digital Pampas home">
              <img src={logoSrc} alt="Digital Pampas" className={`${styles.logoImg} ${styles.logoDark}`} />
              <img src={logoLightSrc} alt="Digital Pampas" className={`${styles.logoImg} ${styles.logoLight}`} aria-hidden="true" />
            </a>

            <p className={styles.tagline}>{tagline}</p>

            {founder && (
              <div className={styles.founder}>
                <img
                  src={founder.photoSrc}
                  alt={founder.photoAlt ?? founder.name}
                  className={styles.founderPhoto}
                  width={72}
                  height={72}
                  loading="lazy"
                />
                <p className={styles.founderName}>{founder.name}</p>
                <p className={styles.founderRole}>{founder.role}</p>
                <p className={styles.founderLocation}>{founder.location}</p>
                <a
                  href={founder.linkedinHref}
                  className={styles.founderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn&nbsp;→
                </a>
              </div>
            )}
          </div>

          <nav className={styles.columns} aria-label="Footer navigation">
            <div className={styles.column}>
              <p className={styles.colTitle}>Connect</p>
              <div className={styles.socialIcons}>
                {social.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={styles.socialIcon}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            {portalHref && (
              <div className={styles.column}>
                <p className={styles.colTitle}>Access</p>
                <a
                  href={portalHref}
                  className={styles.portalLink}
                  {...(portalHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {portalLabel}&nbsp;→
                </a>
              </div>
            )}
            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul className={styles.colLinks} role="list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={styles.colLink}
                        {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.legal}>
        <div className={styles.legalInner}>
          <p className={styles.legalText}>{legal}</p>
        </div>
      </div>
    </footer>
  )
}

import styles from './SocialIcon.module.css'

export type SocialIconName = 'linkedin' | 'mail' | 'youtube' | 'tiktok' | 'x'

export interface SocialIconProps {
  name: SocialIconName
  /** Size in px. Defaults to the semantic icon size `--dp-sem-icon-size-md` (20px). */
  size?: number
  /** Accessible label. If omitted, the icon is decorative (aria-hidden). */
  title?: string
  className?: string
}

/**
 * SocialIcon — Digital Pampas brand/social glyphs (LinkedIn, Mail, YouTube).
 * These are NOT Lucide icons — recent Lucide dropped brand icons, so the DS
 * ships its own. They use `currentColor` (inherit color via tokens) and the
 * semantic icon-size scale.
 */
export function SocialIcon({ name, size, title, className }: SocialIconProps) {
  const dim = size ?? 'var(--dp-sem-icon-size-md)'
  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true }

  return (
    <svg
      className={[styles.icon, className].filter(Boolean).join(' ')}
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      {...a11y}
    >
      {title && <title>{title}</title>}
      {name === 'linkedin' && (
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
        />
      )}
      {name === 'mail' && (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </g>
      )}
      {name === 'youtube' && (
        <path
          fill="currentColor"
          d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"
        />
      )}
      {name === 'tiktok' && (
        <path
          fill="currentColor"
          d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.02v12.2a2.44 2.44 0 1 1-2.44-2.44c.25 0 .49.04.72.11V9.78a5.6 5.6 0 0 0-.72-.05 5.53 5.53 0 1 0 5.53 5.53V9.01a7.3 7.3 0 0 0 4.28 1.37V7.35a4.28 4.28 0 0 1-3.29-1.53z"
        />
      )}
      {name === 'x' && (
        <path
          fill="currentColor"
          d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.4l-5.8-7.58L4.16 22.5H.48l8.6-9.83L0 1.5h7.6l5.24 6.93L18.9 1.5zm-1.29 18.8h2.04L6.48 3.6H4.29L17.61 20.3z"
        />
      )}
    </svg>
  )
}

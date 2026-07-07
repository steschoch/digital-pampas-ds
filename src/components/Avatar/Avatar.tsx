import styles from './Avatar.module.css'

export interface AvatarProps {
  /** Full name — used to derive initials and as the alt/label. */
  name: string
  src?: string
  size?: number
  className?: string
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Avatar — user/client avatar. Shows an image when `src` is given, otherwise
 * initials derived from `name` on a tinted surface.
 */
export function Avatar({ name, src, size = 36, className }: AvatarProps) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.4) }
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={[styles.avatar, styles.img, className].filter(Boolean).join(' ')}
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span
      className={[styles.avatar, className].filter(Boolean).join(' ')}
      style={style}
      role="img"
      aria-label={name}
      title={name}
    >
      {initials(name)}
    </span>
  )
}

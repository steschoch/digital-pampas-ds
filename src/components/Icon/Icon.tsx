import type { ComponentType } from 'react'
import * as Icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import styles from './Icon.module.css'

const SIZE_MAP = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const

type IconSize = keyof typeof SIZE_MAP
export type IconName = keyof typeof Icons

interface IconProps extends Omit<LucideProps, 'size'> {
  name: IconName
  size?: IconSize
}

export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const LucideIcon = Icons[name] as ComponentType<LucideProps> | undefined
  if (!LucideIcon || typeof LucideIcon !== 'function') return null
  return (
    <LucideIcon
      size={SIZE_MAP[size]}
      className={`${styles.icon} ${className ?? ''}`}
      {...props}
    />
  )
}

import type { ComponentType } from 'react'
import { icons } from 'lucide-react'
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
export type IconName = keyof typeof icons

interface IconProps extends Omit<LucideProps, 'size'> {
  name: IconName
  size?: IconSize
}

export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const LucideIcon = icons[name] as ComponentType<LucideProps> | undefined
  if (!LucideIcon) return null
  return (
    <LucideIcon
      size={SIZE_MAP[size]}
      className={`${styles.icon} ${className ?? ''}`}
      {...props}
    />
  )
}

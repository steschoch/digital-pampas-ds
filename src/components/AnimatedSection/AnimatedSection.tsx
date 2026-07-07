import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'
import styles from './AnimatedSection.module.css'

/*
 * AnimatedSection — reveals its children with a scroll-triggered entrance.
 *
 * Usage examples:
 *
 * // Basic usage
 * <AnimatedSection>
 *   <SectionHeader />
 * </AnimatedSection>
 *
 * // Staggered cards
 * <AnimatedSection delay={0}><Card /></AnimatedSection>
 * <AnimatedSection delay={100}><Card /></AnimatedSection>
 * <AnimatedSection delay={200}><Card /></AnimatedSection>
 *
 * // Slide in from left, render as <section>
 * <AnimatedSection animation="slide-left" as="section">
 *   <ProcessStep />
 * </AnimatedSection>
 *
 * // Re-animates every time it enters viewport
 * <AnimatedSection once={false}>
 *   <StatsBar />
 * </AnimatedSection>
 */

type Animation = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'

type AnimatedSectionProps = {
  children: ReactNode
  animation?: Animation
  delay?: number
  threshold?: number
  once?: boolean
  className?: string
  as?: ElementType
}

export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true,
  className,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <Tag
      ref={ref}
      className={[
        styles.animated,
        styles[animation],
        visible ? styles.visible : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

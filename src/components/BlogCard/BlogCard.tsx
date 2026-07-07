import type { ReactNode } from 'react'
import { AnimatedSection } from '../AnimatedSection'
import styles from './BlogCard.module.css'

export interface BlogPostLike {
  title: string
  excerpt: string
  tags: string[]
  date: string
  readTime: string
  slug: string
}

/** Renders the "Read post" link. Default is a plain <a>; pass a router link if needed. */
export type LinkRenderer = (props: {
  href: string
  className?: string
  'aria-label'?: string
  children: ReactNode
}) => ReactNode

export interface BlogCardProps {
  post: BlogPostLike
  delay?: number
  /** Base path for the post link. Default: "/blog". */
  hrefBase?: string
  /** Custom link renderer (e.g. a router Link). Default renders an <a>. */
  renderLink?: LinkRenderer
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const defaultRenderLink: LinkRenderer = ({ href, className, children, ...rest }) => (
  <a href={href} className={className} {...rest}>{children}</a>
)

/**
 * BlogCard — article preview for the blog index: tags, title, excerpt, and a
 * meta footer with a "Read post" link. Router-agnostic via `renderLink`.
 */
export function BlogCard({ post, delay = 0, hrefBase = '/blog', renderLink = defaultRenderLink }: BlogCardProps) {
  const href = `${hrefBase}/${post.slug}`
  return (
    <AnimatedSection animation="fade-up" delay={delay} once className={styles.cardWrapper}>
      <article className={styles.card}>
        <div className={styles.tags} aria-label="Tags">
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <h2 className={styles.cardTitle}>{post.title}</h2>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>

        <footer className={styles.cardFooter}>
          <div className={styles.cardMeta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            <span>{post.readTime}</span>
          </div>
          {renderLink({
            href,
            className: styles.readLink,
            'aria-label': `Read post: ${post.title}`,
            children: 'Read post →',
          })}
        </footer>
      </article>
    </AnimatedSection>
  )
}

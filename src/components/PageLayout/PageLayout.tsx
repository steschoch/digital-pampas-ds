import type { ReactNode } from 'react'
import { Nav } from '../Nav'
import type { NavProps } from '../Nav'
import { Footer } from '../Footer'
import type { FooterProps } from '../Footer'

export interface PageLayoutProps {
  children: ReactNode
  /** Current route path, forwarded to Nav (router-agnostic). */
  pathname?: string
  /** Extra props forwarded to the Nav. */
  navProps?: Omit<NavProps, 'pathname'>
  /** Extra props forwarded to the Footer. */
  footerProps?: FooterProps
}

/**
 * PageLayout — the standard page shell: Nav + <main> + Footer. Wrap routed
 * pages with it so the header/footer stay consistent. Router-agnostic.
 */
export function PageLayout({ children, pathname, navProps, footerProps }: PageLayoutProps) {
  return (
    <>
      <Nav pathname={pathname} {...navProps} />
      <main>{children}</main>
      <Footer {...footerProps} />
    </>
  )
}

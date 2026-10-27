import type { ReactNode } from 'react'

export type Locale = 'zh' | 'en'
export interface HostConfig {
  basePath?: string
  brandName?: string | Partial<Record<Locale, string>>
  logo?: string
  marketplaceHref?: string
  marketplaceAriaLabel?: Partial<Record<Locale, string>>
  footerExtra?: ReactNode
}

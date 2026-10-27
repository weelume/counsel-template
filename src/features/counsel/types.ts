import type { ReactNode } from 'react'

export type Locale = 'zh' | 'en'
export interface HostConfig {
  email?: string
  phone?: string
  phoneHref?: string
  basePath?: string
  brandName?: string | Partial<Record<Locale, string>>
  logo?: string
  marketplaceHref?: string
  marketplaceAriaLabel?: Partial<Record<Locale, string>>
  footerExtra?: ReactNode
}

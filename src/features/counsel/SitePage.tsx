'use client'

import { Suspense } from 'react'
import { CounselHostProvider, useCounselHost } from './host'
import { Shell } from './components/Shell'
import { HomePage, AboutPage, InsidePage, ProgrammesPage, EnquirePage, PrivacyPage } from './pages/PracticePages'
import { ContactPage } from './pages/ContactPage'
import { JournalPage } from './pages/JournalPage'
import type { Locale } from './types'
import './theme.css'

export interface SitePageProps { locale?: Locale; basePath: string; slug: string }
export default function SitePage({ locale = 'zh', basePath, slug }: SitePageProps) {
  const host = useCounselHost()
  const pages = { '': HomePage, about: AboutPage, inside: InsidePage, programmes: ProgrammesPage, enquire: EnquirePage, privacy: PrivacyPage }
  const Component = pages[slug as keyof typeof pages]
  let content: React.ReactNode
  if (slug === 'contact') content = <ContactPage locale={locale} />
  else if (slug === 'journal' || slug.startsWith('journal/')) content = <Shell locale={locale}><JournalPage locale={locale} slug={slug === 'journal' ? undefined : slug.slice(8)} /></Shell>
  else if (Component) content = <Shell locale={locale}><Component locale={locale} /></Shell>
  else throw new Error(`未知页面: ${slug}`)
  return <CounselHostProvider {...host} basePath={basePath}><Suspense>{content}</Suspense></CounselHostProvider>
}

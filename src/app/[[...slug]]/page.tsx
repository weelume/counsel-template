import { notFound } from 'next/navigation'
import { articles } from '../../features/counsel/content/articles'
import SitePage from '../../features/counsel/SitePage'

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const segments = (await params).slug ?? []
  const english = segments[0] === 'en'
  const path = english ? segments.slice(1) : segments
  const locale = english ? 'en' : 'zh'
  const slug = path.join('/')
  const pages = ['', 'about', 'inside', 'programmes', 'enquire', 'privacy', 'contact', 'journal']
  if (!pages.includes(slug) && !(path[0] === 'journal' && path.length === 2 && articles.some(item => item.slug === path[1]))) notFound()
  return <SitePage locale={locale} basePath="" slug={slug} />
}

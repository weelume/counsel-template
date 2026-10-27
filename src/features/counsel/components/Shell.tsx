'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useCounselHost } from '../host'
import type { Locale } from '../types'

const links = [['programmes', '服务项目', 'Programmes'], ['about', '关于我们', 'About'], ['inside', '服务详情', 'Inside'], ['journal', '文章', 'Journal'], ['enquire', '预约对话', 'Request a conversation']] as const

export function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { basePath = '', brandName = 'The Counsel', logo, marketplaceHref, marketplaceAriaLabel, footerExtra } = useCounselHost()
  const name = typeof brandName === 'string' ? brandName : (brandName[locale] ?? 'The Counsel')
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const query = useSearchParams().toString()
  const prefix = `${basePath}${locale === 'en' ? '/en' : ''}`
  const target = (path: string) => `${prefix}/${path}`.replace(/\/$/, '') || '/'
  // 语言切换保留当前页面、查询参数和锚点。
  const switchLanguage = () => {
    const suffix = pathname.slice(basePath.length).replace(/^\/en(?=\/|$)/, '')
    const next = `${basePath}${locale === 'zh' ? '/en' : ''}${suffix || '/'}`
    router.push(`${next}${query ? `?${query}` : ''}${window.location.hash}`)
    setOpen(false)
  }
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = original; window.removeEventListener('keydown', onKey) }
  }, [open])
  return <div className="counsel" lang={locale === 'zh' ? 'zh-CN' : 'en'}>
    <header className="counsel-header"><Link className="counsel-brand" href={target('')}><img src={logo ?? '/templates/counsel/logo.svg'} alt="" /> {name}</Link>
      <nav className={open ? 'counsel-nav open' : 'counsel-nav'} aria-label={locale === 'zh' ? '主导航' : 'Main navigation'}>
        {links.map(([path, zh, en]) => <Link key={path} href={target(path)} onClick={() => setOpen(false)}>{locale === 'zh' ? zh : en}</Link>)}
        <button className="counsel-language" type="button" onClick={switchLanguage}>{locale === 'zh' ? 'EN' : '中文'}</button>
      </nav>
      <button ref={menuButton} className="counsel-menu" type="button" aria-expanded={open} aria-label={open ? (locale === 'zh' ? '关闭菜单' : 'Close menu') : (locale === 'zh' ? '打开菜单' : 'Open menu')} onClick={() => setOpen(!open)}><span /><span /></button>
    </header>
    <main>{children}</main>
    <footer className="counsel-footer"><div><Link className="counsel-brand" href={target('')}><img src={logo ?? '/templates/counsel/logo.svg'} alt="" />{name}</Link><p>{locale === 'zh' ? '为创始人与领导者提供私密咨询。' : 'Private coaching for founders and leaders.'}</p></div><div><small>{locale === 'zh' ? '探索' : 'THE HOUSE'}</small>{links.map(([path, zh, en]) => <Link key={path} href={target(path)}>{locale === 'zh' ? zh : en}</Link>)}<Link href={target('contact')}>{locale === 'zh' ? '联系我们' : 'Contact'}</Link><Link href={target('privacy')}>{locale === 'zh' ? '隐私' : 'Privacy'}</Link></div><p>© {new Date().getFullYear()} {name}</p>{footerExtra}</footer>
    {marketplaceHref && <Link className="counsel-marketplace" href={marketplaceHref} aria-label={marketplaceAriaLabel?.[locale] ?? (locale === 'zh' ? '打开模板市场' : 'Open template marketplace')}>{logo && <img src={logo} alt="" />}<span>{name}</span></Link>}
  </div>
}

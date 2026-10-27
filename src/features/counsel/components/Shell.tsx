'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCounselHost } from '../host'
import { brand } from '../config/brand'
import { languageHref, pageHref } from '../routing'
import { ease } from './Motion'
import type { Locale } from '../types'

const links = [['programmes', '服务项目', 'Programmes'], ['about', '关于我们', 'About'], ['inside', '服务详情', 'Inside'], ['journal', '文章', 'Journal'], ['enquire', '预约对话', 'Request a conversation']] as const
const subscribe = (fn: () => void) => { const mq = matchMedia('(max-width: 960px)'); mq.addEventListener('change', fn); return () => mq.removeEventListener('change', fn) }
const getMobile = () => matchMedia('(max-width: 960px)').matches

export function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { basePath = '', brandName = brand.name, logo = brand.logo, marketplaceHref, marketplaceAriaLabel, footerExtra, email = brand.email, phone = brand.phone } = useCounselHost()
  const name = typeof brandName === 'string' ? brandName : (brandName[locale] ?? brand.name)
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const mobile = useSyncExternalStore(subscribe, getMobile, () => false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)
  const header = useRef<HTMLElement>(null)
  const pathname = usePathname(), router = useRouter(), query = useSearchParams().toString()
  const target = (path: string) => pageHref(basePath, locale, path)
  const expanded = open && mobile
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('counsel-active')
    let frame = 0
    // 取导航下方靠近右边缘的可见区块，配色随内容切换；只在滚动帧中采样，不接管滚动。
    const updateTone = () => {
      frame = 0
      const y = (header.current?.getBoundingClientRect().bottom ?? 0) + 1
      const element = document.elementFromPoint(root.clientWidth - 1, y)
      root.classList.toggle('counsel-scroll-dark', Boolean(element?.closest('.counsel-hero,.counsel-dark,.counsel-programme-hero,.counsel-story,.counsel-footer')))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateTone) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      root.classList.remove('counsel-active', 'counsel-scroll-dark')
    }
  }, [pathname])
  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow, previousPadding = document.body.style.paddingRight
    const gutter = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.classList.add('counsel-menu-open')
    document.body.style.overflow = 'hidden'
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`
    nav.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const elements = [...(header.current?.querySelectorAll<HTMLElement>('a,button') ?? [])].filter(x => x.offsetParent !== null)
        const first = elements[0], last = elements.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.documentElement.classList.remove('counsel-menu-open'); document.body.style.overflow = previousOverflow; document.body.style.paddingRight = previousPadding; window.removeEventListener('keydown', onKey) }
  }, [expanded])
  const close = () => setOpen(false)
  const switchLanguage = () => { router.push(languageHref(pathname, basePath, locale === 'zh' ? 'en' : 'zh', query, window.location.hash)); close() }
  const i = locale === 'zh' ? 0 : 1
  return <div className="counsel" lang={i ? 'en' : 'zh-CN'}>
    <header ref={header} className="counsel-header"><div className="counsel-header-inner"><Link className="counsel-brand" href={target('')} onClick={close}><img src={logo} alt="" />{name}</Link>
      <motion.nav ref={nav} id="counsel-navigation" className={`counsel-nav ${expanded ? 'open' : ''}`} aria-label={i ? 'Main navigation' : '主导航'} initial={false} animate={mobile ? { height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 } : { height: 'auto', opacity: 1 }} transition={{duration:reduced?0:0.3,ease}} inert={mobile && !expanded}>
        {links.map(([path, zh, en]) => <Link key={path} className={path === 'enquire' ? 'counsel-nav-cta' : undefined} href={target(path)} onClick={close} aria-current={pathname === target(path) ? 'page' : undefined}>{i ? en : zh}</Link>)}
        <button className="counsel-language" type="button" onClick={switchLanguage} aria-label={i ? '切换到中文' : 'Switch to English'}>{i ? '中文' : 'EN'}</button>
      </motion.nav>
      <button ref={menuButton} className={`counsel-menu ${expanded ? 'open' : ''}`} type="button" aria-controls="counsel-navigation" aria-expanded={expanded} aria-label={expanded ? (i ? 'Close menu' : '关闭菜单') : (i ? 'Open menu' : '打开菜单')} onClick={() => setOpen(!open)}><span /><span /></button>
    </div></header>
    <main>{children}</main>
    <footer className="counsel-footer"><div className="counsel-footer-inner"><div className="counsel-footer-brand"><Link href={target('')}><img src={logo} alt="" /><strong>{name}</strong></Link><p>{i ? 'Private coaching for founders and leaders.' : '让每一次领导决策更有方向'}</p></div><div className="counsel-footer-links"><div><small>{i ? 'THE HOUSE' : '探索'}</small>{links.slice(1,4).map(([path,zh,en])=><Link href={target(path)} key={path}>{i?en:zh}</Link>)}</div><div><small>{i?'PROGRAMMES':'服务项目'}</small><Link href={target('programmes')}>{i?'The Programmes':'服务项目'}</Link><Link href={target('enquire')}>{i?'Request a Conversation':'预约一次对话'}</Link></div><div><small>{i?'GET IN TOUCH':'联系我们'}</small><a href={`mailto:${email}`}>{email}</a><Link href={target('contact')}>{i?'Contact':'联系'}</Link><span className="counsel-sr-only">{phone}</span></div></div><div className="counsel-footer-bottom"><span>© {brand.copyrightYear} {name}. {i?'All rights reserved.':'保留所有权利。'}</span><Link href={target('privacy')}>{i?'Privacy':'隐私'}</Link></div>{footerExtra && <div className="counsel-footer-extra">{footerExtra}</div>}</div></footer>
    {marketplaceHref && <Link className="counsel-marketplace" href={marketplaceHref} aria-label={marketplaceAriaLabel?.[locale] ?? (i ? 'Open template marketplace' : '打开模板市场')}><img src={logo} alt="" /><span>{name}</span></Link>}
  </div>
}

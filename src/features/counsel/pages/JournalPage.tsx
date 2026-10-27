'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { TextReveal } from '../components/Motion'
import { articles } from '../content/articles'
import { useCounselHost } from '../host'
import type { Locale } from '../types'

export function JournalPage({ locale, slug }: { locale: Locale; slug?: string }) {
  const index = locale === 'zh' ? 0 : 1
  const prefix = `${useCounselHost().basePath ?? ''}${locale === 'en' ? '/en' : ''}`
  const article = articles.find(item => item.slug === slug)
  const [submitted, setSubmitted] = useState(false)
  function subscribe(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true) }
  if (slug && !article) return null
  if (article) return <article className="counsel-article">
    <header className="counsel-article-header"><div className="counsel-article-meta"><Link href={`${prefix}/journal`}>← {locale === 'zh' ? '文章' : 'JOURNAL'}</Link><span>{locale === 'zh' ? '2026 年 5 月 27 日' : 'MAY 27, 2026'}　 {article.category[index]}</span></div>
      <h1><TextReveal text={article.title[index]} characters={index===0}/></h1><p>{article.summary[index]}</p></header>
    <div className="counsel-article-body"><aside><small>{locale === 'zh' ? '作者' : 'WRITTEN BY'}</small><h2>{article.author}</h2><p>{article.role[index]}</p></aside><div>{article.sections.map((section, i) => <section key={i}>{section.title[index] && <h2>{section.title[index]}</h2>}<p>{section.text[index]}</p>{i === 0 && <blockquote className="counsel-article-quote">{article.quote[index]}</blockquote>}</section>)}</div></div>
  </article>
  return <><section className="counsel-page-intro"><p className="counsel-eyebrow">{locale === 'zh' ? '文章' : 'JOURNAL'}</p><h1><TextReveal text={locale === 'zh' ? '关于这间对话室' : 'Why this room exists.'} characters={index===0}/></h1></section>
    <div className="counsel-journal-list">{articles.map(item => <article key={item.slug}><div><small>{locale === 'zh' ? '2026 年 5 月 27 日' : 'MAY 27, 2026'}</small><small>{item.category[index]}</small></div><div><h2>{item.title[index]}</h2><p>{item.summary[index]}</p><Link href={`${prefix}/journal/${item.slug}`}>{locale === 'zh' ? '阅读文章' : 'READ'}</Link></div></article>)}</div>
    <section className="counsel-newsletter"><div><p className="counsel-eyebrow">{locale === 'zh' ? '订阅通讯' : 'NEWSLETTER'}</p><h2>{locale === 'zh' ? '每季度一封，绝无骚扰' : 'Quarterly. No spam.'}</h2><p>{locale === 'zh' ? '每三个月分享一次我们的思考、工作和阅读。' : 'One email every three months. What we’ve been thinking about, working on, and reading.'}</p></div><form onSubmit={subscribe}><label><span className="counsel-sr-only">{locale === 'zh' ? '邮箱地址' : 'Email address'}</span><input type="email" required placeholder={locale === 'zh' ? '邮箱地址' : 'Email address'} /></label><button type="submit">{locale === 'zh' ? '订阅' : 'SUBSCRIBE'}</button><p role="status">{submitted ? (locale === 'zh' ? '校验通过。演示表单不会发送或保存信息。' : 'Valid input. This demo does not send or save information.') : (locale === 'zh' ? '演示表单仅作本地校验。' : 'Demo form: local validation only.')}</p></form></section></>
}

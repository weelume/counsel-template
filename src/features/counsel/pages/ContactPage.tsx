import { Suspense } from 'react'
import { Shell } from '../components/Shell'
import type { Locale } from '../types'

export function ContactPage({ locale }: { locale: Locale }) {
  const zh = locale === 'zh'
  return <Suspense><Shell locale={locale}><section className="counsel-contact"><img src="/templates/counsel/envelope.webp" alt="" /><p className="counsel-eyebrow">{zh ? '联系我们' : 'CONTACT'}</p><h1>{zh ? '写信给我们' : 'Write to us.'}</h1><p>{zh ? '每一封来信都由专人阅读和回复。' : 'Notes are read by a person, and answered by one.'}</p><div className="counsel-contact-details"><div><small>{zh ? '发送邮件' : 'Write to us'}</small><a href="mailto:hello@thecounsel.com">hello@thecounsel.com</a></div><div><small>{zh ? '致电' : 'Call us'}</small><a href="tel:+919004393374">+91 90043 93374</a></div></div></section></Shell></Suspense>
}

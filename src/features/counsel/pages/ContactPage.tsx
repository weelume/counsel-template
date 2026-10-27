'use client'
import type { Locale } from '../types'
import { useCounselHost } from '../host'
import { brand } from '../config/brand'
import { Reveal, TextReveal } from '../components/Motion'
export function ContactPage({locale}:{locale:Locale}) {
 const i=locale==='zh'?0:1, host=useCounselHost(), email=host.email??brand.email, phone=host.phone??brand.phone
 return <section className="counsel-contact"><Reveal><img src="/templates/counsel/envelope.webp" alt=""/></Reveal><p className="counsel-eyebrow">{i?'CONTACT':'联系我们'}</p><h1><TextReveal text={i?'Write to us.':'写信给我们'} characters={!i}/></h1><Reveal delay={0.15}><p>{i?'Notes are read by a person, and answered by one.':'每一封来信都由专人阅读和回复。'}</p></Reveal><div className="counsel-contact-details"><div><small>{i?'Write to us':'发送邮件'}</small><a href={`mailto:${email}`}>{email}</a></div><div><small>{i?'Call us':'致电'}</small><a href={host.phoneHref??brand.phoneHref}>{phone}</a></div></div></section>
}

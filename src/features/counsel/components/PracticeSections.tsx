'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useCounselHost } from '../host'
import { brand } from '../config/brand'
import type { Locale } from '../types'
import { roman, type Pair } from '../content/practice'
import { media } from '../content/media'
import { Reveal, TextReveal, ease } from './Motion'
export { Reveal } from './Motion'

const paths = [
  'M5 10h14v11H5zM8 10V6a4 4 0 018 0v4M12 14v3',
  'M12 3a9 9 0 100 18 9 9 0 000-18zM16 8l-3 5-5 3 3-5z',
  'M3 21V9h5V3h8v4h5v14M1 21h22M10 7h2m-2 4h2m-2 4h2m5-4h1m-1 4h1M6 13h1m-1 4h1',
  'M4 5h16v16H4zM8 2v6m8-6v6M4 10h16M9 14h2v4m3-4h2l-2 4h2',
  'M3 5h18v13H8l-5 4zM7 11h1m4 0h1m4 0h1',
  'M20 10a9 9 0 11-6-7M16 10a5 5 0 11-6-3M12 12l9-9m-5 0h5v5',
]
function LineIcon({ index }: { index: number }) {
  const reduced = useReducedMotion()
  return <motion.svg className="counsel-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" initial={reduced ? false : { scale: 0.65, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, ease }}><path d={paths[index % paths.length]} /></motion.svg>
}
export function Cards({ items, locale, kind = 'practice' }: { items: readonly [Pair, Pair][]; locale: Locale; kind?: 'practice' | 'beliefs' | 'rows' | 'marks' }) {
  const i = locale === 'zh' ? 0 : 1
  return <div className={`counsel-cards counsel-cards-${kind}`} data-count={items.length}>{items.map(([title, text], n) => <article key={title[1]}>{kind === 'rows' || kind === 'marks' ? <span className="counsel-card-number">{roman[n]}</span> : <LineIcon index={n} />}<div><h3>{title[i]}</h3><p>{text[i]}</p></div></article>)}</div>
}
export function Action({ locale, path = 'enquire', children, variant = 'gold' }: { locale: Locale; path?: string; children: React.ReactNode; variant?: 'gold' | 'outline' }) {
  const prefix = `${useCounselHost().basePath ?? ''}${locale === 'en' ? '/en' : ''}`
  return <Link className={`counsel-action counsel-action-${variant}`} href={`${prefix}/${path}`}>{children}</Link>
}
export function Title({ eyebrow, title, text, locale }: { eyebrow: Pair; title: Pair; text?: Pair; locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <section className="counsel-title"><Reveal><p className="counsel-eyebrow">{eyebrow[i]}</p></Reveal><h1><TextReveal text={title[i]} characters={i === 0} /></h1>{text && <Reveal delay={0.12}><p>{text[i]}</p></Reveal>}</section>
}

const membership: readonly { title: Pair; image: string }[] = [
 {title:['一对一保密咨询','One to one, held in confidence'],image:media.e7d09fc67aa3b2d9},
 {title:['每年两期十二周小组','Cohorts of twelve weeks, twice a year'],image:media.f6bd684ed18126ad},
 {title:['稳定节奏的会谈','Sessions on a steady cadence'],image:media['2cb87bb97b62e0f5']},
 {title:['会谈之间的支持','Access between sessions'],image:media.c393e0dd116b0ef1},
 {title:['季度工作复盘','A quarterly review of the work'],image:media.d393f392e31f27da},
 {title:['专属于客户的工作框架','Frameworks kept private to clients'],image:media['4845b83ba258db17']},
 {title:['少量客户','A small number of clients'],image:media['8f2744b6ac2fb086']},
 {title:['推荐或直接申请','By referral or direct enquiry'],image:media['2cdff1f424475175']},
 {title:['真实改变而非安慰','Real change, not reassurance'],image:media['866bc9bcc8c0a83e']},
 {title:['九十分钟对话','Ninety-minute conversations'],image:media['26eda03d5b01d2e9']},
 {title:['私下坦诚交流','Candour, in private'],image:media.f81b094993c67c91},
 {title:['线下与线上','In person and online'],image:media.c7d42a505c89f8d5},
]
export function Membership({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <section className="counsel-membership-section"><header><p className="counsel-eyebrow">{i ? 'THE MEMBERSHIP' : '服务内容'}</p><h2><TextReveal text={i ? 'What every engagement holds' : '每次合作包含的内容'} characters={!i} /></h2></header>{[membership.slice(0,6),membership.slice(6)].map((row,n)=><div key={n} className={`counsel-image-marquee ${n ? 'reverse' : ''}`} tabIndex={0} aria-label={i ? 'Membership benefits' : '服务内容图库'}><div className="counsel-image-track">{[0,1].map(copy=><div className="counsel-image-set" key={copy} aria-hidden={copy === 1}>{row.map(item=><article key={item.title[1]}><img src={item.image} alt="" loading="lazy" /><h3>{item.title[i]}</h3></article>)}</div>)}</div></div>)}</section>
}
const testimonials = [
 {metric:['2 倍','2×'],label:['更坚定地做出决定','Decisions made with conviction'],quote:['直到我能够做出拖延数月的决定，并最终相信自己的判断。','It stayed in the room until I could make a call I had put off for months, and finally trust it.'],name:'Marcus Ellery',role:['创始人兼 CEO','Founder & CEO'],photo:media['231d7758fa8d10de']},
 {metric:['2 个季度','2 qtrs'],label:['重建领导团队','To rebuild the leadership team'],quote:['我从不缺顾问，缺的是一个坦诚的空间。这改变了我的领导方式。','I had no shortage of advisors. What I lacked was one honest room, and it reshaped how I lead.'],name:'Farah Idris',role:['管理合伙人','Managing Partner'],photo:media.e04674aafa08c14f},
 {metric:['12 周','12 wks'],label:['从困境到清晰计划','From stuck to a clear plan'],quote:['稳定的节奏最重要，每两周私密会谈，并践行自己的承诺。','The cadence is what matters. Fortnightly, in confidence, and held to just what I said I would do.'],name:'Daniel Osei',role:['联合创始人','Co-founder'],photo:media['3fd68cf3220b0c98']},
] as const
export function Testimonials({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <div className="counsel-ticker" tabIndex={0} aria-label={i ? 'Client testimonials; focus to pause' : '客户评价，聚焦可暂停'}><div className="counsel-ticker-track">{[0,1].map(copy=><div className="counsel-ticker-set" key={copy} aria-hidden={copy===1}>{testimonials.map(entry=><blockquote key={entry.name}><strong>{entry.metric[i]}</strong><small>{entry.label[i]}</small><p>“{entry.quote[i]}”</p><footer><img src={entry.photo} alt="" /><span>{entry.name}<small>{entry.role[i]}</small></span></footer></blockquote>)}</div>)}</div></div>
}
export function TestimonialSection({ locale }: { locale: Locale }) {
 const i=locale==='zh'?0:1
 return <section className="counsel-section counsel-muted counsel-testimonials"><p className="counsel-eyebrow">{i?'IN THEIR WORDS':'客户的声音'}</p><h2><TextReveal text={i?'Trusted by 3,000+ leaders across the globe':'获得全球 3,000 多位领导者信任'} characters={!i} /></h2><p>{i?'From first-time founders to seasoned executives, the work helps leaders make the hard calls, hold their teams, and change what they are capable of.':'从初创者到资深高管，我们帮助领导者做出艰难决定，带领团队并拓展可能。'}</p><div className="counsel-stats"><span>★★★★★<small>{i?'4.9 avg. rating':'平均评分 4.9'}</small></span><span>14<small>{i?'countries':'个国家'}</small></span><span>{i?'9 in 10':'90%'}<small>{i?'come by referral':'来自推荐'}</small></span></div><Testimonials locale={locale}/></section>
}
export function PhotoStory({ locale }: { locale: Locale }) {
 const i=locale==='zh'?0:1, reduced=useReducedMotion(), host=useCounselHost()
 const name=typeof host.brandName==='string'?host.brandName:host.brandName?.[locale]??brand.name
 const photos=[media.a79d2695529a4549,media['937f1608ea607fbb'],media.e19ac5df25b9fdfe]
 return <section className="counsel-story" style={{backgroundImage:`url(${media.c14907a8575f948b})`}}><div className="counsel-story-paper"><p className="counsel-story-brand">{name}</p><h2><TextReveal text={i?'Real change, not reassurance. The work is honest, and it asks something of you.':'追求真实改变，而非安慰。这份工作需要坦诚和投入。'} characters={!i}/></h2><div className="counsel-polaroids">{photos.map((src,n)=><motion.figure key={src} initial={reduced?false:{opacity:0,y:60,rotate:0,scale:0.8}} whileInView={{opacity:1,y:0,rotate:[-5,0,-8][n],scale:1}} viewport={{once:true,amount:0.35}} transition={{duration:0.85,delay:n*0.12,ease}}><img src={src} alt="" /></motion.figure>)}</div></div></section>
}
export function ConversationCallout({locale}:{locale:Locale}) {
 const i=locale==='zh'?0:1,reduced=useReducedMotion()
 return <section className="counsel-conversation"><motion.img src={media['241dfc1b99e61ef9']} alt="" initial={reduced?false:{scale:0.75,opacity:0}} whileInView={{scale:1,opacity:1}} viewport={{once:true}} transition={{duration:0.75,ease}}/><h2><TextReveal text={i?'The work begins with a conversation.':'一切始于一次对话'} characters={!i}/></h2><p>{i?'Most clients come by referral. A direct enquiry is welcome, and it is read personally, not by a form.':'多数客户来自推荐。我们同样欢迎直接咨询，每一份申请都由专人认真阅读。'}</p><Action locale={locale}>{i?'REQUEST A CONVERSATION':'预约一次对话'}</Action></section>
}

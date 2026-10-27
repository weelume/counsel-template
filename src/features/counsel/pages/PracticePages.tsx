'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { useCounselHost } from '../host'
import type { Locale } from '../types'

type Pair = readonly [string, string]
const practice: readonly [Pair, Pair][] = [
  [['私密的实践', 'A private practice.'], ['一对一咨询，同时只服务少数客户。', 'Coaching held one to one, in confidence, for a small number of clients at a time.']],
  [['深思熟虑的方法', 'A considered method.'], ['工作有清晰的结构与进程。', 'The work is structured, not improvised. Every engagement follows a clear arc.']],
  [['值得信赖的空间', 'A room that holds.'], ['会谈内容严格保密。', 'What is said in session stays in session. Discretion is the first term of the work.']],
  [['稳定的节奏', 'A steady cadence.'], ['会谈以稳定节奏贯穿一个阶段。', 'Sessions run on a regular rhythm across a season, not scattered one-off calls.']],
  [['会谈之间的支持', 'Access between.'], ['重要决定无需等待下一次会谈。', 'The decisions that will not wait for the next session are not left to wait.']],
  [['切实的责任', 'Real accountability.'], ['我们会在私密空间中帮助你践行自己的决定。', 'You are held to what you decide, plainly and in private.']],
]
const formats: readonly [Pair, Pair][] = [
  [['会谈', 'The Sessions'], ['定期进行约九十分钟的一对一对话。', 'Regular one to one conversations, around ninety minutes, held on a steady cadence.']],
  [['会谈之间', 'The Between'], ['为无法等待下一次会谈的决定提供支持。', 'Access between sessions, for the decisions that will not wait for the next one.']],
  [['小组', 'The Cohort'], ['在一个阶段中与小组共同学习和成长。', 'A small group who meet across a season, learning in good company as well as alone.']],
  [['复盘', 'The Review'], ['每季度回顾哪些发生了变化，哪些没有。', 'A structured look back each quarter, at what has changed and what has not.']],
  [['资料', 'The Materials'], ['工作中的框架和笔记仅供客户使用。', 'Frameworks and notes from the work, kept private to clients.']],
  [['结束', 'The Close'], ['认真总结每个阶段的变化和下一步。', 'A considered end to each season, with a plain account of what changed and what comes next.']],
]
const beliefs: readonly [Pair, Pair][] = [
  [['关于改变', 'On change'], ['真正的改变关乎行为。', 'Real change is behavioural, not motivational. We work on what you do, not on how you feel about it.']],
  [['关于诚实', 'On honesty'], ['坦诚让咨询变得有价值。', 'Coaching is only useful when it is candid. I will tell you what I see, plainly and in private.']],
  [['关于深度', 'On depth'], ['少数客户得到真正的关注，才能走得更远。', 'A few clients, given real attention, go further than a full calendar of shallow calls.']],
  [['关于信任', 'On confidence'], ['会谈中的内容始终保密。', 'What is said in session stays there. Trust is the precondition for any of the work.']],
]
const marks: readonly [Pair, Pair][] = [
  [['你正在领导一项真实事业', 'You lead something real.'], ['你的判断影响着团队和重要决定。', 'A founder, an executive, or a partner, with people and decisions that rest on your judgement.']],
  [['你已经不再缺少建议', 'You have outgrown advice.'], ['你需要坦诚的咨询者，陪你践行自己的决定。', 'You are not short of opinions. You are short of a candid counsel who will hold you to what you decide.']],
  [['你愿意投入行动', 'You will do the work.'], ['你准备诚实面对自己，也准备做出改变。', 'Coaching is not a spectator sport. You come ready to be honest, and ready to change what you find.']],
  [['你重视保密', 'You value discretion.'], ['重要的事情在这里会得到保护。', 'Confidentiality is a top priority in this practice. We ensure that what matters to you remains private and secure.']],
]
const programmeDetails: readonly [Pair, Pair][] = [
  [['一对一', 'One to One'], ['为一位领导者提供私密咨询，按稳定节奏会谈，并在会谈之间提供支持。', 'Private coaching for a single leader. Sessions on a steady cadence, with access between them.']],
  [['小组', 'The Cohort'], ['固定人数的小组，每年举办两期，每期十二周，在线下和线上进行。', 'A small group with a fixed intake, lasting twelve weeks, is held twice a year, both offline and online.']],
  [['工作进程', 'The arc'], ['每次合作都沿着清晰路径展开：你在哪里、要去哪里，以及有哪些阻碍。', 'Every engagement runs a clear course: where you are, where you are going, and what stands in the way.']],
  [['合作方式', 'The terms'], ['合作以阶段进行，自主选择续期，不作长期绑定。每年举办两次线下活动。', 'Engagements occur in seasons, renewed by choice and never fixed. They run offline twice a year.']],
]
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI']

function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}>{children}</motion.div>
}
function Cards({ items, locale }: { items: readonly [Pair, Pair][]; locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <div className="counsel-cards">{items.map(([title, text], n) => <Reveal key={title[1]}><article><span className="counsel-card-icon">{roman[n]}</span><h3>{title[i]}</h3><p>{text[i]}</p></article></Reveal>)}</div>
}
function Action({ locale, path = 'enquire', children }: { locale: Locale; path?: string; children: React.ReactNode }) {
  const prefix = `${useCounselHost().basePath ?? ''}${locale === 'en' ? '/en' : ''}`
  return <Link className="counsel-action" href={`${prefix}/${path}`}>{children}</Link>
}
function Title({ eyebrow, title, text, locale }: { eyebrow: Pair; title: Pair; text?: Pair; locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <section className="counsel-title"><Reveal><p className="counsel-eyebrow">{eyebrow[i]}</p><h1>{title[i]}</h1>{text && <p>{text[i]}</p>}</Reveal></section>
}
function Membership({ locale }: { locale: Locale }) {
  const items: readonly Pair[] = [['一对一保密咨询', 'One to one, held in confidence'], ['每年两期十二周小组', 'Cohorts of twelve weeks, twice a year'], ['稳定节奏的会谈', 'Sessions on a steady cadence'], ['会谈之间的支持', 'Access between sessions'], ['季度工作复盘', 'A quarterly review of the work'], ['专属于客户的工作框架', 'Frameworks kept private to clients'], ['少量客户', 'A small number of clients'], ['推荐或直接申请', 'By referral or direct enquiry'], ['真实改变', 'Real change, not reassurance'], ['九十分钟对话', 'Ninety-minute conversations'], ['私下坦诚交流', 'Candour, in private'], ['线下与线上', 'In person and online']]
  const i = locale === 'zh' ? 0 : 1
  return <section className="counsel-section"><p className="counsel-eyebrow">{i ? 'THE MEMBERSHIP' : '服务内容'}</p><h2>{i ? 'What every engagement holds' : '每次合作包含的内容'}</h2><div className="counsel-membership">{items.map(item => <div key={item[1]}>{item[i]}</div>)}</div></section>
}
function Testimonials({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  const entries = [
    { metric: '2×', label: ['更坚定地做出决定', 'Decisions made with conviction'], quote: ['直到我能够做出拖延数月的决定，并最终相信自己的判断。', 'It stayed in the room until I could make a call I had put off for months, and finally trust it.'], name: 'Marcus Ellery', role: 'Founder & CEO' },
    { metric: '2 qtrs', label: ['重建领导团队', 'To rebuild the leadership team'], quote: ['我从不缺顾问，缺的是一个坦诚的空间。这改变了我的领导方式。', 'I had no shortage of advisors. What I lacked was one honest room, and it reshaped how I lead.'], name: 'Farah Idris', role: 'Managing Partner' },
    { metric: '12 wks', label: ['从困境到清晰计划', 'From stuck to a clear plan'], quote: ['稳定的节奏最重要，每两周私密会谈，并践行自己的承诺。', 'The cadence is what matters. Fortnightly, in confidence, and held to just what I said I would do.'], name: 'Daniel Osei', role: 'Co-founder' },
  ] as const
  return <div className="counsel-ticker" tabIndex={0} aria-label={i ? 'Client testimonials' : '客户评价'}><div className="counsel-ticker-track">{[0, 1].map(copy => <div className="counsel-ticker-set" key={copy} aria-hidden={copy === 1}>{entries.map(entry => <blockquote key={entry.name}><strong>{entry.metric}</strong><p>{entry.label[i]}</p><p>“{entry.quote[i]}”</p><small>{entry.name}<br />{entry.role}</small></blockquote>)}</div>)}</div></div>
}
export function HomePage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <><section className="counsel-hero"><div className="counsel-hero-content"><Reveal><p className="counsel-eyebrow">THE COUNSEL · PRIVATE COACHING</p><h1>{i ? <>One practice.<br /><em>Two ways in.</em></> : <>一种实践<br /><em>两种同行方式</em></>}</h1><p>{i ? 'Coaching for founders and leaders who have outgrown advice. Engaging in one-on-one or small cohort conversations to drive real change.' : '为不再缺少建议的创始人与领导者提供咨询，通过一对一或小组对话推动真正的改变。'}</p><Action locale={locale}>{i ? 'REQUEST A CONVERSATION' : '预约一次对话'}</Action><blockquote><small>{i ? 'THE PRINCIPLE' : '我们的原则'}</small><p>{i ? 'We work with a few clients to provide dedicated attention and ensure confidentiality. That is the whole of it.' : '我们只服务少数客户，给予充分关注，确保私密。这就是全部。'}</p></blockquote></Reveal></div></section>
    <section className="counsel-section"><h2>{i ? 'The practice' : '我们的实践'}</h2><p>{i ? 'The work is private, structured, and held in confidence. Here is what that means in practice.' : '工作私密、有序且值得信赖。'}</p><Cards items={practice} locale={locale} /><Action locale={locale} path="programmes">{i ? 'INSIDE THE PROGRAMME' : '了解服务项目'}</Action></section>
    <section className="counsel-section counsel-muted counsel-testimonials"><p className="counsel-eyebrow">{i ? 'IN THEIR WORDS' : '客户的声音'}</p><h2>{i ? 'Trusted by 3,000+ leaders across the globe' : '获得全球 3,000 多位领导者信任'}</h2><p>{i ? 'From first-time founders to seasoned executives, the work helps leaders make the hard calls, hold their teams, and change what they are capable of.' : '从初创者到资深高管，我们帮助领导者做出艰难决定，带领团队并拓展可能。'}</p><div className="counsel-stats"><span>★★★★★ <small>{i ? '4.9 avg. rating' : '平均评分 4.9'}</small></span><span>14 <small>{i ? 'countries' : '个国家'}</small></span><span>9 in 10 <small>{i ? 'come by referral' : '来自推荐'}</small></span></div><Testimonials locale={locale} /></section>
    <section className="counsel-section counsel-dark"><h2>{i ? 'Real change, not reassurance. The work is honest, and it asks something of you.' : '追求真实改变，而非安慰。这份工作需要坦诚和投入。'}</h2><p>{i ? 'The work begins with a conversation.' : '一切始于一次对话。'}</p><Action locale={locale}>{i ? 'REQUEST A CONVERSATION' : '预约一次对话'}</Action></section>
    <section className="counsel-section"><h2>{i ? 'You lead something real. You have outgrown advice. And you are ready to do the work.' : '你正在领导一项事业，已经不再缺少建议，并准备投入行动。'}</h2><Cards items={[marks[0], marks[1], marks[3]]} locale={locale} /></section><Membership locale={locale} /></>
}
export function InsidePage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <><Title locale={locale} eyebrow={['工作内容', 'INSIDE THE WORK']} title={['工作包含什么', 'What the work holds.']} text={['每次合作都经过认真设计，让你在开始之前了解整个过程。', 'The shape of an engagement is deliberate. Here is what it holds, so you know what you are stepping into before you begin.']} /><section className="counsel-section"><p className="counsel-eyebrow">{i ? 'THE FORMATS · SIX IN ALL' : '六种工作形式'}</p><Cards items={formats} locale={locale} /></section><section className="counsel-section counsel-muted"><h2>{i ? 'The rhythm of an engagement.' : '合作的节奏'}</h2><p>{i ? 'Engagements run in seasons rather than single calls. A typical arc is fortnightly sessions across several months, with access in between and a review at the close of each quarter.' : '合作以阶段而非单次会谈进行。通常每两周会谈一次，持续数月，期间提供支持并在每季度末复盘。'}</p><h2>{i ? 'Where it happens.' : '服务地点'}</h2><p>{i ? 'In person in New York, and online for those further afield.' : '在纽约线下进行，也可在线参与。'}</p><Action locale={locale}>{i ? 'REQUEST A CONVERSATION' : '预约一次对话'}</Action></section></>
}
export function AboutPage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  const team = [
    { name: 'Anand Mehra', role: ['首席顾问', 'Principal Counsel'], photo: 'anand.avif' },
    { name: 'Rohan Desai', role: ['小组负责人', 'Cohort Lead'], photo: 'rohan.avif' },
    { name: 'Priya Nair', role: ['咨询顾问', 'Associate Counsel'], photo: 'priya.avif' },
    { name: 'Maya Rao', role: ['客户关怀', 'Client Care'], photo: 'maya.avif' },
  ] as const
  return <><Title locale={locale} eyebrow={['关于我们', 'ABOUT']} title={['为什么需要这样的空间', 'Why this room exists.']} text={['多数领导者不缺建议，缺的是坦诚、私密的咨询：有人说出真相，并在他们行动时继续陪伴。这正是我们工作的意义。', 'Most leaders are not short of advice. They are short of a candid, private counsel who will tell them the truth and stay in the room while they act on it. That is what this practice is for.']} /><section className="counsel-section counsel-dark"><p className="counsel-eyebrow">{i ? 'THE BELIEFS · FOUR BELIEFS' : '四项理念'}</p><Cards items={beliefs} locale={locale} /></section><section className="counsel-section counsel-muted"><h2>{i ? 'What every engagement rests on.' : '每次合作的基础'}</h2><p>{i ? 'Every engagement rests on the same principles. There are seven. They are practised in the room, not recited. Their themes are named here.' : '每次合作都建立在七项共同原则之上。它们在对话中践行，而非仅仅被念出。'}</p><div className="counsel-membership">{(i ? ['CONFIDENCE', 'CANDOUR', 'ATTENTION', 'READINESS', 'CHALLENGE', 'THE LONG VIEW', 'DEPARTURE WITH GRACE'] : ['信任', '坦诚', '关注', '准备', '挑战', '长远眼光', '从容告别']).map(x => <div key={x}>{x}</div>)}</div></section><section className="counsel-section counsel-origin"><div><h2>{i ? 'Where it began.' : '从何处开始'}</h2><p>{i ? 'This practice began in New York, driven by years of leading teams and seeing talented individuals struggle without honest guidance. It is based on the idea that regular, meaningful conversations can unlock a person’s potential and has now become a standard approach. Held in New York, and online for those further afield.' : '这项实践始于纽约，源于多年带领团队、见证优秀人才因缺少坦诚指导而困扰的经历。我们相信，定期而有意义的对话能够释放人的潜能。这已成为我们一贯的工作方式。服务在纽约线下进行，也向远方的客户提供线上服务。'}</p></div><img src="/templates/counsel/origin.webp" alt="" /></section><section className="counsel-section"><p className="counsel-eyebrow">{i ? 'OUR TEAM' : '我们的团队'}</p><h2>{i ? 'The people behind the practice.' : '团队成员'}</h2><p>{i ? 'The Counsel is a small practice, consisting of a principal counsel and a few trusted associates, all valuing discretion.' : '我们是一支小型团队，由首席顾问和数位值得信赖的伙伴组成，每个人都重视保密。'}</p><div className="counsel-team">{team.map(person => <article key={person.name}><img src={`/templates/counsel/${person.photo}`} alt="" /><h3>{person.name}</h3><p>{person.role[i]}</p></article>)}</div></section></>
}
export function ProgrammesPage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <><section className="counsel-programme-hero"><Reveal><p className="counsel-eyebrow">{i ? 'THE PROGRAMMES' : '服务项目'}</p><h1>{i ? 'Two ways to work together.' : '两种合作方式'}</h1><p>{i ? 'The work comes in two shapes. One is private and paced to you. The other is a small group, moving together through a season.' : '一种私密并按你的节奏进行，另一种是小组共同走过一个阶段。'}</p></Reveal><div className="counsel-programme-options"><article><h2>{i ? 'One to One' : '一对一'}</h2><p>{i ? 'For a leader who wants the room to themselves. Private sessions, held in confidence, on a steady cadence.' : '为希望拥有独立空间的领导者提供私密咨询，以稳定的节奏进行。'}</p><Action locale={locale}>{i ? 'REQUEST A CONVERSATION' : '预约一次对话'}</Action></article><article><h2>{i ? 'The Cohort' : '小组'}</h2><p>{i ? 'For a small group who grow faster in good company. A fixed intake, twelve weeks, twice a year.' : '与同行者共同成长的小组。固定人数，每年两期，每期十二周。'}</p><Action locale={locale} path="programmes#programme-details">{i ? 'ABOUT THE COHORT' : '了解小组项目'}</Action></article></div></section><Membership locale={locale} /><section id="programme-details" className="counsel-section counsel-dark"><p className="counsel-eyebrow">{i ? 'THE PROGRAMMES · WHAT IT HOLDS' : '项目内容'}</p><Cards locale={locale} items={programmeDetails} /></section><section className="counsel-section" id="who-it-is-for"><h2>{i ? 'Who the work is for.' : '适合谁'}</h2><p>{i ? 'This practice is not for everyone, and it does not pretend to be. There are no hidden tests. Read it plainly, and you will know whether the work is for you.' : '这项实践并不适合所有人，也不会假装适合。这里没有隐藏的考验；坦诚阅读，你就会知道它是否适合你。'}</p><Cards locale={locale} items={marks} /></section><section className="counsel-section counsel-muted counsel-testimonials"><p className="counsel-eyebrow">{i ? 'IN THEIR WORDS' : '客户的声音'}</p><h2>{i ? 'Trusted by 3,000+ leaders across the globe' : '获得全球 3,000 多位领导者信任'}</h2><div className="counsel-stats"><span>★★★★★ <small>{i ? '4.9 avg. rating' : '平均评分 4.9'}</small></span><span>14 <small>{i ? 'countries' : '个国家'}</small></span><span>9 in 10 <small>{i ? 'come by referral' : '来自推荐'}</small></span></div><Testimonials locale={locale} /></section><section className="counsel-section counsel-dark"><h2>{i ? 'Ready to apply?' : '准备开始了吗'}</h2><p>{i ? 'Your application will take around 5 minutes to complete.' : '填写申请约需五分钟。'}</p><Action locale={locale}>{i ? 'START APPLICATION' : '开始申请'}</Action></section></>
}
export function EnquirePage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  const [submitted, setSubmitted] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true) }
  return <><Title locale={locale} eyebrow={['预约对话', 'REQUEST A CONVERSATION']} title={['从一次对话开始', 'Begin with a conversation.']} text={['这是一份对话申请，请从容填写。', 'This is not a checkout. It is a request to talk. Take your time with it.']} /><form className="counsel-form" onSubmit={submit}><div className="counsel-form-grid">{([['姓名', 'FULL NAME', 'text'], ['邮箱', 'EMAIL', 'email'], ['城市', 'CITY', 'text'], ['职位与公司', 'ROLE AND COMPANY', 'text']] as const).map(([zh, en, type]) => <label key={en}>{i ? en : zh}<input type={type} required /></label>)}</div><label>{i ? 'WHAT ARE YOU LEADING RIGHT NOW' : '你目前正在领导什么'}<textarea required rows={5} /></label><div className="counsel-form-grid"><label>{i ? 'PROGRAMME OF INTEREST' : '感兴趣的项目'}<select required defaultValue=""><option value="" disabled>{i ? 'Select' : '请选择'}</option><option>{i ? 'One to One' : '一对一'}</option><option>{i ? 'The Cohort' : '小组'}</option><option>{i ? 'Not sure yet' : '尚未确定'}</option></select></label><label>{i ? 'TEAM SIZE OR SCOPE' : '团队规模'}<select required defaultValue=""><option value="" disabled>{i ? 'Select' : '请选择'}</option>{([['1 至 10 人', '1 to 10'], ['11 至 50 人', '11 to 50'], ['51 至 200 人', '51 to 200'], ['200 人以上', 'Over 200'], ['不愿透露', 'Prefer not to say']] as const).map(x => <option key={x[1]}>{x[i]}</option>)}</select></label></div><label>{i ? 'IS THERE SOMEONE WHO SUGGESTED YOU REACH OUT (OPTIONAL)' : '推荐人（选填）'}<input /></label><button className="counsel-action" type="submit">{i ? 'SEND THE REQUEST' : '提交申请'}</button><p role="status">{submitted ? (i ? 'Valid input. This demo does not send or save information.' : '校验通过。演示表单不会发送或保存信息。') : (i ? 'Demo form: local validation only.' : '演示表单仅作本地校验。')}</p></form></>
}
export function PrivacyPage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <><Title locale={locale} eyebrow={['隐私', 'PRIVACY']} title={['我们如何处理你分享的信息', 'How we treat what you share with us.']} text={['保密是我们工作的基础，也适用于你分享的数据。', 'The Counsel is built on the discipline of confidence. That discipline extends to the data we hold about you.']} /><section className="counsel-section counsel-prose"><h2>{i ? 'What we collect' : '收集的信息'}</h2><p>{i ? 'This demonstration does not collect or save form submissions.' : '此演示站不会收集或保存表单提交内容。'}</p><h2>{i ? 'What we do not do' : '我们不会做什么'}</h2><p>{i ? 'This demonstration does not sell or share personal information.' : '此演示站不会出售或分享个人信息。'}</p><h2>{i ? 'Questions' : '联系我们'}</h2><p>{i ? 'Contact us if you have questions about privacy.' : '如对隐私有疑问，请联系我们。'}</p></section></>
}


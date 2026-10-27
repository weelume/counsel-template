'use client'

import { useCounselHost } from '../host'
import { brand } from '../config/brand'
import type { Locale } from '../types'
import { practice, marks } from '../content/practice'
import { TextReveal } from '../components/Motion'
import { Reveal, Cards, Action, Membership, TestimonialSection, PhotoStory, ConversationCallout } from '../components/PracticeSections'

export function HomePage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  const host=useCounselHost(), name=typeof host.brandName==='string'?host.brandName:host.brandName?.[locale]??brand.name
  return <>
    <section className="counsel-hero"><div className="counsel-hero-content">
      <Reveal><p className="counsel-eyebrow">{name.toUpperCase()} · {i?'PRIVATE COACHING':'私密咨询'}</p></Reveal>
      <h1><TextReveal text={i?'One practice.':'一种实践'} characters/><br/><em><TextReveal text={i?'Two ways in.':'两种同行方式'} characters/></em></h1>
      <Reveal delay={0.25}><p>{i?'Coaching for founders and leaders who have outgrown advice. Engaging in one-on-one or small cohort conversations to drive real change.':'为不再缺少建议的创始人与领导者提供咨询，通过一对一或小组对话推动真正的改变。'}</p><Action locale={locale}>{i?'REQUEST A CONVERSATION':'预约一次对话'}</Action></Reveal>
      <Reveal delay={0.4}><blockquote><small>{i?'THE PRINCIPLE':'我们的原则'}</small><p>{i?'We work with a few clients to provide dedicated attention and ensure confidentiality. That is the whole of it.':'我们只服务少数客户，给予充分关注，确保私密。这就是全部。'}</p></blockquote></Reveal>
    </div></section>
    <section className="counsel-section counsel-practice"><header><h2><TextReveal text={i?'The practice':'我们的实践'} characters={!i}/></h2><p>{i?'The work is private, structured, and held in confidence. Here is what that means in practice.':'工作私密、有序且值得信赖。以下是这些原则在实践中的含义。'}</p></header><Cards items={practice} locale={locale}/><Action locale={locale} path="programmes" variant="outline">{i?'INSIDE THE PROGRAMME':'了解服务项目'}</Action></section>
    <TestimonialSection locale={locale}/>
    <PhotoStory locale={locale}/>
    <ConversationCallout locale={locale}/>
    <section className="counsel-section counsel-dark counsel-audience"><h2><TextReveal text={i?'You lead something real. You have outgrown advice. And you are ready to do the work.':'你正在领导一项事业，已经不再缺少建议，并准备投入行动。'} characters={!i}/></h2><Action locale={locale} path="programmes#who-it-is-for">{i?'WHO IT IS FOR':'了解适用人群'}</Action><Cards items={[marks[0],marks[1],marks[3]]} locale={locale} kind="marks"/></section>
    <Membership locale={locale}/>
  </>
}

'use client'
import type { Locale } from '../types'
import { Title, Cards, Action } from '../components/PracticeSections'
import { formats } from '../content/practice'

export function InsidePage({ locale }: { locale: Locale }) {
  const i = locale === 'zh' ? 0 : 1
  return <><Title locale={locale} eyebrow={['工作内容', 'INSIDE THE WORK']} title={['工作包含什么', 'What the work holds.']} text={['每次合作都经过认真设计，让你在开始之前了解整个过程。', 'The shape of an engagement is deliberate. Here is what it holds, so you know what you are stepping into before you begin.']} /><section className="counsel-section counsel-dark counsel-formats"><p className="counsel-eyebrow">{i ? 'THE FORMATS · SIX IN ALL' : '六种工作形式'}</p><Cards items={formats} locale={locale} kind="marks" /></section><section className="counsel-section counsel-muted"><h2>{i ? 'The rhythm of an engagement.' : '合作的节奏'}</h2><p>{i ? 'Engagements run in seasons rather than single calls. A typical arc is fortnightly sessions across several months, with access in between and a review at the close of each quarter. The pace is steady on purpose. Change holds when it is worked at, not rushed.' : '合作以阶段而非单次会谈进行。通常每两周会谈一次，持续数月，期间提供支持并在每季度末复盘。'}</p><h2>{i ? 'Where it happens.' : '服务地点'}</h2><p>{i ? 'In person in New York, and online for those further afield.' : '在纽约线下进行，也可在线参与。'}</p><Action locale={locale}>{i ? 'REQUEST A CONVERSATION' : '预约一次对话'}</Action></section></>
}

'use client'

import { useState, type FormEvent } from 'react'
import type { Locale } from '../types'
import { Title } from '../components/PracticeSections'

const fields = [['name','姓名','FULL NAME','text'],['email','邮箱','EMAIL','email'],['city','城市','CITY','text'],['role','职位与公司','ROLE AND COMPANY','text']] as const
const scopes = [['1 至 10 人','1 to 10'],['11 至 50 人','11 to 50'],['51 至 200 人','51 to 200'],['200 人以上','Over 200'],['不愿透露','Prefer not to say']] as const
export function EnquirePage({locale}:{locale:Locale}) {
 const i=locale==='zh'?0:1, [submitted,setSubmitted]=useState(false)
 function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const form=event.currentTarget
  for(const element of [...form.elements]) {
   if((element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) && element.required && !element.value.trim()) {
    element.setCustomValidity(i?'Please enter a value.':'请填写有效内容。'); element.reportValidity(); return
   }
  }
  setSubmitted(true)
  console.debug('[counsel:enquiry]',{state:'local-validation-passed',sent:false,persisted:false})
 }
 return <><Title locale={locale} eyebrow={['预约对话','REQUEST A CONVERSATION']} title={['从一次对话开始','Begin with a conversation.']} text={['这不是付款页面，而是一份对话申请。请从容填写，我们从最简单的问题开始。','This is not a checkout. It is a request to talk. Take your time with it. It asks its easiest questions first.']}/><form className="counsel-form" onSubmit={submit} onInput={event=>{const field=event.target;if(field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement)field.setCustomValidity('')}}>
 <div className="counsel-form-grid">{fields.map(([id,zh,en,type])=><label key={id} htmlFor={`counsel-${id}`}>{i?en:zh}<input id={`counsel-${id}`} name={id} type={type} required autoComplete={{name:'name',email:'email',city:'address-level2',role:'organization-title'}[id]}/></label>)}</div>
 <label htmlFor="counsel-leading">{i?'WHAT ARE YOU LEADING RIGHT NOW':'你目前正在领导什么'}<textarea id="counsel-leading" name="leading" required rows={5} aria-describedby="counsel-leading-help"/><small id="counsel-leading-help">{i?'A sentence is plenty. Plain reads better than polished here.':'一句话就足够，真实比精心修饰更重要。'}</small></label>
 <div className="counsel-form-grid"><label htmlFor="counsel-programme">{i?'PROGRAMME OF INTEREST':'感兴趣的项目'}<select id="counsel-programme" name="programme" required defaultValue=""><option value="" disabled>{i?'Select':'请选择'}</option>{[['one-to-one','一对一','One to One'],['cohort','小组','The Cohort'],['unsure','尚未确定','Not sure yet']].map(([value,zh,en])=><option value={value} key={value}>{i?en:zh}</option>)}</select></label><label htmlFor="counsel-scope">{i?'TEAM SIZE OR SCOPE':'团队规模'}<select id="counsel-scope" name="scope" required defaultValue=""><option value="" disabled>{i?'Select':'请选择'}</option>{scopes.map((x,n)=><option value={n} key={x[1]}>{x[i]}</option>)}</select></label></div>
 <label htmlFor="counsel-referrer">{i?'IS THERE SOMEONE WHO SUGGESTED YOU REACH OUT (OPTIONAL)':'推荐人（选填）'}<input id="counsel-referrer" name="referrer" aria-describedby="counsel-referrer-help"/><small id="counsel-referrer-help">{i?'A referral is not required. An enquiry without one is read with the same care.':'无需推荐人。每一份直接申请也会得到同样认真的阅读。'}</small></label>
 <button className="counsel-action" type="submit">{i?'SEND THE REQUEST':'提交申请'}</button><p className="counsel-form-notice" role="status">{submitted?(i?'Valid input. This demo has not sent or saved your information.':'校验通过。演示表单尚未发送或保存你的信息。'):(i?'Demo form: local validation only. Information is not sent or saved.':'演示表单仅作本地校验，信息不会发送或保存。')}</p></form></>
}

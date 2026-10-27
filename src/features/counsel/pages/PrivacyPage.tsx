'use client'
import type { Locale } from '../types'
import { Title } from '../components/PracticeSections'
import { useCounselHost } from '../host'
import { brand } from '../config/brand'
export function PrivacyPage({locale}:{locale:Locale}) {
 const i=locale==='zh'?0:1,email=useCounselHost().email??brand.email
 return <><Title locale={locale} eyebrow={['隐私','PRIVACY']} title={['我们如何处理你分享的信息','How we treat what you share with us.']} text={['信任与保密是我们工作的基础，也适用于你分享的数据。','Confidence is the foundation of the practice. It extends to the information you share.']}/><section className="counsel-section counsel-prose"><h2>{i?'What we collect':'收集的信息'}</h2><p>{i?'This template is a demonstration. Visiting these pages does not create a customer record, and this template does not set tracking cookies.':'本模板是演示网站。访问页面不会创建客户档案，模板不设置跟踪 Cookie。'}</p><p>{i?'The enquiry and newsletter forms validate input in your browser. They do not send or store your name, email, city, company, referral, or message. Leaving the page clears that input.':'申请和订阅表单仅在浏览器中校验输入，不发送或保存姓名、邮箱、城市、公司、推荐人及留言。离开页面后输入内容会被清除。'}</p><p>{i?'Email and telephone links open your own communication app. Any message you choose to send is handled by that service.':'邮件和电话链接会打开你自己的通讯应用。你选择发送的信息由相应服务处理。'}</p><h2>{i?'What we do not do':'我们不会做什么'}</h2><p>{i?'The demonstration does not sell information, share submissions, advertise, or profile you across websites.':'本演示不会出售个人信息、分享表单内容、投放广告或跨站分析你的行为。'}</p><h2>{i?'How to be forgotten':'如何删除信息'}</h2><p>{i?'There are no saved form submissions to erase in this demonstration. For questions about a message you have sent separately, write to ':'本演示没有需要删除的已保存表单内容。如果你通过邮件另行联系并希望咨询相关信息，请写信至 '}<a href={`mailto:${email}`}>{email}</a>。</p></section></>
}

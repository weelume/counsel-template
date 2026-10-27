import type {ComponentType} from 'react'
import type {Locale} from './types'
interface PageProps {locale?:Locale;basePath:string}
const pages=[
  {
    "slug": "",
    "title": "首页",
    "localizedTitles": {
      "en": "Home"
    }
  },
  {
    "slug": "about",
    "title": "关于",
    "localizedTitles": {
      "en": "About"
    }
  },
  {
    "slug": "inside",
    "title": "服务详情",
    "localizedTitles": {
      "en": "Inside the work"
    }
  },
  {
    "slug": "programmes",
    "title": "服务项目",
    "localizedTitles": {
      "en": "Programmes"
    }
  },
  {
    "slug": "journal",
    "title": "文章",
    "localizedTitles": {
      "en": "Journal"
    }
  },
  {
    "slug": "journal/the-advice-trap",
    "title": "建议的陷阱",
    "localizedTitles": {
      "en": "The advice trap"
    }
  },
  {
    "slug": "journal/change-is-behavioural",
    "title": "改变与行为",
    "localizedTitles": {
      "en": "Change is behavioural"
    }
  },
  {
    "slug": "journal/a-room-that-holds",
    "title": "安全的对话空间",
    "localizedTitles": {
      "en": "A room that holds"
    }
  },
  {
    "slug": "journal/seasons-not-sessions",
    "title": "阶段与会谈",
    "localizedTitles": {
      "en": "Seasons, not sessions"
    }
  },
  {
    "slug": "enquire",
    "title": "预约对话",
    "localizedTitles": {
      "en": "Enquire"
    }
  },
  {
    "slug": "contact",
    "title": "联系",
    "localizedTitles": {
      "en": "Contact"
    }
  },
  {
    "slug": "privacy",
    "title": "隐私",
    "localizedTitles": {
      "en": "Privacy"
    }
  }
]
export const counselTemplate={
 id:'counsel',gitUrl:'https://github.com/weelume/counsel-template',name:'The Counsel · 私密咨询',localizedNames:{en:'The Counsel · Private Counsel'},sceneId:'corporate-site',listed:false,tags:['咨询服务','中英文','响应式'],summary:'面向创始人与领导者的私密咨询网站，包含完整文章、服务介绍与预约演示',accentColor:'#a88742',cover:'/templates/counsel/screenshots/desktop-home.webp',
 screenshots:[
  {
    "src": "/templates/counsel/screenshots/desktop-home.webp",
    "alt": "首页",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/counsel/screenshots/desktop-programmes.webp",
    "alt": "服务项目",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/counsel/screenshots/desktop-journal.webp",
    "alt": "文章",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/counsel/screenshots/desktop-contact.webp",
    "alt": "联系",
    "device": "desktop",
    "width": 1430,
    "height": 993
  },
  {
    "src": "/templates/counsel/screenshots/tablet-home.webp",
    "alt": "首页",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/counsel/screenshots/tablet-programmes.webp",
    "alt": "服务项目",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/counsel/screenshots/tablet-journal.webp",
    "alt": "文章",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/counsel/screenshots/tablet-contact.webp",
    "alt": "联系",
    "device": "tablet",
    "width": 824,
    "height": 1166
  },
  {
    "src": "/templates/counsel/screenshots/mobile-home.webp",
    "alt": "首页",
    "device": "mobile",
    "width": 380,
    "height": 822
  },
  {
    "src": "/templates/counsel/screenshots/mobile-programmes.webp",
    "alt": "服务项目",
    "device": "mobile",
    "width": 380,
    "height": 822
  },
  {
    "src": "/templates/counsel/screenshots/mobile-journal.webp",
    "alt": "文章",
    "device": "mobile",
    "width": 380,
    "height": 822
  },
  {
    "src": "/templates/counsel/screenshots/mobile-contact.webp",
    "alt": "联系",
    "device": "mobile",
    "width": 380,
    "height": 822
  }
] as [{src:string;alt:string;device:'desktop'|'tablet'|'mobile';width?:number;height?:number},...{src:string;alt:string;device:'desktop'|'tablet'|'mobile';width?:number;height?:number}[]],
 surfaces:[{id:'site',name:'官网',platform:'pc' as const,locales:['zh','en'] as const,pages:pages.map(page=>({...page,load:async():Promise<{default:ComponentType<PageProps>}>=>{const {default:SitePage}=await import('./SitePage');return {default:function CounselPage(props:PageProps){return <SitePage {...props} slug={page.slug}/>}}}}))}]
}

import type { Locale } from './types'

export function normalizeBasePath(basePath: string): string {
  return basePath === '/' ? '' : basePath.replace(/\/+$/, '')
}
export function pageHref(basePath: string, locale: Locale, slug = ''): string {
  const base = normalizeBasePath(basePath)
  return `${base}${locale === 'en' ? '/en' : ''}${slug ? '/' + slug : ''}` || '/'
}
export function languageHref(pathname: string, basePath: string, locale: Locale, search = '', hash = ''): string {
  const base = normalizeBasePath(basePath)
  if (base && pathname !== base && !pathname.startsWith(base + '/')) throw new Error('页面不属于当前模板挂载路径')
  const suffix = pathname.slice(base.length).replace(/^\/en(?=\/|$)/, '').replace(/^\//, '')
  return pageHref(base, locale, suffix) + (search ? '?' + search.replace(/^\?/, '') : '') + (hash ? '#' + hash.replace(/^#/, '') : '')
}

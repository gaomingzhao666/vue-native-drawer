import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getPlaces } from '../../playground/data'
import { availableLocales, useI18n } from '../../playground/i18n'
import { en } from '../../playground/i18n/locales/en'
import { ja } from '../../playground/i18n/locales/ja'
import { zh } from '../../playground/i18n/locales/zh'

describe('playground i18n & SEO', () => {
  const metaMap = new Map<string, string>()

  beforeEach(() => {
    metaMap.clear()
    const mockDoc = {
      documentElement: {
        lang: '',
        setAttribute(name: string, val: string) {
          if (name === 'xml:lang') (this as unknown as { xmlLang: string }).xmlLang = val
        },
      },
      title: '',
      querySelector(selector: string) {
        if (metaMap.has(selector)) {
          return {
            getAttribute(attr: string) {
              return attr === 'content' ? metaMap.get(selector) : null
            },
            setAttribute(attr: string, val: string) {
              if (attr === 'content') metaMap.set(selector, val)
            },
          }
        }
        return null
      },
      createElement(_tag: string) {
        let sel = ''
        return {
          setAttribute(attr: string, val: string) {
            if (attr === 'name') sel = `meta[name="${val}"]`
            if (attr === 'property') sel = `meta[property="${val}"]`
            if (attr === 'content' && sel) metaMap.set(sel, val)
          },
        }
      },
      head: {
        appendChild(_node: unknown) {},
      },
    }

    globalThis.document = mockDoc as unknown as Document
    globalThis.window = {
      location: { href: 'http://localhost/', search: '' },
      localStorage: {
        getItem: () => null,
        setItem: () => {},
      },
      history: {
        replaceState: () => {},
      },
    } as unknown as Window & typeof globalThis

    const { setLocale } = useI18n()
    setLocale('en')
  })

  afterEach(() => {
    delete (globalThis as Record<string, unknown>).document
    delete (globalThis as Record<string, unknown>).window
  })

  it('contains consistent translation keys across en, ja, and zh', () => {
    const checkKeys = (a: Record<string, unknown>, b: Record<string, unknown>, prefix = '') => {
      for (const key of Object.keys(a)) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        expect(b, `Missing key in target: ${fullKey}`).toHaveProperty(key)
        if (typeof a[key] === 'object' && a[key] !== null && !Array.isArray(a[key])) {
          checkKeys(a[key] as Record<string, unknown>, b[key] as Record<string, unknown>, fullKey)
        }
      }
    }

    checkKeys(en as unknown as Record<string, unknown>, ja as unknown as Record<string, unknown>)
    checkKeys(en as unknown as Record<string, unknown>, zh as unknown as Record<string, unknown>)
  })

  it('switches languages and updates DOM semantics and meta tags', () => {
    const { locale, t, setLocale } = useI18n()

    // 1. English
    setLocale('en')
    expect(locale.value).toBe('en')
    expect(t.value.header.title).toBe('vue-native-drawer')
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe(en.seo.title)
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      en.seo.description,
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'en_US',
    )

    // 2. Japanese
    setLocale('ja')
    expect(locale.value).toBe('ja')
    expect(t.value.header.currentLanguage).toBe('日本語')
    expect(document.documentElement.lang).toBe('ja')
    expect(document.title).toBe(ja.seo.title)
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      ja.seo.description,
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'ja_JP',
    )
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(
      ja.seo.title,
    )

    // 3. Chinese
    setLocale('zh')
    expect(locale.value).toBe('zh')
    expect(t.value.header.currentLanguage).toBe('简体中文')
    expect(document.documentElement.lang).toBe('zh-CN')
    expect(document.title).toBe(zh.seo.title)
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      zh.seo.description,
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'zh_CN',
    )
  })

  it('provides localized places data', () => {
    const enPlaces = getPlaces('en')
    const jaPlaces = getPlaces('ja')
    const zhPlaces = getPlaces('zh')

    expect(enPlaces[0]?.kind).toBe('Coffee')
    expect(jaPlaces[0]?.kind).toBe('カフェ')
    expect(zhPlaces[0]?.kind).toBe('咖啡馆')
    expect(enPlaces.length).toBe(jaPlaces.length)
    expect(enPlaces.length).toBe(zhPlaces.length)
  })

  it('exposes available locales list', () => {
    expect(availableLocales.map((l) => l.code)).toEqual(['en', 'ja', 'zh'])
  })
})

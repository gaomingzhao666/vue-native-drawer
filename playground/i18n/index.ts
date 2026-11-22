import { computed, ref, watch } from 'vue'
import { en } from './locales/en'
import { ja } from './locales/ja'
import { zh } from './locales/zh'
import type { Locale, LocaleInfo, Messages } from './types'

export type { Locale, LocaleInfo, Messages } from './types'

export const availableLocales: LocaleInfo[] = [
  { code: 'en', label: 'English', langTag: 'en', ogLocale: 'en_US' },
  { code: 'ja', label: '日本語', langTag: 'ja', ogLocale: 'ja_JP' },
  { code: 'zh', label: '简体中文', langTag: 'zh-CN', ogLocale: 'zh_CN' },
]

const messages: Record<Locale, Messages> = {
  en,
  ja,
  zh,
}

const STORAGE_KEY = 'vnd_lang'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'

  try {
    const params = new URLSearchParams(window.location.search)
    const langParam = params.get('lang')?.toLowerCase()
    if (langParam === 'ja') return 'ja'
    if (langParam === 'zh' || langParam === 'zh-cn' || langParam === 'zh-hans') return 'zh'
    if (langParam === 'en') return 'en'

    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ja' || saved === 'zh' || saved === 'en') {
      return saved
    }
  } catch {
    // ignore security / storage restrictions
  }

  return 'en'
}

const currentLocale = ref<Locale>(getInitialLocale())

function setMeta(selector: string, content: string) {
  if (typeof document === 'undefined') return
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    if (selector.startsWith('meta[name=')) {
      const name = selector.slice(11, -2)
      el.setAttribute('name', name)
    } else if (selector.startsWith('meta[property=')) {
      const prop = selector.slice(15, -2)
      el.setAttribute('property', prop)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function updateHeadSemantics(locale: Locale) {
  if (typeof document === 'undefined') return

  const info = availableLocales.find((item) => item.code === locale) || availableLocales[0]!
  const msg = messages[locale]

  // Update HTML document lang semantic attribute
  document.documentElement.lang = info.langTag
  document.documentElement.setAttribute('xml:lang', info.langTag)

  // Update title
  document.title = msg.seo.title

  setMeta('meta[name="description"]', msg.seo.description)
  setMeta('meta[name="keywords"]', msg.seo.keywords)

  // Open Graph
  setMeta('meta[property="og:title"]', msg.seo.title)
  setMeta('meta[property="og:description"]', msg.seo.description)
  setMeta('meta[property="og:locale"]', info.ogLocale)

  // Twitter
  setMeta('meta[name="twitter:title"]', msg.seo.title)
  setMeta('meta[name="twitter:description"]', msg.seo.description)
}

function syncUrlAndStorage(locale: Locale) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // ignore
  }

  try {
    const url = new URL(window.location.href)
    if (locale === 'en') {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', locale)
    }
    window.history.replaceState(null, '', url.toString())
  } catch {
    // ignore
  }
}

// Watch locale changes to keep DOM semantics and storage updated
watch(
  currentLocale,
  (newLocale) => {
    updateHeadSemantics(newLocale)
    syncUrlAndStorage(newLocale)
  },
  { immediate: true },
)

export function useI18n() {
  const t = computed(() => messages[currentLocale.value])

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
    updateHeadSemantics(locale)
    syncUrlAndStorage(locale)
  }

  return {
    locale: currentLocale,
    t,
    setLocale,
    availableLocales,
  }
}

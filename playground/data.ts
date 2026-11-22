import type { Locale } from './i18n'

export interface Place {
  name: string
  kind: string
  distance: string
  color: string
}

const localizedKinds: Record<Locale, string[]> = {
  en: ['Coffee', 'Bakery', 'Bookstore', 'Park', 'Museum', 'Ramen', 'Gallery', 'Market'],
  ja: ['カフェ', 'ベーカリー', '書店', '公園', '美術館', 'ラーメン', 'ギャラリー', 'マーケット'],
  zh: ['咖啡馆', '烘焙坊', '书店', '公园', '美术馆', '拉面', '画廊', '市集'],
}

const colors = [
  '#ff9500',
  '#ff2d55',
  '#5856d6',
  '#34c759',
  '#af52de',
  '#ff3b30',
  '#5ac8fa',
  '#ffcc00',
]

const names = [
  'Blue Bottle',
  'Tartine',
  'City Lights',
  'Golden Gate',
  'SFMOMA',
  'Mensho',
  'Gagosian',
  'Ferry Building',
  'Ritual',
  'Arsicault',
  'Green Apple',
  'Dolores',
  'de Young',
  'Marufuku',
  'Fraenkel',
  'Bi-Rite',
  'Sightglass',
  'Jane',
  'Dog Eared',
  'Alamo Square',
]

export const getPlaces = (locale: Locale = 'en'): Place[] => {
  const kinds = localizedKinds[locale] || localizedKinds.en
  return names.map((name, index) => ({
    name,
    kind: kinds[index % kinds.length]!,
    distance: `${((index + 1) * 0.3).toFixed(1)} km`,
    color: colors[index % colors.length]!,
  }))
}

export const places: Place[] = getPlaces('en')

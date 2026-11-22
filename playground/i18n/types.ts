export type Locale = 'en' | 'ja' | 'zh'

export interface LocaleInfo {
  code: Locale
  label: string
  langTag: string
  ogLocale: string
}

export interface Messages {
  seo: {
    title: string
    description: string
    keywords: string
  }
  header: {
    eyebrow: string
    title: string
    description: string
    switchLanguage: string
    currentLanguage: string
  }
  grid: {
    ariaLabel: string
  }
  snapPoints: {
    cardTitle: string
    cardDescription: string
    openButton: string
    drawerTitle: string
    drawerDescription: string
    doneButton: string
    snapLabels: {
      third: string
      half: string
      full: string
    }
  }
  fit: {
    cardTitle: string
    cardDescription: string
    openButton: string
    nothingYet: string
    drawerTitle: string
    targets: Array<{ name: string; color: string }>
    actions: string[]
    deleteText: string
  }
  scale: {
    cardTitle: string
    cardDescription: string
    openButton: string
    drawerTitle: string
    nameLabel: string
    bioLabel: string
    defaultBio: string
    saveButton: string
  }
  nonModal: {
    cardTitle: string
    cardDescription: string
    showPlayer: string
    hidePlayer: string
    segmentedAriaLabel: string
    snapLabels: [string, string, string]
    songTitle: string
    songArtist: string
    prose: string
  }
  directions: {
    cardTitle: string
    cardDescription: string
    topButton: string
    leftButton: string
    rightButton: string
    topNotice: {
      title: string
      subtitle: string
    }
    menuTitle: string
    menuItems: string[]
    filtersTitle: string
    filtersDescription: string
    filterItems: string[]
  }
  nested: {
    cardTitle: string
    cardDescription: string
    openButton: string
    outerTitle: string
    outerDescription: string
    outerProse: string
    openInnerButton: string
    innerTitle: string
    innerDescription: string
    innerProse: string
    closeButton: string
  }
  locked: {
    cardTitle: string
    cardDescription: string
    openButton: string
    drawerTitle: string
    drawerDescription: string
    prose: string
    acceptButton: string
  }
  fade: {
    cardTitle: string
    cardDescription: string
    openButton: string
    drawerTitle: string
    drawerDescription: string
    proseIntro: string
    moduleText: (n: number) => string
  }
  footer: {
    github: string
    builtWith: string
  }
}

import type { Messages } from '../types'

export const en: Messages = {
  seo: {
    title: 'vue-native-drawer — Native iOS-style Sheet for Vue 3.5',
    description:
      'A native iOS-style drawer (bottom sheet) for Vue 3.5, with snap points, momentum gestures, rubber banding and card stacks.',
    keywords:
      'vue, vue3, vue 3.5, drawer, bottom sheet, action sheet, ios sheet, modal drawer, snap points, momentum gestures, rubber banding, mobile ui',
  },
  header: {
    eyebrow: 'Vue 3.5',
    title: 'vue-native-drawer',
    description:
      'A drawer that moves like an iOS sheet: snap points, momentum, rubber banding and the card stack, all in one flat component written in plain TypeScript and CSS.',
    switchLanguage: 'Switch language',
    currentLanguage: 'English',
  },
  grid: {
    ariaLabel: 'Interactive component demos',
  },
  snapPoints: {
    cardTitle: 'Snap points',
    cardDescription:
      'Opens at a third of the screen. Drag up to half and full height, flick to skip ahead and drag down to close. The list scrolls once the drawer is fully open.',
    openButton: 'Open drawer',
    drawerTitle: 'Nearby',
    drawerDescription: '20 places within walking distance',
    doneButton: 'Done',
    snapLabels: {
      third: '1/3',
      half: '1/2',
      full: 'full',
    },
  },
  fit: {
    cardTitle: 'Fit content',
    cardDescription:
      'An action sheet that is exactly as tall as its content. Drag it down, tap outside or press Escape to dismiss.',
    openButton: 'Share…',
    nothingYet: 'Nothing yet',
    drawerTitle: 'Share',
    targets: [
      { name: 'Messages', color: '#34c759' },
      { name: 'Mail', color: '#007aff' },
      { name: 'Notes', color: '#ffcc00' },
      { name: 'Reminders', color: '#ff9500' },
    ],
    actions: ['Copy link', 'Add to favorites', 'Add bookmark'],
    deleteText: 'Delete',
  },
  scale: {
    cardTitle: 'Scaled background',
    cardDescription:
      'Opens fully expanded and pushes the page back like a stack of iOS cards. Drag it down to half height and the page comes forward again.',
    openButton: 'Edit profile',
    drawerTitle: 'Edit profile',
    nameLabel: 'Name',
    bioLabel: 'Bio',
    defaultBio: 'Designer and weekend baker.',
    saveButton: 'Save',
  },
  nonModal: {
    cardTitle: 'Non-modal',
    cardDescription:
      'No overlay: the page stays scrollable and interactive, like the sheet in Maps. The buttons below control the snap point from the outside.',
    showPlayer: 'Show player',
    hidePlayer: 'Hide player',
    segmentedAriaLabel: 'Snap point',
    snapLabels: ['Peek', 'Half', 'Full'],
    songTitle: 'Weightless',
    songArtist: 'Marconi Union',
    prose:
      'Non-modal drawers leave focus and scrolling to the page. Use them for panels that live alongside your content.',
  },
  directions: {
    cardTitle: 'Directions',
    cardDescription:
      'Bottom is the default. Drawers can also come from the top or slide in from either side.',
    topButton: 'Top',
    leftButton: 'Left',
    rightButton: 'Right',
    topNotice: {
      title: 'Backup complete',
      subtitle: 'Swipe up to dismiss',
    },
    menuTitle: 'Menu',
    menuItems: ['Home', 'Library', 'Downloads', 'Settings', 'Help'],
    filtersTitle: 'Filters',
    filtersDescription: 'Swipe right to close',
    filterItems: ['Open now', 'Top rated', 'Free Wi-Fi', 'Outdoor seating'],
  },
  nested: {
    cardTitle: 'Nested drawers',
    cardDescription:
      'Open a drawer from inside another one. The first drawer steps back while the second is on top, and comes forward again as you drag the second away.',
    openButton: 'Open drawer',
    outerTitle: 'First drawer',
    outerDescription: 'Nothing special about me.',
    outerProse: 'Drawers can be nested as deep as you like.',
    openInnerButton: 'Open another drawer',
    innerTitle: 'Second drawer',
    innerDescription: 'Drag me down and watch the first drawer.',
    innerProse: 'Closing this one brings the first drawer back to the front.',
    closeButton: 'Close',
  },
  locked: {
    cardTitle: 'Non-dismissible',
    cardDescription:
      'Ignores swipes, overlay taps and Escape. It only closes when the button inside says so.',
    openButton: 'Review terms',
    drawerTitle: 'Updated terms',
    drawerDescription: 'Please review the changes before you continue.',
    prose:
      'We changed how we store your preferences. Nothing leaves your device without your permission, and you can export or delete your data at any time.',
    acceptButton: 'Accept',
  },
  fade: {
    cardTitle: 'Pixel snap points',
    cardDescription:
      'Snap points in pixels, and an overlay that only fades in on the way to the last one.',
    openButton: 'Open drawer',
    drawerTitle: 'The hidden details',
    drawerDescription: '2 modules, 27 hours of video',
    proseIntro:
      'The world of user interface design is an intricate landscape filled with hidden details and nuance. Drag up to read on.',
    moduleText: (n: number) =>
      `Module ${n}: layers of UI, typography, animation curves and the small touches that make an interface feel alive.`,
  },
  footer: {
    github: 'GitHub',
    builtWith: '· Built with Vue 3.5, VueUse and plain CSS.',
  },
}

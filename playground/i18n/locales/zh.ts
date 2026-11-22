import type { Messages } from '../types'

export const zh: Messages = {
  seo: {
    title: 'vue-native-drawer — 适用于 Vue 3.5 的原生 iOS 风格抽屉组件',
    description:
      '适用于 Vue 3.5 的原生 iOS 风格抽屉（Bottom Sheet）组件，支持吸附断点、惯性滑动手势、弹性回弹与卡片堆叠效果。',
    keywords:
      'vue, vue3, vue 3.5, drawer, 抽屉组件, 底部弹窗, bottom sheet, action sheet, ios sheet, 吸附断点, 惯性手势, 移动端UI',
  },
  header: {
    eyebrow: 'Vue 3.5',
    title: 'vue-native-drawer',
    description:
      '手感媲美 iOS 原生 Sheet 的抽屉组件：吸附断点、惯性滑动手势、橡皮筋回弹与卡片堆叠，纯 TypeScript 和原生 CSS 构建。',
    switchLanguage: '切换语言',
    currentLanguage: '简体中文',
  },
  grid: {
    ariaLabel: '交互式组件演示',
  },
  snapPoints: {
    cardTitle: '吸附断点',
    cardDescription:
      '默认展开到屏幕 1/3 高度。向上拖拽可切换到半屏或全屏，快速轻扫可直接吸附至断点，向下拉动即可关闭。抽屉完全展开后列表支持内部滚动。',
    openButton: '打开抽屉',
    drawerTitle: '附近地点',
    drawerDescription: '步行范围内的 20 个地点',
    doneButton: '完成',
    snapLabels: {
      third: '1/3',
      half: '1/2',
      full: '全屏',
    },
  },
  fit: {
    cardTitle: '自适应内容高度',
    cardDescription: '根据内容高度自适应 Action Sheet。向下拖拽、点击遮罩或按 Escape 键即可关闭。',
    openButton: '分享',
    nothingYet: '暂无选择',
    drawerTitle: '分享',
    targets: [
      { name: '信息', color: '#34c759' },
      { name: '邮件', color: '#007aff' },
      { name: '备忘录', color: '#ffcc00' },
      { name: '提醒事项', color: '#ff9500' },
    ],
    actions: ['拷贝链接', '添加到个人收藏', '添加书签'],
    deleteText: '删除',
  },
  scale: {
    cardTitle: '背景卡片缩放',
    cardDescription:
      '以全展开状态打开，并将背景页面向后推移形成 iOS 风格卡片层叠。向下拖到半屏高度时背景恢复原位。',
    openButton: '编辑个人资料',
    drawerTitle: '编辑个人资料',
    nameLabel: '姓名',
    bioLabel: '个人简介',
    defaultBio: '设计师，周末烘焙爱好者。',
    saveButton: '保存',
  },
  nonModal: {
    cardTitle: '非模态模式',
    cardDescription:
      '无遮罩遮挡：页面保持可滚动且可交互，类似于地图 App 中的底栏。下方的按钮可以从外部控制吸附断点。',
    showPlayer: '显示播放器',
    hidePlayer: '隐藏播放器',
    segmentedAriaLabel: '吸附断点',
    snapLabels: ['轻触预览', '半屏', '全屏'],
    songTitle: 'Weightless',
    songArtist: 'Marconi Union',
    prose: '非模态抽屉将焦点和滚动权保留给主页面。适用于与主要内容并存的操作面板或媒体底栏。',
  },
  directions: {
    cardTitle: '弹出方向',
    cardDescription: '默认从底部滑出。抽屉同样支持从顶部滑下，或从左侧、右侧边缘滑入。',
    topButton: '顶部',
    leftButton: '左侧',
    rightButton: '右侧',
    topNotice: {
      title: '备份已完成',
      subtitle: '向上滑动以关闭',
    },
    menuTitle: '菜单',
    menuItems: ['首页', '资料库', '下载', '设置', '帮助'],
    filtersTitle: '筛选',
    filtersDescription: '向右滑动以关闭',
    filterItems: ['营业中', '高评分', '免费 Wi-Fi', '室外露天座'],
  },
  nested: {
    cardTitle: '抽屉嵌套',
    cardDescription:
      '在一个抽屉内部打开另一个抽屉。当第二个抽屉处于顶层时，第一个抽屉会退至背景层，拖拽关闭第二个抽屉时，第一个抽屉会自动移回前台。',
    openButton: '打开抽屉',
    outerTitle: '第一层抽屉',
    outerDescription: '一个常规的基础抽屉。',
    outerProse: '抽屉支持任意深度的层层嵌套。',
    openInnerButton: '打开另一层抽屉',
    innerTitle: '第二层抽屉',
    innerDescription: '向下拉动我，并观察第一层抽屉的变化。',
    innerProse: '关闭此抽屉会将第一层抽屉恢复到最前面。',
    closeButton: '关闭',
  },
  locked: {
    cardTitle: '不可随意关闭',
    cardDescription: '忽略拖拽手势、点击遮罩和 Escape 键关闭。仅能通过内部提供的按钮触发关闭。',
    openButton: '阅读服务条款',
    drawerTitle: '服务条款更新',
    drawerDescription: '在继续之前，请查阅条款变更内容。',
    prose:
      '我们更新了偏好设置的存储方式。未经您的明确许可，任何数据都不会离开您的设备，您可以随时导出或删除个人数据。',
    acceptButton: '同意并接受',
  },
  fade: {
    cardTitle: '像素吸附断点',
    cardDescription: '支持使用绝对像素作为吸附断点，且遮罩层仅在滑向最后一个断点时渐变显现。',
    openButton: '打开抽屉',
    drawerTitle: '探寻细节之美',
    drawerDescription: '共 2 个模块，27 小时视频',
    proseIntro: '界面设计的世界是一门精雕细琢的艺术，充满着微妙而精致的细节。向上拖拽以继续阅读。',
    moduleText: (n: number) =>
      `模块 ${n}：UI 层级设计、字体排版、动效曲线以及赋予界面鲜活生命力的点滴细节。`,
  },
  footer: {
    github: 'GitHub',
    builtWith: '· 基于 Vue 3.5、VueUse 和纯 CSS 构建。',
  },
}

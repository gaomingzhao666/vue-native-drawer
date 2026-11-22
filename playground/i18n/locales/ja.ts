import type { Messages } from '../types'

export const ja: Messages = {
  seo: {
    title: 'vue-native-drawer — Vue 3.5 向け iOS スタイル ドロワー',
    description:
      'スナップポイント、慣性ジェスチャー、ラバーバンド、カードスタックに対応した Vue 3.5 向けネイティブ iOS スタイル ドロワー。',
    keywords:
      'vue, vue3, vue 3.5, ドロワー, ボトムシート, アクションシート, ios シート, モーダル, スナップポイント, ジェスチャー, モバイルUI',
  },
  header: {
    eyebrow: 'Vue 3.5',
    title: 'vue-native-drawer',
    description:
      'iOS のシートのように動くドロワー：スナップポイント、慣性スクロール、ラバーバンド効果、カードスタックを、プレーンな TypeScript と CSS で書かれた1つのフラットなコンポーネントで実現。',
    switchLanguage: '言語を切り替える',
    currentLanguage: '日本語',
  },
  grid: {
    ariaLabel: 'インタラクティブなコンポーネントのデモ',
  },
  snapPoints: {
    cardTitle: 'スナップポイント',
    cardDescription:
      '画面の1/3の高さで開きます。ドラッグして半分や最大の高さまで引き上げ、フリックで一気に移動し、下にドラッグして閉じます。完全に開くとリストがスクロール可能になります。',
    openButton: 'ドロワーを開く',
    drawerTitle: '周辺スポット',
    drawerDescription: '徒歩圏内の20のスポット',
    doneButton: '完了',
    snapLabels: {
      third: '1/3',
      half: '1/2',
      full: '最大',
    },
  },
  fit: {
    cardTitle: 'コンテンツにフィット',
    cardDescription:
      'コンテンツの高さにぴったり合わせるアクションシート。下にドラッグするか、外側をタップするか、Escapeキーを押して閉じます。',
    openButton: 'シェア',
    nothingYet: '未選択',
    drawerTitle: 'シェア',
    targets: [
      { name: 'メッセージ', color: '#34c759' },
      { name: 'メール', color: '#007aff' },
      { name: 'メモ', color: '#ffcc00' },
      { name: 'リマインダー', color: '#ff9500' },
    ],
    actions: ['リンクをコピー', 'お気に入りに追加', 'ブックマークを追加'],
    deleteText: '削除',
  },
  scale: {
    cardTitle: '背景のスケール',
    cardDescription:
      '全画面で開き、iOSのカードスタックのように背景ページを奥へ縮小します。半分の高さまで下げると背景が手前に戻ります。',
    openButton: 'プロフィールを編集',
    drawerTitle: 'プロフィール編集',
    nameLabel: '名前',
    bioLabel: '自己紹介',
    defaultBio: 'デザイナー。休日はパン作り。',
    saveButton: '保存',
  },
  nonModal: {
    cardTitle: '非モーダル',
    cardDescription:
      'オーバーレイなし：マップアプリのシートのように、ページはスクロール可能で操作を受け付けます。下のボタンで外部からスナップ位置を操作できます。',
    showPlayer: 'プレーヤーを表示',
    hidePlayer: 'プレーヤーを隠す',
    segmentedAriaLabel: 'スナップ位置',
    snapLabels: ['最小', '半分', '全画面'],
    songTitle: 'Weightless',
    songArtist: 'Marconi Union',
    prose:
      '非モーダルドロワーはフォーカスとスクロールをページ側に残します。コンテンツと共存する常駐パネルに最適です。',
  },
  directions: {
    cardTitle: 'スライド方向',
    cardDescription:
      '下からの表示がデフォルトですが、上から引き出すことも、左右どちらの端からスライドインすることも可能です。',
    topButton: '上',
    leftButton: '左',
    rightButton: '右',
    topNotice: {
      title: 'バックアップ完了',
      subtitle: '上にスワイプして閉じる',
    },
    menuTitle: 'メニュー',
    menuItems: ['ホーム', 'ライブラリ', 'ダウンロード', '設定', 'ヘルプ'],
    filtersTitle: 'フィルター',
    filtersDescription: '右にスワイプして閉じる',
    filterItems: ['営業中', '高評価', '無料Wi-Fi', 'テラス席あり'],
  },
  nested: {
    cardTitle: 'ネストされたドロワー',
    cardDescription:
      'ドロワーの中から別のドロワーを開きます。2枚目が最前面にある間、1枚目は奥へ後退し、2枚目を閉じると再び手前に復帰します。',
    openButton: 'ドロワーを開く',
    outerTitle: '1枚目のドロワー',
    outerDescription: '特別な設定はありません。',
    outerProse: 'ドロワーは何階層でも自由にネストできます。',
    openInnerButton: '別のドロワーを開く',
    innerTitle: '2枚目のドロワー',
    innerDescription: '下にドラッグして1枚目の動きを確認してください。',
    innerProse: 'これを閉じると、1枚目のドロワーが手前に復帰します。',
    closeButton: '閉じる',
  },
  locked: {
    cardTitle: '閉じ不可（ロック）',
    cardDescription:
      'スワイプ、オーバーレイのタップ、Escapeキーを無効化。内部のボタンを押した時のみ閉じることができます。',
    openButton: '利用規約を確認',
    drawerTitle: '規約の改定',
    drawerDescription: '続行する前に変更内容をご確認ください。',
    prose:
      '設定情報の保存方法を変更しました。お客様の同意なしに端末外へデータが送信されることはありません。また、いつでもデータをエクスポートまたは削除できます。',
    acceptButton: '同意する',
  },
  fade: {
    cardTitle: 'ピクセル単位のスナップ',
    cardDescription:
      'ピクセル指定のスナップポイントと、最後のスナップポイントに向かうときだけフェードインするオーバーレイ。',
    openButton: 'ドロワーを開く',
    drawerTitle: '隠されたディテール',
    drawerDescription: '2つのモジュール、計27時間の講義',
    proseIntro:
      'ユーザーインターフェースデザインの世界は、隠れたディテールとニュアンスに満ちた精緻な空間です。上にドラッグして続きを読む。',
    moduleText: (n: number) =>
      `モジュール ${n}：UIレイヤー、タイポグラフィ、アニメーションイージングカーブ、そしてインターフェースを生き生きとさせる微細なこだわり。`,
  },
  footer: {
    github: 'GitHub',
    builtWith: '· Vue 3.5、VueUse、プレーン CSS で構築。',
  },
}

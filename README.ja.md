# vue-native-drawer

[![npm version](https://img.shields.io/npm/v/vue-native-drawer.svg?color=3388ff)](https://www.npmjs.com/package/vue-native-drawer)
[![npm downloads](https://img.shields.io/npm/dm/vue-native-drawer.svg)](https://www.npmjs.com/package/vue-native-drawer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/vue-native-drawer)](https://bundlephobia.com/package/vue-native-drawer)
[![CI](https://github.com/gaomingzhao666/vue-native-drawer/actions/workflows/ci.yml/badge.svg)](https://github.com/gaomingzhao666/vue-native-drawer/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/gaomingzhao666/vue-native-drawer.svg?color=blue)](./LICENSE)
[![Vue 3.5+](https://img.shields.io/badge/vue-3.5%2B-42b883.svg)](https://vuejs.org/)

[English](./README.md) | 日本語 | [简体中文](./README.zh-CN.md)

**Vue 3.5** 向けに構築された、ネイティブ iOS シートのように動く Web 向けドロワー（ボトムシート）コンポーネント。
[vaul-vue](https://github.com/unovue/vaul-vue) に着想を得て、より高いパフォーマンス、モダンな設計、そしてフラットなコンポーネント API を備えたアクティブメンテナンス版です。

画面下部から 1/3 の高さで開き、ドラッグで半画面や全画面まで引き上げ、フリックで一気に移動し、下にドラッグして閉じることができます。ドラッグは指の動きに 1:1 で追従し、指を離しても慣性が維持され、端を超えて引っ張ると UIKit のようなラバーバンド効果（ゴムのような伸縮）が発生します。

- **1 つのフラットなコンポーネント**: `<Drawer v-model:open="open">` だけで完結。root、portal、overlay、content といった子コンポーネントをネストする必要はありません。
- **ネイティブの操作感**: 慣性予測付きのスナップポイント、UIKit のシート曲線に合わせた速度連動の収束アニメーション、ラバーバンド効果、そしてカードスタックのように背景ページが奥へと縮小する効果を備えています。
- **ジェスチャー検知**: ドロワーが完全に開いた状態でのみ内部コンテンツがスクロールし、それ以外ではドロワー自体のドラッグになります。横スワイプ、テキスト入力欄、`data-vnd-no-drag` 領域はドラッグから除外されます。
- **標準的な Vue 設計**: `<script setup>` で記述され、`createApp()` でそのまま動作します。
- **軽量**: プレーンな TypeScript と CSS。唯一のランタイム依存は VueUse のみです。

## インストール

```sh
npm install vue-native-drawer
```

Vue 3 環境では `vue` 3.5 以降が peer dependency として必要です。開発およびテストには Vue 3.5.46 を使用しています。

## 使い方

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import 'vue-native-drawer/style.css'

const open = ref(false)
</script>

<template>
  <button @click="open = true">ドロワーを開く</button>

  <Drawer v-model:open="open" title="周辺スポット" description="現在地周辺のスポット">
    <p>上下にドラッグするか、スワイプして閉じることができます。</p>

    <template #footer="{ close }">
      <button @click="close">完了</button>
    </template>
  </Drawer>
</template>
```

Vue の標準レンダラーでアプリケーションをマウントします:

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## スナップポイント (Snap points)

スナップポイントはドロワーの停止位置です。各値はドロワーの表示される高さを表します:

| 値                         | 意味                                                 |
| -------------------------- | ---------------------------------------------------- |
| `0`–`1`                    | ドロワー最大サイズに対する割合（`0.5` は半分の高さ） |
| `1` より大きい数値、`'px'` | ピクセル（`240` または `'240px'`）                   |
| `'%'`                      | 最大サイズに対するパーセンテージ（`'50%'`）          |

上下方向のドロワーのデフォルトは `[1 / 3, 1 / 2, 1]` で、最初は画面の 1/3 で開きます。左右方向のドロワーおよび `fit` を指定したドロワーのデフォルトは `[1]` です。スナップポイントは最小値から最大値の順に指定してください。ドロワーは最初の位置で開き、閉じるたびにその位置に戻ります。

```vue
<Drawer v-model:open="open" v-model:snap-point="snap" :snap-points="['148px', 0.5, 1]" />
```

`v-model:snap-point` はドロワーが停止している位置を取得・操作できます。最大のスナップポイントでドロワーは「展開状態」（`data-expanded`）となり、この状態でのみ内部コンテンツがスクロールします。

指を離すと、その時点の移動慣性に基づいて前方に予測され、最も近いスナップポイントに着地します。素早いフリックはその方向にある次のスナップポイントへ常に移動し、強いフリックなら複数ポイントを一気にスキップできます。最小スナップポイントから全閉までの距離の `closeThreshold`（デフォルトは 1/4）を超えて離された場合、または最小スナップポイントから下方向に素早くフリックされた場合にドロワーは閉じます。

## API リファレンス

### Props

| プロパティ        | 型                                       | デフォルト値                 | 説明                                                                                                               |
| ----------------- | ---------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `snapPoints`      | `SnapPoint[]`                            | `[1/3, 1/2, 1]` または `[1]` | 停止位置の配列（小さい順）。[スナップポイント](#スナップポイント-snap-points)を参照。                              |
| `direction`       | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'`                   | ドロワーが出現する方向。                                                                                           |
| `dismissible`     | `boolean`                                | `true`                       | 外側へのドラッグ、オーバーレイのタップ、または Escape キーで閉じることを許可するかどうか。                         |
| `modal`           | `boolean`                                | `true`                       | オーバーレイを表示し、ページスクロールをロックしてフォーカスをドロワー内に閉じ込めます。`false` でページ操作可能。 |
| `fit`             | `boolean`                                | `false`                      | 全画面の高さではなく、コンテンツの高さにドロワーのサイズを合わせます。                                             |
| `handle`          | `boolean`                                | 上下ドロワーは `true`        | グラブハンドルを表示するかどうか。クリックまたは Enter/Space キーでスナップポイントを順に切り替えます。            |
| `handleOnly`      | `boolean`                                | `false`                      | ハンドルまたは `data-vnd-handle` を持つ要素からのみドラッグを許可します。                                          |
| `fadeFrom`        | `number`                                 | `0`                          | オーバーレイが完全に不透明になるスナップポイントのインデックス。直前のスナップポイントからフェードインします。     |
| `scaleBackground` | `boolean \| string`                      | `false`                      | ドロワー展開時に iOS のように背景ページを奥へ縮小します。`true` は `data-vnd-background` 要素、文字列はセレクタ。  |
| `closeThreshold`  | `number`                                 | `0.25`                       | 最小スナップポイントから閉じる位置までの間で、閉じるトリガーとなる移動割合。                                       |
| `title`           | `string`                                 |                              | タイトル。ヘッダー内に描画され、ダイアログのアクセシブルな名前として使用されます。                                 |
| `description`     | `string`                                 |                              | タイトル下の説明文。アクセシブルな説明として使用されます。                                                         |
| `to`              | `string \| HTMLElement \| false`         | `'body'`                     | Teleport 先のターゲット。`false` を指定するとその場でレンダリングされます。                                        |

その他の属性（`class`、`style`、`aria-*`、`data-*`、イベントリスナーなど）はドロワー要素にそのまま渡されます。明示的な `aria-*` 属性は自動生成されるデフォルト値よりも優先されます。インラインカスタムプロパティ `--vnd-overlay-color` および `--vnd-z-index` はオーバーレイにも連動して適用されます。

### Models

| Model                | 型          | 説明                                                                                     |
| -------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `v-model:open`       | `boolean`   | ドロワーが開いているかどうか。親コンポーネントが更新しない限り、ドロワーは開き続けます。 |
| `v-model:snap-point` | `SnapPoint` | ドロワーが現在停止しているスナップポイント。                                             |

### Events

| イベント | ペイロード         | 説明                                                                   |
| -------- | ------------------ | ---------------------------------------------------------------------- |
| `drag`   | `progress: number` | ドラッグ中に発火: ドロワーの表示割合（0〜1）。                         |
| `opened` |                    | 開くアニメーションが完了したときに発火します。                         |
| `closed` |                    | 閉じるアニメーションが完了し、ドロワーが完全に消えたときに発火します。 |

### Slots

`default`（スクロール可能なコンテンツ領域）、`header`（タイトルと説明を置換）、`footer`（全スナップポイントで画面上に固定表示）を提供します。各スロットには以下が渡されます:

| スロットプロパティ | 型                           | 説明                                           |
| ------------------ | ---------------------------- | ---------------------------------------------- |
| `close`            | `() => void`                 | ドロワーを閉じる関数。                         |
| `snapTo`           | `(point: SnapPoint) => void` | 指定したスナップポイントへアニメーション移動。 |
| `snapPoint`        | `SnapPoint`                  | ドロワーが現在停止しているスナップポイント。   |
| `expanded`         | `boolean`                    | 最大スナップポイントで展開されているかどうか。 |

### Template ref

テンプレート参照を通じて `show()`、`close()`、`snapTo(point)` を呼び出すことができます。

## 使用例

```vue
<!-- コンテンツの高さにぴったり合わせるアクションシート -->
<Drawer v-model:open="open" fit title="シェア">…</Drawer>

<!-- サイドメニュー -->
<Drawer v-model:open="open" direction="left" title="メニュー">…</Drawer>

<!-- iOS のカードスタック効果: アプリのルート要素に data-vnd-background を付与 -->
<div id="app" data-vnd-background>…</div>
<Drawer v-model:open="open" :snap-points="[1]" scale-background>…</Drawer>

<!-- 地図アプリ風の非モーダルパネル（ページ操作を阻害しない） -->
<Drawer v-model:open="open" :modal="false" :snap-points="['140px', 0.5, 1]">…</Drawer>

<!-- 必ず確認が必要なダイアログ（ドラッグや外側タップで閉じない） -->
<Drawer v-model:open="open" :dismissible="false">…</Drawer>
```

ドロワーのネストにも対応しています: ドロワーの中から別のドロワーを開くと、1枚目のドロワーが奥へとステップバックします。

[`playground/`](./playground) でこれらの全デモを確認できます。`npm run dev` で実行してください。

## スタイリング

ドロワーには `color-scheme`（ライト/ダークモード）に対応した独立した iOS スタイルの CSS が付属しています。`.vnd-drawer` またはパネルの祖先要素にカスタムプロパティを設定してカスタマイズできます:

```css
.vnd-drawer {
  --vnd-background: #f2f2f7;
  --vnd-radius: 16px;
  --vnd-max-width: 40rem; /* 大画面で上下ドロワーを中央寄せ */
}
```

オーバーレイとパネルは兄弟要素です。`.vnd-drawer` だけに指定したプロパティは `.vnd-overlay` に継承されません。オーバーレイの色はオーバーレイ自体に、z-index は両方の要素または共通の親要素に指定してください:

```css
.vnd-overlay {
  --vnd-overlay-color: rgb(20 25 40 / 0.55);
}

.vnd-overlay,
.vnd-drawer {
  --vnd-z-index: 100;
}

:root {
  --vnd-backdrop-color: #111;
}
```

個々のドロワーに対しては、インラインで指定したオーバーレイ色と z-index が自動的にオーバーレイへ転送されます:

```vue
<Drawer
  v-model:open="open"
  title="周辺スポット"
  :style="{ '--vnd-overlay-color': 'rgb(20 25 40 / 0.55)', '--vnd-z-index': 100 }"
/>
```

デフォルトでは両要素とも `body` に Teleport されるため、コンポーネント本来のラッパーは CSS の祖先になりません。継承プロパティにはグローバルスタイル、`:root`、または実際の Teleport 先を使用してください。`--vnd-backdrop-color` はドキュメント背景をスタイリングするため `:root` に設定します。

| プロパティ             | デフォルト値         | 説明                                                                 |
| ---------------------- | -------------------- | -------------------------------------------------------------------- |
| `--vnd-background`     | white / `#1c1c1e`    | ドロワーの背景色                                                     |
| `--vnd-color`          | `inherit`            | テキストの色                                                         |
| `--vnd-muted-color`    | iOS secondary label  | 説明文のテキスト色                                                   |
| `--vnd-radius`         | `12px`               | 角丸の半径                                                           |
| `--vnd-shadow`         | subtle（控えめな影） | ドロワーのシャドウ                                                   |
| `--vnd-gap`            | `1.5rem`             | 完全に開いた上下ドロワーと反対側の画面端との隙間（セーフエリア加算） |
| `--vnd-max-width`      | `100%`               | 上下ドロワーの最大幅                                                 |
| `--vnd-width`          | `min(85%, 24rem)`    | 左右ドロワーの幅                                                     |
| `--vnd-padding`        | `0 1rem 1rem`        | コンテンツ領域のパディング                                           |
| `--vnd-handle-color`   | iOS tertiary label   | グラブハンドルの色                                                   |
| `--vnd-overlay-color`  | `rgb(0 0 0 / 0.4)`   | オーバーレイの色                                                     |
| `--vnd-backdrop-color` | `#000`               | `scale-background` で背景が奥に縮小されたときに見える背景色          |
| `--vnd-z-index`        | `50`                 | 重なり順（z-index）                                                  |

独自 CSS のセレクタとして利用できるデータ属性も公開されています: `data-state="open|closed"`、`data-direction`、`data-expanded`、`data-dragging`、`data-fit`。要素クラスは `.vnd-overlay`、`.vnd-drawer`、`.vnd-handle`、`.vnd-header`、`.vnd-title`、`.vnd-description`、`.vnd-content`、`.vnd-footer` です。

ドラッグを開始させたくない要素（スライダーなど）には `data-vnd-no-drag` を付与してください。

## アクセシビリティ

モーダルドロワーは `aria-modal` を持つ `dialog` 要素として動作します。`title` がダイアログ名となり、`description` がその説明になります。カスタム `header` は表示内容を置換しますが、視覚的に隠されたテキストによって支援技術にはタイトルと説明が引き続き提供されます。または、カスタムヘッダーに明示的な `aria-labelledby` と `aria-describedby` を紐付けるか、`aria-label` を直接指定することも可能です。これらの属性は自動生成されたデフォルト値より優先されます:

```vue
<Drawer v-model:open="open" aria-labelledby="places-heading" aria-describedby="places-description">
  <template #header>
    <h2 id="places-heading">周辺スポット</h2>
    <p id="places-description">目的地を選択してください。</p>
  </template>
</Drawer>
```

モーダルドロワーを開くと自動的にフォーカスがドロワー内に移動します。Tab および Shift+Tab の移動はドロワー内に留まり、Escape キーでドロワーが閉じると直前の要素にフォーカスが戻ります。ハンドルはネイティブの button 要素であり、Enter および Space キーでスナップポイントを順に巡回でき、視認可能なキーボードフォーカスリングが表示されます。単一スナップのハンドルには `aria-disabled` が付与され Tab 順序から除外されますが、ドラッグ操作は引き続き行えます。`prefers-reduced-motion`（視覚効果を減らす）が設定されている環境では、ドロワーはアニメーションなしで即座に移動します。

## ブラウザサポート

Chrome / Edge 123+、Safari 17.5+、Firefox 120+（スタイルで `light-dark()` を使用）。セーフエリアのインセットを正しく反映させるには、viewport meta タグに `viewport-fit=cover` を追加してください。Android では、同じタグに `interactive-widget=resizes-content` を指定することで、オンスクリーンキーボード表示時にドロワーがキーボードの上にリサイズされます。

## 開発

必要な環境: Node.js 26 LTS（`.nvmrc` 参照）および npm。

```sh
npm install
npm run dev          # http://localhost:5173 でプレイグラウンドを起動
npm run build        # dist/index.js、dist/style.css および型定義ファイルをビルド
npm run lint         # oxlint による静的解析
npm run format       # oxfmt によるコード整形
npm run typecheck    # TypeScript 7（.ts 用）と vue-tsc（.vue 用）による型チェック
npm test             # Vitest: Node 単体テスト、Chromium/Firefox/WebKit コンポーネントテスト
npm run test:e2e     # Playwright: Chromium モバイル/デスクトップ ジェスチャー、Firefox/WebKit デスクトップ
npm run check        # lint、format check、typecheck、テスト、ビルドの一括実行
```

ブラウザテストには Playwright のブラウザが必要です（`npx playwright install chromium firefox webkit`）。インストール済みの Chromium を使用する場合は `PLAYWRIGHT_CHROMIUM_PATH=/path/to/chrome` を指定してください（Firefox と WebKit は引き続きバンドル版を使用します）。コンポーネントのポインターテストは 3 つすべてのエンジンで実行されます。モバイル端末向け E2E タッチジェスチャーテストは Chromium の DevTools Protocol を利用し、デスクトップ向けテストは Firefox と WebKit で実際のマウス・キーボード操作をテストします。

ツールチェーンに関する特記事項:

- **TypeScript 7** はネイティブコンパイラであり、`vue-tsc` が依存する JavaScript API を提供しなくなりました。そのため `.ts` ファイルは `tsc` (TypeScript 7) でチェックし、`.vue` ファイルおよび型定義生成は `scripts/vue-tsc.mjs` を通じて `@typescript/typescript6` の TypeScript 6 API 上で `vue-tsc` を実行します。
- 同様の理由から、`scripts/vue-plugin.ts` は Vue SFC コンパイラに Node のファイルシステムを直接渡し、インポートされた props の型解決時に `ts.sys` 経由でファイルを読み込もうとする問題を回避しています。

### ディレクトリ構成

```
src/
  Drawer.vue                 コンポーネント本体 (<script setup>)
  composables/useDrawer.ts   ジェスチャー、スナップ、アニメーション、フォーカス制御
  utils/                     スナップ計算、速度トラッキング、イージング、スクロールロック、背景縮小
  style.css                  スタイル定義
playground/                  デモアプリケーション (createApp)
test/unit/                   Vitest、Node 単体テスト
test/browser/                Vitest ブラウザモード（Playwright 経由で Chromium/Firefox/WebKit）
e2e/                         Playwright、playground に対する E2E テスト
```

## クレジット (Credits)

本プロジェクトは、[unovue](https://github.com/unovue) による [vaul-vue](https://github.com/unovue/vaul-vue) および [Emil Kowalski](https://github.com/emilkowalski) 氏による [vaul](https://github.com/emilkowalski/vaul) にインスパイアされ、より優れたパフォーマンスとモダンな設計を目指して開発・保守されているアクティブメンテナンス版です。

[vaul-vue](https://github.com/unovue/vaul-vue) の作者陣による素晴らしい基礎に心より敬意と感謝を表します。`vue-native-drawer` は以下の改良を施して発展させています：

- **パフォーマンスの向上**: Vue 3.5 の `computed` によるリアクティブ計算キャッシュ、レイアウトスラッシングを回避したポインタ追従、軽量な描画更新。
- **モダンな設計**: `light-dark()` などの最新 CSS を活用し、不要なラッパーを排した純粋な Vue 3.5+ 設計。
- **フラットな API**: 複数の入れ子コンポーネント（Root, Portal, Overlay, Content など）を不要にし、単一の `<Drawer>` で直感的に利用可能。
- **アクティブな保守**: 最新の Vue エコシステムと依存関係に対応し、継続的なメンテナンスを提供。

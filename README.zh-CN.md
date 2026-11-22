# vue-native-drawer

[![npm version](https://img.shields.io/npm/v/vue-native-drawer.svg?color=3388ff)](https://www.npmjs.com/package/vue-native-drawer)
[![npm downloads](https://img.shields.io/npm/dm/vue-native-drawer.svg)](https://www.npmjs.com/package/vue-native-drawer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/vue-native-drawer)](https://bundlephobia.com/package/vue-native-drawer)
[![CI](https://github.com/gaomingzhao-system/vue-native-drawer/actions/workflows/ci.yml/badge.svg)](https://github.com/gaomingzhao-system/vue-native-drawer/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/gaomingzhao-system/vue-native-drawer.svg?color=blue)](./LICENSE)
[![Vue 3.5+](https://img.shields.io/badge/vue-3.5%2B-42b883.svg)](https://vuejs.org/)

[English](./README.md) | 简体中文 | [日本語](./README.ja.md)

专为 **Vue 3.5** 打造的原生 iOS 风格 Web 抽屉（Bottom Sheet）组件。

默认从屏幕底部展开至三分之一高度。向上拖拽可停靠至半屏或全屏，快速轻扫可直接吸附切换，向下拖动即可关闭。拖拽手势 1:1 跟随手指，释放后保留惯性滑动，拖出边界时具备类似 iOS UIKit 的橡皮筋弹性回弹效果。

- **单个扁平组件**：`<Drawer v-model:open="open">` 即是全部 API，无需繁琐嵌套 root、portal、overlay 或 content 等子组件。
- **原生质感**：具备惯性预测的吸附断点（Snap points）、基于 UIKit Sheet 曲线的速度匹配回弹缓动动画、橡皮筋弹性拉伸以及类似 iOS 卡片层叠的背景缩放推移效果。
- **手势感知**：抽屉完全展开后内容正常滚动，未完全展开时拖动抽屉本身。水平轻扫、输入框及带有 `data-vnd-no-drag` 的区域不会触发抽屉拖拽。
- **标准 Vue 范式**：采用 `<script setup>` 编写，开箱即用支持 `createApp()`。
- **轻量精简**：纯 TypeScript 与 CSS 实现，唯一的运行时依赖是 VueUse。

## 安装

```sh
npm install vue-native-drawer
```

在 Vue 3 环境下需安装 `vue` 3.5 或更高版本作为 Peer Dependency。开发与测试基于 Vue 3.5.46。

## 使用方法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import 'vue-native-drawer/style.css'

const open = ref(false)
</script>

<template>
  <button @click="open = true">打开抽屉</button>

  <Drawer v-model:open="open" title="附近地点" description="您周边的推荐位置">
    <p>可以向上、向下拖拽或滑动关闭我。</p>

    <template #footer="{ close }">
      <button @click="close">完成</button>
    </template>
  </Drawer>
</template>
```

使用 Vue 标准渲染器挂载应用：

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## 吸附断点 (Snap points)

吸附断点是抽屉的停留位置。每个断点代表抽屉可见区域的大小：

| 取值                     | 说明                                      |
| ------------------------ | ----------------------------------------- |
| `0`–`1`                  | 占抽屉完整高度的比例（例如 `0.5` 为半屏） |
| 大于 `1` 的数字或 `'px'` | 像素数值（例如 `240` 或 `'240px'`）       |
| `'%'`                    | 完整尺寸的百分比（例如 `'50%'`）          |

顶部和底部抽屉的默认值为 `[1 / 3, 1 / 2, 1]`，因此初始展开至 1/3。左侧与右侧抽屉，以及设置了 `fit` 的抽屉默认值为 `[1]`。断点需按从小到大的顺序排列。抽屉在打开时停在第一个断点处，并在每次关闭重新打开时重置回第一个断点。

```vue
<Drawer v-model:open="open" v-model:snap-point="snap" :snap-points="['148px', 0.5, 1]" />
```

`v-model:snap-point` 可以获取抽屉当前的停留断点，修改它时抽屉会平滑过渡到对应的位置。在最大的吸附断点处，抽屉处于展开状态（`data-expanded`），此时内部内容才允许滚动。

松手释放时会根据当前的滑动惯性进行前向投射，并落到最近的吸附断点上。快速轻扫总是向手势方向跳到下一个吸附断点，较用力的轻扫可以连续越过多个断点。当松手位置超过从最小断点到关闭状态距离的 `closeThreshold`（默认为 1/4）时，或者在最小断点处快速向下轻扫时，抽屉会自动关闭。

## API 参考

### Props

| 属性              | 类型                                     | 默认值                   | 说明                                                                                                      |
| ----------------- | ---------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `snapPoints`      | `SnapPoint[]`                            | `[1/3, 1/2, 1]` 或 `[1]` | 停留断点列表，从小到大排列。详见[吸附断点](#吸附断点-snap-points)。                                       |
| `direction`       | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'`               | 抽屉弹出的边缘方向。                                                                                      |
| `dismissible`     | `boolean`                                | `true`                   | 是否允许通过向外拖拽、点击遮罩层或按 Escape 键关闭抽屉。                                                  |
| `modal`           | `boolean`                                | `true`                   | 显示背景遮罩、锁定页面滚动并将焦点锁定在抽屉内。设为 `false` 可保持背景页面可交互。                       |
| `fit`             | `boolean`                                | `false`                  | 根据内容高度自适应抽屉尺寸，而非固定全屏高度。                                                            |
| `handle`          | `boolean`                                | 顶/底抽屉为 `true`       | 是否显示拖拽指示条（Handle）。点击它或按 Enter/Space 键可在各个断点间循环切换。                           |
| `handleOnly`      | `boolean`                                | `false`                  | 仅允许通过指示条或带有 `data-vnd-handle` 的元素进行拖拽。                                                 |
| `fadeFrom`        | `number`                                 | `0`                      | 遮罩层完全可见对应的断点索引。遮罩会在该断点前一个断点开始渐入。                                          |
| `scaleBackground` | `boolean \| string`                      | `false`                  | 抽屉展开时是否像 iOS 一样向后缩放背景页面。`true` 缩放带有 `data-vnd-background` 的元素；字符串为选择器。 |
| `closeThreshold`  | `number`                                 | `0.25`                   | 触发关闭所需的最小位移比例（从最小断点到关闭点距离的百分比）。                                            |
| `title`           | `string`                                 |                          | 抽屉标题，在头部渲染并作为对话框的无障碍名称（Accessible Name）。                                         |
| `description`     | `string`                                 |                          | 标题下方的描述文本，用作无障碍描述（Accessible Description）。                                            |
| `to`              | `string \| HTMLElement \| false`         | `'body'`                 | Teleport 目标挂载点。设为 `false` 则在原地渲染。                                                          |

其他属性（如 `class`、`style`、`aria-*`、`data-*` 及事件监听器）均透传至抽屉容器元素。显式声明的 `aria-*` 属性优先级高于自动生成的默认属性。内联自定义属性 `--vnd-overlay-color` 和 `--vnd-z-index` 也会同步应用到遮罩层。

### Models

| Model                | 类型        | 说明                                                   |
| -------------------- | ----------- | ------------------------------------------------------ |
| `v-model:open`       | `boolean`   | 抽屉是否打开。如果父组件不更新该状态，抽屉将保持打开。 |
| `v-model:snap-point` | `SnapPoint` | 抽屉当前停留的吸附断点。                               |

### Events

| 事件     | 参数               | 说明                                        |
| -------- | ------------------ | ------------------------------------------- |
| `drag`   | `progress: number` | 拖拽进行中触发：抽屉当前的可见比例（0–1）。 |
| `opened` |                    | 打开动画执行完毕后触发。                    |
| `closed` |                    | 关闭动画执行完毕且抽屉元素完全移除后触发。  |

### Slots

提供 `default`（可滚动内容区）、`header`（替换标题与描述）和 `footer`（在各个吸附断点下固定停留在屏幕底部）。每个插槽均接收以下作用域参数：

| 插槽参数    | 类型                         | 说明                         |
| ----------- | ---------------------------- | ---------------------------- |
| `close`     | `() => void`                 | 关闭抽屉的方法。             |
| `snapTo`    | `(point: SnapPoint) => void` | 动画过渡到指定断点的方法。   |
| `snapPoint` | `SnapPoint`                  | 当前停留的吸附断点。         |
| `expanded`  | `boolean`                    | 抽屉是否处于最大断点展开态。 |

### Template ref

通过模板引用可调用 `show()`、`close()` 和 `snapTo(point)` 方法。

## 代码示例

```vue
<!-- 随内容高度自适应的 Action Sheet -->
<Drawer v-model:open="open" fit title="分享">…</Drawer>

<!-- 侧边抽屉菜单 -->
<Drawer v-model:open="open" direction="left" title="菜单">…</Drawer>

<!-- iOS 卡片堆叠效果：在应用根节点标记 data-vnd-background -->
<div id="app" data-vnd-background>…</div>
<Drawer v-model:open="open" :snap-points="[1]" scale-background>…</Drawer>

<!-- 地图风格的非模态面板（主页面保持可交互） -->
<Drawer v-model:open="open" :modal="false" :snap-points="['140px', 0.5, 1]">…</Drawer>

<!-- 必须确认操作的强提示弹窗（禁止随意滑走或点遮罩关闭） -->
<Drawer v-model:open="open" :dismissible="false">…</Drawer>
```

支持抽屉嵌套：从一个抽屉内部打开另一个抽屉时，底层抽屉会自动退至背景层形成层叠感。

[`playground/`](./playground) 演示工程中包含了上述所有完整示例。运行 `npm run dev` 即可体验。

## 样式与自定义

抽屉自带符合 iOS 质感且支持 `color-scheme`（亮暗色自适应）的 CSS 样式。可在 `.vnd-drawer` 或面板的父级元素上设置 CSS 自定义属性：

```css
.vnd-drawer {
  --vnd-background: #f2f2f7;
  --vnd-radius: 16px;
  --vnd-max-width: 40rem; /* 在大屏幕上居中显示顶部和底部抽屉 */
}
```

遮罩层与抽屉面板是同级兄弟元素。仅在 `.vnd-drawer` 上定义的属性不会继承到 `.vnd-overlay`。需在遮罩上设置遮罩颜色，并在两个元素或共同祖先上设置 z-index：

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

针对单个抽屉，可以在抽屉组件上直接以内联样式传递遮罩颜色与层级，这些属性会自动透传给遮罩层：

```vue
<Drawer
  v-model:open="open"
  title="附近地点"
  :style="{ '--vnd-overlay-color': 'rgb(20 25 40 / 0.55)', '--vnd-z-index': 100 }"
/>
```

默认情况下，两个元素都会被 Teleport 挂载到 `body`，因此组件原先的外部包裹元素并不是最终生成的 CSS 祖先。请使用全局样式、`:root` 或实际的 Teleport 挂载目标来设置继承属性。`--vnd-backdrop-color` 需挂载在 `:root` 上，用于定义页面缩放后露出的底色背景。

| 属性                   | 默认值              | 说明                                                                |
| ---------------------- | ------------------- | ------------------------------------------------------------------- |
| `--vnd-background`     | white / `#1c1c1e`   | 抽屉背景色                                                          |
| `--vnd-color`          | `inherit`           | 文本颜色                                                            |
| `--vnd-muted-color`    | iOS secondary label | 描述文本颜色                                                        |
| `--vnd-radius`         | `12px`              | 圆角大小                                                            |
| `--vnd-shadow`         | subtle（细微阴影）  | 抽屉阴影                                                            |
| `--vnd-gap`            | `1.5rem`            | 顶/底抽屉完全展开时距离屏幕对向边缘的间距（叠加安全区域 safe area） |
| `--vnd-max-width`      | `100%`              | 顶/底抽屉的最大宽度                                                 |
| `--vnd-width`          | `min(85%, 24rem)`   | 左右侧边抽屉的宽度                                                  |
| `--vnd-padding`        | `0 1rem 1rem`       | 内容区域内边距                                                      |
| `--vnd-handle-color`   | iOS tertiary label  | 拖拽指示条颜色                                                      |
| `--vnd-overlay-color`  | `rgb(0 0 0 / 0.4)`  | 遮罩层背景色                                                        |
| `--vnd-backdrop-color` | `#000`              | 开启 `scale-background` 后背景推移露出的底板颜色                    |
| `--vnd-z-index`        | `50`                | 层叠上下文层级（z-index）                                           |

组件通过 data 属性暴露实时状态供自定义 CSS 选择器使用：`data-state="open|closed"`、`data-direction`、`data-expanded`、`data-dragging` 以及 `data-fit`。DOM 类名包含 `.vnd-overlay`、`.vnd-drawer`、`.vnd-handle`、`.vnd-header`、`.vnd-title`、`.vnd-description`、`.vnd-content` 和 `.vnd-footer`。

在元素上添加 `data-vnd-no-drag` 属性可以阻止在该区域触发拖拽手势（例如滑动选择器 Slider）。

## 无障碍性 (Accessibility)

模态抽屉内部采用带有 `aria-modal` 的 `dialog` 实现。`title` 提供对话框标题，`description` 提供描述。自定义 `header` 会替换可视内容，同时保留隐藏的无障碍文本目标，确保辅助技术仍然可以读取标题与描述。或者也可以通过显式传入 `aria-labelledby` 和 `aria-describedby` 关联自定义头部，亦可直接传入 `aria-label`。这些显式属性会覆盖默认生成的无障碍属性：

```vue
<Drawer v-model:open="open" aria-labelledby="places-heading" aria-describedby="places-description">
  <template #header>
    <h2 id="places-heading">附近地点</h2>
    <p id="places-description">请选择目的地。</p>
  </template>
</Drawer>
```

打开模态抽屉会自动将焦点移入其中。Tab 和 Shift+Tab 键会在抽屉内部循环导航，按 Escape 键关闭抽屉，并且在关闭后将焦点返还给之前激活的元素。拖拽指示条本身是一个原生 button 按钮：按 Enter 或 Space 键可以在各个吸附断点之间切换，并具备清晰的可视化键盘焦点指示环。单断点的指示条会被标记为 `aria-disabled` 并排除在 Tab 导航顺序之外，但仍可正常用于鼠标/触摸拖拽。当用户系统开启了 `prefers-reduced-motion`（减弱动态效果）时，抽屉会跳过过渡动画直接移动。

## 浏览器兼容性

支持 Chrome / Edge 123+、Safari 17.5+ 和 Firefox 120+（样式中使用了 `light-dark()` 特性）。在你的 viewport meta 标签中添加 `viewport-fit=cover` 可以正确适配设备的安全区域（Safe Area Insets）。在 Android 设备上，在同一 meta 标签中加入 `interactive-widget=resizes-content` 可使抽屉在呼出虚拟键盘时自动向上调整尺寸。

## 本地开发

开发环境要求：Node.js 26 LTS（参见 `.nvmrc`）与 npm。

```sh
npm install
npm run dev          # 启动演示工程：http://localhost:5173
npm run build        # 构建产物：dist/index.js、dist/style.css 及类型声明文件
npm run lint         # 代码检查：oxlint
npm run format       # 代码格式化：oxfmt
npm run typecheck    # 类型检查：.ts 采用 TypeScript 7，.vue 采用 vue-tsc
npm test             # 单元与组件测试：Node 单元测试，Chromium/Firefox/WebKit 组件测试
npm run test:e2e     # E2E 测试：Playwright 移动端/桌面端 Chromium 手势及 Firefox/WebKit 桌面交互
npm run check        # 全套校验：lint、格式检查、类型检查、测试与打包构建
```

运行浏览器测试需要安装 Playwright 浏览器内核（`npx playwright install chromium firefox webkit`）。若需使用本地已安装的 Chromium，可设置环境变量 `PLAYWRIGHT_CHROMIUM_PATH=/path/to/chrome`；Firefox 与 WebKit 仍会使用 Playwright 内置浏览器。组件级指针测试覆盖全部三大排版引擎。端到端手势测试在移动端项目中使用 Chromium 的 Chrome DevTools Protocol 进行真实触摸模拟；在桌面端则模拟真实的鼠标与键盘交互。

构建工具链说明：

- **TypeScript 7** 是一门基于原生的编译器，不再附带 `vue-tsc` 所依赖的底层 JavaScript API。因此普通 `.ts` 文件由 `tsc` (TypeScript 7) 进行校验，而 `.vue` 文件和类型声明生成则由 `scripts/vue-tsc.mjs` 调用来自 `@typescript/typescript6` 的 TypeScript 6 API 运行 `vue-tsc`。
- 出于同样的原因，`scripts/vue-plugin.ts` 会将 Node 的原生文件系统传递给 Vue SFC 编译器，避免编译器尝试通过 `ts.sys` 读取文件来解析导入的 Prop 类型。

### 项目结构

```
src/
  Drawer.vue                 抽屉核心组件 (<script setup>)
  composables/useDrawer.ts   手势拖拽、断点吸附、动画与焦点管理
  utils/                     吸附计算、速度追踪、缓动曲线、页面滚动锁定、卡片缩放
  style.css                  样式定义
playground/                  演示应用 (createApp)
test/unit/                   Vitest，Node 单元测试
test/browser/                Vitest 浏览器模式，基于 Playwright 驱动 Chromium/Firefox/WebKit
e2e/                         Playwright 针对 playground 的端到端测试
```

## 致敬与鸣谢

本项目受 Emil Kowalski 创作的 [vaul](https://github.com/emilkowalski/vaul) 及其 Vue 移植版本 [vaul-vue](https://github.com/unovue/vaul-vue) 启发，并重构为单一扁平化的原生 Vue 组件 API。

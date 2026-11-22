<script setup lang="ts">
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import DirectionsDemo from './demos/DirectionsDemo.vue'
import FadeDemo from './demos/FadeDemo.vue'
import FitDemo from './demos/FitDemo.vue'
import LockedDemo from './demos/LockedDemo.vue'
import NestedDemo from './demos/NestedDemo.vue'
import NonModalDemo from './demos/NonModalDemo.vue'
import ScaleDemo from './demos/ScaleDemo.vue'
import SnapPointsDemo from './demos/SnapPointsDemo.vue'
import { useI18n } from './i18n'

const { t } = useI18n()
</script>

<template>
  <main class="page">
    <header class="hero" role="banner">
      <div class="hero-header">
        <span class="eyebrow">{{ t.header.eyebrow }}</span>
        <LanguageSwitcher />
      </div>
      <h1>{{ t.header.title }}</h1>
      <p>
        {{ t.header.description }}
      </p>
      <pre class="snippet"><code>&lt;Drawer v-model:open="open"&gt;…&lt;/Drawer&gt;</code></pre>
    </header>

    <section class="grid" :aria-label="t.grid.ariaLabel">
      <SnapPointsDemo />
      <FitDemo />
      <ScaleDemo />
      <NonModalDemo />
      <DirectionsDemo />
      <NestedDemo />
      <LockedDemo />
      <FadeDemo />
    </section>

    <footer class="credits" role="contentinfo">
      <a href="https://github.com/gaomingzhao666/vue-native-drawer">{{ t.footer.github }}</a>
      {{ t.footer.builtWith }}
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Drawer, type SnapPoint } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const open = ref(false)
const snapPoints: SnapPoint[] = ['140px', 1 / 2, 1]
const snap = ref<SnapPoint>('140px')
</script>

<template>
  <DemoCard :title="t.nonModal.cardTitle" :description="t.nonModal.cardDescription">
    <button class="button" type="button" data-testid="open-nonmodal" @click="open = !open">
      {{ open ? t.nonModal.hidePlayer : t.nonModal.showPlayer }}
    </button>
    <div class="segmented" role="group" :aria-label="t.nonModal.segmentedAriaLabel">
      <button
        v-for="(point, index) in snapPoints"
        :key="String(point)"
        type="button"
        :aria-pressed="snap === point"
        :data-testid="`nonmodal-snap-${index}`"
        @click="snap = point"
      >
        {{ t.nonModal.snapLabels[index] }}
      </button>
    </div>

    <Drawer
      v-model:open="open"
      v-model:snap-point="snap"
      :snap-points="snapPoints"
      :modal="false"
      data-testid="drawer-nonmodal"
    >
      <div class="player">
        <span class="artwork" />
        <span class="list-text">
          <strong>{{ t.nonModal.songTitle }}</strong>
          <small>{{ t.nonModal.songArtist }}</small>
        </span>
      </div>
      <p class="prose">
        {{ t.nonModal.prose }}
      </p>
    </Drawer>
  </DemoCard>
</template>

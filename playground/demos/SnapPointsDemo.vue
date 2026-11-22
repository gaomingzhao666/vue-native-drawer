<script setup lang="ts">
import { computed, ref } from 'vue'
import { Drawer, type SnapPoint } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { getPlaces } from '../data'
import { useI18n } from '../i18n'

const { locale, t } = useI18n()
const open = ref(false)
const snap = ref<SnapPoint>(1 / 3)

const placesList = computed(() => getPlaces(locale.value))

const label = (point: SnapPoint) => {
  if (point === 1) return t.value.snapPoints.snapLabels.full
  if (point === 1 / 2) return t.value.snapPoints.snapLabels.half
  return t.value.snapPoints.snapLabels.third
}
</script>

<template>
  <DemoCard :title="t.snapPoints.cardTitle" :description="t.snapPoints.cardDescription">
    <button class="button" type="button" data-testid="open-snap" @click="open = true">
      {{ t.snapPoints.openButton }}
    </button>
    <span class="chip" data-testid="snap-value">{{ label(snap) }}</span>

    <Drawer
      v-model:open="open"
      v-model:snap-point="snap"
      :title="t.snapPoints.drawerTitle"
      :description="t.snapPoints.drawerDescription"
      data-testid="drawer-snap"
    >
      <ul class="list">
        <li v-for="place in placesList" :key="place.name" class="list-item">
          <span class="avatar" :style="{ background: place.color }">{{ place.name[0] }}</span>
          <span class="list-text">
            <strong>{{ place.name }}</strong>
            <small>{{ place.kind }}</small>
          </span>
          <span class="list-meta">{{ place.distance }}</span>
        </li>
      </ul>
      <template #footer="{ close }">
        <button class="button block" type="button" data-testid="snap-done" @click="close">
          {{ t.snapPoints.doneButton }}
        </button>
      </template>
    </Drawer>
  </DemoCard>
</template>

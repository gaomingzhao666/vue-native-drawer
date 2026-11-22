<script setup lang="ts">
import { ref } from 'vue'
import { Drawer, type SnapPoint } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const open = ref(false)
const snap = ref<SnapPoint>(1 / 2)
const name = ref('Taylor')

const show = () => {
  snap.value = 1
  open.value = true
}
</script>

<template>
  <DemoCard :title="t.scale.cardTitle" :description="t.scale.cardDescription">
    <button class="button" type="button" data-testid="open-scale" @click="show">
      {{ t.scale.openButton }}
    </button>

    <Drawer
      v-model:open="open"
      v-model:snap-point="snap"
      :snap-points="[1 / 2, 1]"
      scale-background
      :title="t.scale.drawerTitle"
      data-testid="drawer-scale"
    >
      <form class="form" @submit.prevent="open = false">
        <label class="field">
          <span>{{ t.scale.nameLabel }}</span>
          <input v-model="name" autocomplete="name" />
        </label>
        <label class="field">
          <span>{{ t.scale.bioLabel }}</span>
          <textarea rows="4" :placeholder="t.scale.defaultBio">{{ t.scale.defaultBio }}</textarea>
        </label>
        <button class="button block" type="submit">{{ t.scale.saveButton }}</button>
      </form>
    </Drawer>
  </DemoCard>
</template>

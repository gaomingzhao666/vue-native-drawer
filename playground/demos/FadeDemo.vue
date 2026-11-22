<script setup lang="ts">
import { ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const open = ref(false)
</script>

<template>
  <DemoCard :title="t.fade.cardTitle" :description="t.fade.cardDescription">
    <button class="button" type="button" data-testid="open-fade" @click="open = true">
      {{ t.fade.openButton }}
    </button>

    <Drawer
      v-model:open="open"
      :snap-points="['148px', '355px', 1]"
      :fade-from="2"
      :title="t.fade.drawerTitle"
      :description="t.fade.drawerDescription"
      data-testid="drawer-fade"
    >
      <p class="prose">
        {{ t.fade.proseIntro }}
      </p>
      <p v-for="n in 6" :key="n" class="prose">
        {{ t.fade.moduleText(n) }}
      </p>
    </Drawer>
  </DemoCard>
</template>

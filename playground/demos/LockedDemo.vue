<script setup lang="ts">
import { ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const open = ref(false)
</script>

<template>
  <DemoCard :title="t.locked.cardTitle" :description="t.locked.cardDescription">
    <button class="button" type="button" data-testid="open-locked" @click="open = true">
      {{ t.locked.openButton }}
    </button>

    <Drawer
      v-model:open="open"
      fit
      :dismissible="false"
      :title="t.locked.drawerTitle"
      :description="t.locked.drawerDescription"
      data-testid="drawer-locked"
    >
      <p class="prose">
        {{ t.locked.prose }}
      </p>
      <template #footer>
        <button
          class="button block"
          type="button"
          data-testid="locked-accept"
          @click="open = false"
        >
          {{ t.locked.acceptButton }}
        </button>
      </template>
    </Drawer>
  </DemoCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const outer = ref(false)
const inner = ref(false)
</script>

<template>
  <DemoCard :title="t.nested.cardTitle" :description="t.nested.cardDescription">
    <button class="button" type="button" data-testid="open-nested" @click="outer = true">
      {{ t.nested.openButton }}
    </button>

    <Drawer
      v-model:open="outer"
      :snap-points="[0.7]"
      :title="t.nested.outerTitle"
      :description="t.nested.outerDescription"
      data-testid="drawer-nested"
    >
      <p class="prose">{{ t.nested.outerProse }}</p>
      <button class="button block" type="button" data-testid="open-inner" @click="inner = true">
        {{ t.nested.openInnerButton }}
      </button>

      <Drawer
        v-model:open="inner"
        fit
        :title="t.nested.innerTitle"
        :description="t.nested.innerDescription"
        data-testid="drawer-inner"
      >
        <p class="prose">{{ t.nested.innerProse }}</p>
        <template #footer="{ close }">
          <button class="button block" type="button" data-testid="inner-close" @click="close">
            {{ t.nested.closeButton }}
          </button>
        </template>
      </Drawer>
    </Drawer>
  </DemoCard>
</template>

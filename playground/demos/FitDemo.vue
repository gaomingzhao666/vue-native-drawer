<script setup lang="ts">
import { computed, ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const open = ref(false)
const selectedAction = ref<string | null>(null)

const last = computed(() => selectedAction.value ?? t.value.fit.nothingYet)
</script>

<template>
  <DemoCard :title="t.fit.cardTitle" :description="t.fit.cardDescription">
    <button class="button" type="button" data-testid="open-fit" @click="open = true">
      {{ t.fit.openButton }}
    </button>
    <span class="chip" data-testid="fit-result">{{ last }}</span>

    <Drawer v-model:open="open" fit :title="t.fit.drawerTitle" data-testid="drawer-fit">
      <template #default="{ close }">
        <div class="share-row">
          <button
            v-for="target in t.fit.targets"
            :key="target.name"
            class="share-target"
            type="button"
            @click="((selectedAction = target.name), close())"
          >
            <span class="share-icon" :style="{ background: target.color }" />
            {{ target.name }}
          </button>
        </div>
        <div class="group">
          <button
            v-for="action in t.fit.actions"
            :key="action"
            class="group-item"
            type="button"
            @click="((selectedAction = action), close())"
          >
            {{ action }}
          </button>
          <button
            class="group-item destructive"
            type="button"
            data-testid="fit-delete"
            @click="((selectedAction = t.fit.deleteText), close())"
          >
            {{ t.fit.deleteText }}
          </button>
        </div>
      </template>
    </Drawer>
  </DemoCard>
</template>

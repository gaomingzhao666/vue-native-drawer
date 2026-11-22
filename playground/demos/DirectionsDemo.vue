<script setup lang="ts">
import { ref } from 'vue'
import { Drawer } from 'vue-native-drawer'
import DemoCard from '../components/DemoCard.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const top = ref(false)
const left = ref(false)
const right = ref(false)
</script>

<template>
  <DemoCard :title="t.directions.cardTitle" :description="t.directions.cardDescription">
    <button class="button" type="button" data-testid="open-top" @click="top = true">
      {{ t.directions.topButton }}
    </button>
    <button class="button" type="button" data-testid="open-left" @click="left = true">
      {{ t.directions.leftButton }}
    </button>
    <button class="button" type="button" data-testid="open-right" @click="right = true">
      {{ t.directions.rightButton }}
    </button>

    <Drawer v-model:open="top" direction="top" fit data-testid="drawer-top">
      <div class="notice">
        <span class="avatar" style="background: #34c759">✓</span>
        <span class="list-text">
          <strong>{{ t.directions.topNotice.title }}</strong>
          <small>{{ t.directions.topNotice.subtitle }}</small>
        </span>
      </div>
    </Drawer>

    <Drawer
      v-model:open="left"
      direction="left"
      :title="t.directions.menuTitle"
      data-testid="drawer-left"
    >
      <template #default="{ close }">
        <nav class="group" :aria-label="t.directions.menuTitle">
          <button
            v-for="item in t.directions.menuItems"
            :key="item"
            class="group-item"
            type="button"
            @click="close"
          >
            {{ item }}
          </button>
        </nav>
      </template>
    </Drawer>

    <Drawer
      v-model:open="right"
      direction="right"
      :title="t.directions.filtersTitle"
      :description="t.directions.filtersDescription"
      data-testid="drawer-right"
    >
      <div class="group">
        <label v-for="filter in t.directions.filterItems" :key="filter" class="group-item toggle">
          {{ filter }}
          <input type="checkbox" />
        </label>
      </div>
    </Drawer>
  </DemoCard>
</template>

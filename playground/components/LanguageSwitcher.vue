<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { availableLocales, type Locale, useI18n } from '../i18n'

const { locale, t, setLocale } = useI18n()
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (code: Locale) => {
  setLocale(code)
  isOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handleClickOutside)
})
</script>

<template>
  <div ref="containerRef" class="lang-switcher">
    <button
      id="lang-menu-btn"
      type="button"
      class="lang-btn"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="t.header.switchLanguage"
      data-testid="lang-switcher"
      @click="toggle"
    >
      <svg
        class="lang-icon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        />
      </svg>
      <span class="lang-current">{{ t.header.currentLanguage }}</span>
      <svg
        class="lang-chevron"
        :class="{ open: isOpen }"
        viewBox="0 0 20 20"
        width="14"
        height="14"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <transition name="lang-dropdown">
      <div
        v-if="isOpen"
        class="lang-menu"
        role="listbox"
        :aria-label="t.header.switchLanguage"
        tabindex="-1"
      >
        <button
          v-for="item in availableLocales"
          :key="item.code"
          type="button"
          role="option"
          class="lang-option"
          :class="{ active: locale === item.code }"
          :aria-selected="locale === item.code"
          :data-testid="`lang-option-${item.code}`"
          @click="select(item.code)"
        >
          <span>{{ item.label }}</span>
          <svg
            v-if="locale === item.code"
            class="check-icon"
            viewBox="0 0 20 20"
            width="14"
            height="14"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-flex;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--separator);
  border-radius: 9999px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    transform 0.1s ease;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  user-select: none;
}

.lang-btn:hover {
  background: var(--fill);
}

.lang-btn:active {
  transform: scale(0.98);
}

.lang-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.lang-icon {
  opacity: 0.7;
}

.lang-chevron {
  opacity: 0.6;
  transition: transform 0.2s ease;
}

.lang-chevron.open {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 0.375rem);
  right: 0;
  min-width: 8.5rem;
  padding: 0.25rem;
  background: var(--surface);
  border: 1px solid var(--separator);
  border-radius: 12px;
  box-shadow:
    0 10px 25px -5px rgb(0 0 0 / 0.15),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.lang-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.12s ease;
}

.lang-option:hover {
  background: var(--fill);
}

.lang-option.active {
  color: var(--accent);
  font-weight: 600;
}

.check-icon {
  color: var(--accent);
}

.lang-dropdown-enter-active,
.lang-dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.lang-dropdown-enter-from,
.lang-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.96);
}
</style>

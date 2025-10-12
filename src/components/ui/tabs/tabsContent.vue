<!-- TabsContent.vue -->
<template>
  <div
    v-if="isActive"
    :class="cn('flex-1 outline-none', className)"
    data-slot="tabs-content"
    role="tabpanel"
    :aria-labelledby="`tabs-trigger-${value}`"
    :id="`tabs-content-${value}`"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TabsContent'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    required: true
  }
})

// Get tabs context
const tabsContext = inject('tabsContext', {})

// Computed
const isActive = computed(() => {
  return tabsContext.activeTab?.value === props.value
})
</script>
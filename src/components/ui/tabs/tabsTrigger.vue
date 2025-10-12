<!-- TabsTrigger.vue -->
<template>
  <button
    :class="cn(
      'data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
      className
    )"
    :data-state="isActive ? 'active' : 'inactive'"
    :disabled="disabled"
    data-slot="tabs-trigger"
    role="tab"
    :aria-selected="isActive"
    :aria-controls="`tabs-content-${value}`"
    :id="`tabs-trigger-${value}`"
    @click="handleClick"
    @keydown="handleKeyDown"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, inject } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TabsTrigger'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Get tabs context
const tabsContext = inject('tabsContext', {})

// Computed
const isActive = computed(() => {
  return tabsContext.activeTab?.value === props.value
})

// Methods
const handleClick = () => {
  if (!props.disabled && tabsContext.setActiveTab) {
    tabsContext.setActiveTab(props.value)
  }
}

const handleKeyDown = (event) => {
  if (props.disabled) return
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      handleClick()
      break
  }
}
</script>
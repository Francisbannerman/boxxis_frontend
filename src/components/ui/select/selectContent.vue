<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="contentRef"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )"
      :style="contentStyles"
      data-slot="select-content"
      data-state="open"
    >
      <SelectScrollUpButton v-if="showScrollUp" />
      
      <div class="p-1">
        <slot />
      </div>
      
      <SelectScrollDownButton v-if="showScrollDown" />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide, inject } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SelectScrollUpButton from './selectScrollUpButton.vue'
import SelectScrollDownButton from './selectScrollDownButton.vue'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  position: {
    type: String,
    default: 'popper'
  },
  className: {
    type: String,
    default: ''
  }
})

const contentRef = ref()
const contentStyles = ref({})
const showScrollUp = ref(false)
const showScrollDown = ref(false)
const isOpen = inject('selectIsOpen', ref(false))

provide('selectIsOpen', isOpen)

const handleClickOutside = (event) => {
  if (contentRef.value && !contentRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
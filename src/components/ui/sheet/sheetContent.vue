<script setup>
import { inject, onUnmounted, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  side: {
    type: String,
    default: 'right',
    validator: value => ['top', 'right', 'bottom', 'left'].includes(value)
  },
  className: {
    type: String,
    default: ''
  },
  class: {  // Add this to accept 'class' prop
    type: String,
    default: ''
  }
})

const sheetContext = inject('sheetContext', {})

const handleClose = () => {
  if (sheetContext.setOpen) {
    sheetContext.setOpen(false)
  }
}

const handleOverlayClick = () => {
  handleClose()
}

const sideClasses = {
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm'
}

watch(() => sheetContext.isOpen?.value, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sheetContext.isOpen?.value"
        class="fixed inset-0 z-50 bg-black/80"
        @click="handleOverlayClick"
      />
    </Transition>

    <!-- Sheet Panel -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      :enter-from-class="side === 'left' ? '-translate-x-full' : side === 'right' ? 'translate-x-full' : side === 'top' ? '-translate-y-full' : 'translate-y-full'"
      :leave-to-class="side === 'left' ? '-translate-x-full' : side === 'right' ? 'translate-x-full' : side === 'top' ? '-translate-y-full' : 'translate-y-full'"
    >
      <div
        v-if="sheetContext.isOpen?.value"
        :class="cn(
          'fixed z-50 gap-4 bg-background p-6 shadow-lg',
          sideClasses[side],
          className,
          props.class  // Apply the 'class' prop here
        )"
        data-slot="sheet-content"
      >
        <button
          @click="handleClose"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
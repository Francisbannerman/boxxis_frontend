<template>
  <div class="drawer-root" data-slot="drawer">
    <!-- Trigger element -->
    <div
      ref="triggerRef"
      data-slot="drawer-trigger"
      @click="openDrawer"
    >
      <slot name="trigger" />
    </div>

    <!-- Drawer Portal -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="drawer-portal"
        data-slot="drawer-portal"
      >
        <!-- Overlay -->
        <div
          :class="cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
            overlayClassName
          )"
          :data-state="isOpen ? 'open' : 'closed'"
          data-slot="drawer-overlay"
          @click="handleOverlayClick"
        />

        <!-- Content -->
        <div
          ref="contentRef"
          :class="cn(
            'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
            direction === 'top' && 'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
            direction === 'bottom' && 'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
            direction === 'right' && 'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
            direction === 'left' && 'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
            contentClassName
          )"
          :data-vaul-drawer-direction="direction"
          :data-state="isOpen ? 'open' : 'closed'"
          data-slot="drawer-content"
          @click.stop
          v-bind="$attrs"
        >
          <!-- Drag handle for bottom drawer -->
          <div 
            v-if="direction === 'bottom'"
            class="bg-muted mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full block"
          />
          
          <slot :close="closeDrawer" :isOpen="isOpen" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: 'bottom',
    validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  contentClassName: {
    type: String,
    default: ''
  },
  overlayClassName: {
    type: String,
    default: ''
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

// Refs
const triggerRef = ref()
const contentRef = ref()

// State
const isOpen = ref(props.modelValue)

// Methods
const openDrawer = () => {
  isOpen.value = true
  emit('update:modelValue', true)
  emit('open')
  
  nextTick(() => {
    document.body.style.overflow = 'hidden'
  })
}

const closeDrawer = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
  
  document.body.style.overflow = ''
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    closeDrawer()
  }
}

const handleKeydown = (event) => {
  if (isOpen.value && event.key === 'Escape' && props.closeOnEscape) {
    closeDrawer()
  }
}

// Watch for modelValue changes
const updateOpen = (newValue) => {
  if (newValue !== isOpen.value) {
    if (newValue) {
      openDrawer()
    } else {
      closeDrawer()
    }
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  
  // Watch for prop changes
  if (props.modelValue !== isOpen.value) {
    updateOpen(props.modelValue)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
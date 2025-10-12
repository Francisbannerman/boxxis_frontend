<template>
  <div class="tooltip-root" data-slot="tooltip">
    <!-- Trigger element -->
    <div
      ref="triggerRef"
      data-slot="tooltip-trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick"
    >
      <slot name="trigger" />
    </div>

    <!-- Tooltip content portal -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="contentRef"
        :class="cn(
          'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance',
          className
        )"
        :style="contentStyles"
        :data-side="currentSide"
        :data-state="isOpen ? 'open' : 'closed'"
        data-slot="tooltip-content"
        role="tooltip"
        @mouseenter="handleContentMouseEnter"
        @mouseleave="handleContentMouseLeave"
      >
        <slot />
        
        <!-- Arrow -->
        <div
          :class="cn(
            'bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] absolute'
          )"
          :style="arrowStyles"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  side: {
    type: String,
    default: 'top',
    validator: value => ['top', 'right', 'bottom', 'left'].includes(value)
  },
  sideOffset: {
    type: Number,
    default: 0
  },
  align: {
    type: String,
    default: 'center',
    validator: value => ['start', 'center', 'end'].includes(value)
  },
  alignOffset: {
    type: Number,
    default: 0
  },
  delayDuration: {
    type: Number,
    default: 0
  },
  open: {
    type: Boolean,
    default: null
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open', 'openChange'])

// Refs
const triggerRef = ref()
const contentRef = ref()

// State
const internalOpen = ref(props.defaultOpen)
const contentStyles = ref({})
const arrowStyles = ref({})
const currentSide = ref(props.side)
const delayTimeout = ref(null)
const hoveringContent = ref(false)

// Computed
const isOpen = computed(() => {
  return props.open !== null ? props.open : internalOpen.value
})

// Methods
const setOpen = (value) => {
  if (props.open !== null) {
    emit('update:open', value)
  } else {
    internalOpen.value = value
  }
  emit('openChange', value)
}

const showTooltip = () => {
  if (delayTimeout.value) {
    clearTimeout(delayTimeout.value)
  }
  
  if (props.delayDuration > 0) {
    delayTimeout.value = setTimeout(() => {
      setOpen(true)
      nextTick(() => {
        positionTooltip()
      })
    }, props.delayDuration)
  } else {
    setOpen(true)
    nextTick(() => {
      positionTooltip()
    })
  }
}

const hideTooltip = () => {
  if (delayTimeout.value) {
    clearTimeout(delayTimeout.value)
  }
  
  // Small delay to allow moving to content
  setTimeout(() => {
    if (!hoveringContent.value) {
      setOpen(false)
    }
  }, 100)
}

const positionTooltip = () => {
  if (!triggerRef.value || !contentRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const contentEl = contentRef.value
  const contentRect = contentEl.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  let side = props.side
  let top = 0
  let left = 0
  
  // Calculate position based on side
  switch (side) {
    case 'top':
      top = triggerRect.top - contentRect.height - props.sideOffset
      left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + props.alignOffset
      break
    case 'bottom':
      top = triggerRect.bottom + props.sideOffset
      left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + props.alignOffset
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2) + props.alignOffset
      left = triggerRect.left - contentRect.width - props.sideOffset
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2) + props.alignOffset
      left = triggerRect.right + props.sideOffset
      break
  }
  
  // Flip if goes outside viewport
  if (side === 'top' && top < 0) {
    side = 'bottom'
    top = triggerRect.bottom + props.sideOffset
  } else if (side === 'bottom' && top + contentRect.height > viewportHeight) {
    side = 'top'
    top = triggerRect.top - contentRect.height - props.sideOffset
  } else if (side === 'left' && left < 0) {
    side = 'right'
    left = triggerRect.right + props.sideOffset
  } else if (side === 'right' && left + contentRect.width > viewportWidth) {
    side = 'left'
    left = triggerRect.left - contentRect.width - props.sideOffset
  }
  
  // Constrain to viewport
  left = Math.max(8, Math.min(left, viewportWidth - contentRect.width - 8))
  top = Math.max(8, Math.min(top, viewportHeight - contentRect.height - 8))
  
  currentSide.value = side
  
  contentStyles.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 50
  }
  
  // Position arrow
  positionArrow(side, triggerRect, contentRect, left, top)
}

const positionArrow = (side, triggerRect, contentRect, contentLeft, contentTop) => {
  const arrowSize = 10 // 2.5 * 4 (size-2.5 in Tailwind)
  let arrowTop = 0
  let arrowLeft = 0
  
  switch (side) {
    case 'top':
      arrowTop = contentRect.height - 2
      arrowLeft = (triggerRect.left + triggerRect.width / 2) - contentLeft - (arrowSize / 2)
      break
    case 'bottom':
      arrowTop = -arrowSize / 2
      arrowLeft = (triggerRect.left + triggerRect.width / 2) - contentLeft - (arrowSize / 2)
      break
    case 'left':
      arrowTop = (triggerRect.top + triggerRect.height / 2) - contentTop - (arrowSize / 2)
      arrowLeft = contentRect.width - 2
      break
    case 'right':
      arrowTop = (triggerRect.top + triggerRect.height / 2) - contentTop - (arrowSize / 2)
      arrowLeft = -arrowSize / 2
      break
  }
  
  arrowStyles.value = {
    top: `${arrowTop}px`,
    left: `${arrowLeft}px`
  }
}

// Event handlers
const handleMouseEnter = () => {
  showTooltip()
}

const handleMouseLeave = () => {
  hideTooltip()
}

const handleFocus = () => {
  showTooltip()
}

const handleBlur = () => {
  hideTooltip()
}

const handleClick = () => {
  if (isOpen.value) {
    setOpen(false)
  }
}

const handleContentMouseEnter = () => {
  hoveringContent.value = true
}

const handleContentMouseLeave = () => {
  hoveringContent.value = false
  hideTooltip()
}

// Cleanup
onUnmounted(() => {
  if (delayTimeout.value) {
    clearTimeout(delayTimeout.value)
  }
})
</script>




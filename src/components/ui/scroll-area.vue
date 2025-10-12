<template>
  <div
    ref="scrollAreaRoot"
    :class="cn('relative', className)"
    data-slot="scroll-area"
    v-bind="$attrs"
  >
    <div
      ref="viewport"
      :class="cn(
        'focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1'
      )"
      data-slot="scroll-area-viewport"
      @scroll="handleScroll"
      tabindex="0"
      style="overflow: hidden; position: relative;"
    >
      <div ref="content" style="min-width: 100%; display: table;">
        <slot />
      </div>
    </div>
    
    <!-- Vertical ScrollBar -->
    <div
      v-if="showVerticalScrollbar"
      :class="cn(
        'flex touch-none p-px transition-colors select-none',
        'h-full w-2.5 border-l border-l-transparent',
        scrollBarClass
      )"
      data-slot="scroll-area-scrollbar"
      @mousedown="handleScrollBarMouseDown"
    >
      <div
        ref="verticalThumb"
        :class="cn('bg-border relative flex-1 rounded-full')"
        :style="verticalThumbStyle"
        data-slot="scroll-area-thumb"
        @mousedown.stop="handleVerticalThumbMouseDown"
      />
    </div>
    
    <!-- Horizontal ScrollBar -->
    <div
      v-if="showHorizontalScrollbar"
      :class="cn(
        'flex touch-none p-px transition-colors select-none',
        'h-2.5 flex-col border-t border-t-transparent',
        scrollBarClass
      )"
      data-slot="scroll-area-scrollbar"
      @mousedown="handleScrollBarMouseDown"
    >
      <div
        ref="horizontalThumb"
        :class="cn('bg-border relative flex-1 rounded-full')"
        :style="horizontalThumbStyle"
        data-slot="scroll-area-thumb"
        @mousedown.stop="handleHorizontalThumbMouseDown"
      />
    </div>
    
    <!-- Corner element -->
    <div
      v-if="showVerticalScrollbar && showHorizontalScrollbar"
      class="absolute bottom-0 right-0 w-2.5 h-2.5"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utils function
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})

const scrollAreaRoot = ref()
const viewport = ref()
const content = ref()
const verticalThumb = ref()
const horizontalThumb = ref()

const scrollTop = ref(0)
const scrollLeft = ref(0)
const scrollHeight = ref(0)
const scrollWidth = ref(0)
const viewportHeight = ref(0)
const viewportWidth = ref(0)

// Dragging state
const isDraggingVertical = ref(false)
const isDraggingHorizontal = ref(false)
const dragStartPos = ref(0)
const dragStartScroll = ref(0)

const showVerticalScrollbar = computed(() => {
  return scrollHeight.value > viewportHeight.value
})

const showHorizontalScrollbar = computed(() => {
  return scrollWidth.value > viewportWidth.value
})

const scrollBarClass = computed(() => props.className)

const verticalThumbStyle = computed(() => {
  if (!showVerticalScrollbar.value) return {}
  
  const ratio = viewportHeight.value / scrollHeight.value
  const thumbHeight = Math.max(20, viewportHeight.value * ratio)
  const maxScrollTop = scrollHeight.value - viewportHeight.value
  const thumbTop = maxScrollTop > 0 ? (scrollTop.value / maxScrollTop) * (viewportHeight.value - thumbHeight) : 0
  
  return {
    height: `${thumbHeight}px`,
    transform: `translateY(${thumbTop}px)`,
  }
})

const horizontalThumbStyle = computed(() => {
  if (!showHorizontalScrollbar.value) return {}
  
  const ratio = viewportWidth.value / scrollWidth.value
  const thumbWidth = Math.max(20, viewportWidth.value * ratio)
  const maxScrollLeft = scrollWidth.value - viewportWidth.value
  const thumbLeft = maxScrollLeft > 0 ? (scrollLeft.value / maxScrollLeft) * (viewportWidth.value - thumbWidth) : 0
  
  return {
    width: `${thumbWidth}px`,
    transform: `translateX(${thumbLeft}px)`,
  }
})

const handleScroll = () => {
  if (!viewport.value) return
  
  scrollTop.value = viewport.value.scrollTop
  scrollLeft.value = viewport.value.scrollLeft
}

const scrollToPosition = (position) => {
  if (!viewport.value) return
  
  if (position.top !== undefined) {
    viewport.value.scrollTop = position.top
  }
  if (position.left !== undefined) {
    viewport.value.scrollLeft = position.left
  }
}

const handleScrollBarMouseDown = (event) => {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  
  if (target.style.flexDirection === 'column' || target.classList.contains('h-2.5')) {
    // Horizontal scrollbar
    const clickX = event.clientX - rect.left
    const ratio = clickX / rect.width
    const newScrollLeft = ratio * (scrollWidth.value - viewportWidth.value)
    scrollToPosition({ left: newScrollLeft })
  } else {
    // Vertical scrollbar
    const clickY = event.clientY - rect.top
    const ratio = clickY / rect.height
    const newScrollTop = ratio * (scrollHeight.value - viewportHeight.value)
    scrollToPosition({ top: newScrollTop })
  }
}

const handleVerticalThumbMouseDown = (event) => {
  isDraggingVertical.value = true
  dragStartPos.value = event.clientY
  dragStartScroll.value = scrollTop.value
  
  document.addEventListener('mousemove', handleVerticalMouseMove)
  document.addEventListener('mouseup', handleVerticalMouseUp)
  
  event.preventDefault()
}

const handleHorizontalThumbMouseDown = (event) => {
  isDraggingHorizontal.value = true
  dragStartPos.value = event.clientX
  dragStartScroll.value = scrollLeft.value
  
  document.addEventListener('mousemove', handleHorizontalMouseMove)
  document.addEventListener('mouseup', handleHorizontalMouseUp)
  
  event.preventDefault()
}

const handleVerticalMouseMove = (event) => {
  if (!isDraggingVertical.value || !viewport.value) return
  
  const deltaY = event.clientY - dragStartPos.value
  const scrollableHeight = scrollHeight.value - viewportHeight.value
  const ratio = viewportHeight.value / scrollHeight.value
  const thumbHeight = Math.max(20, viewportHeight.value * ratio)
  const trackHeight = viewportHeight.value - thumbHeight
  
  if (trackHeight > 0) {
    const scrollRatio = deltaY / trackHeight
    const newScrollTop = Math.max(0, Math.min(scrollableHeight, dragStartScroll.value + scrollRatio * scrollableHeight))
    scrollToPosition({ top: newScrollTop })
  }
}

const handleHorizontalMouseMove = (event) => {
  if (!isDraggingHorizontal.value || !viewport.value) return
  
  const deltaX = event.clientX - dragStartPos.value
  const scrollableWidth = scrollWidth.value - viewportWidth.value
  const ratio = viewportWidth.value / scrollWidth.value
  const thumbWidth = Math.max(20, viewportWidth.value * ratio)
  const trackWidth = viewportWidth.value - thumbWidth
  
  if (trackWidth > 0) {
    const scrollRatio = deltaX / trackWidth
    const newScrollLeft = Math.max(0, Math.min(scrollableWidth, dragStartScroll.value + scrollRatio * scrollableWidth))
    scrollToPosition({ left: newScrollLeft })
  }
}

const handleVerticalMouseUp = () => {
  isDraggingVertical.value = false
  document.removeEventListener('mousemove', handleVerticalMouseMove)
  document.removeEventListener('mouseup', handleVerticalMouseUp)
}

const handleHorizontalMouseUp = () => {
  isDraggingHorizontal.value = false
  document.removeEventListener('mousemove', handleHorizontalMouseMove)
  document.removeEventListener('mouseup', handleHorizontalMouseUp)
}

const updateScrollDimensions = () => {
  if (!viewport.value || !content.value) return
  
  viewportHeight.value = viewport.value.clientHeight
  viewportWidth.value = viewport.value.clientWidth
  scrollHeight.value = content.value.scrollHeight
  scrollWidth.value = content.value.scrollWidth
}

let resizeObserver = null

onMounted(() => {
  updateScrollDimensions()
  
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateScrollDimensions()
    })
    
    if (viewport.value) {
      resizeObserver.observe(viewport.value)
    }
    if (content.value) {
      resizeObserver.observe(content.value)
    }
  }
  
  // Set overflow styles for custom scrolling
  if (viewport.value) {
    viewport.value.style.overflow = 'auto'
    viewport.value.style.scrollbarWidth = 'none' // Firefox
    viewport.value.style.msOverflowStyle = 'none' // IE/Edge
    
    // Hide webkit scrollbars
    const style = document.createElement('style')
    style.textContent = `
      [data-slot="scroll-area-viewport"]::-webkit-scrollbar {
        display: none;
      }
    `
    document.head.appendChild(style)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  
  // Clean up event listeners
  document.removeEventListener('mousemove', handleVerticalMouseMove)
  document.removeEventListener('mouseup', handleVerticalMouseUp)
  document.removeEventListener('mousemove', handleHorizontalMouseMove)
  document.removeEventListener('mouseup', handleHorizontalMouseUp)
})

watch(() => props.className, updateScrollDimensions)
</script>

<style scoped>
/* Additional styles for better scroll area behavior */
</style>
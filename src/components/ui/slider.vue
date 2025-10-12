<template>
  <div
    ref="sliderRoot"
    :class="cn(
      'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
      className
    )"
    :data-orientation="orientation"
    :data-disabled="disabled"
    data-slot="slider"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @keydown="handleKeyDown"
    tabindex="0"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="currentValues[0]"
    :aria-valuetext="currentValues.join(', ')"
    v-bind="$attrs"
  >
    <!-- Track -->
    <div
      ref="track"
      :class="cn(
        'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
      )"
      :data-orientation="orientation"
      data-slot="slider-track"
    >
      <!-- Range -->
      <div
        :class="cn(
          'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
        )"
        :data-orientation="orientation"
        :style="rangeStyle"
        data-slot="slider-range"
      />
    </div>

    <!-- Thumbs -->
    <div
      v-for="(value, index) in currentValues"
      :key="index"
      ref="thumbs"
      :class="cn(
        'border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50'
      )"
      :style="getThumbStyle(index)"
      data-slot="slider-thumb"
      @mousedown="(e) => handleThumbMouseDown(e, index)"
      @touchstart="(e) => handleThumbTouchStart(e, index)"
      @keydown="(e) => handleThumbKeyDown(e, index)"
      tabindex="0"
      role="slider"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="value"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
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
  defaultValue: {
    type: Array,
    default: null
  },
  modelValue: {
    type: Array,
    default: null
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: value => ['horizontal', 'vertical'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs
const sliderRoot = ref()
const track = ref()
const thumbs = ref([])

// State
const isDragging = ref(false)
const dragThumbIndex = ref(0)

// Computed values similar to React useMemo
const currentValues = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue
  }
  if (Array.isArray(props.defaultValue)) {
    return props.defaultValue
  }
  return [props.min, props.max]
})

// Range styling
const rangeStyle = computed(() => {
  const values = currentValues.value
  const min = props.min
  const max = props.max
  
  if (values.length === 1) {
    const percentage = ((values[0] - min) / (max - min)) * 100
    
    if (props.orientation === 'horizontal') {
      return {
        left: '0%',
        width: `${percentage}%`
      }
    } else {
      return {
        bottom: '0%',
        height: `${percentage}%`
      }
    }
  } else {
    const startPercentage = ((values[0] - min) / (max - min)) * 100
    const endPercentage = ((values[values.length - 1] - min) / (max - min)) * 100
    
    if (props.orientation === 'horizontal') {
      return {
        left: `${startPercentage}%`,
        width: `${endPercentage - startPercentage}%`
      }
    } else {
      return {
        bottom: `${startPercentage}%`,
        height: `${endPercentage - startPercentage}%`
      }
    }
  }
})

// Thumb positioning
const getThumbStyle = (index) => {
  const value = currentValues.value[index]
  const percentage = ((value - props.min) / (props.max - props.min)) * 100
  
  if (props.orientation === 'horizontal') {
    return {
      position: 'absolute',
      left: `${percentage}%`,
      transform: 'translateX(-50%)'
    }
  } else {
    return {
      position: 'absolute',
      bottom: `${percentage}%`,
      transform: 'translateY(50%)'
    }
  }
}

// Helper functions
const getValueFromPosition = (clientX, clientY) => {
  if (!track.value) return props.min
  
  const rect = track.value.getBoundingClientRect()
  let percentage
  
  if (props.orientation === 'horizontal') {
    percentage = (clientX - rect.left) / rect.width
  } else {
    percentage = (rect.bottom - clientY) / rect.height
  }
  
  percentage = Math.max(0, Math.min(1, percentage))
  const value = props.min + percentage * (props.max - props.min)
  
  // Round to step
  return Math.round(value / props.step) * props.step
}

const updateValue = (newValues) => {
  const sortedValues = [...newValues].sort((a, b) => a - b)
  emit('update:modelValue', sortedValues)
  emit('change', sortedValues)
}

// Event handlers
const handleMouseDown = (e) => {
  if (props.disabled) return
  
  const newValue = getValueFromPosition(e.clientX, e.clientY)
  const values = [...currentValues.value]
  
  // Find closest thumb
  let closestIndex = 0
  let closestDistance = Math.abs(values[0] - newValue)
  
  for (let i = 1; i < values.length; i++) {
    const distance = Math.abs(values[i] - newValue)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = i
    }
  }
  
  values[closestIndex] = newValue
  updateValue(values)
}

const handleThumbMouseDown = (e, index) => {
  if (props.disabled) return
  
  e.preventDefault()
  e.stopPropagation()
  
  isDragging.value = true
  dragThumbIndex.value = index
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  
  const newValue = getValueFromPosition(e.clientX, e.clientY)
  const values = [...currentValues.value]
  values[dragThumbIndex.value] = newValue
  updateValue(values)
}

const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

// Touch events
const handleTouchStart = (e) => {
  if (props.disabled) return
  const touch = e.touches[0]
  handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY })
}

const handleThumbTouchStart = (e, index) => {
  if (props.disabled) return
  
  e.preventDefault()
  const touch = e.touches[0]
  handleThumbMouseDown({ 
    clientX: touch.clientX, 
    clientY: touch.clientY,
    preventDefault: () => {},
    stopPropagation: () => {}
  }, index)
  
  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
}

const handleTouchMove = (e) => {
  const touch = e.touches[0]
  handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
}

const handleTouchEnd = () => {
  handleMouseUp()
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
}

// Keyboard events
const handleKeyDown = (e) => {
  if (props.disabled) return
  
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      e.preventDefault()
      // Move first thumb
      adjustThumbValue(0, -props.step)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      e.preventDefault()
      // Move first thumb
      adjustThumbValue(0, props.step)
      break
  }
}

const handleThumbKeyDown = (e, index) => {
  if (props.disabled) return
  
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      e.preventDefault()
      adjustThumbValue(index, -props.step)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      e.preventDefault()
      adjustThumbValue(index, props.step)
      break
    case 'Home':
      e.preventDefault()
      adjustThumbValue(index, props.min - currentValues.value[index])
      break
    case 'End':
      e.preventDefault()
      adjustThumbValue(index, props.max - currentValues.value[index])
      break
  }
}

const adjustThumbValue = (index, delta) => {
  const values = [...currentValues.value]
  const newValue = Math.max(props.min, Math.min(props.max, values[index] + delta))
  values[index] = newValue
  updateValue(values)
}

// Cleanup
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>
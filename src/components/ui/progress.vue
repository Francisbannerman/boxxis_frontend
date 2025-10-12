<!-- Progress.vue -->
<template>
  <ProgressRoot
    data-slot="progress"
    :class="cn(
      'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
      className
    )"
    v-bind="$attrs"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      class="bg-primary h-full w-full flex-1 transition-all"
      :style="{ transform: `translateX(-${100 - (value || 0)}%)` }"
    />
  </ProgressRoot>
</template>

<script>
import { ProgressRoot, ProgressIndicator } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'Progress',
  components: {
    ProgressRoot,
    ProgressIndicator
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>
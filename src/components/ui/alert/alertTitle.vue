// AlertTitle.vue - Alert title component
<template>
  <div
    data-slot="alert-title"
    :class="cn(
      'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'AlertTitle',
  props: {
    className: {
      type: String,
      default: ''
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


// CardContent.vue - Main card content area
<template>
  <div
    data-slot="card-content"
    :class="cn('px-6 [&:last-child]:pb-6', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'CardContent',
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

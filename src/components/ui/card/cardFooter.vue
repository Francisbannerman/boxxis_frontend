// CardFooter.vue - Card footer area
<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center px-6 pb-6 [.border-t]:pt-6', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'CardFooter',
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


// DialogFooter.vue - Footer section for actions
<template>
  <div
    data-slot="dialog-footer"
    :class="cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'DialogFooter',
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
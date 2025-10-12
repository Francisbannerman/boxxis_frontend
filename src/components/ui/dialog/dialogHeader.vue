// DialogHeader.vue - Header section for title and description
<template>
  <div
    data-slot="dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'DialogHeader',
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
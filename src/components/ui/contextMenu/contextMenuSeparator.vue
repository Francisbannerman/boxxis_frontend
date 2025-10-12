// ContextMenuSeparator.vue - Visual separator
<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    :class="cn('bg-border -mx-1 my-1 h-px', className)"
    v-bind="$attrs"
  />
</template>

<script>
import { ContextMenuSeparator } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'ContextMenuSeparator',
  components: {
    ContextMenuSeparator
  },
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
// ContextMenuLabel.vue - Menu section label
<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    :data-inset="inset"
    :class="cn(
      'text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuLabel>
</template>

<script>
import { ContextMenuLabel } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'ContextMenuLabel',
  components: {
    ContextMenuLabel
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    inset: {
      type: Boolean,
      default: false
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
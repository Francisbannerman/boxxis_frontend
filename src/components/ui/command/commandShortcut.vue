// CommandShortcut.vue - Keyboard shortcut display
<template>
  <span
    data-slot="command-shortcut"
    :class="cn(
      'text-muted-foreground ml-auto text-xs tracking-widest',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'CommandShortcut',
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
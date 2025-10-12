// MenubarShortcut.vue - Keyboard shortcut display
<template>
  <span
    data-slot="menubar-shortcut"
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
  name: 'MenubarShortcut',
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
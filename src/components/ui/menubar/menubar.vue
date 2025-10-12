// Menubar.vue - Root menubar component
<template>
  <MenubarRoot
    data-slot="menubar"
    :class="cn(
      'bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </MenubarRoot>
</template>

<script>
import { MenubarRoot } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'Menubar',
  components: {
    MenubarRoot
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

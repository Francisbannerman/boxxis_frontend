// MenubarTrigger.vue - Menu trigger button
<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </MenubarTrigger>
</template>

<script>
import { MenubarTrigger } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'MenubarTrigger',
  components: {
    MenubarTrigger
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
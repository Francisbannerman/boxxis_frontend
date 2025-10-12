// MenubarSubTrigger.vue - Submenu trigger
<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    :data-inset="inset"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </MenubarSubTrigger>
</template>

<script>
import { MenubarSubTrigger } from 'radix-vue'
import { ChevronRightIcon } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'MenubarSubTrigger',
  components: {
    MenubarSubTrigger,
    ChevronRightIcon
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
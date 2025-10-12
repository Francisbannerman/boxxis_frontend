// ContextMenuSubTrigger.vue - Submenu trigger
<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="inset"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\\'size-\\'])]:size-4',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
    <ChevronRightIcon class="ml-auto" />
  </ContextMenuSubTrigger>
</template>

<script>
import { ContextMenuSubTrigger } from 'radix-vue'
import { ChevronRightIcon } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'ContextMenuSubTrigger',
  components: {
    ContextMenuSubTrigger,
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
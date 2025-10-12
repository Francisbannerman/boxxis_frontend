// DropdownMenuSubTrigger.vue - Submenu trigger
<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
    <ChevronRightIcon class="ml-auto size-4" />
  </DropdownMenuSubTrigger>
</template>

<script>
import { DropdownMenuSubTrigger } from 'radix-vue'
import { ChevronRightIcon } from 'lucide-vue-next'
import { cn } from '../utils'

export default {
  name: 'DropdownMenuSubTrigger',
  components: {
    DropdownMenuSubTrigger,
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
<template>
  <RadixDropdownMenuPortal>
    <RadixDropdownMenuContent
      data-slot="dropdown-menu-content"
      :side-offset="sideOffset"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
        className
      )"
      v-bind="$attrs"
    >
      <slot />
    </RadixDropdownMenuContent>
  </RadixDropdownMenuPortal>
</template>

<script>
import { 
  DropdownMenuPortal as RadixDropdownMenuPortal, 
  DropdownMenuContent as RadixDropdownMenuContent 
} from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'DropdownMenuContent',
  components: {
    RadixDropdownMenuPortal,
    RadixDropdownMenuContent
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    sideOffset: {
      type: Number,
      default: 4
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
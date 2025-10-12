<template>
  <PopoverPortal>
    <RadixPopoverContent
      data-slot="popover-content"
      :align="align"
      :side-offset="sideOffset"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
        className
      )"
      v-bind="$attrs"
    >
      <slot />
    </RadixPopoverContent>
  </PopoverPortal>
</template>

<script>
import { PopoverPortal, PopoverContent as RadixPopoverContent } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'PopoverContent',
  components: {
    PopoverPortal,
    RadixPopoverContent  // Renamed to avoid conflict
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'center'
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
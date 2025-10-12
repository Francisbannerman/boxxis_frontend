// MenubarContent.vue - Menu content with portal
<template>
  <MenubarPortal>
    <MenubarContent
      data-slot="menubar-content"
      :align="align"
      :align-offset="alignOffset"
      :side-offset="sideOffset"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md',
        className
      )"
      v-bind="$attrs"
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>

<script>
import { MenubarPortal, MenubarContent } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'MenubarContent',
  components: {
    MenubarPortal,
    MenubarContent
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'start'
    },
    alignOffset: {
      type: Number,
      default: -4
    },
    sideOffset: {
      type: Number,
      default: 8
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
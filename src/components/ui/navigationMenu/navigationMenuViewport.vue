// NavigationMenuViewport.vue - Navigation menu viewport
<template>
  <div :class="cn('absolute top-full left-0 isolate z-50 flex justify-center')">
    <NavigationMenuViewport
      data-slot="navigation-menu-viewport"
      :class="cn(
        'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { NavigationMenuViewport } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'NavigationMenuViewport',
  components: {
    NavigationMenuViewport
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
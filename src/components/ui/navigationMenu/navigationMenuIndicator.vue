// NavigationMenuIndicator.vue - Visual indicator for active menu
<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    :class="cn(
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      className
    )"
    v-bind="$attrs"
  >
    <div class="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </NavigationMenuIndicator>
</template>

<script>
import { NavigationMenuIndicator } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'NavigationMenuIndicator',
  components: {
    NavigationMenuIndicator
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
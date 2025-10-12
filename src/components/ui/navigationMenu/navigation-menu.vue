// NavigationMenu.vue - Root navigation menu component
<template>
  <NavigationMenuRoot
    data-slot="navigation-menu"
    :data-viewport="viewport"
    :class="cn(
      'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
    <NavigationMenuViewport v-if="viewport" />
  </NavigationMenuRoot>
</template>

<script>
import { NavigationMenuRoot } from 'radix-vue'
import NavigationMenuViewport from './NavigationMenuViewport.vue'
import { cn } from '../utils'

export default {
  name: 'NavigationMenu',
  components: {
    NavigationMenuRoot,
    NavigationMenuViewport
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    viewport: {
      type: Boolean,
      default: true
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

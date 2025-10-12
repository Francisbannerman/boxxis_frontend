// NavigationMenuItem.vue - Individual navigation menu item
<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    :class="cn('relative', className)"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuItem>
</template>

<script>
import { NavigationMenuItem } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'NavigationMenuItem',
  components: {
    NavigationMenuItem
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
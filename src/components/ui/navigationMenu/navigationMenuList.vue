// NavigationMenuList.vue - Navigation menu list container
<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    :class="cn(
      'group flex flex-1 list-none items-center justify-center gap-1',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuList>
</template>

<script>
import { NavigationMenuList } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'NavigationMenuList',
  components: {
    NavigationMenuList
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
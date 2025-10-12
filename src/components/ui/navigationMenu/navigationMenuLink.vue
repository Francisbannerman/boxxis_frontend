// NavigationMenuLink.vue - Navigation menu link
<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    :class="cn(
      'data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*=\\'text-\\'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*=\\'size-\\'])]:size-4',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuLink>
</template>

<script>
import { NavigationMenuLink } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'NavigationMenuLink',
  components: {
    NavigationMenuLink
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
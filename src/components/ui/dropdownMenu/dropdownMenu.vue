// DropdownMenu.vue - Root dropdown menu component
<template>
  <DropdownMenuRoot 
    data-slot="dropdown-menu" 
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuRoot>
</template>

<script>
import { DropdownMenuRoot } from 'radix-vue'

export default {
  name: 'DropdownMenu',
  components: {
    DropdownMenuRoot
  },
  inheritAttrs: false
}
</script>
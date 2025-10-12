// DropdownMenuSub.vue - Submenu container
<template>
  <DropdownMenuSub 
    data-slot="dropdown-menu-sub" 
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuSub>
</template>

<script>
import { DropdownMenuSub } from 'radix-vue'

export default {
  name: 'DropdownMenuSub',
  components: {
    DropdownMenuSub
  },
  inheritAttrs: false
}
</script>
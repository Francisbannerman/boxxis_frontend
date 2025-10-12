// DropdownMenuPortal.vue - Portal for rendering dropdown outside normal DOM flow
<template>
  <DropdownMenuPortal 
    data-slot="dropdown-menu-portal" 
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuPortal>
</template>

<script>
import { DropdownMenuPortal } from 'radix-vue'

export default {
  name: 'DropdownMenuPortal',
  components: {
    DropdownMenuPortal
  },
  inheritAttrs: false
}
</script>
// DropdownMenuGroup.vue - Menu item group
<template>
  <DropdownMenuGroup 
    data-slot="dropdown-menu-group" 
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuGroup>
</template>

<script>
import { DropdownMenuGroup } from 'radix-vue'

export default {
  name: 'DropdownMenuGroup',
  components: {
    DropdownMenuGroup
  },
  inheritAttrs: false
}
</script>
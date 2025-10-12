// MenubarGroup.vue - Menu item group
<template>
  <MenubarGroup 
    data-slot="menubar-group" 
    v-bind="$attrs"
  >
    <slot />
  </MenubarGroup>
</template>

<script>
import { MenubarGroup } from 'radix-vue'

export default {
  name: 'MenubarGroup',
  components: {
    MenubarGroup
  },
  inheritAttrs: false
}
</script>
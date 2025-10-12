// MenubarMenu.vue - Individual menu in the menubar
<template>
  <MenubarMenu 
    data-slot="menubar-menu" 
    v-bind="$attrs"
  >
    <slot />
  </MenubarMenu>
</template>

<script>
import { MenubarMenu } from 'radix-vue'

export default {
  name: 'MenubarMenu',
  components: {
    MenubarMenu
  },
  inheritAttrs: false
}
</script>
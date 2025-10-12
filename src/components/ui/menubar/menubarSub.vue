// MenubarSub.vue - Submenu container
<template>
  <MenubarSub 
    data-slot="menubar-sub" 
    v-bind="$attrs"
  >
    <slot />
  </MenubarSub>
</template>

<script>
import { MenubarSub } from 'radix-vue'

export default {
  name: 'MenubarSub',
  components: {
    MenubarSub
  },
  inheritAttrs: false
}
</script>
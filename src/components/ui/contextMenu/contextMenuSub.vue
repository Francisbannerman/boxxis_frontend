// ContextMenuSub.vue - Submenu container
<template>
  <ContextMenuSub 
    data-slot="context-menu-sub" 
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuSub>
</template>

<script>
import { ContextMenuSub } from 'radix-vue'

export default {
  name: 'ContextMenuSub',
  components: {
    ContextMenuSub
  },
  inheritAttrs: false
}
</script>
// ContextMenu.vue - Root context menu component
<template>
  <ContextMenuRoot 
    data-slot="context-menu" 
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuRoot>
</template>

<script>
import { ContextMenuRoot } from 'radix-vue'

export default {
  name: 'ContextMenu',
  components: {
    ContextMenuRoot
  },
  inheritAttrs: false
}
</script>




























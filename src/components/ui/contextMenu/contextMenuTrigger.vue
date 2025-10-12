// ContextMenuTrigger.vue - Element that triggers the context menu
<template>
  <ContextMenuTrigger 
    data-slot="context-menu-trigger" 
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuTrigger>
</template>

<script>
import { ContextMenuTrigger } from 'radix-vue'

export default {
  name: 'ContextMenuTrigger',
  components: {
    ContextMenuTrigger
  },
  inheritAttrs: false
}
</script>
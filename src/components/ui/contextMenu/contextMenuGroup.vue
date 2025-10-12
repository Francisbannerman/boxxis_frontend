// ContextMenuGroup.vue - Menu item group
<template>
  <ContextMenuGroup 
    data-slot="context-menu-group" 
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuGroup>
</template>

<script>
import { ContextMenuGroup } from 'radix-vue'

export default {
  name: 'ContextMenuGroup',
  components: {
    ContextMenuGroup
  },
  inheritAttrs: false
}
</script>
// ContextMenuRadioGroup.vue - Radio group container
<template>
  <ContextMenuRadioGroup 
    data-slot="context-menu-radio-group" 
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuRadioGroup>
</template>

<script>
import { ContextMenuRadioGroup } from 'radix-vue'

export default {
  name: 'ContextMenuRadioGroup',
  components: {
    ContextMenuRadioGroup
  },
  inheritAttrs: false
}
</script>
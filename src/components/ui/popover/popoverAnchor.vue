// PopoverAnchor.vue - Anchor element for positioning
<template>
  <PopoverAnchor 
    data-slot="popover-anchor" 
    v-bind="$attrs"
  >
    <slot />
  </PopoverAnchor>
</template>

<script>
import { PopoverAnchor } from 'radix-vue'

export default {
  name: 'PopoverAnchor',
  components: {
    PopoverAnchor
  },
  inheritAttrs: false
}
</script>
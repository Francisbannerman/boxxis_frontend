// Collapsible.vue - Root collapsible component
<template>
  <CollapsibleRoot 
    data-slot="collapsible" 
    v-bind="$attrs"
  >
    <slot />
  </CollapsibleRoot>
</template>

<script>
import { CollapsibleRoot } from 'radix-vue'

export default {
  name: 'Collapsible',
  components: {
    CollapsibleRoot
  },
  inheritAttrs: false
}
</script>
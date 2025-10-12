// CollapsibleTrigger.vue - Trigger element
<template>
  <CollapsibleTrigger
    data-slot="collapsible-trigger"
    v-bind="$attrs"
  >
    <slot />
  </CollapsibleTrigger>
</template>

<script>
import { CollapsibleTrigger } from 'radix-vue'

export default {
  name: 'CollapsibleTrigger',
  components: {
    CollapsibleTrigger
  },
  inheritAttrs: false
}
</script>
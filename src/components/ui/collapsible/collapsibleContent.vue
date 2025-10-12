// CollapsibleContent.vue - Collapsible content area
<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="$attrs"
  >
    <slot />
  </CollapsibleContent>
</template>

<script>
import { CollapsibleContent } from 'radix-vue'

export default {
  name: 'CollapsibleContent',
  components: {
    CollapsibleContent
  },
  inheritAttrs: false
}
</script>
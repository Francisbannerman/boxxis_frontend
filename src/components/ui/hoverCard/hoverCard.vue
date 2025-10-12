// HoverCard.vue - Root hover card component
<template>
  <HoverCardRoot 
    data-slot="hover-card" 
    v-bind="$attrs"
  >
    <slot />
  </HoverCardRoot>
</template>

<script>
import { HoverCardRoot } from 'radix-vue'

export default {
  name: 'HoverCard',
  components: {
    HoverCardRoot
  },
  inheritAttrs: false
}
</script>
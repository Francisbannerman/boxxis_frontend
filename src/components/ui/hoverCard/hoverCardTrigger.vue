// HoverCardTrigger.vue - Element that triggers the hover card
<template>
  <HoverCardTrigger 
    data-slot="hover-card-trigger" 
    v-bind="$attrs"
  >
    <slot />
  </HoverCardTrigger>
</template>

<script>
import { HoverCardTrigger } from 'radix-vue'

export default {
  name: 'HoverCardTrigger',
  components: {
    HoverCardTrigger
  },
  inheritAttrs: false
}
</script>
// Accordion.vue - Main accordion wrapper
<template>
  <AccordionRoot 
    data-slot="accordion" 
    v-bind="$attrs"
  >
    <slot />
  </AccordionRoot>
</template>

<script>
import { AccordionRoot } from 'radix-vue'

export default {
  name: 'Accordion',
  components: {
    AccordionRoot
  },
  inheritAttrs: false
}
</script>
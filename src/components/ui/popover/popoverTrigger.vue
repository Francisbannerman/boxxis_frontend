// PopoverTrigger.vue - Element that triggers the popover
<template>
  <RadixPopoverTrigger 
    data-slot="popover-trigger" 
    v-bind="$attrs"
  >
    <slot />
  </RadixPopoverTrigger>
</template>

<script>
import { PopoverTrigger as RadixPopoverTrigger } from 'radix-vue'

export default {
  name: 'PopoverTrigger',
  components: {
    RadixPopoverTrigger
  },
  inheritAttrs: false
}
</script>
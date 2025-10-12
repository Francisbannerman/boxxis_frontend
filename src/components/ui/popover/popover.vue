// Popover.vue - Root popover component
<template>
  <PopoverRoot v-bind="$attrs">
    <slot />
  </PopoverRoot>
</template>

<script>
import { PopoverRoot } from 'radix-vue'

export default {
  name: 'Popover',
  components: {
    PopoverRoot
  },
  inheritAttrs: false
}
</script>
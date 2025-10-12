<!-- AspectRatio.vue -->
<template>
  <AspectRatioRoot 
    data-slot="aspect-ratio" 
    v-bind="$attrs"
  >
    <slot />
  </AspectRatioRoot>
</template>

<script>
import { AspectRatio as AspectRatioRoot } from 'radix-vue'

export default {
  name: 'AspectRatio',
  components: {
    AspectRatioRoot
  },
  inheritAttrs: false
}
</script>
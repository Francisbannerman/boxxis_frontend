// Dialog.vue - Root dialog component
<template>
  <DialogRoot 
    data-slot="dialog" 
    v-bind="$attrs"
  >
    <slot />
  </DialogRoot>
</template>

<script>
import { DialogRoot } from 'radix-vue'

export default {
  name: 'Dialog',
  components: {
    DialogRoot
  },
  inheritAttrs: false
}
</script>
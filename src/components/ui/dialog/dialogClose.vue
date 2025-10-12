// DialogClose.vue - Element that closes the dialog
<template>
  <DialogClose 
    data-slot="dialog-close" 
    v-bind="$attrs"
  >
    <slot />
  </DialogClose>
</template>

<script>
import { DialogClose } from 'radix-vue'

export default {
  name: 'DialogClose',
  components: {
    DialogClose
  },
  inheritAttrs: false
}
</script>
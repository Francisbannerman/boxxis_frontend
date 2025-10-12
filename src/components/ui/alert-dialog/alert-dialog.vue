// AlertDialog.vue - Root component
<template>
  <AlertDialogRoot 
    data-slot="alert-dialog" 
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogRoot>
</template>

<script>
import { AlertDialogRoot } from 'radix-vue'

export default {
  name: 'AlertDialog',
  components: {
    AlertDialogRoot
  },
  inheritAttrs: false
}
</script>

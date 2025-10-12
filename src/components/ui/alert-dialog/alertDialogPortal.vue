// AlertDialogPortal.vue
<template>
  <AlertDialogPortal 
    data-slot="alert-dialog-portal" 
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogPortal>
</template>

<script>
import { AlertDialogPortal } from 'radix-vue'

export default {
  name: 'AlertDialogPortal',
  components: {
    AlertDialogPortal
  },
  inheritAttrs: false
}
</script>
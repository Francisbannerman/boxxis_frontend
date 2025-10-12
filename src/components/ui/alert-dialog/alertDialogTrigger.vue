// AlertDialogTrigger.vue
<template>
  <AlertDialogTrigger 
    data-slot="alert-dialog-trigger" 
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogTrigger>
</template>

<script>
import { AlertDialogTrigger } from 'radix-vue'

export default {
  name: 'AlertDialogTrigger',
  components: {
    AlertDialogTrigger
  },
  inheritAttrs: false
}
</script>
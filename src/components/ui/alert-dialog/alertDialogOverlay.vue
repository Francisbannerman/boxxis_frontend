// AlertDialogOverlay.vue
<template>
  <AlertDialogOverlay
    data-slot="alert-dialog-overlay"
    :class="cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      className
    )"
    v-bind="$attrs"
  />
</template>

<script>
import { AlertDialogOverlay } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'AlertDialogOverlay',
  components: {
    AlertDialogOverlay
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>
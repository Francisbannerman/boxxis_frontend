// AlertDialogDescription.vue
<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    :class="cn('text-muted-foreground text-sm', className)"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogDescription>
</template>

<script>
import { AlertDialogDescription } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'AlertDialogDescription',
  components: {
    AlertDialogDescription
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
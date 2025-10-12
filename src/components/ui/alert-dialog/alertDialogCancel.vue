// AlertDialogCancel.vue
<template>
  <AlertDialogCancel
    :class="cn(buttonVariants({ variant: 'outline' }), className)"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogCancel>
</template>

<script>
import { AlertDialogCancel } from 'radix-vue'
import { cn } from './utils'
import { buttonVariants } from './button'

export default {
  name: 'AlertDialogCancel',
  components: {
    AlertDialogCancel
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
      cn,
      buttonVariants
    }
  }
}
</script>

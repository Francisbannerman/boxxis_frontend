// AlertDialogAction.vue
<template>
  <AlertDialogAction
    :class="cn(buttonVariants(), className)"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogAction>
</template>

<script>
import { AlertDialogAction } from 'radix-vue'
import { cn } from './utils'
import { buttonVariants } from './button'

export default {
  name: 'AlertDialogAction',
  components: {
    AlertDialogAction
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



// AlertDialogTitle.vue
<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    :class="cn('text-lg font-semibold', className)"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogTitle>
</template>

<script>
import { AlertDialogTitle } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'AlertDialogTitle',
  components: {
    AlertDialogTitle
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
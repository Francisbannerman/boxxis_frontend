// AlertDialogFooter.vue
<template>
  <div
    data-slot="alert-dialog-footer"
    :class="cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'AlertDialogFooter',
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
<template>
  <DialogDescriptionPrimitive
    data-slot="dialog-description"
    :class="cn('text-muted-foreground text-sm', className)"
    v-bind="$attrs"
  >
    <slot />
  </DialogDescriptionPrimitive>
</template>

<script>
import { DialogDescription as DialogDescriptionPrimitive } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'DialogDescription',
  components: {
    DialogDescriptionPrimitive
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
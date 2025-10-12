<template>
  <DialogTitlePrimitive
    data-slot="dialog-title"
    :class="cn('text-lg leading-none font-semibold', className)"
    v-bind="$attrs"
  >
    <slot />
  </DialogTitlePrimitive>
</template>

<script>
import { DialogTitle as DialogTitlePrimitive } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'DialogTitle',
  components: {
    DialogTitlePrimitive
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
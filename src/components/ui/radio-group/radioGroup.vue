// RadioGroup.vue - Root radio group component
<template>
  <RadioGroupRoot
    data-slot="radio-group"
    :class="cn('grid gap-3', className)"
    v-bind="$attrs"
  >
    <slot />
  </RadioGroupRoot>
</template>

<script>
import { RadioGroupRoot } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'RadioGroup',
  components: {
    RadioGroupRoot
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

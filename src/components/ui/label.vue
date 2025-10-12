<!-- Label.vue -->
<template>
  <LabelRoot
    data-slot="label"
    :class="cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </LabelRoot>
</template>

<script>
import { Label as LabelRoot } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'Label',
  components: {
    LabelRoot
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
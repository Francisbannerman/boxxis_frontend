// AccordionItem.vue - Individual accordion item
<template>
  <AccordionItem
    data-slot="accordion-item"
    :class="cn('border-b last:border-b-0', className)"
    v-bind="$attrs"
  >
    <slot />
  </AccordionItem>
</template>

<script>
import { AccordionItem } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'AccordionItem',
  components: {
    AccordionItem
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
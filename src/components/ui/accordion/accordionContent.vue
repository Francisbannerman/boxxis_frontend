// AccordionContent.vue - Collapsible content area
<template>
  <AccordionContent
    data-slot="accordion-content"
    class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    v-bind="$attrs"
  >
    <div :class="cn('pt-0 pb-4', className)">
      <slot />
    </div>
  </AccordionContent>
</template>

<script>
import { AccordionContent } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'AccordionContent',
  components: {
    AccordionContent
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
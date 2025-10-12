// Card.vue - Root card component
<template>
  <div
    data-slot="card"
    :class="cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'Card',
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







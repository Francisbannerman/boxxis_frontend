// CardAction.vue - Action area in header
<template>
  <div
    data-slot="card-action"
    :class="cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
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
  name: 'CardAction',
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

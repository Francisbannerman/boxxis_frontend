// CardTitle.vue - Card title heading
<template>
  <h4
    data-slot="card-title"
    :class="cn('leading-none', className)"
    v-bind="$attrs"
  >
    <slot />
  </h4>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'CardTitle',
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

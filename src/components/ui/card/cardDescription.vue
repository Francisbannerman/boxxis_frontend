// CardDescription.vue - Card description text
<template>
  <p
    data-slot="card-description"
    :class="cn('text-muted-foreground', className)"
    v-bind="$attrs"
  >
    <slot />
  </p>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'CardDescription',
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

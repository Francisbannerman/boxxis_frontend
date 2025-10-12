// Pagination.vue - Root pagination navigation
<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    :class="cn('mx-auto flex w-full justify-center', className)"
    v-bind="$attrs"
  >
    <slot />
  </nav>
</template>

<script>
import { cn } from '../utils'

export default {
  name: 'Pagination',
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
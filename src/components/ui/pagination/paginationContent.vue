// PaginationContent.vue - Pagination list container
<template>
  <ul
    data-slot="pagination-content"
    :class="cn('flex flex-row items-center gap-1', className)"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'PaginationContent',
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
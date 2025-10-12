// PaginationEllipsis.vue - Ellipsis for truncated pages
<template>
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    :class="cn('flex size-9 items-center justify-center', className)"
    v-bind="$attrs"
  >
    <MoreHorizontalIcon class="size-4" />
    <span class="sr-only">More pages</span>
  </span>
</template>

<script>
import { MoreHorizontalIcon } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'PaginationEllipsis',
  components: {
    MoreHorizontalIcon
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
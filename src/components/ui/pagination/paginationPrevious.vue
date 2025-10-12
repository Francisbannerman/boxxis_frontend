// PaginationPrevious.vue - Previous page navigation
<template>
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    :class="cn('gap-1 px-2.5 sm:pl-2.5', className)"
    v-bind="$attrs"
  >
    <ChevronLeftIcon />
    <span class="hidden sm:block">Previous</span>
  </PaginationLink>
</template>

<script>
import { ChevronLeftIcon } from 'lucide-vue-next'
import PaginationLink from './PaginationLink.vue'
import { cn } from './utils'

export default {
  name: 'PaginationPrevious',
  components: {
    PaginationLink,
    ChevronLeftIcon
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
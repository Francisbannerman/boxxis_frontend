// PaginationNext.vue - Next page navigation
<template>
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    :class="cn('gap-1 px-2.5 sm:pr-2.5', className)"
    v-bind="$attrs"
  >
    <span class="hidden sm:block">Next</span>
    <ChevronRightIcon />
  </PaginationLink>
</template>

<script>
import { ChevronRightIcon } from 'lucide-vue-next'
import PaginationLink from './PaginationLink.vue'
import { cn } from './utils'

export default {
  name: 'PaginationNext',
  components: {
    PaginationLink,
    ChevronRightIcon
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
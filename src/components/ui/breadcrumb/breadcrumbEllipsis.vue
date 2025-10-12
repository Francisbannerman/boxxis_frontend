// BreadcrumbEllipsis.vue - Ellipsis for collapsed items
<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="cn('flex size-9 items-center justify-center', className)"
    v-bind="$attrs"
  >
    <MoreHorizontal class="size-4" />
    <span class="sr-only">More</span>
  </span>
</template>

<script>
import { MoreHorizontal } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'BreadcrumbEllipsis',
  components: {
    MoreHorizontal
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


// BreadcrumbSeparator.vue - Visual separator between items
<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:size-3.5', className)"
    v-bind="$attrs"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>

<script>
import { ChevronRight } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'BreadcrumbSeparator',
  components: {
    ChevronRight
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


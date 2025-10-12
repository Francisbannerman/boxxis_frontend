// BreadcrumbItem.vue - Individual breadcrumb item
<template>
  <li
    data-slot="breadcrumb-item"
    :class="cn('inline-flex items-center gap-1.5', className)"
    v-bind="$attrs"
  >
    <slot />
  </li>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'BreadcrumbItem',
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

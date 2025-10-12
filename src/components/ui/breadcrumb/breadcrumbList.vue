// BreadcrumbList.vue - Ordered list container
<template>
  <ol
    data-slot="breadcrumb-list"
    :class="cn(
      'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </ol>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'BreadcrumbList',
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

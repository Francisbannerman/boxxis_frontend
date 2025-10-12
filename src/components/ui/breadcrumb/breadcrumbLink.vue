// BreadcrumbLink.vue - Clickable breadcrumb link
<template>
  <a
    data-slot="breadcrumb-link"
    :class="cn('hover:text-foreground transition-colors', className)"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'BreadcrumbLink',
  props: {
    className: {
      type: String,
      default: ''
    }
    // REMOVED asChild prop
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>
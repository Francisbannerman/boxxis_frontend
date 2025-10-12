// BreadcrumbPage.vue - Current page indicator
<template>
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('text-foreground font-normal', className)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'BreadcrumbPage',
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

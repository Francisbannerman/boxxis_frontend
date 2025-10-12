// PaginationLink.vue - Pagination link with active state
<template>
  <a
    :aria-current="isActive ? 'page' : undefined"
    data-slot="pagination-link"
    :data-active="isActive"
    :class="cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script>
import { cn } from './utils'
import { buttonVariants } from './button.vue'

export default {
  name: 'PaginationLink',
  props: {
    className: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'icon',
      validator: (value) => ['default', 'sm', 'lg', 'icon'].includes(value)
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn,
      buttonVariants
    }
  }
}
</script>
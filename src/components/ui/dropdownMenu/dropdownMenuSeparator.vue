<template>
  <RadixDropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    :class="cn('bg-border -mx-1 my-1 h-px', className)"
    v-bind="$attrs"
  />
</template>

<script>
import { DropdownMenuSeparator as RadixDropdownMenuSeparator } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'DropdownMenuSeparator',
  components: {
    RadixDropdownMenuSeparator
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
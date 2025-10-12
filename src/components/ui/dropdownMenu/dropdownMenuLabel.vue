<template>
  <RadixDropdownMenuLabel
    data-slot="dropdown-menu-label"
    :data-inset="inset"
    :class="cn(
      'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </RadixDropdownMenuLabel>
</template>

<script>
import { DropdownMenuLabel as RadixDropdownMenuLabel } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'DropdownMenuLabel',
  components: {
    RadixDropdownMenuLabel
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    inset: {
      type: Boolean,
      default: false
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
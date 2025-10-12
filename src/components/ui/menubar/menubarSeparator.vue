// MenubarSeparator.vue - Visual separator
<template>
  <MenubarSeparator
    data-slot="menubar-separator"
    :class="cn('bg-border -mx-1 my-1 h-px', className)"
    v-bind="$attrs"
  />
</template>

<script>
import { MenubarSeparator } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'MenubarSeparator',
  components: {
    MenubarSeparator
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
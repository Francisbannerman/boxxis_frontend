// CommandSeparator.vue - Visual separator
<template>
  <CommandSeparator
    data-slot="command-separator"
    :class="cn('bg-border -mx-1 h-px', className)"
    v-bind="$attrs"
  />
</template>

<script>
import { CommandSeparator } from 'cmdk-vue'
import { cn } from './utils'

export default {
  name: 'CommandSeparator',
  components: {
    CommandSeparator
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
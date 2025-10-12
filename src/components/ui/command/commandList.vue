// CommandList.vue - Scrollable list container
<template>
  <CommandList
    data-slot="command-list"
    :class="cn(
      'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </CommandList>
</template>

<script>
import { CommandList } from 'cmdk-vue'
import { cn } from './utils'

export default {
  name: 'CommandList',
  components: {
    CommandList
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
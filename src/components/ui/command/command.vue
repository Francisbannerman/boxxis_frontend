// Command.vue - Root command component
<template>
  <CommandRoot
    data-slot="command"
    :class="cn(
      'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </CommandRoot>
</template>

<script>
import { CommandRoot } from 'cmdk-vue'
import { cn } from '../utils'

export default {
  name: 'Command',
  components: {
    CommandRoot
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
// CommandItem.vue - Selectable command item
<template>
  <CommandItem
    data-slot="command-item"
    :class="cn(
      'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*=\\'text-\\'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\\'size-\\'])]:size-4',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </CommandItem>
</template>

<script>
import { CommandItem } from 'cmdk-vue'
import { cn } from './utils'

export default {
  name: 'CommandItem',
  components: {
    CommandItem
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
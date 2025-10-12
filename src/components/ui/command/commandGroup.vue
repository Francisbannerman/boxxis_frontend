// CommandGroup.vue - Group with heading
<template>
  <CommandGroup
    data-slot="command-group"
    :class="cn(
      'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </CommandGroup>
</template>

<script>
import { CommandGroup } from 'cmdk-vue'
import { cn } from './utils'

export default {
  name: 'CommandGroup',
  components: {
    CommandGroup
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
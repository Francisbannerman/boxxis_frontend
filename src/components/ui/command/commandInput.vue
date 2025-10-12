// CommandInput.vue - Search input with icon
<template>
  <div
    data-slot="command-input-wrapper"
    class="flex h-9 items-center gap-2 border-b px-3"
  >
    <SearchIcon class="size-4 shrink-0 opacity-50" />
    <CommandInput
      data-slot="command-input"
      :class="cn(
        'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className
      )"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { CommandInput } from 'cmdk-vue'
import { SearchIcon } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'CommandInput',
  components: {
    CommandInput,
    SearchIcon
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
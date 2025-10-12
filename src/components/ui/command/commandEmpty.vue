// CommandEmpty.vue - Empty state
<template>
  <CommandEmpty
    data-slot="command-empty"
    class="py-6 text-center text-sm"
    v-bind="$attrs"
  >
    <slot />
  </CommandEmpty>
</template>

<script>
import { CommandEmpty } from 'cmdk-vue'

export default {
  name: 'CommandEmpty',
  components: {
    CommandEmpty
  },
  inheritAttrs: false
}
</script>
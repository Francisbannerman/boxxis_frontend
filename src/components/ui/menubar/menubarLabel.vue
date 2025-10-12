// MenubarLabel.vue - Menu section label
<template>
  <MenubarLabel
    data-slot="menubar-label"
    :data-inset="inset"
    :class="cn(
      'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </MenubarLabel>
</template>

<script>
import { MenubarLabel } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'MenubarLabel',
  components: {
    MenubarLabel
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
<template>
  <RadixDropdownMenuTrigger 
    data-slot="dropdown-menu-trigger" 
    v-bind="$attrs"
  >
    <slot />
  </RadixDropdownMenuTrigger>
</template>

<script>
import { DropdownMenuTrigger as RadixDropdownMenuTrigger } from 'radix-vue'

export default {
  name: 'DropdownMenuTrigger',
  components: {
    RadixDropdownMenuTrigger
  },
  inheritAttrs: false
}
</script>
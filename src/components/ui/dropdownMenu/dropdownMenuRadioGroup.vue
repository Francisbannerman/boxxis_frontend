// DropdownMenuRadioGroup.vue - Radio group container
<template>
  <DropdownMenuRadioGroup 
    data-slot="dropdown-menu-radio-group" 
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuRadioGroup>
</template>

<script>
import { DropdownMenuRadioGroup } from 'radix-vue'

export default {
  name: 'DropdownMenuRadioGroup',
  components: {
    DropdownMenuRadioGroup
  },
  inheritAttrs: false
}
</script>
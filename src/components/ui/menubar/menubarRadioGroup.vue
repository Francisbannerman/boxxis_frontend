// MenubarRadioGroup.vue - Radio group container
<template>
  <MenubarRadioGroup 
    data-slot="menubar-radio-group" 
    v-bind="$attrs"
  >
    <slot />
  </MenubarRadioGroup>
</template>

<script>
import { MenubarRadioGroup } from 'radix-vue'

export default {
  name: 'MenubarRadioGroup',
  components: {
    MenubarRadioGroup
  },
  inheritAttrs: false
}
</script>
// DialogTrigger.vue - Element that opens the dialog
<template>
  <DialogTrigger 
    data-slot="dialog-trigger" 
    v-bind="$attrs"
  >
    <slot />
  </DialogTrigger>
</template>

<script>
import { DialogTrigger } from 'radix-vue'

export default {
  name: 'DialogTrigger',
  components: {
    DialogTrigger
  },
  inheritAttrs: false
}
</script>
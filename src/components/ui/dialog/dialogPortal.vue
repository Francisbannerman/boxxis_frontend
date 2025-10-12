// DialogPortal.vue - Portal for rendering dialog outside normal DOM flow
<template>
  <DialogPortal 
    data-slot="dialog-portal" 
    v-bind="$attrs"
  >
    <slot />
  </DialogPortal>
</template>

<script>
import { DialogPortal } from 'radix-vue'

export default {
  name: 'DialogPortal',
  components: {
    DialogPortal
  },
  inheritAttrs: false
}
</script>
<template>
  <div
    data-slot="sheet-close"
    @click="handleClose"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'
console.log('sheetClose')


const sheetContext = inject('sheetContext', {})

const handleClose = () => {
  if (sheetContext.setOpen) {
    sheetContext.setOpen(false)
  }
}
</script>
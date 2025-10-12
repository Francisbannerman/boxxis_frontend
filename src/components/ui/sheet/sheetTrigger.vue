<template>
  <div
    data-slot="sheet-trigger"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'

const sheetContext = inject('sheetContext', {})

const handleClick = () => {
  if (sheetContext.setOpen) {
    sheetContext.setOpen(true)
  }
}
</script>
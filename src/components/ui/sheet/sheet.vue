<!-- sheet.vue -->
<script setup>
import { ref, provide, computed } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: null
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open'])

const internalOpen = ref(props.defaultOpen)
const isOpen = computed(() => props.open !== null ? props.open : internalOpen.value)

const setOpen = (value) => {
  if (props.open !== null) {
    emit('update:open', value)
  } else {
    internalOpen.value = value
  }
}

provide('sheetContext', {
  isOpen,
  setOpen
})
</script>

<template>
  <slot />
</template>
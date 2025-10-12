<template>
  <span data-slot="select-value" v-bind="$attrs">
    <slot>{{ displayValue }}</slot>
  </span>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Select...'
  }
})

const selectContext = inject('selectContext', {})

const displayValue = computed(() => {
  return selectContext.selectedValue?.value || props.placeholder
})
</script>
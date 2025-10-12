<template>
  <div data-slot="select">
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  defaultValue: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const internalValue = ref(props.defaultValue)
const selectedValue = computed(() => props.modelValue !== null ? props.modelValue : internalValue.value)

const setSelected = (value) => {
  if (props.modelValue !== null) {
    emit('update:modelValue', value)
  } else {
    internalValue.value = value
  }
  emit('change', value)
}

provide('selectContext', {
  selectedValue,
  setSelected
})
</script>
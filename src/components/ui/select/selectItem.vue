<template>
  <div
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
      className
    )"
    :data-disabled="disabled"
    data-slot="select-item"
    @click="handleSelect"
    v-bind="$attrs"
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <Check v-if="isSelected" class="size-4" />
    </span>
    <span><slot /></span>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { Check } from 'lucide-vue-next'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

const selectContext = inject('selectContext', {})
const isOpen = inject('selectIsOpen')

const isSelected = computed(() => {
  return selectContext.selectedValue?.value === props.value
})

const handleSelect = () => {
  if (!props.disabled && selectContext.setSelected) {
    selectContext.setSelected(props.value)
    isOpen.value = false
  }
}
</script>
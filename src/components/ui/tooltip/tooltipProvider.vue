<!-- TooltipProvider.vue (Simplified version) -->
<template>
  <div data-slot="tooltip-provider">
    <slot />
  </div>
</template>

<script setup>
defineOptions({
  name: 'TooltipProvider'
})

const props = defineProps({
  delayDuration: {
    type: Number,
    default: 0
  }
})
</script>
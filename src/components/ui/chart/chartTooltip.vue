// ChartTooltip.vue - Tooltip wrapper (uses vue-chartjs tooltip)
<template>
  <component :is="'div'" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'ChartTooltip',
  inheritAttrs: false
}
</script>
// ChartLegend.vue - Legend wrapper
<template>
  <component :is="'div'" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'ChartLegend',
  inheritAttrs: false
}
</script>
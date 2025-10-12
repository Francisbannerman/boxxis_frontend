// Breadcrumb.vue - Root breadcrumb navigation
<template>
  <nav 
    aria-label="breadcrumb" 
    data-slot="breadcrumb" 
    v-bind="$attrs"
  >
    <slot />
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  inheritAttrs: false
}
</script>

// PaginationItem.vue - Individual pagination item
<template>
  <li 
    data-slot="pagination-item" 
    v-bind="$attrs"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'PaginationItem',
  inheritAttrs: false
}
</script>
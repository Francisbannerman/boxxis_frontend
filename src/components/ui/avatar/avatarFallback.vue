// AvatarFallback.vue - Avatar fallback component
<template>
  <AvatarFallbackPrimitive
    data-slot="avatar-fallback"
    :class="cn(
      'bg-muted flex size-full items-center justify-center rounded-full',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </AvatarFallbackPrimitive>
</template>

<script>
import { AvatarFallback as AvatarFallbackPrimitive } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'AvatarFallback',
  components: {
    AvatarFallbackPrimitive  // ← Renamed to avoid conflict
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>
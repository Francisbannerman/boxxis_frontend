// Avatar.vue - Root avatar component
<template>
  <AvatarRootPrimitive
    data-slot="avatar"
    :class="cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-full',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </AvatarRootPrimitive>
</template>

<script>
import { AvatarRoot } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'Avatar',
  components: {
    AvatarRootPrimitive: AvatarRoot  // ← Renamed to avoid conflict
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
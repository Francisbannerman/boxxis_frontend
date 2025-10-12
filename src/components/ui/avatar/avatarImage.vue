// AvatarImage.vue - Avatar image component
<template>
  <AvatarImage
    data-slot="avatar-image"
    :class="cn('aspect-square size-full', className)"
    v-bind="$attrs"
  />
</template>

<script>
import { AvatarImage } from 'radix-vue'
import { cn } from '../utils'

export default {
  name: 'AvatarImage',
  components: {
    AvatarImage
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


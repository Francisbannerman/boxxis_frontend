// CarouselItem.vue - Individual carousel slide
<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { inject } from 'vue'
import { cn } from './utils'

export default {
  name: 'CarouselItem',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup() {
    const carousel = inject('carousel')
    
    if (!carousel) {
      throw new Error('CarouselItem must be used within a Carousel component')
    }

    return {
      cn,
      orientation: carousel.orientation
    }
  }
}
</script>


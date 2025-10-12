// CarouselContent.vue - Content wrapper with embla ref
<template>
  <div
    ref="carouselRef"
    class="overflow-hidden"
    data-slot="carousel-content"
  >
    <div
      :class="cn(
        'flex',
        orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
        className
      )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { cn } from './utils'

export default {
  name: 'CarouselContent',
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
      throw new Error('CarouselContent must be used within a Carousel component')
    }

    return {
      cn,
      carouselRef: carousel.carouselRef,
      orientation: carousel.orientation
    }
  }
}
</script>


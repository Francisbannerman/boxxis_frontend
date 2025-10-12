// CarouselPrevious.vue - Previous button
<template>
  <Button
    data-slot="carousel-previous"
    :variant="variant"
    :size="size"
    :class="cn(
      'absolute size-8 rounded-full',
      orientation === 'horizontal'
        ? 'top-1/2 -left-12 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      className
    )"
    :disabled="!canScrollPrev"
    @click="scrollPrev"
    v-bind="$attrs"
  >
    <ArrowLeft />
    <span class="sr-only">Previous slide</span>
  </Button>
</template>

<script>
import { inject } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { cn } from './utils'
import Button from './button.vue'

export default {
  name: 'CarouselPrevious',
  components: {
    Button,
    ArrowLeft
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'outline'
    },
    size: {
      type: String,
      default: 'icon'
    }
  },
  inheritAttrs: false,
  setup() {
    const carousel = inject('carousel')
    
    if (!carousel) {
      throw new Error('CarouselPrevious must be used within a Carousel component')
    }

    return {
      cn,
      orientation: carousel.orientation,
      scrollPrev: carousel.scrollPrev,
      canScrollPrev: carousel.canScrollPrev
    }
  }
}
</script>


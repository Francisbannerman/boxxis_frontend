// CarouselNext.vue - Next button
<template>
  <Button
    data-slot="carousel-next"
    :variant="variant"
    :size="size"
    :class="cn(
      'absolute size-8 rounded-full',
      orientation === 'horizontal'
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      className
    )"
    :disabled="!canScrollNext"
    @click="scrollNext"
    v-bind="$attrs"
  >
    <ArrowRight />
    <span class="sr-only">Next slide</span>
  </Button>
</template>

<script>
import { inject } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { cn } from './utils'
import Button from './button.vue'

export default {
  name: 'CarouselNext',
  components: {
    Button,
    ArrowRight
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
      throw new Error('CarouselNext must be used within a Carousel component')
    }

    return {
      cn,
      orientation: carousel.orientation,
      scrollNext: carousel.scrollNext,
      canScrollNext: carousel.canScrollNext
    }
  }
}
</script>


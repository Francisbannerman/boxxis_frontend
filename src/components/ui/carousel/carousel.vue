// Carousel.vue - Main carousel wrapper with context
<template>
  <div
    @keydown.capture="handleKeyDown"
    :class="cn('relative', className)"
    role="region"
    aria-roledescription="carousel"
    data-slot="carousel"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, provide, watch, nextTick } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import { cn } from '../utils'

export default {
  name: 'Carousel',
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value)
    },
    opts: {
      type: Object,
      default: () => ({})
    },
    plugins: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['setApi'],
  inheritAttrs: false,
  setup(props, { emit }) {
    const canScrollPrev = ref(false)
    const canScrollNext = ref(false)

    const [emblaRef, emblaApi] = useEmblaCarousel(() => ({
      ...props.opts,
      axis: props.orientation === 'horizontal' ? 'x' : 'y'
    }), props.plugins)

    const onSelect = (api) => {
      if (!api) return
      canScrollPrev.value = api.canScrollPrev()
      canScrollNext.value = api.canScrollNext()
    }

    const scrollPrev = () => {
      emblaApi.value?.scrollPrev()
    }

    const scrollNext = () => {
      emblaApi.value?.scrollNext()
    }

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    }

    // Watch for API changes and emit to parent
    watch(emblaApi, (api) => {
      if (api) {
        emit('setApi', api)
      }
    })

    onMounted(() => {
      if (!emblaApi.value) return
      
      onSelect(emblaApi.value)
      emblaApi.value.on('reInit', onSelect)
      emblaApi.value.on('select', onSelect)
    })

    onUnmounted(() => {
      emblaApi.value?.off('select', onSelect)
    })

    // Provide carousel context to child components
    provide('carousel', reactive({
      carouselRef: emblaRef,
      api: emblaApi,
      opts: props.opts,
      orientation: props.orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext
    }))

    return {
      cn,
      handleKeyDown
    }
  }
}
</script>


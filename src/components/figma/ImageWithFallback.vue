<template>
  <img
    :src="currentSrc"
    :alt="alt"
    :class="className"
    @error="handleError"
    @click="$emit('click', $event)"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ImageWithFallback',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    fallback: {
      type: String,
      default: 'https://via.placeholder.com/400x400?text=Image+Not+Found'
    },
    class: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props) {
    const currentSrc = ref(props.src)
    const hasErrored = ref(false)

    const handleError = () => {
      if (!hasErrored.value) {
        hasErrored.value = true
        currentSrc.value = props.fallback
      }
    }

    return {
      currentSrc,
      handleError,
      className: props.class
    }
  }
}
</script>
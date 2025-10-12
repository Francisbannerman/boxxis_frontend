// FormDescription.vue - Form field description
<template>
  <p
    data-slot="form-description"
    :id="formDescriptionId"
    :class="cn('text-muted-foreground text-sm', className)"
    v-bind="$attrs"
  >
    <slot />
  </p>
</template>

<script>
import { inject } from 'vue'
import { cn } from './utils'

export default {
  name: 'FormDescription',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup() {
    const formItem = inject('formItem', {})

    return {
      cn,
      formDescriptionId: formItem.formDescriptionId
    }
  }
}
</script>
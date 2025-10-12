// FormMessage.vue - Error message display
<template>
  <p
    v-if="body"
    data-slot="form-message"
    :id="formMessageId"
    :class="cn('text-destructive text-sm', className)"
    v-bind="$attrs"
  >
    {{ body }}
  </p>
</template>

<script>
import { inject, computed } from 'vue'
import { cn } from './utils'

export default {
  name: 'FormMessage',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup(props, { slots }) {
    const formField = inject('formField', {})
    const formItem = inject('formItem', {})

    const body = computed(() => {
      if (formField.error) {
        return String(formField.error)
      }
      // If no error, check for slot content
      return slots.default ? slots.default() : null
    })

    return {
      cn,
      body,
      formMessageId: formItem.formMessageId
    }
  }
}
</script>
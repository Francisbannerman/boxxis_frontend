// FormItem.vue - Form item container with context
<template>
  <div
    data-slot="form-item"
    :class="cn('grid gap-2', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { provide } from 'vue'
import { cn } from './utils'

let idCounter = 0

export default {
  name: 'FormItem',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup(props, { slots }) {
    const id = `form-item-${++idCounter}`

    provide('formItem', {
      id,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`
    })

    return {
      cn
    }
  }
}
</script>
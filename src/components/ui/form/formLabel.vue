// FormLabel.vue - Form label with error styling
<template>
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="cn('data-[error=true]:text-destructive', className)"
    :for="formItemId"
    v-bind="$attrs"
  >
    <slot />
  </Label>
</template>

<script>
import { inject } from 'vue'
import { cn } from './utils'
import Label from './label.vue'

export default {
  name: 'FormLabel',
  components: {
    Label
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup() {
    const formField = inject('formField', {})
    const formItem = inject('formItem', {})

    return {
      cn,
      error: formField.error,
      formItemId: formItem.formItemId
    }
  }
}
</script>
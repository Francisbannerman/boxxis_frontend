// FormControl.vue - Form control wrapper
<template>
  <div
    data-slot="form-control"
    :id="formItemId"
    :aria-describedby="ariaDescribedBy"
    :aria-invalid="!!error"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'FormControl',
  inheritAttrs: false,
  setup() {
    const formField = inject('formField', {})
    const formItem = inject('formItem', {})

    const ariaDescribedBy = computed(() => {
      const { formDescriptionId, formMessageId } = formItem
      return !formField.error 
        ? formDescriptionId 
        : `${formDescriptionId} ${formMessageId}`
    })

    return {
      error: formField.error,
      formItemId: formItem.formItemId,
      ariaDescribedBy
    }
  }
}
</script>
// FormField.vue - Field wrapper with validation
<template>
  <Field 
    :name="name" 
    :rules="rules" 
    v-slot="{ field, meta, errorMessage }"
  >
    <FormFieldProvider 
      :name="name" 
      :error="errorMessage" 
      :touched="meta.touched"
      :valid="meta.valid"
    >
      <slot v-bind="{ field, meta, errorMessage }" />
    </FormFieldProvider>
  </Field>
</template>

<script>
import { Field } from 'vee-validate'
import { provide } from 'vue'

const FormFieldProvider = {
  setup(props, { slots }) {
    provide('formField', {
      name: props.name,
      error: props.error,
      touched: props.touched,
      valid: props.valid
    })
    
    return () => slots.default()
  }
}

export default {
  name: 'FormField',
  components: {
    Field,
    FormFieldProvider
  },
  props: {
    name: {
      type: String,
      required: true
    },
    rules: [String, Function, Object]
  }
}
</script>
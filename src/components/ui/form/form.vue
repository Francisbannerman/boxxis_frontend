// Form.vue - Root form provider component
<template>
  <form v-bind="$attrs" @submit="handleSubmit">
    <slot />
  </form>
</template>

<script>
import { useForm } from 'vee-validate'

export default {
  name: 'Form',
  props: {
    validationSchema: Object,
    initialValues: Object
  },
  inheritAttrs: false,
  setup(props, { emit, expose }) {
    const { handleSubmit, errors, values, setFieldValue, setFieldError } = useForm({
      validationSchema: props.validationSchema,
      initialValues: props.initialValues
    })

    const onSubmit = handleSubmit((values) => {
      emit('submit', values)
    })

    // Expose form methods for parent component access
    expose({
      values,
      errors,
      setFieldValue,
      setFieldError,
      handleSubmit: onSubmit
    })

    return {
      handleSubmit: onSubmit
    }
  }
}
</script>
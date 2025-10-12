import { inject } from 'vue'

export function useFormField() {
  const formField = inject('formField', {})
  const formItem = inject('formItem', {})

  if (!formField.name) {
    throw new Error('useFormField should be used within <FormField>')
  }

  return {
    id: formItem.id,
    name: formField.name,
    formItemId: formItem.formItemId,
    formDescriptionId: formItem.formDescriptionId,
    formMessageId: formItem.formMessageId,
    error: formField.error,
    touched: formField.touched,
    valid: formField.valid
  }
}
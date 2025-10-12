// InputOTP.vue - Root OTP input component
<template>
  <OTPInput
    data-slot="input-otp"
    :container-class="cn(
      'flex items-center gap-2 has-disabled:opacity-50',
      containerClassName
    )"
    :class="cn('disabled:cursor-not-allowed', className)"
    v-bind="$attrs"
  >
    <slot />
  </OTPInput>
</template>

<script>
import { OTPInput } from 'vue-input-otp'
import { cn } from '../utils'

export default {
  name: 'InputOTP',
  components: {
    OTPInput
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    containerClassName: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>
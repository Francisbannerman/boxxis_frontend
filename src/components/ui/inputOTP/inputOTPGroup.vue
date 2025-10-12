// InputOTPGroup.vue - Group container for OTP slots
<template>
  <div
    data-slot="input-otp-group"
    :class="cn('flex items-center gap-1', className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from './utils'

export default {
  name: 'InputOTPGroup',
  props: {
    className: {
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
// InputOTPSeparator.vue - Visual separator between OTP groups
<template>
  <div 
    data-slot="input-otp-separator" 
    role="separator" 
    v-bind="$attrs"
  >
    <MinusIcon />
  </div>
</template>

<script>
import { MinusIcon } from 'lucide-vue-next'

export default {
  name: 'InputOTPSeparator',
  components: {
    MinusIcon
  },
  inheritAttrs: false
}
</script>
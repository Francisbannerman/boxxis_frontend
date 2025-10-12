// InputOTPSlot.vue - Individual OTP input slot
<template>
  <div
    data-slot="input-otp-slot"
    :data-active="isActive"
    :class="cn(
      'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
      className
    )"
    v-bind="$attrs"
  >
    {{ char }}
    <div 
      v-if="hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { cn } from './utils'

export default {
  name: 'InputOTPSlot',
  props: {
    index: {
      type: Number,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup(props) {
    // Inject OTP context from vue-input-otp
    const otpContext = inject('otp-input-context', {})
    
    const slotData = computed(() => {
      return otpContext.slots?.[props.index] || {}
    })

    const char = computed(() => slotData.value.char || '')
    const hasFakeCaret = computed(() => slotData.value.hasFakeCaret || false)
    const isActive = computed(() => slotData.value.isActive || false)

    return {
      cn,
      char,
      hasFakeCaret,
      isActive
    }
  }
}
</script>
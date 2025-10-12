// Alert.vue - Main alert component
<template>
  <div
    data-slot="alert"
    role="alert"
    :class="cn(alertVariants({ variant }), className)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cva } from 'class-variance-authority'
import { cn } from '../utils'

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export default {
  name: 'Alert',
  props: {
    className: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'destructive'].includes(value)
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn,
      alertVariants
    }
  }
}
</script>
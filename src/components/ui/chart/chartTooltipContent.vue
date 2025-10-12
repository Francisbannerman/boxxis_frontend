// ChartTooltipContent.vue - Custom tooltip content
<template>
  <div
    v-if="active && payload?.length"
    :class="cn(
      'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
      className
    )"
  >
    <div v-if="!nestLabel" :class="cn('font-medium', labelClassName)">
      {{ tooltipLabel }}
    </div>
    <div class="grid gap-1.5">
      <div
        v-for="(item, index) in payload"
        :key="item.dataKey"
        :class="cn(
          '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
          indicator === 'dot' && 'items-center'
        )"
      >
        <component
          v-if="getItemConfig(item)?.icon && !hideIndicator"
          :is="getItemConfig(item).icon"
        />
        <div
          v-else-if="!hideIndicator"
          :class="cn(
            'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
            {
              'h-2.5 w-2.5': indicator === 'dot',
              'w-1': indicator === 'line',
              'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
              'my-0.5': nestLabel && indicator === 'dashed'
            }
          )"
          :style="{
            '--color-bg': color || item.payload?.fill || item.color,
            '--color-border': color || item.payload?.fill || item.color
          }"
        />
        <div
          :class="cn(
            'flex flex-1 justify-between leading-none',
            nestLabel ? 'items-end' : 'items-center'
          )"
        >
          <div class="grid gap-1.5">
            <div v-if="nestLabel" :class="cn('font-medium', labelClassName)">
              {{ tooltipLabel }}
            </div>
            <span class="text-muted-foreground">
              {{ getItemConfig(item)?.label || item.name }}
            </span>
          </div>
          <span v-if="item.value" class="text-foreground font-mono font-medium tabular-nums">
            {{ item.value.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { cn } from './utils'

export default {
  name: 'ChartTooltipContent',
  props: {
    active: Boolean,
    payload: Array,
    className: String,
    indicator: {
      type: String,
      default: 'dot',
      validator: (value) => ['line', 'dot', 'dashed'].includes(value)
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    hideIndicator: {
      type: Boolean,
      default: false
    },
    label: [String, Number],
    labelClassName: String,
    color: String,
    nameKey: String,
    labelKey: String
  },
  setup(props) {
    const chart = inject('chart')
    
    if (!chart) {
      throw new Error('ChartTooltipContent must be used within a ChartContainer')
    }

    const nestLabel = computed(() => 
      props.payload?.length === 1 && props.indicator !== 'dot'
    )

    const tooltipLabel = computed(() => {
      if (props.hideLabel || !props.payload?.length) return null
      
      const [item] = props.payload
      const key = props.labelKey || item?.dataKey || item?.name || 'value'
      const itemConfig = getPayloadConfigFromPayload(chart.config, item, key)
      
      return !props.labelKey && typeof props.label === 'string'
        ? chart.config[props.label]?.label || props.label
        : itemConfig?.label
    })

    const getItemConfig = (item) => {
      const key = props.nameKey || item.name || item.dataKey || 'value'
      return getPayloadConfigFromPayload(chart.config, item, key)
    }

    return {
      cn,
      nestLabel,
      tooltipLabel,
      getItemConfig
    }
  }
}

// Helper function
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload = payload.payload && 
    typeof payload.payload === 'object' && 
    payload.payload !== null ? payload.payload : undefined

  let configLabelKey = key

  if (key in payload && typeof payload[key] === 'string') {
    configLabelKey = payload[key]
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === 'string') {
    configLabelKey = payloadPayload[key]
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}
</script>
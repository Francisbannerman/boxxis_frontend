// ChartLegendContent.vue - Custom legend content
<template>
  <div
    v-if="payload?.length"
    :class="cn(
      'flex items-center justify-center gap-4',
      verticalAlign === 'top' ? 'pb-3' : 'pt-3',
      className
    )"
  >
    <div
      v-for="item in payload"
      :key="item.value"
      :class="cn(
        '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
      )"
    >
      <component
        v-if="getItemConfig(item)?.icon && !hideIcon"
        :is="getItemConfig(item).icon"
      />
      <div
        v-else
        class="h-2 w-2 shrink-0 rounded-[2px]"
        :style="{ backgroundColor: item.color }"
      />
      {{ getItemConfig(item)?.label }}
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { cn } from './utils'

export default {
  name: 'ChartLegendContent',
  props: {
    className: String,
    hideIcon: {
      type: Boolean,
      default: false
    },
    payload: Array,
    verticalAlign: {
      type: String,
      default: 'bottom'
    },
    nameKey: String
  },
  setup(props) {
    const chart = inject('chart')
    
    if (!chart) {
      throw new Error('ChartLegendContent must be used within a ChartContainer')
    }

    const getItemConfig = (item) => {
      const key = props.nameKey || item.dataKey || 'value'
      return getPayloadConfigFromPayload(chart.config, item, key)
    }

    return {
      cn,
      getItemConfig
    }
  }
}

// Same helper function as above
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
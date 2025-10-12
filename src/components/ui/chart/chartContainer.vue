// ChartContainer.vue - Main chart wrapper with context
<template>
  <div
    data-slot="chart"
    :data-chart="chartId"
    :class="cn(
      '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=\'#ccc\']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke=\'#ccc\']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=\'#ccc\']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke=\'#fff\']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke=\'#fff\']]:stroke-transparent [&_.recharts-surface]:outline-hidden',
      className
    )"
    v-bind="$attrs"
  >
    <ChartStyle :id="chartId" :config="config" />
    <ResponsiveContainer>
      <slot />
    </ResponsiveContainer>
  </div>
</template>

<script>
import { provide, computed } from 'vue'
import { ResponsiveContainer } from 'vue-chartjs'
import { cn } from '../utils'

let idCounter = 0

export default {
  name: 'ChartContainer',
  components: {
    ResponsiveContainer
  },
  props: {
    id: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      required: true
    }
  },
  inheritAttrs: false,
  setup(props) {
    const uniqueId = ++idCounter
    const chartId = computed(() => `chart-${props.id || uniqueId}`)

    // Provide chart context to child components
    provide('chart', {
      config: props.config
    })

    return {
      cn,
      chartId
    }
  }
}
</script>












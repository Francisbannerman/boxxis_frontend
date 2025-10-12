// ChartStyle.vue - Dynamic CSS generation for chart theming
<template>
  <style v-html="styleContent"></style>
</template>

<script>
import { computed } from 'vue'

const THEMES = { light: '', dark: '.dark' }

export default {
  name: 'ChartStyle',
  props: {
    id: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const styleContent = computed(() => {
      const colorConfig = Object.entries(props.config).filter(
        ([, config]) => config.theme || config.color
      )

      if (!colorConfig.length) {
        return ''
      }

      return Object.entries(THEMES)
        .map(
          ([theme, prefix]) => `
${prefix} [data-chart=${props.id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join('\n')}
}
`
        )
        .join('\n')
    })

    return {
      styleContent
    }
  }
}
</script>
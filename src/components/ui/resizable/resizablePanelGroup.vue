// ResizablePanelGroup.vue - Root resizable panel group
<template>
  <PanelGroup
    data-slot="resizable-panel-group"
    :class="cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </PanelGroup>
</template>

<script>
import { PanelGroup } from 'vue-resizable-panels'
import { cn } from '../utils'

export default {
  name: 'ResizablePanelGroup',
  components: {
    PanelGroup
  },
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
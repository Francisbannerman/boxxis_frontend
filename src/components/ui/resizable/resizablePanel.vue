// ResizablePanel.vue - Individual resizable panel
<template>
  <Panel 
    data-slot="resizable-panel" 
    v-bind="$attrs"
  >
    <slot />
  </Panel>
</template>

<script>
import { Panel } from 'vue-resizable-panels'

export default {
  name: 'ResizablePanel',
  components: {
    Panel
  },
  inheritAttrs: false
}
</script>




// CommandDialog.vue - Command in a dialog
<template>
  <Dialog v-bind="dialogProps">
    <DialogHeader class="sr-only">
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>{{ description }}</DialogDescription>
    </DialogHeader>
    <DialogContent class="overflow-hidden p-0">
      <Command class="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>

<script>
import { computed } from 'vue'
import Command from './Command.vue'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog.vue'

export default {
  name: 'CommandDialog',
  components: {
    Command,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
  },
  props: {
    title: {
      type: String,
      default: 'Command Palette'
    },
    description: {
      type: String,
      default: 'Search for a command to run...'
    }
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    const dialogProps = computed(() => {
      const { title, description, ...rest } = attrs
      return rest
    })

    return {
      dialogProps
    }
  }
}
</script>
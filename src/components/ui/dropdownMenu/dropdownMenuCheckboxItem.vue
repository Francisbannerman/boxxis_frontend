<template>
  <RadixDropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      className
    )"
    :checked="checked"
    v-bind="$attrs"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <RadixDropdownMenuItemIndicator>
        <CheckIcon class="size-4" />
      </RadixDropdownMenuItemIndicator>
    </span>
    <slot />
  </RadixDropdownMenuCheckboxItem>
</template>

<script>
import { 
  DropdownMenuCheckboxItem as RadixDropdownMenuCheckboxItem, 
  DropdownMenuItemIndicator as RadixDropdownMenuItemIndicator 
} from 'radix-vue'
import { CheckIcon } from 'lucide-vue-next'
import { cn } from '../utils'

export default {
  name: 'DropdownMenuCheckboxItem',
  components: {
    RadixDropdownMenuCheckboxItem,
    RadixDropdownMenuItemIndicator,
    CheckIcon
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    checked: Boolean
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>
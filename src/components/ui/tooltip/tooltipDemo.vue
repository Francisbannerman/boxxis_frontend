<!-- Usage Example -->
<template>
  <div class="p-8 space-y-8">
    <!-- Basic Tooltip -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Basic Tooltips</h3>
      
      <div class="flex gap-4">
        <Tooltip>
          <template #trigger>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Hover me
            </button>
          </template>
          This is a tooltip
        </Tooltip>
        
        <Tooltip side="right">
          <template #trigger>
            <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Right tooltip
            </button>
          </template>
          Tooltip on the right side
        </Tooltip>
        
        <Tooltip side="bottom">
          <template #trigger>
            <button class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Bottom tooltip
            </button>
          </template>
          Tooltip at the bottom
        </Tooltip>
      </div>
    </div>

    <!-- Tooltip with delay -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Delayed Tooltip</h3>
      
      <Tooltip :delay-duration="500">
        <template #trigger>
          <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Hover for 500ms
          </button>
        </template>
        This tooltip appears after a delay
      </Tooltip>
    </div>

    <!-- Controlled tooltip -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Controlled Tooltip</h3>
      
      <div class="flex gap-2">
        <Tooltip v-model:open="isControlledOpen">
          <template #trigger>
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Controlled tooltip
            </button>
          </template>
          This tooltip is controlled externally
        </Tooltip>
        
        <button 
          @click="isControlledOpen = !isControlledOpen"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Toggle: {{ isControlledOpen ? 'Hide' : 'Show' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isControlledOpen = ref(false)
</script>

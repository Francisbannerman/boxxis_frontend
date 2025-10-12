<!-- Usage Example -->
<template>
  <div class="p-6 space-y-6">
    <!-- Single Selection Toggle Group -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium">Single Selection</h3>
      <ToggleGroup 
        v-model="singleValue" 
        type="single"
        variant="outline"
      >
        <ToggleGroupItem value="left">
          <AlignLeftIcon class="h-4 w-4" />
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenterIcon class="h-4 w-4" />
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRightIcon class="h-4 w-4" />
          Right
        </ToggleGroupItem>
      </ToggleGroup>
      <p class="text-xs text-muted-foreground">Selected: {{ singleValue || 'None' }}</p>
    </div>

    <!-- Multiple Selection Toggle Group -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium">Multiple Selection</h3>
      <ToggleGroup 
        v-model="multipleValues" 
        type="multiple"
        variant="default"
      >
        <ToggleGroupItem value="bold">
          <BoldIcon class="h-4 w-4" />
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ItalicIcon class="h-4 w-4" />
          Italic
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <UnderlineIcon class="h-4 w-4" />
          Underline
        </ToggleGroupItem>
      </ToggleGroup>
      <p class="text-xs text-muted-foreground">Selected: {{ multipleValues.length ? multipleValues.join(', ') : 'None' }}</p>
    </div>

    <!-- Small Size -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium">Small Size</h3>
      <ToggleGroup 
        v-model="smallValue" 
        type="single"
        size="sm"
        variant="outline"
      >
        <ToggleGroupItem value="1">1</ToggleGroupItem>
        <ToggleGroupItem value="2">2</ToggleGroupItem>
        <ToggleGroupItem value="3">3</ToggleGroupItem>
      </ToggleGroup>
    </div>

    <!-- Large Size -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium">Large Size</h3>
      <ToggleGroup 
        v-model="largeValue" 
        type="single"
        size="lg"
        variant="default"
      >
        <ToggleGroupItem value="view1">
          <GridIcon class="h-4 w-4" />
          Grid View
        </ToggleGroupItem>
        <ToggleGroupItem value="view2">
          <ListIcon class="h-4 w-4" />
          List View
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const singleValue = ref('center')
const multipleValues = ref(['bold', 'italic'])
const smallValue = ref('2')
const largeValue = ref('view1')

// You would import your icon components here
// import AlignLeftIcon from './icons/AlignLeftIcon.vue'
// import AlignCenterIcon from './icons/AlignCenterIcon.vue'
// etc.
</script>
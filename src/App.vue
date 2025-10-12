<template>
  <div id="app">
    <router-view />
    <Toaster />
  </div>
</template>

<script>
import Toaster from './components/ui/toast/Toaster.vue'

export default {
  name: 'App',
  components: {
    Toaster
  }
}
</script>
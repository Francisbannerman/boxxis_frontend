import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      // Vue equivalent libraries where applicable
      'vue-sonner@1.2.1': 'vue-sonner',
      'vue-chartjs@5.3.1': 'vue-chartjs', // Vue equivalent of recharts
      'chart.js@4.4.4': 'chart.js',
      'vee-validate@4.13.2': 'vee-validate', // Vue equivalent of react-hook-form
      '@vueuse/core@11.1.0': '@vueuse/core',
      '@vueuse/components@11.1.0': '@vueuse/components',
      'lucide-vue-next@0.487.0': 'lucide-vue-next', // Vue equivalent of lucide-react
      'vue-input-otp@1.0.3': 'vue-input-otp', // Vue equivalent of input-otp
      'embla-carousel-vue@8.6.0': 'embla-carousel-vue', // Vue equivalent
      'cmdk-vue@0.0.26': 'cmdk-vue', // Vue equivalent of cmdk
      'class-variance-authority@0.7.1': 'class-variance-authority',
      
      // Radix UI Vue equivalents (using Radix Vue)
      'radix-vue@1.9.8': 'radix-vue',
      '@radix-vue/tooltip@1.9.8': '@radix-vue/tooltip',
      '@radix-vue/toggle@1.9.8': '@radix-vue/toggle',
      '@radix-vue/toggle-group@1.9.8': '@radix-vue/toggle-group',
      '@radix-vue/tabs@1.9.8': '@radix-vue/tabs',
      '@radix-vue/switch@1.9.8': '@radix-vue/switch',
      '@radix-vue/slot@1.9.8': '@radix-vue/slot',
      '@radix-vue/slider@1.9.8': '@radix-vue/slider',
      '@radix-vue/separator@1.9.8': '@radix-vue/separator',
      '@radix-vue/select@1.9.8': '@radix-vue/select',
      '@radix-vue/scroll-area@1.9.8': '@radix-vue/scroll-area',
      '@radix-vue/radio-group@1.9.8': '@radix-vue/radio-group',
      '@radix-vue/progress@1.9.8': '@radix-vue/progress',
      '@radix-vue/popover@1.9.8': '@radix-vue/popover',
      '@radix-vue/navigation-menu@1.9.8': '@radix-vue/navigation-menu',
      '@radix-vue/menubar@1.9.8': '@radix-vue/menubar',
      '@radix-vue/label@1.9.8': '@radix-vue/label',
      '@radix-vue/hover-card@1.9.8': '@radix-vue/hover-card',
      '@radix-vue/dropdown-menu@1.9.8': '@radix-vue/dropdown-menu',
      '@radix-vue/dialog@1.9.8': '@radix-vue/dialog',
      '@radix-vue/context-menu@1.9.8': '@radix-vue/context-menu',
      '@radix-vue/collapsible@1.9.8': '@radix-vue/collapsible',
      '@radix-vue/checkbox@1.9.8': '@radix-vue/checkbox',
      '@radix-vue/avatar@1.9.8': '@radix-vue/avatar',
      '@radix-vue/aspect-ratio@1.9.8': '@radix-vue/aspect-ratio',
      '@radix-vue/alert-dialog@1.9.8': '@radix-vue/alert-dialog',
      '@radix-vue/accordion@1.9.8': '@radix-vue/accordion',
      
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true,
  },
});
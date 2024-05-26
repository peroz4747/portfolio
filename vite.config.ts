import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import stringPlugin from 'vite-plugin-string'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    stringPlugin({
      include: '**/*.html',
      exclude: ['index.html', 'src/components/desktop/apps/stores/emails/Welcome.html'] // Exclude specific files
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['geojson'] // Mark geojson as external
    }
  }
})

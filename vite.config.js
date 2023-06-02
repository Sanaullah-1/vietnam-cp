import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    disableOptimizations: true,
  },
  css: {

    preprocessorOptions: {
      scss: {
        additionalData: `  @import "src/styles/variables.scss";
          @import "src/styles/mixins.scss";`
      }
    }
  },
  build: {
    outDir: 'build'
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Commented commonjsoptions because they don't work well with mantine and vite
export default defineConfig({
  plugins: [react()],
  build: {
    // commonjsOptions: {
    //   include: [],
    //   transformMixedEsModules: true
    // }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    }
  }
})
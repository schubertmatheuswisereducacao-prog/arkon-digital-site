import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        checkout: resolve(__dirname, 'checkout/index.html'),
        thankyou: resolve(__dirname, 'thank-you/index.html'),
        freedemo: resolve(__dirname, 'free-demo/index.html'),
      },
    },
  },
  server: {
    open: true,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@components': path.resolve(__dirname, './src/components'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@hotspots': path.resolve(__dirname, './src/components/hotspots'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@overlays': path.resolve(__dirname, './src/components/overlays'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    }
  },
  plugins: [
    react(),
    removeConsole()
  ],
  build: {
    minify: 'esbuild',
  },
  base: './',
  server: {
    open: true,
  }
})

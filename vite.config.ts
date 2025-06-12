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
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@hotspots': path.resolve(__dirname, './src/features/scene'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@overlays': path.resolve(__dirname, './src/features/overlays'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@tour': path.resolve(__dirname, './src/features/tour'),
      '@types': path.resolve(__dirname, './src/types'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@utils': path.resolve(__dirname, './src/utils'),
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'pdf': ['jspdf']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['jspdf', 'react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react']
  }
});
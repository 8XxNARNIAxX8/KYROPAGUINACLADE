import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8090', changeOrigin: true },
      '/salud': { target: 'http://localhost:8090', changeOrigin: true },
      '/proyectos': { target: 'http://localhost:8090', changeOrigin: true },
      '/nexus': { target: 'http://localhost:8090', changeOrigin: true },
      '/conocimiento': { target: 'http://localhost:8090', changeOrigin: true },
      '/contenido': { target: 'http://localhost:8090', changeOrigin: true },
      '/relaciones': { target: 'http://localhost:8090', changeOrigin: true },
      '/viajes': { target: 'http://localhost:8090', changeOrigin: true },
      '/fe': { target: 'http://localhost:8090', changeOrigin: true },
      '/finanzas': { target: 'http://localhost:8090', changeOrigin: true },
      '/sistema': { target: 'http://localhost:8090', changeOrigin: true },
    },
  },
});

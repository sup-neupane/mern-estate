import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server address
        secure: false, // Disable SSL verification for development
        changeOrigin: true, // Needed for virtual hosted sites
      },
    },
  },
  plugins: [react()],
});

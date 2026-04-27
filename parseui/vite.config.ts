import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    server: {
        port: 8080,
        proxy: {      
            '/api': {
                target: 'https://localhost:7164/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
    resolve: {
        alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@api': path.resolve(__dirname, './src/api'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@constants': path.resolve(__dirname, './src/constants'),
        },
    },   
})

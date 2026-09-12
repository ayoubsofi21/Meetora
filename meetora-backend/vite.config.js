import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    // server: {
    //     watch: {
    //         ignored: ['**/storage/framework/views/**'],
    //     },
    // },
    server: {
        host: '0.0.0.0',
        allowedHosts: [
        'meetora-frontend.onrender.com',
        ],
  },
});

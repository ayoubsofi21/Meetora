// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.js'],
//             refresh: true,
//         }),
//         tailwindcss(),
//     ],
//     server: {
//         watch: {
//             ignored: ['**/storage/framework/views/**'],
//         },
//     },
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',

    allowedHosts: [
      'meetora-frontend.onrender.com',
      'meetora.tech',
      'www.meetora.tech',
    ],
  },

  preview: {
    host: '0.0.0.0',

    allowedHosts: [
      'meetora-frontend.onrender.com',
      'meetora.tech',
      'www.meetora.tech',
    ],
  },
})
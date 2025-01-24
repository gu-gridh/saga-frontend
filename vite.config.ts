import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'src/assets/server.key'), 'utf-8'), // Private key path
//       cert: fs.readFileSync(path.resolve(__dirname, 'src/assets/server.crt'), 'utf-8'), // Certificate path
//     },
//     port: 3000,          // Specify your preferred port
//     host: 'localhost',   // Specify the host (default is localhost)
//     open: true,          // Automatically open in the browser
//     proxy: {
//         '/api': {
//             target: 'https://saga.dh.gu.se/', // Your backend server
//             changeOrigin: true,
//             secure: false, // Set to true if your backend server uses a valid SSL certificate
//         },
//     },
// },
})

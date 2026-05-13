import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devApiProxyTarget = env.VITE_DEV_API_PROXY_TARGET || 'http://localhost:3000'

  return {
    test: {
      environment: 'node',
      globals: true,
      coverage: {
        provider: 'v8',
        include: ['src/lib/worldcup/**'],
      },
    },
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Oráculo Mundial',
          short_name: 'OráculoMundial',
          description: 'No solo predices el Mundial. Lo juegas contra tu gente.',
          theme_color: '#081425',
          background_color: '#081425',
          display: 'standalone',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
      }),
    ],
    server: {
      proxy: {
        '/api': devApiProxyTarget,
      },
    },
  }
})

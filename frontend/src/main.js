import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (publishableKey) {
  app.use(clerkPlugin, { publishableKey })
} else if (import.meta.env.DEV) {
  console.info('[El Oraculo Mundial] Clerk desactivado en demo local: falta VITE_CLERK_PUBLISHABLE_KEY.')
}

app.use(router)
app.mount('#app')

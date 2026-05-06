import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const { isSignedIn } = useAuth()
    if (!isSignedIn.value) return '/'
  }
})

export default router

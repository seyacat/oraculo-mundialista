import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
import HomeView from '../views/HomeView.vue'
import CreateCommunityView from '../views/CreateCommunityView.vue'
import CommunityView from '../views/CommunityView.vue'
import JoinCommunityView from '../views/JoinCommunityView.vue'
import PredictionsView from '../views/PredictionsView.vue'
import RankingView from '../views/RankingView.vue'
import ShameView from '../views/ShameView.vue'
import PowersView from '../views/PowersView.vue'
import GroupStageView from '../views/GroupStageView.vue'
import ShareMomentView from '../views/ShareMomentView.vue'
import SsoCallbackView from '../views/SsoCallbackView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/sso-callback', component: SsoCallbackView },
  { path: '/crear', component: CreateCommunityView, meta: { requiresAuth: true } },
  { path: '/p/:slug', component: CommunityView, meta: { requiresAuth: true } },
  { path: '/p/:slug/unirse', component: JoinCommunityView },
  { path: '/p/:slug/fase-grupos', component: GroupStageView, meta: { requiresAuth: true } },
  { path: '/p/:slug/predicciones', component: PredictionsView, meta: { requiresAuth: true } },
  { path: '/p/:slug/ranking', component: RankingView, meta: { requiresAuth: true } },
  { path: '/p/:slug/verguenza', component: ShameView, meta: { requiresAuth: true } },
  { path: '/p/:slug/poderes', component: PowersView, meta: { requiresAuth: true } },
  { path: '/p/:slug/momento/:momentId', component: ShareMomentView, meta: { requiresAuth: true } },
  { path: '/dashboard', redirect: '/p/la-banda-del-mundial' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true
  const { isSignedIn } = useAuth()
  if (!isSignedIn.value) {
    return { path: '/' }
  }
  return true
})

export default router

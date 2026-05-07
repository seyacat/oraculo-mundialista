import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateCommunityView from '../views/CreateCommunityView.vue'
import CommunityView from '../views/CommunityView.vue'
import JoinCommunityView from '../views/JoinCommunityView.vue'
import PredictionsView from '../views/PredictionsView.vue'
import RankingView from '../views/RankingView.vue'
import ShameView from '../views/ShameView.vue'
import PowersView from '../views/PowersView.vue'
import ShareMomentView from '../views/ShareMomentView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/crear', component: CreateCommunityView },
  { path: '/p/:slug', component: CommunityView },
  { path: '/p/:slug/unirse', component: JoinCommunityView },
  { path: '/p/:slug/predicciones', component: PredictionsView },
  { path: '/p/:slug/ranking', component: RankingView },
  { path: '/p/:slug/verguenza', component: ShameView },
  { path: '/p/:slug/poderes', component: PowersView },
  { path: '/p/:slug/momento/:momentId', component: ShareMomentView },
  { path: '/dashboard', redirect: '/p/la-banda-del-mundial' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

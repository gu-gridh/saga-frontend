import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tidslinje',
      name: 'timeline',
      component: () => import('../components/Timeline.vue'),
    },
    {
      path: '/publikationer',
      name: 'publications',
      component: () => import('../components/ProductionsView.vue'),
    },
    {
      path: '/publikation/:id',
      name: 'publikation', 
      component: () => import('../components/Publication.vue'),
    },
    {
      path: '/serie/:id',
      name: 'serie',
      component: () => import('../views/SerieView.vue'),
    },
    {
      path: '/case',
      name: 'case',
      component: () => import('../views/CaseView.vue'),
    },
    {
      path: '/brev',
      name: 'brev',
      component: () => import('../views/LettersView.vue'),
    }
  ],
})

export default router

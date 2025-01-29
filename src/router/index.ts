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
      component: () => import('../views/ProductionsView.vue'),
    },
    {
      path: '/publikation/:id',
      name: 'publikation', 
      component: () => import('../components/Publication.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
  },
  {
    path: '/show/:id',
    name: 'show-detail',
    component: () => import('../views/ShowDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

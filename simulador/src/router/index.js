import { createRouter, createWebHistory } from 'vue-router'
import SimuladorView from '../views/SimuladorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'simulador',
      component: SimuladorView,
    },
    
  ],
})

export default router

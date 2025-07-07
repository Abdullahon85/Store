import { createRouter, createWebHistory } from 'vue-router'

import Products from '@/views/Products.vue'
import Checkout from '@/views/Checkout.vue'
import CartPage from '@/views/CartPage.vue'
const routes = [
  { path: '/', component: Products },
  { path: '/checkout', component: Checkout },
  { path: '/cart', component: CartPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import Products from '@/views/Products.vue'
import Checkout from '@/views/Checkout.vue'
import CartPage from '@/views/CartPage.vue'
import Admin from '@/admin/views/Admin.vue'
const routes = [
  { path: '/', component: Products },
  { path: '/checkout', component: Checkout },
  { path: '/cart', component: CartPage },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Payrolls from '../views/Payrolls.vue'
import Account from '@/modules/account/views/Account.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Payrolls',
    component: Payrolls,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // scroll to top when navigating to a new route
    return { top: 0 }
  }
})

export default router

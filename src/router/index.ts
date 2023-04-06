import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

// lazy load: dynamically load component when its needed, which will generate a chunk file
const Home = () => import('@/views/Home.vue')
const Account = () => import('@/modules/views/Account.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
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
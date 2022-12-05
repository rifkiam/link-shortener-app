import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import AddLink from '../views/AddLink.vue'
import Redirect from '../views/Redirect.vue'
import NotFound from '../views/NotFound.vue'
import LogOut from '../views/LogOut.vue'
import Update from '../views/Update.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/create',
      component: AddLink
    },
    {
      path: '/update/:uid',
      name: 'update',
      component: Update
    },
    {
      path: '/:customPath',
      name: 'customPath',
      component: Redirect
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound
    },
    {
      path: "/logout",
      name: "logout",
      component: LogOut
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

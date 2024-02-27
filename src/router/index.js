import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      /* { path: 'home', name: 'home', component: Home },
      { path: 'user', name: 'user', component: User },
      { path: 'main', name: 'main', component: () => import('@/views/Main.vue') },
      { path: 'mall', name: 'mall', component: () => import('@/views/Mall.vue') },
      { path: 'page1', name: 'page1', component: () => import('@/views/PageOne.vue') },
      { path: 'page2', name: 'page2', component: () => import('@/views/PageTwo.vue') }, */

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name == 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

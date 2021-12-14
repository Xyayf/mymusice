import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Index from '@/views/Index.vue'
import Transitiondetail from '@/views/Transition_detail.vue'
import Transition from '@/views/Transition.vue'
import Playmusic from '@/views/Playmusic.vue'
import Search from '@/views/Search.vue'
import Singer from '@/views/Singer.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index/:id',
    name: 'Index',
    component: Index
  },
  {
    path: '/transition_detail',
    name: 'Transition_detail',
    component: Transitiondetail
  },
  {
    path: '/transition',
    name: 'Transiton',
    component: Transition
  },
  {
    path: '/playmusic',
    name: 'Playmusic',
    component: Playmusic
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  }

]
const router = new VueRouter({
  routes
})

export default router

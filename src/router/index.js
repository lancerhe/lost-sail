import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    meta: { keepAlive: true },
    component: (resolve) => require(['../views/index.vue'], resolve)
  },
  {
    path: '/detail',
    name: 'detail',
    meta: { keepAlive: false },
    component: (resolve) => require(['../views/detail.vue'], resolve)
  },
  {
    path: '/view',
    name: 'view',
    meta: { keepAlive: false },
    component: (resolve) => require(['../views/view.vue'], resolve)
  },
  {
    path: '/hitter',
    name: 'hitter',
    meta: { keepAlive: false },
    component: (resolve) => require(['../views/hitter.vue'], resolve)
  },
  {
    path: '/reward',
    name: 'reward',
    meta: { keepAlive: false },
    component: (resolve) => require(['../views/reward.vue'], resolve)
  },
  {
    path: '**',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router

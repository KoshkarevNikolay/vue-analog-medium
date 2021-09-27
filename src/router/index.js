import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/posts',
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'login' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/posts',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/posts/new',
    name: 'postnew',
    meta: {
      layout: 'main',
      isWriter: true,
    },
    component: () => import('../views/PostNew.vue'),
  },
  {
    path: '/posts/:id',
    name: 'post',
    meta: { layout: 'main' },
    component: () => import('../views/Post.vue'),
  },
  {
    path: '/posts/:id/edit',
    name: 'postedit',
    meta: {
      layout: 'main',
      isWriter: true,
    },
    component: () => import('../views/PostEdit.vue'),
  },
  {
    path: '*',
    name: 'notfound',
    meta: {
      layout: 'main',
    },
    component: () => import('../views/NotPage.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.isWriter
  const requireWriter = to.matched.some((r) => r.meta.isWriter)

  if (requireWriter && !currentUser) {
    next('/posts')
  } else {
    next()
  }
})

export default router

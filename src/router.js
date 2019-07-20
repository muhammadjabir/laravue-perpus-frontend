import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)
const router =new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {auth : true}
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {auth : true}
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ './views/Users.vue'),
      meta: {
        auth : true,
        admin : true
      }
    },

    {
      path: '/anggota',
      name: 'anggota',
      component: () => import(/* webpackChunkName: "about" */ './views/Anggota.vue'),
      meta: {auth : true}
    },
    {
      path: '/books',
      name: 'books',
      component: () => import( './views/Books.vue'),
      meta: {auth : true}
    },
    {
      path: '/peminjaman',
      name: 'peminjaman',
      component: () => import( './views/Peminjaman.vue'),
      meta: {auth : true}
    },
    {
      path: '/input-peminjaman',
      name: 'inputPeminjaman',
      component: () => import( './views/inputPeminjaman.vue'),
      meta: {auth : true}
    },

    {
      path: '/login',
      name: 'login',
      component: () => import( './views/Login.vue')
    },

    {
      path: '*',
      redirect: {
        name: 'home'
      }
    },

  ]
})

router.beforeEach((to,from,next)=>{
  if (to.matched.some(record=> record.meta.auth)) {
    if (store.getters['auth/guest']) {
      next({
        name:'login'
      })
    }
    else{
      next()
    }
  }
  else{
    next()
  }

  if (to.matched.some(record=> record.meta.admin)) {
    if (store.getters['auth/role']) {
      next({
        name:'home'
      })
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
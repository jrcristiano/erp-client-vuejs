import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import ProductRoutes from './modules/products/routes/product.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'nav-link-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ProductRoutes
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

import CoreRoutes from './modules/core/core-router.js'
import HomeRoutes from './modules/home/home-router.js'
import ProductRoutes from './modules/products/product-router.js'
import CategoryRoutes from './modules/categories/category-router.js'
import ClientRoutes from './modules/clients/client-router.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'nav-link-active',
  routes: [
    CoreRoutes,
    HomeRoutes,
    ProductRoutes,
    CategoryRoutes,
    ClientRoutes,
  ]
})

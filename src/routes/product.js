export default {
  path: '/produtos',
  component: () => import('../views/registers/Product.vue'),
  children: [
    {
      path: '',
      name: 'product-list',
      component: () => import('../components/registers/products/ProductList.vue')
    },
    {
      path: 'novo',
      name: 'product-create',
      component: () => import('../components/registers/products/ProductCreate.vue')
    },
    {
      path: ':id',
      name: 'product-view',
      component: () => import('../components/registers/products/ProductView.vue')
    }
  ]
}
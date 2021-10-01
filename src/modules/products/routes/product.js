export default {
  path: '/produtos',
  component: () => import('../views/registers/Product.vue'),
  children: [
    {
      path: '',
      name: 'product-list',
      component: () => import('../components/ProductList.vue')
    },
    {
      path: 'novo',
      name: 'product-create',
      component: () => import('../components/ProductCreate.vue')
    },
    {
      path: ':id',
      name: 'product-view',
      component: () => import('../components/ProductView.vue')
    }
  ]
}
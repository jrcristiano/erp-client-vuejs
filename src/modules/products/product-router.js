export default {
  path: '/produtos',
  component: () => import('@/modules/products/views/Product'),
  children: [
    {
      path: '',
      name: 'product-list',
      component: () => import('@/modules/products/components/ProductList')
    },
    {
      path: 'novo',
      name: 'product-create',
      component: () => import('@/modules/products/components/ProductCreate')
    },
    {
      path: ':id',
      name: 'product-view',
      component: () => import('@/modules/products/components/ProductView')
    },
    {
      path: 'editar/:id',
      name: 'product-edit',
      component: () => import('@/modules/products/components/ProductEdit')
    }
  ]
}
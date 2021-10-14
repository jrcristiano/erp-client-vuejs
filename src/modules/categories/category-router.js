export default {
  path: '/categories',
  component: () => import('@/modules/categories/views/Category'),
  children: [
    {
      path: '',
      name: 'category-list',
      component: () => import('@/modules/categories/components/CategoryList')
    },
    {
      path: 'novo',
      name: 'category-create',
      component: () => import('@/modules/categories/components/CategoryCreate')
    },
    {
      path: ':id',
      name: 'category-view',
      component: () => import('@/modules/categories/components/CategoryView')
    }
  ]
}
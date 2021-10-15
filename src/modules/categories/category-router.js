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
      path: 'editar/:id',
      name: 'category-edit',
      component: () => import('@/modules/categories/components/CategoryEdit')
    }
  ]
}
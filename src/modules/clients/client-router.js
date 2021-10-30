export default {
    path: '/clientes',
    component: () => import('@/modules/clients/views/Client'),
    children: [
        {
            path: '',
            name: 'client-list',
            component: () => import('@/modules/clients/components/ClientList')
        },
        {
            path: 'novo',
            name: 'client-create',
            component: () => import('@/modules/clients/components/ClientCreate')
        }
    ]
}
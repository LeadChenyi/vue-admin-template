import Layout from '@/layout/index';
export default [
    {
        path: '/user',
        name: 'User',
        component: Layout,
        meta: {
            title: '用户管理',
            icon: 'el-icon-menu'
        },
        redirect: '/user/list',
        children: [
            {
                path: '/user/list',
                name: 'UserList',
                component: () => import('@/pages/user/list'),
                meta: {
                    title: '成员管理'
                }
            },
            {
                path: '/user/role',
                name: 'UserRole',
                component: () => import('@/pages/user/role'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: '/user/menu',
                name: 'UserMenu',
                component: () => import('@/pages/user/menu'),
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: '/user/bill',
                name: 'UserBill',
                component: () => import('@/pages/user/bill'),
                meta: {
                    title: '账单管理'
                }
            }
        ]
    }
]
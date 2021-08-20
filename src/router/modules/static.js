import Layout from '@/layout/index';
export default [
    {
        path: '/static',
        name: 'Static',
        component: Layout,
        meta: {
            title: '静态路由',
            icon: 'el-icon-menu',
            hidden: false,
            inherit: false,
        },
        redirect: '/inner',
        children: [
            {
                path: '/inner',
                name: 'Inner',
                component: () => import('@/pages/static/inner'),
                meta: {
                    title: '打开内页'
                }
            }
        ]
    },
    {
        path: '/outer',
        name: 'Outer',
        component: () => import('@/pages/static/outer'),
        meta: {
            title: '打开外页',
            icon: 'el-icon-menu'
        },
    }
]
import Layout from '@/layout/index';
export default [
    {
        path: '/unit',
        name: 'Unit',
        component: Layout,
        meta: {
            title: '组件管理',
            icon: 'el-icon-menu'
        },
        redirect: '/copy',
        children: [
            {
                path: '/copy',
                name: 'Copy',
                component: () => import('@/pages/unit/copy'),
                meta: {
                    title: '复制剪切板'
                }
            },
            {
                path: '/sort',
                name: 'Sort',
                component: () => import('@/pages/unit/sort'),
                meta: {
                    title: '元素排序'
                }
            },
            {
                path: '/print',
                name: 'Print',
                component: () => import('@/pages/unit/print'),
                meta: {
                    title: '指定打印元素'
                }
            },
            {
                path: '/form',
                name: 'Form',
                component: () => import('@/pages/unit/form'),
                meta: {
                    title: '表单验证'
                }
            }
        ]
    }
]
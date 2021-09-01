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
        redirect: '/env',
        children: [
            {
                path: '/env',
                name: 'Env',
                component: () => import('@/pages/unit/env'),
                meta: {
                    title: '环境变量'
                }
            },
            {
                path: '/copy',
                name: 'Copy',
                component: () => import('@/pages/unit/copy'),
                meta: {
                    title: '复制到剪切板'
                }
            },
            {
                path: '/sort',
                name: 'Sort',
                component: () => import('@/pages/unit/sort'),
                meta: {
                    title: '元素拖动排序'
                }
            },
            {
                path: '/print',
                name: 'Print',
                component: () => import('@/pages/unit/print'),
                meta: {
                    title: '打印指定元素'
                }
            },
            {
                path: '/form',
                name: 'Form',
                component: () => import('@/pages/unit/form'),
                meta: {
                    title: '表单控件'
                }
            },
            {
                path: '/rule',
                name: 'Rule',
                component: () => import('@/pages/unit/rule'),
                meta: {
                    title: '表单验证'
                }
            },
            {
                path: '/editor',
                name: 'Editor',
                component: () => import('@/pages/unit/editor'),
                meta: {
                    title: '富文本编辑器'
                }
            },
            {
                path: '/list',
                name: 'List',
                component: () => import('@/pages/unit/list'),
                meta: {
                    title: '数据列表'
                }
            },
            {
                path: '/chart',
                name: 'Chart',
                component: () => import('@/pages/unit/chart'),
                meta: {
                    title: '数据图表'
                }
            },
            {
                path: '/excel',
                name: 'Excel',
                component: () => import('@/pages/unit/excel'),
                meta: {
                    title: '数据导入导出'
                }
            }
        ]
    },
    {
        path: '/outside',
        name: 'Outside',
        component: () => import('@/pages/outside'),
        meta: {
            title: '布局外单页',
            icon: 'el-icon-menu'
        },
    }
]
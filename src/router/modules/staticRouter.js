import Layout from '@/layout/index';
export default [
    {
        path: '/',
        name: 'Index',
        component: Layout,
        meta: {
            title: '主页',
            icon: 'el-icon-menu',
            hidden: false,      // 是否隐藏路由    
            inherit: true,      // 是否继承路由（只有一个子路由时将视为主目录）
            hiddenTag: false,
            hiddenSidebar: false
        },
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/pages/dashboard'),
                meta: {
                    title: '仪表盘',
                    icon: 'el-icon-menu'
                }
            }
        ]
    },
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
        path: '/403',
        name: 'NotPower',
        component: () => import('@/pages/403'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('@/pages/404'),
        meta: {
            hidden: true
        }
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
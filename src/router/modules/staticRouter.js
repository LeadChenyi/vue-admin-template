import Layout from '@/layout/index';
export default [
    {
        path: '/',
        name: 'Index',
        component: Layout,
        meta: {
            title: '主页',          // 目录或菜单标题
            icon: 'el-icon-menu',   // 目录或菜单图标
            code: 'index',          // 根目录或主菜单字符表示
            sort: 100,              // 根目录或主菜单排序（权重越高越靠前）
            hidden: false,          // 是否隐藏目录或菜单
            flat: true,             // 是否扁平化目录（当前目录只有一个子菜单时生效）
            excludeTag: false,      // 是否排除该标签（默认false，即打开的路由自动加入到标签组）
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
            icon: 'el-icon-menu',
            sort: 0
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
                path: '/excel',
                name: 'Excel',
                component: () => import('@/pages/unit/excel'),
                meta: {
                    title: '导入导出'
                }
            },
            {
                path: '/chart',
                name: 'Chart',
                component: () => import('@/pages/unit/chart'),
                meta: {
                    title: '图表'
                }
            },
            {
                path: '/map',
                name: 'Map',
                component: () => import('@/pages/unit/map'),
                meta: {
                    title: '地图'
                }
            },

            {
                path: '/custom',
                name: 'Custom',
                component: () => import('@/pages/unit/custom'),
                meta: {
                    title: '自定义组件'
                }
            }
        ]
    },
    {
        path: '/outside',
        name: 'Outside',
        component: () => import('@/pages/outside'),
        meta: {
            title: '布局外置单页',
            icon: 'el-icon-menu',
            sort: 0
        },
    },
    {
        path: '/builtin',
        name: 'Builtin',
        component: Layout,
        meta: {
            title: '布局内置路由组',
            hidden: true,
            excludeTag: true,
            sort: 0
        },
        children: [
            {
                path: '/403',
                name: 'NotPower',
                component: () => import('@/pages/403'),
                meta: {
                    hidden: true,
                    excludeTag: true
                }
            },
            {
                path: '/404',
                name: 'NotFound',
                component: () => import('@/pages/404'),
                meta: {
                    hidden: true,
                    excludeTag: true
                }
            }
        ]
    }
]
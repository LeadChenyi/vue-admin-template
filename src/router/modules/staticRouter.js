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
                path: '/print',
                name: 'Print',
                component: () => import('@/pages/unit/print'),
                meta: {
                    title: '打印指定元素'
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
                path: '/upload',
                name: 'Upload',
                component: () => import('@/pages/unit/upload'),
                meta: {
                    title: '上传文件'
                }
            },
            {
                path: '/download',
                name: 'Download',
                component: () => import('@/pages/unit/download'),
                meta: {
                    title: '下载文件'
                }
            },
            {
                path: '/excel',
                name: 'Excel',
                component: () => import('@/pages/unit/excel'),
                meta: {
                    title: '导入导出数据'
                }
            },
            {
                path: '/cropper',
                name: 'Cropper',
                component: () => import('@/pages/unit/cropper'),
                meta: {
                    title: '图片裁剪'
                }
            },
            {
                path: '/swiper',
                name: 'Swiper',
                component: () => import('@/pages/unit/swiper'),
                meta: {
                    title: '幻灯片'
                }
            },
            {
                path: '/scrollView',
                name: 'ScrollView',
                component: () => import('@/pages/unit/scrollView'),
                meta: {
                    title: '滚动容器'
                }
            },
            {
                path: '/qrcode',
                name: 'QRCode',
                component: () => import('@/pages/unit/qrcode'),
                meta: {
                    title: '二维码'
                }
            }, {
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
                path: '/editor',
                name: 'Editor',
                component: () => import('@/pages/unit/editor'),
                meta: {
                    title: 'Editor'
                }
            },
            {
                path: '/markdown',
                name: 'Markdown',
                component: () => import('@/pages/unit/markdown'),
                meta: {
                    title: 'Markdown'
                }
            },
            {
                path: '/custom',
                name: 'Custom',
                component: () => import('@/pages/unit/custom'),
                meta: {
                    title: '自定义组件'
                }
            },
            {
                path: '/chatroom',
                name: 'Chatroom',
                component: () => import('@/pages/unit/chatroom'),
                meta: {
                    title: '聊天室'
                }
            }
        ]
    },
    {
        path: '/external',
        name: 'External',
        component: () => import('@/pages/external'),
        meta: {
            title: '布局外的单页',
            icon: 'el-icon-menu',
            sort: 0
        },
    },
    {   // 布局内的路由组且不显示在菜单栏上
        path: '/builtin',
        name: 'Builtin',
        component: Layout,
        meta: {
            title: '',
            hidden: true,
            excludeTag: true,
            sort: 0
        },
        children: [
            {
                path: '/center',
                name: 'Center',
                component: () => import('@/pages/center'),
                meta: {
                    title: '个人中心',
                    hidden: true
                }
            },
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
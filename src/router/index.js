import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout/index';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

let baseRouters = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login')
    },
    {
        path: '/',
        name: 'Index',
        component: Layout,
        meta: {
            title: '主页',
            icon: 'el-icon-menu',
            hidden: false,   // 是否隐藏路由    
            inherit: true,  // 是否继承路由（当子路由只有一个元素时，当前路由不展示）
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
        path: '/config',
        name: 'Config',
        component: Layout,
        meta: {
            title: '配置管理',
            icon: 'el-icon-menu',
            hidden: false,
            inherit: false,
        },
        redirect: '/env',
        children: [
            {
                path: '/env',
                name: 'Env',
                component: () => import('@/pages/config/env'),
                meta: {
                    title: '环境变量'
                }
            }
        ]
    },
    {
        path: '/mange',
        name: 'Mange',
        component: Layout,
        meta: {
            title: '用户管理',
            icon: 'el-icon-menu'
        },
        redirect: '/mange',
        children: [
            {
                path: '/robot',
                name: 'Robot',
                component: () => import('@/pages/mange/robot'),
                meta: {
                    title: '机器人'
                }
            },
            {
                path: '/user',
                name: 'User',
                component: () => import('@/pages/mange/user'),
                meta: {
                    title: '用户中心'
                }
            }
        ]
    },
    {
        path: '/order',
        name: 'Order',
        component: Layout,
        meta: {
            title: '订单管理',
            icon: 'el-icon-menu'
        },
        redirect: '/thing',
        children: [
            {
                path: '/thing',
                name: 'Thing',
                component: () => import('@/pages/order/thing'),
                meta: {
                    title: '好物订单'
                }
            },
            {
                path: '/rush',
                name: 'Rush',
                component: () => import('@/pages/order/rush'),
                meta: {
                    title: '抢购订单'
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'System',
        component: Layout,
        meta: {
            title: '系统',
            icon: 'el-icon-menu'
        },
        children: [
            {
                path: '/404',
                name: 'NotFound',
                component: () => import('@/pages/404')
            }
        ]
    }
];
// 自动化注入路由
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach((item) => {
    baseRouters = [...baseRouters, ...files(item).default];
});
baseRouters.push({
    path: '/*',
    redirect: { name: 'Index' }
});
const router = new VueRouter({
    mode: 'history',
    routes: baseRouters
});
export default router;
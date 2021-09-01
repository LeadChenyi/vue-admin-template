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
            hidden: false,      // 是否隐藏路由    
            inherit: true,      // 是否继承路由（只有一个子路由时将视为主目录）
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
            },
            {
                path: '/403',
                name: 'NotPower',
                component: () => import('@/pages/403')
            },
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
    redirect: { name: 'Dashboard' } // 默认页指向仪表盘，因为如果未登录的情况下是会重定向到登录页的
});
const router = new VueRouter({
    mode: 'history',
    routes: baseRouters
});
export default router;
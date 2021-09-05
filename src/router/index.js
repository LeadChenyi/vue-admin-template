import Vue from 'vue';
import VueRouter from 'vue-router';

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
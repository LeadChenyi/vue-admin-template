import router from "@/router/index.js";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Cookie from 'js-cookie';
router.beforeEach((to, from, next) => {
    NProgress.start();
    const isAuth = Cookie.get('token') && true
    if (isAuth) {
        if (to.path === '/login') {
            next({ name: 'Dashboard' })
        } else {
            next();
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ name: 'Login' });
        }
    }
})
router.afterEach(() => {
    NProgress.done();
})
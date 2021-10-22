import router from "@/router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Cookie from 'js-cookie';
import { Request } from '@/api/axios';
import { Message } from 'element-ui';
import Store from '@/store';
import StaticRouter from '@/router/modules/staticRouter.js';

// 注意 404 等系统页面需要添加到白名单上，因为只要跳转页面就会触发路由守卫，否则会进入死循环
router.beforeEach((to, from, next) => {
    NProgress.start();
    const isAuthorize = Cookie.get('webyi_jwt_token') ? true : false;
    // console.log('router beforeEach', isAuthorize, Store.state.app.routerPaths)
    if (isAuthorize) {
        // 已登录模式
        userNextTick(to, from, next);
    } else {
        // 游客模式
        visitorNextTick(to, from, next);
    }
})

router.afterEach(() => {
    NProgress.done();
})

async function userNextTick(to, from, next) {
    // 使用异步方式获取用户信息、动态路由、枚举数据后再放行拦截
    !Store.state.app.enums && await getPassport();
    !Store.state.app.enums && await getEnums();

    if (to.path === '/login') {
        next({ name: 'Dashboard' })
    } else {
        if (Store.state.app.routerPaths.includes(to.path)) {
            next();
        } else {
            // 因为只收集可访问的路由，所以暂时统一指向到404
            next({
                name: 'NotFound'
            })
        }
    }
}

function visitorNextTick(to, from, next) {
    if (to.path === '/login') {
        next()
    } else {
        next({ name: 'Login' });
    }
}

function setRouterPaths(routers) {
    for (let i = 0; i < routers.length; i++) {
        Store.dispatch("app/setRouterPaths", routers[i].path);
        if (routers[i].children) {
            setRouterPaths(routers[i].children);
        }
    }
}

function getPassport() {
    return Request({
        url: "/user/passport/auth",
    })
        .then((res) => {
            if (res.code != 200) {
                Message({
                    type: "error",
                    message: res.message,
                });
                return false;
            }

            const { routers, ...infos } = res.data;
            // 全路由
            const fullRouters = [...routers, ...StaticRouter]
            fullRouters.sort((a, b) => {
                return b.meta['sort'] - a.meta['sort']
            });
            Store.dispatch("app/setRouters", fullRouters);

            // 全路由路径
            setRouterPaths(fullRouters);

            // 用户信息
            Store.dispatch("app/setUserInfo", infos);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getEnums() {
    return Request({
        url: "/getEnums",
    })
        .then((res) => {
            if (res.code != 200) {
                Message({
                    type: "error",
                    message: res.message,
                });
                return false;
            }
            Store.dispatch("app/setEnums", res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}
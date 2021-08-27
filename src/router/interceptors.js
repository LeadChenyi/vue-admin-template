import router from "@/router/index.js";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Cookie from 'js-cookie';
import { Request } from '@/api/axios/index.js';
import { Message } from 'element-ui';
import Store from '@/store/index.js';
import RouterModulesUnit from '@/router/modules/unit.js';
import RouterModulesStatic from '@/router/modules/static.js';

// 注意 404 等页面需要添加到白名单上，因为只要跳转页面就会触发路由守卫，否则会进入死循环

router.beforeEach((to, from, next) => {
    NProgress.start();
    const isAuthorize = Cookie.get('authorize_access_token') ? true : false;
    // console.log('router beforeEach', Store.state.app.routerPaths)
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
    // 使用异步方式获取用户信息、动态路由数据后再放行路由拦截
    !Store.state.app.userInfo && await getUserInfo();
    !Store.state.app.routers && await getRouters();

    if (to.path === '/login') {
        next({ name: 'Dashboard' })
    } else {
        if (Store.state.app.routerPaths.includes(to.path)) {
            next();
        } else {
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

// 只有return Promise对象异步调用才是有效的，否则会影响执行顺序
function getUserInfo() {
    return Request({
        url: "/userInfo",
    })
        .then((res) => {
            if (res.code != 200) {
                Message({
                    type: "error",
                    message: res.message,
                });
                return false;
            }
            Store.dispatch("app/setUserInfo", res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getRouters() {
    return Request({
        url: "/routers",
    })
        .then(async (res) => {
            if (res.code != 200) {
                Message({
                    type: "error",
                    message: res.message,
                });
                return false;
            }

            // 动态路由与静态路由数据合并
            let fullRouters = [...res.data, ...RouterModulesUnit, ...RouterModulesStatic];

            if (Store.state.app.routerPaths.length <= 1) {
                getItemPath(fullRouters);
            }
            Store.dispatch("app/setRouters", fullRouters);
        })
        .catch((err) => {
            console.log(err);
        });
}

// 同步执行
function getItemPath(routers) {
    for (let i = 0; i < routers.length; i++) {
        Store.dispatch("app/setRouterPaths", routers[i].path);
        if (routers[i].children) {
            getItemPath(routers[i].children);
        }
    }
}
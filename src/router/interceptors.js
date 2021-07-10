import router from "@/router/index.js";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Cookie from 'js-cookie';
import Request from '@/api/axios/index.js';
import { Message } from 'element-ui';
import Store from '@/store/index.js';

let userPathWhiteList = ['/404'];

router.beforeEach((to, from, next) => {
    NProgress.start();
    const isAuthorize = Cookie.get('token') ? true : false;
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
    // 先确保用户信息、动态路由获取完毕后再放行
    !Store.state.app.userInfo && await getUserInfo();
    !Store.state.app.routers && await getRouters();
    console.log(userPathWhiteList);
    if (to.path === '/login') {
        next({ name: 'Dashboard' })
    } else if (!userPathWhiteList.includes(to.path)) {
        // 404 等页面需要添加到白名单上，因为只要跳转页面就会触发路由守卫
        next({
            name: 'NotFound'
        })
    } else {
        next();
    }
}

function visitorNextTick(to, from, next) {
    if (to.path === '/login') {
        next()
    } else {
        next({ name: 'Login' });
    }
}


function getUserInfo() {
    Request({
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
    Request({
        url: "/routers",
    })
        .then((res) => {
            if (res.code != 200) {
                Message({
                    type: "error",
                    message: res.message,
                });
                return false;
            }
            res.data.forEach(item => {
                userPathWhiteList.push(item.path);
                if (item.children) {
                    getItemPath(item.children);
                }
            })
            Store.dispatch("app/setRouters", res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getItemPath(routers) {
    routers.forEach(item => {
        userPathWhiteList.push(item.path);
        if (item.children) {
            getItemPath(item.children);
        }
    })
}
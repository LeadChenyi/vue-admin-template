import Axios from 'axios'
import Cookie from 'js-cookie'

// 请求拦截
Axios.interceptors.request.use(
    config => {
        // JTW规范请求头中添加令牌 Authorization: Bearer <token>
        config.headers['Authorization'] = `Bearer ${Cookie.get('webyi_jwt_token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截
Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // console.log(error)               // 浏览器错误信息
        // console.log(error.response)      // Axios响应信息
        // console.log(error.request)       // Axios请求信息
        return Promise.reject(error);
    }
);
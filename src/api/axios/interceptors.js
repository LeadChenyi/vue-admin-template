import Axios from 'axios'
import Cookie from 'js-cookie'

// 请求拦截
Axios.interceptors.request.use(
    config => {
        // 在每个请求的请求头中携带token
        config.headers['X-XSRF-TOKEN'] = Cookie.get('authorize_access_token');
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
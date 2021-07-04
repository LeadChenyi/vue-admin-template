import Axios from 'axios'
import { baseUrl } from '@/common/config.js'
import './interceptors'

const request = (options) => {
    return new Promise((resolve, reject) => {
        Axios({
            baseURL: options.baseURL || baseUrl,
            url: options.url,
            method: options.method || 'GET',
            data: options.data || {},
            headers: options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    })
}

export default {
    request,
    index: {
        getProjects() {
            return request({ url: '/index/projects' });
        }
    }
};
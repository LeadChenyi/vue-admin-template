import Axios from 'axios'
import { baseURL } from '@/common/config.js'
import './interceptors'
import { Message } from 'element-ui';

const Request = ({
    url,
    method = 'GET',
    data = {},
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
    },
    showError = true
}) => {
    return new Promise((resolve, reject) => {
        Axios({
            baseURL,
            url,
            method,
            data,
            headers
        }).then(res => {
            if (res.status == 200) {
                resolve(res.data);
            }

        }).catch(err => {
            if (showError) {
                Message({
                    type: 'error',
                    content: err
                })
            }
            reject(err);
        });
    })
}

// api manage document
export const api = {
    index: {
        getProjects() {
            return Request({ url: '/index/projects' });
        }
    }
};

export default Request;
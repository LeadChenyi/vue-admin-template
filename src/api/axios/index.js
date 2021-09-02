import Axios from 'axios'
import './interceptors'
import { Message } from 'element-ui';

const Request = ({
    url,
    method = 'GET',
    data = {},
    params = {},
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
    },
    responseType = 'json',
    showError = true
}) => {
    // if (method == 'POST' || method == 'PUT') {
    //     data = querystring.stringify(data);
    // }

    return new Promise((resolve, reject) => {
        Axios({
            baseURL: process.env.VUE_APP_BASE_URL,
            url,
            method,
            data,
            params,
            headers,
            responseType
        }).then(res => {
            if (res.status == 200) {
                resolve(res.data);
                return false;
            }

            reject(res.statusText || new Error('请求异常'));
        }).catch(err => {
            if (showError) {
                Message({
                    type: 'error',
                    content: JSON.stringify(err)
                })
            }
            reject(err);
        });
    })
}

function UploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);
    return Request({
        url: '/system/upload/file',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data;boundary=something'
        }
    })
}

function DownloadFile(url, params) {
    return Request({
        url,
        params,
        responseType: 'blob'
    })
}

export {
    Request,
    UploadFile,
    DownloadFile
}
export default Request
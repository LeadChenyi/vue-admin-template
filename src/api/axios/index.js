import Axios from 'axios'
import QS from 'qs'
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
    if (method == 'POST' || method == 'PUT') {
        data = QS.stringify(data);
    }

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
            if (res.status >= 200 && res.status <= 204) {
                resolve(res.data);
                return false;
            }

            if (showError) {
                Message.error(res.statusText || '网络请求异常')
            }
            reject(res.statusText || new Error('网络请求异常'));
        }).catch(err => {
            if (showError) {
                Message.error(err.response.data.message || err.response.statusText || '网络请求异常')
            }
            reject(err.response.data);
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
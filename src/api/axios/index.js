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
    if (!headers['Content-Type'].includes('multipart/form-data') && (method == 'POST' || method == 'PUT')) {
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
                console.log('请求响应：', res.data);
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


function UploadFile({
    url = '/uploadFileCloud',
    method = 'POST',
    data = {},
    headers = {
        'Content-Type': 'multipart/form-data'
    }
}) {
    // 上传文件的字段键名必须与后端的一致指定为 “file”
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }

    return Request({
        url,
        method,
        data: formData,
        headers
    })
}

function DownloadFile(data) {
    return Request({
        url: '/downloadFile',
        method: 'POST',
        data
    })
}

export {
    Request,
    UploadFile,
    DownloadFile
}
export default Request
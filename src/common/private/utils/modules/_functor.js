export default {
    each(list, callback) {
        if (list instanceof Array) {
            list.forEach(function (item, index) {
                callback && callback(item, index);
            })
        } else {
            //获取对象属性的值两种方式：1、对象.属性  2、对象["属性"] 或 对象[变量]
            for (let key in list) {
                callback && callback(list[key], key);
            }
        }
    },
    debounce(callback, delay = 1000) {// 防抖函数
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(callback, delay);
        }
    },
    throttle(callback, delay = 1000) {// 节流函数
        let timer = null;
        return function () {
            if (timer) {
                return;
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback && callback();
                timer = null;
            }, delay);
        }
    },
    ajax({
        method = 'get',
        url = '/'
    } = {}, success, fail) {// 请求函数
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = (res) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                success && success(res);
            } else {
                fail && fail(res);
            }
        }
        xhr.send();
    },
    ajaxPolling(
        {
            method = 'get',
            url = '/'
        } = {}, callback) {// 请求轮询（自调）
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = (res) => {
            callback && callback(res);
            this.ajaxPolling();
        }
        xhr.send();
    },
    ajaxPollingTimer(
        {
            method = 'get',
            url = '/'
        } = {}, callback, duration = 1500) {// 请求轮询（定时）
        let xhr = new XMLHttpRequest();
        setInterval(() => {
            xhr.open(method, url);
            xhr.onreadystatechange = (res) => {
                callback && callback(res);
            }
            xhr.send();
        }, duration);
    },
    setCookit(cookitKey, cookitVal, exdays) {
        let date = new Date();
        //失效时间 = 当前时间 + 有效期N天
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        //根据世界时把Date对象转换为字符串
        document.cookie = cookitKey + "=" + cookitVal + "; expires=" + date.toUTCString();
    },
    getCookit(cookieKey) {
        let key = cookieKey + "=";
        let group = document.cookie.split(';');
        for (let i = 0; i < group.length; i++) {
            let item = group[i].trim();
            if (item.indexOf(key) == 0) {
                //返回的字符串包括开始处的字符，但不包括结束处的字符
                return item.substring(key.length, item.length);
            }
        }
        return null;
    },
    download(file) {// 资源下载
        if (file.url) {
            throw new Error('请文件地址必须传递！');
        }

        let el = document.createElement("a");
        el.download = file.name || `webyi_file_${new Date().getTime()}`;    // 为空则为原文件名
        el.href = file.url;
        document.body.appendChild(el);
        el.click();
        el.remove();
        console.info('%c download success!', 'color:#0099ff');
    },
    calcMath(operation, retain) {//参数1 =>运算式  参数2 =>实际运算结果至少需预留小数后几位
        return Math.round(operation * Math.pow(10, retain)) / Math.pow(10, retain);
    },
    copyText(text) {
        let input = document.createElement('input');
        input.setAttribute('id', 'copyId');
        input.value = text;
        document.querySelector('body').appendChild(input);

        const range = document.createRange();
        range.selectNode(document.getElementById('copyId'));

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }
        selection.addRange(range);
        document.execCommand('copy');
        document.getElementById('copyId').remove();
    }
}
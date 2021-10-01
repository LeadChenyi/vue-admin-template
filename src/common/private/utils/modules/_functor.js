export default {
    call(key, ...args) {// 借调函数
        context = context || window
        return context => context[key](...args);
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
    delegate(element, type, selector, callback) {// 事件代理
        element.addEventListener(type, e => {
            let target = e.target
            while (!target.matches(selector)) {
                if (element === target) {
                    target = null
                    break
                }
                target = target.parentNode
            }
            callback && callback.call(target, e, target)
        }, true)
        return element;
    },
    openWindow(url, name, width, height) {// 打开新窗口
        let x = parseInt(window.screen.width / 2) - (width / 2);
        let y = parseInt(window.screen.height / 2) - (height / 2);
        let params = "";
        if (navigator.appName == "Microsoft Internet Explorer") {
            params = "resizable=1,location=no,scrollbars=no,width=" + width + ",height=" + height + ",top=" + y + ",left=" + x;
        } else {
            params = "width=" + width + ",height=" + height + ",top=" + y + ",left=" + x + ",scrollbars=yes,dialog=yes,modal=yes,resizable=no";
        }
        window.open(url, name, params);
    },
    setCookie(key, value, expires) {// 设置Cookie缓存数据
        let date = new Date();
        // 失效时间 = 当前时间 + 有效期N天
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
        // 根据世界时把Date对象转换为字符串
        document.cookie = key + "=" + value + "; expires=" + date.toUTCString();
    },
    getCookie(key) {// 获取Cookie缓存数据
        key = key + "=";
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let item = cookies[i].trim();
            if (item.indexOf(key) == 0) {// 匹配的是key+=，所以索引只能是0
                return item.substring(key.length, item.length);
            }
        }
        return null;
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
    ajaxLong(
        {
            method = 'get',
            url = '/'
        } = {}, callback) {// 长轮询请求（自调）
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = (res) => {
            callback && callback(res);
            this.ajaxLong();
        }
        xhr.send();
    },
    ajaxShort(
        {
            method = 'get',
            url = '/'
        } = {}, callback, duration = 1500) {// 短轮询请求（定时）
        let xhr = new XMLHttpRequest();
        setInterval(() => {
            xhr.open(method, url);
            xhr.onreadystatechange = (res) => {
                callback && callback(res);
            }
            xhr.send();
        }, duration);
    },
    copyText(text) {// 拷贝文本到剪切板
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
    },
    download(file) {// 资源下载
        let el = document.createElement("a");
        el.download = file.name || `webyi_file_${new Date().getTime()}`;    // 为空则为原文件名
        el.href = file.url || file;
        document.body.appendChild(el);
        el.click();
        el.remove();
        console.info('%c download success!', 'color:#0099ff');
    },
    blobToBase64(data, type = 'application/zip') {// 获取资源文件二进制数据
        const blob = new Blob([data], { type });
        return window.URL.createObjectURL(blob);
    },
    fileToBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            return e.target.result
        };
    },
    getAlipayPath(path) {
        path = decodeURIComponent(path);
        if (path && path.indexOf('alipays:') != -1) {
            if (path.indexOf('page=') != -1) {
                path = path.split('page=')[1];
                path = path.split('&query')[0];
            } else {
                return '';
            }
        }
        return path;
    },
    getAlipayAppId(path) {
        path = decodeURIComponent(path);
        if (path && path.indexOf('alipays:') != -1) {
            let appId = path.split('appId=')[1];
            if (path.indexOf('page=') != -1) {
                appId = appId.split('&page')[0];
                return appId;
            } else if (path.indexOf('query=') != -1) {
                appId = appId.split('&query')[0];
                return appId;
            }
            return appId;
        }
        return null;
    },
    getAlipayQuery(path) {
        path = decodeURIComponent(path);
        let obj = {};
        if (path && path.indexOf('alipays:') != -1) {
            if (path.indexOf('query=') != -1) {
                let query = path.split('query=')[1];
                if (query) {
                    let param = query.split('&');
                    for (let i of param) {
                        let arr = i.split('=');
                        obj[arr[0]] = arr[1];
                    }
                }
            }
        }
        return obj;
    },
    currying(fn, ...args) {// 高阶柯里化
        if (fn.length > args.length) {
            return (...newArgs) => this.currying(fn, ...args, ...newArgs)
        } else {
            return fn(...args)
        }
    }
}
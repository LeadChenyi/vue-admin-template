export default {
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
    isMobileOrMiniClient(limitWidth = 1024) {// 移动屏模型检测
        if (
            navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )
        ) {
            return true;
        }

        let clientWidth = document.body.clientWidth || document.documentElement.clientWidth
        if (clientWidth <= limitWidth) {
            return true;
        }

        return false
    },
}
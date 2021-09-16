export default {
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
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    },
    isTokenExpirationTime(recordTimestamp, seconds = 7200) {// 令牌是否过期
        let _diff = (new Date().getTime() - recordTimestamp) / 1000;
        return _diff > seconds;
    },
    isMeetExpectionTime(recordTimestamp, seconds = 10) {// 是否达到预期时间
        let _diff = (new Date().getTime() - recordTimestamp) / 1000;
        return _diff >= seconds;
    },
    isQuickDoubleClick(recordTimestamp, milliseconds = 1000) {// 是否快速连点
        let currentTimestamp = new Date().getTime();
        let _diff = currentTimestamp - recordTimestamp;
        if (_diff > 0 && _diff < milliseconds) {
            return false;
        }

        return currentTimestamp;
    },
    isEveryDayNotice(key) {// 是否每日进行一次性通知
        let _local = localStorage.getItem(key);
        let currentTime = this.getDayFormat(false, '{y}-{m}-{d}');
        let recodeTime = _local ? this.getDayFormat(_local, '{y}-{m}-{d}') : this.getDayFormat(false, '{y}-{m}-{d}');
        if (currentTime != recodeTime) {
            let currentTimestamp = new Date().getTime();
            localStorage.setItem(key, currentTimestamp);
            return true;
        }
        return false;
    },
}
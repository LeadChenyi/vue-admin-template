export default {
    getIndex(data, value) {// 返回数据中指定元素值的索引
        if (typeof data !== 'string' || !(data instanceof Array)) {
            throw new Error('Please pass a valid argument：$utils.index() <data>');
        }

        return data.indexOf(value);
    },
    getItem(data, index) {// 返回数据中指定索引的元素值
        if (typeof data !== 'string' || !(data instanceof Array)) {
            throw new Error('Please pass a valid argument：$utils.item() <data>');
        }

        if (typeof data === 'string') {
            return data.charAt(index);
        } else {
            return data[index];
        }
    },
    getBlobToUrl(data, type = 'application/zip') {// 获取资源文件二进制数据
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        // window.location.href = url;
        return url;
    },
    getLocationQuery(fullPath = location.href) {// 获取地址参数
        let obj = {};
        let query = fullPath.split('?')[1];
        if (query) {
            let param = query.split('&');
            for (let i of param) {
                let arr = i.split('=');
                obj[arr[0]] = arr[1];
            }
        }
        return obj;
    },
    percent(current, total, percent = '100%') {// 百分率
        return parseInt(current / total * percent);
    },
    zeroize(value, limit = 10, mark = '0') {// 补零
        if (value >= limit) {
            return value.toString();
        } else {
            let num = String(limit).length - String(value).length;
            mark = this.repeat(mark, num);
            return mark + value;
        }
    },
    zeropad(str, digit = 2, mark = '0') {// 补充
        return str.toString().padStart(digit, mark);
    },
    repeat(mark, count = 1) {// 重复某个字符串
        if (mark.repeat) {
            mark = mark.repeat(count);
        } else {
            mark = new Array(count + 1).join(mark); // 利用空数组根据字符串拆分达到重复效果
        }
        return mark;
    },
    star(num, isHalf = false) {// 获取星星
        let tempArr = [];
        for (let i = 0; i < Math.floor(num); i++) {// 生产全星
            tempArr.push("★");
        }
        if (isHalf && (num % 1) !== 0) {// 判断是否生成半星
            let floatArr = num.toFixed(1).split(".");
            let floatStr = floatArr[1];
            tempArr.push(floatStr);
        }
        while (tempArr.length < 5) {// 补全剩余的空星
            tempArr.push("☆");
        }
        return tempArr.join("");
    },
    rate(value, rates) {// 获取评价
        if (!rates) {
            rates = [
                { text: "极差", color: "#95989D" },
                { text: "失望", color: "#67C23A" },
                { text: "一般", color: "#E7A644" },
                { text: "满意", color: "#409EFF" },
                { text: "惊喜", color: "#F56C6C" }
            ];
        }
        return rates[Math.floor(value) - 1];
    },
    countString(str, mark) {// 统计某个字符出现的次数
        return str.split(mark).length - 1;
    },
    countAllString(str, callback) {// 统计所有字符出现的次数
        let obj = {};
        for (let i = 0; i < str.length; i++) {
            if (!obj[str.charAt(i)]) {
                obj[str.charAt(i)] = 1;
            } else {
                obj[str.charAt(i)]++;
            }
        }

        callback && callback(obj);
        return obj;
    },
    countMostObject(obj) {// 比较对象中出现次数最多的键
        let maxKey = null;
        let maxVal = 0;
        for (let i in obj) {
            if (obj[i] > maxVal) {
                maxVal = obj[i];
                maxKey = i;
            }
        }

        return {
            maxKey,
            maxVal
        }
    },
    formatDate(date, str = '{Y}-{M}-{D} {h}:{m}:{s}', pattern = /{(Y|M|D|h|m|s)+}/g) {// 日期格式化
        if (!date) {
            date = new Date();
        }

        if (typeof date === 'string' || typeof date === 'number') {
            if (date.toString().length == 10) {// 兼容服务端时间戳
                date *= 1000;
            }

            if (typeof date === 'string') {
                date = Number(date);
            }
            date = new Date(date);
        }

        if (!(date instanceof Date)) {
            throw new Error('Please pass a valid argument：$utils.toDate() <date>');
        }

        const week = ['日', '一', '二', '三', '四', '五', '六'];
        const parseDate = {
            W: week[date.getDay()],
            Y: date.getFullYear(),
            M: date.getMonth() + 1,
            D: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        }

        let result = str.replace(pattern, (...rest) => {
            let item = parseDate[rest[1]];
            if (rest[1] !== 'W') {
                item = this.zeroize(item)
            }
            return item;
        })

        return result;
    },
    formatDateLast(timestamp) {// 日期格式化（最近时间个性化）
        if (!(timestamp instanceof Date) && typeof timestamp !== 'string' && typeof timestamp !== 'number') {
            throw new Error('Please pass a valid argument：$utils.formatDateLast() <timestamp>');
        }

        if (typeof timestamp === 'string' || typeof timestamp === 'number') {
            if (timestamp.toString().length == 10) {// 兼容服务端时间戳
                timestamp *= 1000;
            }

            if (typeof timestamp === 'string') {
                timestamp = Number(timestamp);
            }
        } else {
            timestamp = new Date(timestamp).getTime();
        }

        const currentTimestamp = new Date().getTime();
        let differ = (currentTimestamp - timestamp) / 1000;
        let result = "";
        if (differ < (60 * 60)) {
            result = Math.ceil(differ / 60);
            result = `${result}分钟前`;
        } else if (differ < (24 * 3600)) {
            result = Math.ceil(differ / 3600);
            result = `${result}小时前`;
        } else if (differ < (4 * 86400)) {// 一周以内的时间格式
            result = Math.ceil(differ / 86400);
            if (result == 1) {
                result = "昨天";
            } else if (result == 2) {
                result = "前天";
            } else {
                result = `${result}天前`;
            }
        } else {// 一周以外的时间格式
            let userYear = new Date(timestamp).getFullYear();
            let currentYear = new Date().getFullYear();

            if (userYear == currentYear) {
                result = this.formatDate(timestamp, '{M}-{D} {h}:{m}', /{(M|D|h|m)+}/g);
            } else {
                result = this.formatDate(timestamp, '{Y}-{M}-{D} {h}:{m}', /{(Y|M|D|h|m)+}/g);
            }
        }

        return result;
    },
    formatMedia(seconds, str = '{H}:{m}:{s}', pattern = /{(H|m|M|s)+}/g) {// 媒体时长格式化
        const parseTime = {
            H: parseInt(seconds / 3600),
            m: parseInt(seconds / 60 % 60),
            M: parseInt(seconds / 60),
            s: parseInt(seconds % 60)
        }

        let result = str.replace(pattern, (...rest) => {
            let item = parseTime[rest[1]];
            item = this.zeroize(item);
            return item;
        })

        return result;
    },
    countDown(date, schedule, finish) {// 倒计时格式化
        if (!date) {
            throw new Error('Please pass a valid argument：$utils.countDown() <date>');
        }

        if (typeof date === 'string' || typeof date === 'number') {
            if (date.toString().length == 10) {// 兼容服务端时间戳
                date *= 1000;
            }

            if (typeof date === 'string') {
                date = Number(date);
            }
            date = new Date(date);
        }

        let targetTime = new Date(date).getTime();
        let timer = setInterval(() => {
            let currentTime = new Date().getTime();
            let seconds = parseInt((targetTime - currentTime) / 1000);

            // 完成回调
            if (seconds <= 0) {
                clearInterval(timer);
                finish && finish({
                    message: '倒计时完成',
                    status: true
                });
                return false;
            }

            const parseTime = {
                day: this.zeroize(parseInt(seconds / 3600 / 24)),
                h: this.zeroize(parseInt(seconds / 3600 % 24)),
                m: this.zeroize(parseInt(seconds / 60 % 60)),
                s: this.zeroize(parseInt(seconds % 60))
            }

            // 进行中回调
            schedule && schedule(parseTime);
            // console.log(parseTime);
        }, 1000);
    }
}
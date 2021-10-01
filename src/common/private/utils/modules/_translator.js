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
    percent(current, total, percent = '100%') {// 百分率
        return parseInt(current / total * percent);
    },
    zeroize(value, limit = 10, mark = '0') {// 条件补充
        if (value >= limit) {
            return value.toString(); // 返回类型统一转为字符串类型
        } else {
            let count = limit.toString().length - value.toString().length;
            mark = this.repeat(mark, count);
            return mark + value;
        }
    },
    padString(str, digit = 2, mark = '0', direction = 'start') {// 强制补充
        if (direction === 'start') {
            return str.toString().padStart(digit, mark);
        } else {
            return str.toString().padEnd(digit, mark);
        }
    },
    roundString(value, mark = '+') {
        if (value > 9999) {
            let end = value.toString().length - 4;
            return value.toString().substring(0, end) + 'w' + mark;
        } else if (value > 999) {
            return value.toString().substring(0, 1) + 'k' + mark;
        } else if (value > 99) {
            return '99' + mark
        }
    },
    repeat(mark, count = 1) {// 重复某个字符串
        if (mark.repeat) {
            mark = mark.repeat(count);
        } else {
            mark = new Array(count + 1).join(mark); // 利用空数组根据字符串拆分达到重复效果
        }
        return mark;
    },
    star(value, isHalf = false) {// 获取星星
        let result = [];
        for (let i = 0; i < Math.floor(value); i++) {// 生产全星
            result.push("★");
        }
        if (isHalf && (value % 1) !== 0) {// 判断是否生成半星
            let floatArr = value.toFixed(1).split(".");
            let floatStr = floatArr[1];
            result.push(floatStr);
        }
        while (result.length < 5) {// 补全剩余的空星
            result.push("☆");
        }
        return result.join("");
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
    countStringIndex(str, mark) {// 统计某个字符出现的索引位置组成新数组返回
        let index = str.indexOf(mark);
        let result = [];
        while (index !== -1) {
            result.push(index);
            index = str.indexOf(mark, index + 1);
        }
        return result;
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
    },
    differDay(startDate, endDate) {// 相差天数
        if (!startDate) {
            throw new Error('Please pass a valid argument：$utils.differDay() <startDate>');
        }

        if (!endDate) {
            endDate = new Date().getTime();
        }

        if (typeof startDate === 'object') {
            startDate = startDate.getTime();
        }

        if (typeof endDate === 'object') {
            endDate = endDate.getTime();
        }

        if (typeof startDate === 'string' || typeof startDate === 'number') {
            if (startDate.toString().length == 10) {// 兼容服务端时间戳
                startDate *= 1000;
            }

            startDate = startDate.toString()
        }

        if (typeof endDate === 'string' || typeof endDate === 'number') {
            if (endDate.toString().length == 10) {// 兼容服务端时间戳
                endDate *= 1000;
            }

            endDate = endDate.toString()
        }

        let differ = endDate - startDate;
        let day = Math.floor(differ / (24 * 3600 * 1000));
        return day;
    },
    getIP(content) {// 获取文本类容中的所有IP地址
        return content.match(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gi);
    },
    getImage(content, pattern = 'allPath', regexp) {// 获取文本类容中的所有图片路径
        const parsePattern = {
            allPath: /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
            notHttp: /src=[\'\"]?((?!https?)[^\'\"]*)[\'\"]?/i
        }

        let images = content.match(/<img .*src=['"]([^'"]+)[^>].*>/gi);
        let paths = [];
        for (let i = 0; i < images.length; i++) {
            let item = images[i].match(regexp || parsePattern[pattern]);
            if (item) {
                paths.push(item[1]);
            }
        }
        return paths;
    },
    replacePath(content, targets, paths) {// 替换文本类容中的所有目标路径
        let obj = {}
        if (targets instanceof Array) {
            targets.forEach((item, index) => {
                obj[item] = paths[index];
            })
        } else {
            Object.assign(obj, targets)
        }

        for (let key in obj) {
            content = content.replace(new RegExp(key, "ig"), obj[key]);
        }
        return content;
    },
    privateProperty(data, props) {// 保护对象或数组对象中的属性
        if (data instanceof Array) {
            data.forEach((item, index) => {
                for (let key in item) {
                    if (props.includes(key)) {
                        delete data[index][key]
                    }
                }
            })
        } else {
            for (let key in data) {
                if (props.includes(key)) {
                    delete data[key]
                }
            }
        }

        return data
    }
}
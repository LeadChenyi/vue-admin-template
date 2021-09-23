export default {
    index(data, value) {// 返回数据中某个指定值的索引
        if (typeof data !== 'string' || !(data instanceof Array)) {
            throw new Error('请传递正确参数：仅支持String、Array类型的数据');
        }

        return data.indexOf(value);
    },
    percent(currVal, totalVal, totalPct) {// 百分率
        return parseInt(currVal / totalVal * totalPct);
    },
    zeroize(value, limit = 10) {// 补零
        if (value >= limit) {
            return value;
        } else {
            let num = String(limit).length - String(value).length;
            let str = "0";
            str = this.repeat(str, num);
            return str + value;
        }
    },
    repeat(str, num) {// 重复某个字符串
        if (str.repeat) {
            str = str.repeat(num);
        } else {
            str = new Array(num + 1).join(str);
        }
        return str;
    },
    toRateIcon(num, isHalf = false) {
        let tempArr = [];
        for (let i = 0; i < Math.floor(num); i++) {//生成已获得的数量
            tempArr.push("★");
        }
        if (isHalf && (num % 1) !== 0) {//判断是否生成半星
            let floatArr = num.toFixed(1).split(".");
            let floatStr = floatArr[1];
            if (floatStr < 4) {//123✬
                tempArr.push("✬");
            } else if (floatStr < 7) {//456✯
                tempArr.push("✯");
            } else {//789✮
                tempArr.push("✮");
            }
        }
        while (tempArr.length < 5) {//补全剩余的数量
            tempArr.push("☆");
        }
        return tempArr.join("");
    },
    toRateName(num) {
        const rateJson = [
            { text: "极差", color: "#95989D" },
            { text: "失望", color: "#67C23A" },
            { text: "一般", color: "#E7A644" },
            { text: "满意", color: "#409EFF" },
            { text: "惊喜", color: "#F56C6C" }
        ];
        return rateJson[Math.floor(num) - 1];
    },
    totalString(str, mark) {// 统计某个字符出现的次数
        //console.log(str.match(/\./g));    //不推荐 因为正则匹配出现结果可能是null，那么此时使用length一定会报错
        //console.log(str.split("."))       //推荐 即使没有匹配到至少返回原字符的数组，就一定存在length长度
        return str.split(mark).length - 1;
    },
    totalStringAll(str, callback) {// 统计所有字符出现的次数
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
    battleMostKey(obj) {// 比较对象中出现次数最多的键
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
    getBlobToUrl(data, type = 'application/zip') {
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        // window.location.href = url;
        return url;
    },
    getLocationQuery(fullPath = location.href) {
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
    /**
     * 
     * @param {Number} timestamp 非必填，传递值为false表示获取当前时间的格式化
     * @param {String} format 
     * @param {RegExp} regexp 
     * @returns String类型，日期格式化
     */
    formatDate(timestamp, format = '{y}-{m}-{d} {h}:{i}:{s}', regexp = /{(y|m|d|h|i|s)+}/g) {// 获取日期格式化
        if (timestamp && timestamp.toString().length == 10) {
            timestamp *= 1000;
        }

        const date = timestamp ? new Date(timestamp) : new Date();
        const parseDate = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds()
        }

        let result = format.replace(regexp, (value, key) => {// 参数value就是字符串格式中匹配到的字符，参数key就是正则表达式括号中的值
            let item = parseDate[key];
            if (value && item < 10) {
                item = '0' + item;
            }
            return item
        })

        return result;
    },
    newestDate(timestamp) {
        if (typeof timestamp != 'string' && typeof timestamp != 'number') {
            throw new Error('时间戳类型不正确');
        }

        if (typeof timestamp === 'string') {
            if (timestamp.length == 10) {
                timestamp *= 1000;
            }

            timestamp = parseInt(timestamp);
        } else if (typeof timestamp === 'number') {
            if (timestamp.toString().length == 10) {
                timestamp *= 1000;
            }
        }

        const currentStamp = new Date().getTime();

        // 以秒为单位的时间差 = (当前时间 - 创建时间) / 1000
        let differ = (currentStamp - timestamp) / 1000;

        let result = "";
        if (differ < (60 * 60)) {
            result = Math.ceil(differ / 60);
            result = `${result}分钟前`;
        } else if (differ < (24 * 3600)) {
            result = Math.ceil(differ / 3600);
            result = `${result}小时前`;
        } else if (differ < (4 * 86400)) {
            result = Math.ceil(differ / 86400);
            if (result == 1) {
                result = "昨天";
            } else if (result == 2) {
                result = "前天";
            } else {
                result = `${result}天前`;
            }
        } else {
            let userYear = new Date(timestamp).getFullYear();
            let thisYear = new Date().getFullYear();

            if (userYear == thisYear) {
                result = this.formatDate(timestamp, '{m}-{d} {h}:{i}', /{(m|d|h|i)+}/g);
            } else {
                result = this.formatDate(timestamp, '{y}-{m}-{d} {h}:{i}', /{(y|m|d|h|i)+}/g);
            }
        }

        return result;
    },
    getAVDuration(seconds, distribute = true) {//获取影音时长
        let h, m, s = null;
        if (distribute) {//按小时
            h = this.zeroize(parseInt(seconds / 3600));
            m = this.zeroize(parseInt(seconds / 60 % 60));
            s = this.zeroize(parseInt(seconds % 60));
            return h + ":" + m + ":" + s;
        } else {//按分钟
            m = this.zeroize(parseInt(seconds / 60));
            s = this.zeroize(parseInt(seconds % 60));
            return m + ":" + s;
        }
    },
    countDown(objEle, objDate, callback) {//个性化倒计时
        let objTime = objDate.getTime();
        objEle.timer = setInterval(() => {
            let curDate = new Date();
            let curTime = curDate.getTime();
            let restTime = objTime - curTime;                               //剩余时间 = 将来时间 - 现在时间
            let seconds = parseInt(restTime / 1000);                        //将毫秒转换成秒来计算
            let day = this.zeroize(parseInt(seconds / 3600 / 24));         //一小时3600秒，除一天24小时
            let h = this.zeroize(parseInt(seconds / 3600 % 24));           //一小时3600秒, 余24小时等于剩余小时数
            let m = this.zeroize(parseInt(seconds / 60 % 60));             //一分钟60秒，余60分钟等于剩余分钟数
            let s = this.zeroize(parseInt(seconds % 60));                  //60秒为1分钟，余一分钟等于剩余秒数
            if (restTime <= 0) {
                objEle.innerText = "活动开始啦!";
                clearInterval(objEle.timer);
            } else {
                if (callback) {
                    callback(day, h, m, s);
                } else {
                    objEle.innerText = "剩余" + day + "天" + h + "小时" + m + "分" + s + "秒";
                }
            }
        }, 1000);
    },
    getDateTime(obj, callback) {//个性化获取日期时间
        let year = obj.getFullYear();
        let month = this.zeroize(obj.getMonth() + 1);
        let date = this.zeroize(obj.getDate());
        let h = this.zeroize(obj.getHours());
        let m = this.zeroize(obj.getMinutes());

        if (callback) {
            callback(year, month, date, h, m);
        } else {
            return year + "年" + month + "月" + date + "日 " + h + ":" + m;
        }
    },
    toDateTime(obj, formatStr) {//格式化转换日期时间
        let Week = ['日', '一', '二', '三', '四', '五', '六'];
        formatStr = formatStr.replace(/W/, Week[obj.getDay()]);
        formatStr = formatStr.replace(/YYYY/, obj.getFullYear());
        formatStr = formatStr.replace(/MM/, this.zeroize(obj.getMonth() + 1));
        formatStr = formatStr.replace(/DD/, this.zeroize(obj.getDate()));
        formatStr = formatStr.replace(/h/, this.zeroize(obj.getHours()));
        formatStr = formatStr.replace(/m/, this.zeroize(obj.getMinutes()));
        formatStr = formatStr.replace(/s/, this.zeroize(obj.getSeconds()));
        return formatStr;
    }
}
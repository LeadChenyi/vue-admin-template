export default {
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
    }
}
export default {
    calculate(express, toFixed = 2) {// 四则运算（防止小数点精度丢失）
        return Math.round(express * Math.pow(10, toFixed)) / Math.pow(10, toFixed);
    },
    range(min, max, isContainMax = true) {// 获取随机范围数（包含最大值和最小值，可选择不包含最大值）
        return Math.floor(Math.random() * (max - min + (!!isContainMax)) + min);
    },
    rangeExclude(min, max) {// 获取随机范围数（不包含最小值和最大值）
        return Math.ceil(Math.random() * (max - min - 1) + min);
    },
    rangeFrom(max = 1) {// 获取随机范围数（最小随机数为0，最大随机数默认为1，可指定最大值，译为从头开始）
        max++;
        return ((Math.random() * max) | 0);
    },
    rangeMinus(min, max) {// 获取随机范围数（包含最大值和最小值，支持负数）
        if (min < 0) {
            return Math.floor(Math.random() * (min + -max - 1) - min + 1);
        } else {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    },
    rangeMinusExclude(min, max) {// 获取随机范围数（不包含最大值和最小值，支持负数）
        if (min < 0) {
            return Math.floor(Math.random() * (min + -max + 1) - min);
        } else {
            return Math.ceil(Math.random() * (max - min - 1) + min);
        }
    },
    section(a, b) {// 获取一个区间的值组成新数组返回
        let temp, arr = [];
        if (a > b) {
            temp = a;
            a = b;
            b = temp;
        }

        for (let i = a; i <= b; i++) {
            arr.push(i);
        }
        return arr
    },
    formatCurrency(value, mark = '+') {
        if (value > 9999) {
            let end = value.toString().length - 4;
            return value.toString().substring(0, end) + 'w' + mark;
        } else if (value > 999) {
            return value.toString().substring(0, 1) + 'k' + mark;
        } else if (value > 99) {
            return '99' + mark
        }
    },
    formatPercent(current, total, percent = '100%') {// 百分率
        return parseInt(current / total * percent);
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
    }
}
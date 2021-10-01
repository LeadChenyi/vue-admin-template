export default {
    zeroize(value, limit = 10, mark = '0') {// 条件补充
        if (value >= limit) {
            return value.toString(); // 返回类型统一转为字符串类型
        } else {
            let count = limit.toString().length - value.toString().length;
            mark = this.repeat(mark, count);
            return mark + value;
        }
    },
    pad(str, digit = 2, mark = '0', direction = 'start') {// 强制补充
        if (direction === 'start') {
            return str.toString().padStart(digit, mark);
        } else {
            return str.toString().padEnd(digit, mark);
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
    each(data, callback) {// 数据遍历
        if (data instanceof Array) {
            for (let [key, value] of data) {
                callback && callback(key, value);
            }
        } else {
            for (let key in data) {
                let value = data[key];
                callback && callback(key, value);
            }
        }
    },
    clone(data) {// 浅拷贝
        if (typeof data !== 'object') {
            return data;
        }

        if (Array.isArray(data)) {
            return [].concat(data);
        } else {
            return Object.assign({}, data);
        }
    },
    deepClone(data) {// 深拷贝
        if (typeof data !== 'object') {// 注意：递归检索对象属性时，将非引用类型的数据直接返回
            return data;
        }

        let result = Array.isArray(data) ? [] : {}
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                result[key] = this.deepClone(data[key])
            }
        }
        return result;
    },
    merge(data1, data2) {// 合并
        if (typeof data1 !== 'object' && typeof data2 !== 'object') {
            throw new Error('Please pass a valid argument：$utils.merge() <data>');
        }

        if (Array.isArray(data1)) {
            return data1.concat(data2);
        } else {
            return Object.assign(data1, data2);
        }
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
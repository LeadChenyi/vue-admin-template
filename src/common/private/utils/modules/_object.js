export default {
    simpleObject(obj) {// 对象简化
        const result = {};
        for (let key in obj) {
            if (obj[key] instanceof Object) {
                Object.assign(result, this.simpleObject(obj[key]))
            } else {
                result[key] = obj[key]
            }
        }
        return result;
    },
    maxObject(obj) {// 比较对象中出现次数最多的键值
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
    }
}
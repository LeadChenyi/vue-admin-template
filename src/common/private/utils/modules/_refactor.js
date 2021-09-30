export default {
    cutString(str, limit = 30, mark = '') {// 截取指定字节的字符串
        let count = 0;
        let uniCount = 0;
        let pattern = /[^\x00-\xff]/;
        for (let i = 0; i < limit; i++) {
            let temp = str.substr(i, 1);
            if (pattern.exec(temp) != null) {// 中文字符占两位（包括符号）
                count += 2;
            } else {
                count += 1;
            }

            if (count > limit) {
                break;
            } else {
                uniCount++;
            }
        }
        return str.substring(0, uniCount) + mark;
    },
    spliceString(str, index, mark) {
        let start = str.substring(0, index);
        let end = str.substring(index);
        return start + mark + end;
    },
    simple(arr) {// 数组化简（将多维数组化成普通数组）
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                result.push(...this.simple(arr[i]))
            } else {
                result.push(arr[i]);
            }
        }
        return result;
    },
    deepFlat(arr) {// 数组扁平化（将多维数组化成普通数组）
        return arr.reduce((total, current) => {
            if (Array.isArray(current)) {
                return [...total, ...this.deepFlat(current)];
            } else {
                return [...total, current];
            }
        }, [])
    },
    currying(fn, ...args) {// 高阶柯里化
        if (fn.length > args.length) {
            return (...newArgs) => this.currying(fn, ...args, ...newArgs)
        } else {
            return fn(...args)
        }
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
    mergeSubseries(arr1, arr2) {// 合并数组对象子序列项
        return arr1.map((item, index) => {
            return Object.assign(item, arr2[index])
        })
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
    clearRepeat(arr) {// 数组去重（去掉数组中重复的元素）
        if (new Set) {
            return Array.from(new Set(arr));
        } else {
            let result = [];
            arr.forEach((item) => {
                if (result.indexOf(item) == -1 || !result.includes(item)) {
                    result.push(item);
                }
            })
            return result;
        }
    },
    unique(arr) {// 数组去重（可以过滤掉所有类型的重复数据）
        let obj = {}
        return arr.filter((item) => {
            return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
        })
    },
    group(arr, size) {// 数组分组（按条数分组）
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let index = Math.floor(i / size);
            if (result.length <= index) {
                result.push([]);
            }
            result[index].push(arr[i]);
        }
        return result;
    },
    groupByDate(newArr = [], data) {
        data.forEach((item, i) => {
            let index = -1;
            let isExists = newArr.some((newItem, j) => {
                if (item.date == newItem.tab) {
                    index = j;
                    return true;
                }
            })
            if (!isExists) {
                newArr.push({
                    tab: item.date,
                    subList: [item]
                })
            } else {
                newArr[index].subList.push(item);
            }
        })
        return newArr;
    },
    reverse(arr) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.unshift(arr[i]);
        }

        // for (let i = arr.length - 1; i >= 0; i--) {
        //     result[result.length] = arr[i];
        //     result.push(arr[i]);
        // }

        return result;
    },
    shuffle(arr) {// 随机洗牌（有序）
        return arr.sort(() => {
            return Math.random() > 0.5 ? 1 : -1
        })
    },
    scatter(arr) {// 随机分散（无序）
        const result = [];
        while (arr.length) {
            let index = Math.floor(arr.length * Math.random());
            let item = arr.splice(index, 1);
            result.push(...item);
        }
        return result;
    },
    sort(arr, property, order = true) {// 字典排序（默认升序）
        if (property !== undefined && typeof property !== 'boolean' && typeof property !== 'string') {
            throw new Error('Please pass a valid argument: $utils.sort() <property>');
        }

        if (property !== undefined && typeof property === 'boolean') {
            order = property;
        }

        return arr.sort((a, b) => {
            if (order) {
                if (property !== undefined && typeof property === 'string') {
                    return a[property] - b[property];
                } else {
                    return a - b;
                }
            } else {
                if (property !== undefined && typeof property === 'string') {
                    return b[property] - a[property];
                } else {
                    return b - a;
                }
            }
        })
    },
    sortBubble(arr, order = true) {// 冒泡排序（默认升序从小到大）
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i; j++) {
                if (order) {
                    if (arr[j] > arr[j + 1]) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                } else {
                    if (arr[j] < arr[j + 1]) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        return arr;
    },
    sortQuick(arr) {// 快速排序
        if (arr.length <= 1) return arr;
        let index = Math.floor(arr.length / 2);
        let current = arr.splice(index, 1)[0], left = [], right = [];
        for (let i = 0; i < arr.length; i++) {
            if (current > arr[i]) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return this.sortQuick(left).concat([current], this.sortQuick(right))
    },
    sortInsert(arr) {// 插入排序
        let current, preIndex;
        for (let i = 1; i < arr.length; i++) {
            current = arr[i];
            preIndex = i - 1;
            while (preIndex >= 0 && arr[preIndex] > current) {
                arr[preIndex + 1] = arr[preIndex];
                preIndex--;
            }
            arr[preIndex + 1] = current;
        }
        return arr;
    },
    sortObjectProperty(data, keys) {// 数组对象中的属性排序（不改变数组对象索引）
        for (let i = 0; i < data.length; i++) {
            let temp = {};
            for (let j = 0; j < keys.length; j++) {
                temp[keys[j]] = data[i][keys[j]];
            }
            data[i] = temp;
        }
        return data;
    },
    addProperty(data, key = 'name', values) {// 新增属性值给每个数组对象
        for (let i = 0; i < data.length; i++) {
            data[i][key] = values[i];
        }
        return data;
    },
    getPropertyArray(data, key = 'name') {// 获取某个属性值组成新数组返回
        let newArr = [];
        for (let i = 0; i < data.length; i++) {
            newArr.push(data[i][key]);
        }
        return newArr;
    },
    getPropertyArrayTree(data, key = 'name') {// 获取某个属性值组成新数组返回（递归遍历整个树形对象）
        let newArr = [];
        data.forEach((item) => {
            newArr.push(item[key]); // 当前项

            if (item.children && item.children.length) {// 子孙后代项
                newArr.push(...this.getPropertyArrayTree(item.children, key));
                // newArr = [...newArr, ...this.getPropertyArrayTree(item.children, key)]    
                // newArr = newArr.concat(this.getPropertyArrayTree(item.children, key));    
            }
        })
        return newArr;
    },
    lavalTree(item, tree, key = 'pid') {// 递归遍历数组对象按上下级关系生成树形对象
        let children = [];
        tree.forEach((son) => {
            if (item.id == son[key]) {
                this.lavalTree(son, tree, key);
                children.push(son);
            }
        });
        if (children.length) {
            item.children = children;
        }
        return item;
    },
    infiniteTree(data, key = 'pid') {// 无限极分类
        const newArr = [];
        data.forEach((item) => {
            if (item[key] == 0 || item[key] == null) {
                newArr.push(this.lavalTree(item, data, key));
            }
        });
        return newArr;
    }
}
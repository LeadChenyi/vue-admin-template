export default {
    simple(arr) {// 数组化简：多维数组化成一维数组
        let result = [];
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                let temp = this.simple(arr[i]);
                result = [...result, ...temp];
            } else {
                result.push(arr[i]);
            }
        }
        return result;
    },
    deepFlat(arr) {// 数组扁平化
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
    clone(data) {// 浅拷贝
        if (Array.isArray(data)) {
            return [].concat(data);
        } else {
            return Object.assign({}, data);
        }
    },
    deepClone(data) {// 深拷贝
        if (typeof data !== 'object') {// 递归检索对象属性时，将非引用类型的数据直接返回
            return data;
        }

        let result = Array.isArray(data) ? [] : {}
        for (let key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = this.deepClone(data[key])
            }
        }
        return result;
    },
    unrepeatable(arr) {// 数组去重：去掉数组中重复的元素
        // return Array.from(new Set(arr));

        let result = [];
        arr.forEach((item) => {
            if (result.indexOf(item) == -1 || !result.includes(item)) {
                result.push(item);
            }
        })
        return result;
    },
    group(arr, size) {// 数组分组：按条数分组
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
    sortRandom(arr) {// 随机排序
        return arr.sort(() => {
            return Math.random() > 0.5 ? 1 : -1
        })
    },
    sortBubble(arr) {// 冒泡排序
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    },
    sortPropertyOrder(data, keys) {// 自定义每个对象属性的排列顺序
        for (let i = 0; i < data.length; i++) {
            let temp = {};
            for (let j = 0; j < keys.length; j++) {
                temp[keys[j]] = data[i][keys[j]];
            }
            data[i] = temp;
        }
        return data;
    },
    addProperty(data, key = 'name', values) {// 给数组每个对象都新增属性和值
        for (let i = 0; i < data.length; i++) {
            data[i][key] = values[i];
        }
        return data;
    },
    getPropertyArray(data, key = 'name') {// 获取数组对象中某个属性值组成新数组
        let newArr = [];
        for (let i = 0; i < data.length; i++) {
            newArr.push(data[i][key]);
        }
        return newArr;
    },
    getPropertyArrayTree(data, key = 'name') {// 递归遍历数组对象获取某个属性值组成新数组返回
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
    lavalGroupTree(item, tree, key = 'pid') {
        let children = [];
        tree.forEach((son) => {
            if (item.id == son[key]) {
                this.lavalGroupTree(son, tree, key);
                children.push(son);
            }
        });
        if (children.length) {
            item.children = children;
        }
        return item;
    },
    infiniteClassify(data, key = 'pid') {
        const newArr = [];
        data.forEach((item) => {
            if (item[key] == 0 || item[key] == null) {
                newArr.push(this.lavalGroupTree(item, data, key));
            }
        });
        return newArr;
    }
}
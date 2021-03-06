export default {
    min(arr) {// 获取数组中最小值
        return Math.min.apply(this, arr);
    },
    max(arr) {// 获取数组中最大值
        return Math.max.apply(this, arr);
    },
    sum(arr) {// 获取数组中值的求和
        return arr.reduce((total, num) => {
            return total += num;
        })
    },
    unique(arr) {// 数组去重（去掉所有类型的重复数据）
        let obj = {}
        return arr.filter((item) => {
            return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
        })
    },
    clearRepeat(arr) {// 数组去重
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
    reverse(arr) {// 数组子项翻转
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
    scatterOrder(arr) {// 有序打散
        return arr.sort(() => {
            return Math.random() > 0.5 ? 1 : -1
        })
    },
    scatter(arr) {// 无序打散
        const result = [];
        while (arr.length) {
            let index = Math.floor(arr.length * Math.random());
            let item = arr.splice(index, 1);
            result.push(...item);
        }
        return result;
    },
    chunk(arr, size) {// 数组拆分分组
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
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
    mergeSubArray(arr1, arr2) {// 合并数组对象子序列项
        return arr1.map((item, index) => {
            return Object.assign(item, arr2[index])
        })
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
    treePower(arr, permissions, children = 'children', metaAuthKey = 'code') {// 递归过滤未授权的数据
        return arr.filter(item => permissions.includes(item.meta[metaAuthKey])).map((item) => {
            item = Object.assign({}, item);
            if (item[children]) {
                item[children] = this.treePower(item[children])
            }
            return item;
        })
    },
    /**
     * 
     * @param {Array} arr 原始数据
     * @param {Array} trends 动态数据
     * @param {String} field 数据条件字段
     * @param {String} children 数据子项字段
     * @returns {Array} 返回原始数据结构的数据
     */
    treeInclude(arr, trends, field = 'name', children = 'children') {// 递归过滤不存在的数据
        const result = [];
        arr.forEach((item) => {
            trends.forEach((cItem) => {
                if (item[field] === cItem[field]) {
                    if (cItem[children] && cItem[children].length) {
                        item[children] = this.treeInclude(item[children], cItem[children], field, children);
                    }
                    result.push(item);
                }
            })
        })
        return result;
    },
    treeLevel(item, tree, key = 'pid') {// 递归遍历数组对象按上下级关系生成树形对象
        let children = [];
        tree.forEach((son) => {
            if (item.id == son[key]) {
                this.treeLevel(son, tree, key);
                children.push(son);
            }
        });
        if (children.length) {
            item.children = children;
        }
        return item;
    },
    treeInfinite(data, key = 'pid') {// 无限极分类
        const newArr = [];
        data.forEach((item) => {
            if (item[key] == 0 || item[key] == null) {
                newArr.push(this.treeLevel(item, data, key));
            }
        });
        return newArr;
    }
}
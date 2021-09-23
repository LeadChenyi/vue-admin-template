export default {
    simple(arr) {// 数组化简：多维数组化成一维数组
        let res = [];
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                let temp = this.simple(arr[i]);
                res = [...res, ...temp];
            } else {
                res.push(arr[i]);
            }
        }
        return res;
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
    deepClone() {
        if (typeof obj !== 'object' || obj == null) {
            return obj
        }

        let result = Array.isArray(obj) ? [] : {}
        for (let key in obj) {
            // 判断是否是自己的属性方法，而不是原型属性方法
            if (obj.hasOwnProperty(key)) {
                result[key] = this.deepClone(obj[key])
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
    group(arr, limit) {// 数组分组：按条数分组
        let res = [];
        for (let i = 0; i < arr.length; i++) {
            let index = Math.floor(i / limit);
            if (res.length <= index) {
                res.push([]);
            }
            res[index].push(arr[i]);
        }
        return res;
    },
    sort(arr, asc = true) {// 默认字典排序
        return arr.sort((a, b) => {
            if (asc) {
                return a - b;
            } else {
                return b - a;
            }
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
    shuffle() {// 随机打乱

    },
    contrast(sources, holds, field = 'name', children = 'children') {
        const res = [];
        sources.forEach((item, index) => {
            holds.forEach((c, i) => {
                if (item[field] === c[field]) {
                    if (c[children] && c[children].length) {
                        item[children] = this.contrast(item[children], c[children], field, children);
                    }
                    res.push(item);
                }
            })
        })
        return res;
    },
    addAttr(mainJson, valArr, attrStr) {//给数组对象添加新属性
        for (let i = 0; i < mainJson.length; i++) {
            mainJson[i][attrStr] = valArr[i];
        }
        return mainJson;
    },
    getAttrArray(mainJson, attrStr) {//获取数组对象中某个属性值组成新数组
        let newArr = [];
        for (let i = 0; i < mainJson.length; i++) {
            newArr.push(mainJson[i][attrStr]);
        }
        return newArr;
    },
    attrSequ(mainJson, attrArr) {//自定义显示数组对象中属性的顺序
        for (let i = 0; i < mainJson.length; i++) {
            let tempObj = {};                   //每次循环前清空对象，否则浅拷贝的关系数据重叠都为最后一条
            for (let j = 0; j < attrArr.length; j++) {
                tempObj[attrArr[j]] = mainJson[i][attrArr[j]];
            }
            mainJson[i] = tempObj;
        }
        return mainJson;
    },
    attrSort(mainJson, attrStr, sort = true) {//排序方式为某个属性的值
        return mainJson.sort(function (a, b) {
            if (sort) {
                return a[attrStr] - b[attrStr];
            } else {
                return b[attrStr] - a[attrStr];
            }
        })
    },
    getAttrArrayTree(treeJson, attrStr) {//遍历数组对象中某个属性值组成新数组
        let newArr = [];
        function recursion(data) {
            data.forEach(function (item) {
                newArr.push(item[attrStr]);
                if (item.children) {
                    recursion(item.children);
                }
            })
        }
        recursion(treeJson)
        return newArr;
    },
    toTreeChild(item, oldJson) {
        let self = this;
        let children = new Array();
        for (let i = 0; i < oldJson.length; i++) {
            if (item.id == oldJson[i].pid) {//查找当前父元素下的子元素
                self.toTreeChild(oldJson[i], oldJson);
                oldJson[i].elder = item.name;
                children.push(oldJson[i]);
            }
        }
        if (children.length > 0) {//如果存在子级数据则赋值给当前item对象
            item.children = children;
        }
        return item;
    },
    toTreeClassify(oldJson) {//根据pid将数组对象按辈分级归类
        let self = this;
        let newJson = [];
        for (let i = 0; i < oldJson.length; i++) {
            if (oldJson[i].pid == 0 || oldJson[i].pid == null) {//查找父元素
                newJson.push(self.toTreeChild(oldJson[i], oldJson));
            }
        }
        return newJson;
    }
}
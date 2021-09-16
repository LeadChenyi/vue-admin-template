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

        // return arr.flat();   // 默认只能扁平化二维数组（嵌套更深的数组只能指定消除层数）
    },
    simple2(nestArr) {
        let newArr = [];
        function recursion(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    recursion(arr[i]);
                } else {
                    newArr.push(arr[i]);
                }
            }
        }
        recursion(nestArr);
        return newArr;
    },
    repeat(arr) {// 数组去重：去掉数组中重复的元素
        // return Array.from(new Set(arr));

        let res = [];
        arr.forEach((item) => {
            if (res.indexOf(item) < 0) {// res.includes(item)
                res.push(item);
            }
        })
        return res;
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
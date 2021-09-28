export default {
    toForbidden(str, words) {// 过滤非法字符
        if (!words) {
            words = ["傻", "逼", "屌", "草", "你妈", "色情", "黄片", "三级片"];
        }
        words.forEach((item) => {
            str = str.replace(new RegExp(item, "ig"), (...rest) => {
                return this.repeat('*', rest[0].length);
            });
        })
        return str;
    },
    toTrim(str, direction = "both") {// 过滤空格字符
        if (typeof str !== "string") {
            throw new Error('Please pass a valid argument：$utils.toTrim() <str>');
        }

        if (direction === "both") {
            return str.trim();
            //return str.replace(/^\s*|\s*$/g,"");
        } else if (direction === "all") {
            return str.replace(/\s*/g, "");
        } else if (direction === "left") {
            return str.replace(/^\s*/g, "");
        } else if (direction === "right") {
            return str.replace(/\s*$/g, "");
        }
    },
    tohtml(str) {// 过滤HTMl标签
        return str.replace(/<[^>]+>|&[^>]+;/g, "").trim();
    },
    toHtmlTrim(str, direction = "both") {// 过滤HTMl标签及文本空格
        let text = str.replace(/<\/?.+?>/g, "");
        let result = "";
        if (direction == "both") {
            result = text.replace(/^\s*|\s*$/g, "");
        } else if (direction == "all") {
            result = text.replace(/\s*/g, "");
        }
        return result;
    },
    toTreePower(routers, permission = []) {
        return routers.filter(item => permission.includes(item.meta.code)).map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
                item['children'] = this.toTreePower(item.children)
            }
            return item;
        })

        // return routers.map((item) => {
        //     if (['user', 'user:role'].includes(item.meta.code)) {
        //         item = Object.assign({}, item);
        //         if (item.children) {
        //             item['children'] = toTreePower(item.children)
        //         }
        //         return item
        //     }
        // }).filter(item => item)
    },
    toTreeCompare(resource, data, field = 'name', children = 'children') {// 对比data数据过滤出resource现有的
        const result = [];
        resource.forEach((item) => {
            data.forEach((cItem) => {
                if (item[field] === cItem[field]) {
                    if (cItem[children] && cItem[children].length) {
                        item[children] = this.toTreeCompare(item[children], cItem[children], field, children);
                    }
                    result.push(item);
                }
            })
        })
        return result;
    }
}
export default {
    toTrim(str, direction = "both") {// 过滤空格字符
        if (typeof str !== "string") {
            throw new Error('请传递有效参数');
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
    toForbidden(str) {// 过滤非法字符
        const forbiddenWords = ["傻", "逼", "草", "屌", "你妈的"];
        forbiddenWords.forEach((item) => {
            str = str.replace(new RegExp(item, "ig"), "***");
        })
        return str;
    },
    filterHTML(str) {// 过滤HTMl标签
        return str.replace(/<[^>]+>|&[^>]+;/g, "").trim();
    },
    filterHTML2(str, direction = "both") {//过滤字符串中的HTML标签可选择清空文本间的空格
        let text = str.replace(/<\/?.+?>/g, "");
        let plainText = "";
        if (direction == "both") {
            plainText = text.replace(/^\s*|\s*$/g, "");
        } else if (direction == "all") {
            plainText = text.replace(/\s*/g, "");
        }
        return plainText;
    },
    filterRouter(routers, permission = []) {
        return routers.filter(item => permission.includes(item.meta.code)).map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
                item['children'] = this.filterRouter(item.children)
            }
            return item;
        })

        // return routers.map((item) => {
        //     if (['user', 'user:role'].includes(item.meta.code)) {
        //         item = Object.assign({}, item);
        //         if (item.children) {
        //             item['children'] = filterRouter(item.children)
        //         }
        //         return item
        //     }
        // }).filter(item => item)
    },
    filterNonexistent(resource, data, field = 'name', children = 'children') {// 对比data数据过滤出resource现有的
        const result = [];
        resource.forEach((item) => {
            data.forEach((cItem) => {
                if (item[field] === cItem[field]) {
                    if (cItem[children] && cItem[children].length) {
                        item[children] = this.filterNonexistent(item[children], cItem[children], field, children);
                    }
                    result.push(item);
                }
            })
        })
        return result;
    }
}
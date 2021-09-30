export default {
    toForbidPrivacy(str, words) {// 替换被禁用的字符为隐私字符
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
    /**
     * 
     * @param {String} str          文本内容
     * @param {Number} start        起始位置保留几位 
     * @param {Number} end          结束位置保留几位
     * @param {String} mark         填充符号
     * @param {Boolean} autoFill    是否按字符串位数添加符号
     * @returns {String}            返回新文本内容
     */
    toCenterPrivacy(str, start = 1, end = 1, mark = '*', autoFill = true) {// 截取部分字符串为隐私字符
        if (str.length > 3 && autoFill) {
            mark = this.repeat(mark, str.length - start - end);
        }
        return str.substring(0, start) + mark + str.substring(str.length - end, str.length);
    },
    toTrim(str, direction = "both") {// 过滤空格字符
        if (typeof str !== "string") {
            throw new Error('Please pass a valid argument：$utils.toTrim() <str>');
        }

        if (direction === "both") {
            return str.replace(/^\s*|\s*$/g, "");
        } else if (direction === "all") {
            return str.replace(/\s*/g, "");
        } else if (direction === "left") {
            return str.replace(/^\s*/g, "");
        } else if (direction === "right") {
            return str.replace(/\s*$/g, "");
        }
    },
    toHTML(str) {// 过滤HTMl标签
        return str.replace(/<[^>]+>|&[^>]+;/g, "").trim();
    },
    toHTMLTrim(str, direction = "both") {// 过滤HTMl标签及空格字符
        str = str.replace(/<\/?.+?>/g, "");
        if (direction == "both") {
            return str.trim();
        } else if (direction == "all") {
            return str.replace(/\s*/g, "");
        }
    },
    encodeHTML(str) {// 编码HTML标签
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\x22/g, '&quot;')
            .replace(/\x27/g, '&#39;')
            .replace(/\x60/g, '&#96;');

    },
    decodeHTML(str) {// 解码HTML标签
        return str.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '\x22')
            .replace(/&#0*39;/g, '\x27')
            .replace(/&#0*96;/g, '\x60');
    },
    encodeCamelCased(str) {// 编码驼峰命名
        return str.replace(/_(\w)/g, (...rest) => {
            return rest[1].toUpperCase();
        });
    },
    decodeCamelCased(str) {// 解码驼峰命名
        return str.replace(/([A-Z])/g, "_$1").toLowerCase();
    },
    toTreePower(routers, permission = []) {// 过滤未授权数据
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
    toTreeCompare(resource, data, field = 'name', children = 'children') {// 过滤不存在的数据
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
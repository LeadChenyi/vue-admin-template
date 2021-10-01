export default {
    getIP(content) {// 获取文本类容中的所有IP地址
        return content.match(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gi);
    },
    getImagePath(content, pattern = 'allPath', regexp) {// 获取文本类容中的所有图片路径
        const parsePattern = {
            allPath: /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
            notHttp: /src=[\'\"]?((?!https?)[^\'\"]*)[\'\"]?/i
        }

        let images = content.match(/<img .*src=['"]([^'"]+)[^>].*>/gi);
        let paths = [];
        for (let i = 0; i < images.length; i++) {
            let item = images[i].match(regexp || parsePattern[pattern]);
            if (item) {
                paths.push(item[1]);
            }
        }
        return paths;
    },
    getLocationQuery(fullPath = location.href) {// 获取地址参数
        let obj = {};
        let query = fullPath.split('?')[1];
        if (query) {
            let param = query.split('&');
            for (let i of param) {
                let arr = i.split('=');
                obj[arr[0]] = arr[1];
            }
        }
        return obj;
    },
    getString(str, byte = 30, mark = '') {// 获取指定字节的字符串（中文字符占两位）
        let count = 0;
        let endStr = 0;
        let pattern = /[^\x00-\xff]/;
        for (let i = 0; i < byte; i++) {
            let temp = str.substr(i, 1);
            if (pattern.exec(temp) != null) {
                count += 2;
            } else {
                count += 1;
            }

            if (count > byte) {
                break;
            } else {
                endStr++;
            }
        }
        return str.substring(0, endStr) + mark;
    },
    countString(str, mark) {// 统计某个字符出现的次数
        return str.split(mark).length - 1;
    },
    countStringIndex(str, mark) {// 统计某个字符出现的索引位置组成新数组返回
        let index = str.indexOf(mark);
        let result = [];
        while (index !== -1) {
            result.push(index);
            index = str.indexOf(mark, index + 1);
        }
        return result;
    },
    countAllString(str, callback) {// 统计所有字符出现的次数
        let obj = {};
        for (let i = 0; i < str.length; i++) {
            if (!obj[str.charAt(i)]) {
                obj[str.charAt(i)] = 1;
            } else {
                obj[str.charAt(i)]++;
            }
        }

        callback && callback(obj);
        return obj;
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
    replacePath(content, targets, paths) {// 替换文本类容中的所有目标路径
        let obj = {}
        if (targets instanceof Array) {
            targets.forEach((item, index) => {
                obj[item] = paths[index];
            })
        } else {
            Object.assign(obj, targets)
        }

        for (let key in obj) {
            content = content.replace(new RegExp(key, "ig"), obj[key]);
        }
        return content;
    },
    spliceString(str, index, mark) {// 指定拆分位置拼接后返回新字符串
        let start = str.substring(0, index);
        let end = str.substring(index);
        return start + mark + end;
    }
}
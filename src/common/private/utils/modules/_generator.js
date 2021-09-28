export default {
    /**
     * @param {array} locations 预链接地址
     */
    createPreconnect(locations) {
        for (let i = 0; i < locations.length; i++) {
            let el = document.createElement("link");
            el.rel = "preconnect";
            el.href = locations[i].href || locations[i];
            document.head.appendChild(el);
            /* 兼容 */
            let el2 = document.createElement("link");
            el2.rel = "dns-prefetch";
            el2.href = locations[i].href || locations[i];
            document.head.appendChild(el2);
        }
        console.info('%c preconnect success!', 'color:#0099ff');
    },
    /**
     * @param {array} resources 预加载资源数据
     * 
     * @property {as,href} 
     * as 资源类型，默认为image
     * href 资源地址
     */
    createPreload(resources) {
        for (let i = 0; i < resources.length; i++) {
            let el = document.createElement("link");
            el.rel = "preload";
            el.as = resources[i].as || 'image';
            el.href = resources[i].href || resources[i];
            document.head.appendChild(el);
        }
        console.info('%c preload success!', 'color:#0099ff');
    },
    /**
     * @param {array} resources 异步加载脚本资源
     * 
     */
    createAsyncLoadScript(resources) {
        for (let i = 0; i < resources.length; i++) {
            let el = document.createElement("script");
            el.type = "text/javascript";
            el.src = resources[i].src || resources[i];
            document.head.appendChild(el);
        }
        console.info('%c asyncload script success!', 'color:#0099ff');
    },
    min(arr) {// 获取数组中最小值
        return Math.min.apply(this, arr);
    },
    max(arr) {// 获取数组中最大值
        return Math.max.apply(this, arr);
    },
    sum(arr) {// 累计数组中值的和
        return arr.reduce((total, num) => {
            return total += num;
        })
    },
    range(min, max, isContainMax = true) {// 获取随机范围数，默认包含最大值
        return Math.floor(Math.random() * (max - min + (!!isContainMax)) + min);
    },
    rangeMax(min, max) {// 获取随机范围数，仅含最大值
        return Math.ceil(Math.random() * (max - min) + min);
    },
    color() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += (Math.random() * 16 | 0).toString(16);
        }
        return color;
    },
    rgba(value = 255, opacity = 1) {
        let r = Math.ceil(Math.random() * value);
        let g = Math.ceil(Math.random() * value);
        let b = Math.ceil(Math.random() * value);
        let a = opacity >= 0 ? opacity : parseFloat(Math.random() * 1).toFixed(2);
        return `rgba(${r},${g},${b},${a})`;
    },
    captcha(min = 4, max = 6, isRandomDigit = true) {// 随机获取验证码
        if (typeof max === 'boolean') {
            isRandomDigit = max;
        }

        const characters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];

        // 如果未开启随机位数，则最小值视为验证码位数
        let range = min;
        if (isRandomDigit) {// 随机获取验证码位数
            range = Math.floor(Math.random() * (max - min + 1) + min);
        }

        let codes = [];
        for (let i = 0; i < range; i++) {
            let index = Math.floor(Math.random() * characters.length);
            codes.push(characters[index]);
        }

        return codes.join();
    },
    rate(num, isHalf = false) {
        let tempArr = [];
        for (let i = 0; i < Math.floor(num); i++) {// 生产全星
            tempArr.push("★");
        }
        if (isHalf && (num % 1) !== 0) {// 判断是否生成半星
            let floatArr = num.toFixed(1).split(".");
            let floatStr = floatArr[1];
            tempArr.push(floatStr);
        }
        while (tempArr.length < 5) {// 补全剩余的空星
            tempArr.push("☆");
        }
        return tempArr.join("");
    },
}
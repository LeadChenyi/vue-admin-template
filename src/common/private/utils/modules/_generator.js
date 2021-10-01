export default {
    preconnect(locations) {// 预链接地址
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
    },
    preload(resources) {// 预加载资源
        for (let i = 0; i < resources.length; i++) {
            let el = document.createElement("link");
            el.rel = "preload";
            el.as = resources[i].as || 'image';
            el.href = resources[i].href || resources[i];
            document.head.appendChild(el);
        }
    },
    asyncLoadScript(resources) {// 异步加载脚本资源
        for (let i = 0; i < resources.length; i++) {
            let el = document.createElement("script");
            el.type = "text/javascript";
            el.src = resources[i].src || resources[i];
            document.head.appendChild(el);
        }
    },
    color(value = 16) {// 随机获取颜色值
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += ((Math.random() * value) | 0).toString(16);
        }
        return color;
    },
    rgba(value = 255, opacity = 1) {// 随机获取颜色值
        let r = Math.ceil(Math.random() * value);
        let g = Math.ceil(Math.random() * value);
        let b = Math.ceil(Math.random() * value);
        let a = opacity >= 0 ? opacity : parseFloat(Math.random() * 1).toFixed(2);
        return `rgba(${r},${g},${b},${a})`;
    },
    captcha(min = 4, max, characters) {// 随机获取验证码
        if (max && max > min) {// 验证码位数默认值为min值，如果max值大于min值，那么将在min与max范围内随机验证码位数
            min = Math.floor(Math.random() * (max - min + 1) + min);
        }

        if (characters) {
            characters = [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
            ];
        }

        const result = [];
        for (let i = 0; i < min; i++) {
            let index = Math.floor(Math.random() * characters.length);
            result.push(characters[index]);
        }

        return result.join();
    },
    star(value, isHalf = false) {// 获取星星
        let result = [];
        for (let i = 0; i < Math.floor(value); i++) {// 生产全星
            result.push("★");
        }
        if (isHalf && (value % 1) !== 0) {// 判断是否生成半星
            let floatArr = value.toFixed(1).split(".");
            let floatStr = floatArr[1];
            result.push(floatStr);
        }
        while (result.length < 5) {// 补全剩余的空星
            result.push("☆");
        }
        return result.join("");
    },
    rate(value, rates) {// 获取评价
        if (!rates) {
            rates = [
                { text: "极差", color: "#95989D" },
                { text: "失望", color: "#67C23A" },
                { text: "一般", color: "#E7A644" },
                { text: "满意", color: "#409EFF" },
                { text: "惊喜", color: "#F56C6C" }
            ];
        }
        return rates[Math.floor(value) - 1];
    }
}
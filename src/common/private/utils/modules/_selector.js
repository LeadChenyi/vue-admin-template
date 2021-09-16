export default {
    el(el) {
        if (typeof el !== "string") {
            throw new Error('请传递正确参数');
        }

        let str = el.charAt(0);
        if (str === "#") {
            return document.querySelector(el);
        } else {
            return document.querySelectorAll(el);
        }
    },
    setClassName(obj, name) {
        obj.className ? (obj.className = name) : obj.setAttribute("class", name);
    },
    getStyleAttr(obj, attr) {//获取样式属性值
        return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, null)[attr];
    },
    getScrollAttr() {
        return document.body ? {
            scrollTop: document.body.scrollTop,
            scrollLeft: document.body.scrollLeft
        } : {
            scrollTop: document.documentElement.scrollTop,
            scrollLeft: document.documentElement.scrollLeft
        }
    },
    getOffsetAttr() {
        return document.body ? {
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        } : {
            width: document.documentElement.offsetWidth,
            height: document.documentElement.offsetHeight
        }
    },
    getClientAttr() {
        return document.body ? {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        } : {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    },
    getEvent(e) {
        return {
            target: (e.srcElement ? e.srcElement : e.target),
            key: (e.keyCode || e.charCode || e.which),
            x: (e.x ? e.x : e.pageX),
            y: (e.y ? e.y : e.pageY)
        }
    },
    stopPre(e) {
        //阻止事件冒泡
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        //阻止默认行为
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
}
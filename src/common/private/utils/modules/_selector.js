export default {
    el(el) {
        if (typeof el !== "string") {
            throw new Error('Please pass a valid argument：$utils.el() <el>');
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
    getStyleAttribute(obj, attribute) {
        return obj.currentStyle ? obj.currentStyle[attribute] : window.getComputedStyle(obj, null)[attribute];
    },
    getScrollValue() {
        return document.body ? {
            scrollTop: document.body.scrollTop,
            scrollLeft: document.body.scrollLeft
        } : {
            scrollTop: document.documentElement.scrollTop,
            scrollLeft: document.documentElement.scrollLeft
        }
    },
    getOffsetValue() {
        return document.body ? {
            top: document.body.offsetTop,
            left: document.body.offsetLeft,
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        } : {
            top: document.documentElement.offsetTop,
            left: document.documentElement.offsetLeft,
            width: document.documentElement.offsetWidth,
            height: document.documentElement.offsetHeight
        }
    },
    getClientValue() {
        return document.body ? {
            top: document.body.clientTop,
            left: document.body.clientLeft,
            width: document.body.clientWidth,
            height: document.body.clientHeight
        } : {
            top: document.documentElement.clientTop,
            left: document.documentElement.clientLeft,
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
    stopPrevent(e) {
        // 阻止事件冒泡
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        // 阻止默认行为
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
}
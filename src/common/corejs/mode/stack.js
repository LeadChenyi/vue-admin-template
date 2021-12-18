class Stack {// 栈
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toString() {
        let result = "";
        for (let item of this.items) {
            result += item + " ";
        }
        return result;
    }
}
/**
    push() 添加一个新元素到栈顶位置。
    pop() 移除栈顶的元素，同时返回被移除的元素。
    peek() 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。
    isEmpty() 如果栈里没有任何元素就返回 true，否则返回 false。
    size() 返回栈里的元素个数。这个方法和数组的 length 属性类似。
    toString() 将栈结构的内容以字符串的形式返回。
 */
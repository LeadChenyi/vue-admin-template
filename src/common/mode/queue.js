class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
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
enqueue(item) 向队列尾部添加一个（或多个）新的项。
dequeue() 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
front() 返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息与 Map 类的 peek 方法非常类似）。
isEmpty() 如果队列中不包含任何元素，返回 true，否则返回 false。
size() 返回队列包含的元素个数，与数组的 length 属性类似。
toString() 将队列中的内容，转成字符串形式。
 */
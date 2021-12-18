class List {
    // 链表模式
    next = null;
    constructor(name) {
        this.name = name;
    }
}

let list = new List('张三');
list.next = new List('李四');
list.next.next = new List('王五');

// list.next = list.next.next; // delete 李四

while (list) {
    console.log(list.name);
    list = list.next;
}

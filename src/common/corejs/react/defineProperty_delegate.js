// 对象数据代理
const obj = {
    cname: '此言很差矣',
    age: 18,
};
for (let key in obj) {
    Object.defineProperty(this, key, {
        get() {
            console.log('defineProperty delegate get');
            return obj[key];
        },
        set(value) {
            console.log('defineProperty delegate set');
            obj[key] = value;
        },
    });
}

console.log(obj.cname); // 不会触发get计数器，因为监听目标指向的是this
console.log(this.cname);
this.age = 24;

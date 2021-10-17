// 对象数据代理
const obj = {
    cname: '此言很差矣',
    age: 18
};
for (let key in obj) {
    Object.defineProperty(this, key, {
        get() {
            console.log('defineProperty delegate get')
            return obj[key];
        },
        set(value) {
            console.log('defineProperty delegate set')
            obj[key] = value;
        }
    })
}

console.log(obj.cname)
console.log(this.cname)     // 被挂载到global
this.age = 24;
// 对象数据代理
const obj = {
    cname: "此言很差矣",
    age: 18
}

this = new Proxy(obj, {
    get(target, key, receiver) {
        console.log('proxy watch get', receiver)
        return target[key];
    },
    set(target, key, value) {
        console.log('proxy watch set')
        target[key] = value;
    }
})

this.cname;
this.age = 24;
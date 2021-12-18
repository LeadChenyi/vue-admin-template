// 对象数据监听及代理2
const obj = {
    cname: '此言很差矣',
    age: 18,
};

const proxy = new Proxy(obj, {
    get(target, key, receiver) {
        console.log('proxy reflect delegate get', receiver);
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        console.log('proxy reflect delegate set');
        Reflect.set(target, key, value);
    },
});

proxy.cname;
proxy.age = 24;

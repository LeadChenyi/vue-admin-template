// 对象数据监听及代理1
const obj = {
    cname: '此言很差矣',
    age: 18,
};

const proxy = new Proxy(obj, {
    get(target, key, receiver) {
        console.log('proxy delegate get', receiver);
        return target[key];
    },
    set(target, key, value) {
        console.log('proxy delegate set');
        target[key] = value;
    },
});

proxy.cname;
proxy.age = 24;

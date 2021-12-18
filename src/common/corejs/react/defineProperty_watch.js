// 对象数据监听
const obj = {
    cname: '此言很差矣',
    age: 18,
};

for (let key in obj) {
    Object.defineProperty(obj, key, {
        get() {
            console.log('defineProperty watch get');
            console.log(key);
        },
        set(value) {
            console.log('defineProperty watch set');
            console.log(value);
        },
    });
}

obj.cname;
obj.age = 24;

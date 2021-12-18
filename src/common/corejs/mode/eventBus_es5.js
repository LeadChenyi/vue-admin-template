// 共享事件触发器
function EventBus() {
    this.listeners = {};
}

// 监听事件
EventBus.prototype.on = function(type, cb) {
    if (!this.listeners[type]) {
        this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
};

// 派遣事件
EventBus.prototype.emit = function(type, ...args) {
    // 形参 “...” 为合并
    if (this.listeners[type]) {
        this.listeners[type].forEach((cb) => {
            cb(...args); // 实参 “...” 为解构
        });
        return false;
    }
    console.log(`未注册${type}监听事件或已被移除！`);
};

// 监听事件单项移除
EventBus.prototype.off = function(type, cb) {
    if (this.listeners[type]) {
        let index = this.listeners[type].findIndex((item) => item === cb);
        if (index !== -1) {
            // 回调函数存在则移除
            this.listeners[type].splice(index, 1);
        }

        if (!this.listeners[type].length) {
            // 如果没有回调函数了即代表没有注册的监听事件，将其整个清除
            delete this.listeners[type];
        }
    }
};

// 监听事件全部清除
EventBus.prototype.clear = function(type) {
    if (this.listeners[type]) {
        delete this.listeners[type];
    }
};

const eb = new EventBus();
eb.on('showMessage', function(a, b, c) {
    console.log(`${a} & ${b} - ${c}`);
});
eb.emit('showMessage', '事件共享', '订阅观察者', '模式');

function removeCallback(a, b, c) {
    console.log(`${a} & ${b} - ${c}`);
}
eb.on('remove', removeCallback);
eb.off('remove', removeCallback);
eb.emit('remove', 'test');

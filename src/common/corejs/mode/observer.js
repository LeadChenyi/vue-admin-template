class Observer {
    // 观察者模式
    constructor(cb) {
        if (typeof cb === 'function') {
            this.cb = cb;
        } else {
            throw new Error('Observer构造器必须传入函数类型！');
        }
    }

    update() {
        this.cb();
    }
}

class Watcher {
    // 监听观察者
    constructor() {
        this.observerList = [];
    }

    addObserver(observer) {
        this.observerList.push(observer);
    }

    notify() {
        this.observerList.forEach((observer) => {
            observer.update();
        });
    }
}

const w = new Watcher();
w.addObserver(
    new Observer(function() {
        console.log('广播1...');
    })
);
w.addObserver(
    new Observer(function() {
        console.log('广播2...');
    })
);
w.notify();

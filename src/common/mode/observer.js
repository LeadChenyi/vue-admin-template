class Observer {// 观察者模式
    constructor(cb) {
        if (typeof cb === 'function') {
            this.cb = cb
        } else {
            throw new Error('Observer构造器必须传入函数类型！')
        }
    }

    update() {
        this.cb()
    }
}

class Watcher {// 监听器
    constructor() {
        this.observerList = []
    }

    addObserver(observer) {
        this.observerList.push(observer)
    }

    notify() {
        this.observerList.forEach(observer => {
            observer.update()
        })
    }
}
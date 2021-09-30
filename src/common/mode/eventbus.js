class EventBus {// 公共事件触发器
    constructor() {
        this.listeners = {}
    }

    on(type, cb) {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }
        this.listeners[type].push(cb)
    }

    emit(type, ...args) {
        if (this.listeners[type]) {
            this.listeners[type].forEach(cb => {
                cb(...args)
            })
        }
    }

    off(type, cb) {
        if (this.listeners[type]) {
            const targetIndex = this.listeners[type].findIndex(item => item === cb)
            if (targetIndex !== -1) {
                this.listeners[type].splice(targetIndex, 1)
            }
            if (this.listeners[type].length === 0) {
                delete this.listeners[type]
            }
        }
    }

    clear(type) {
        if (this.listeners[type]) {
            delete this.listeners[type]
        }
    }
}
/**
 * https://juejin.cn/post/6844904018964119566#heading-0
 */
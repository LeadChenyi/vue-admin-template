const built = {
    runCall(context, ...args) {
        context = context || window
        let fn = Symbol()
        context[fn] = this
        let result = context[fn](...args)
        delete context[fn]
        return result
    },
    runApply(context) {
        context = context || window
        let fn = Symbol()
        context[fn] = this
        let result
        if (arguments[1]) {
            result = context[fn](...arguments[1])
        } else {
            result = context[fn]()
        }
        delete context[fn]
        return result
    },
    runBind(context, ...args) {
        if (!context || context === null) {
            context = window;
        }
        let fn = Symbol();
        context[fn] = this;
        let _this = this;
        const result = function (...innerArgs) {
            if (this instanceof _this === true) {
                this[fn] = _this;
                this[fn](...[...args, ...innerArgs]);
                delete this[fn];
            } else {
                context[fn](...[...args, ...innerArgs]);
                delete context[fn];
            }
        };
        result.prototype = Object.create(this.prototype);
        return result;
    },
    runNew(fn, ...args) {
        let obj = Object.create(fn.prototype);
        let res = fn.call(obj, ...args);
        if (res && (typeof res === "object" || typeof res === "function")) {
            return res;
        }
        return obj;
    }
}
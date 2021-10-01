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

function Parent(name) {
    this.name = name;
}
Parent.prototype.eat = function () {
    console.log(`${this.name} eatting`);
}
function Children(name, score) {
    Parent.call(this, name);
    this.score = score;
}

Children.prototype = Object.create(Parent.prototype);   // 继承父类的原型方法二选一
Children.prototype = new Parent();                      // 继承父类的原型方法二选一
Children.prototype.constructor = Children;              // 将原型链指针指回该级构造函数
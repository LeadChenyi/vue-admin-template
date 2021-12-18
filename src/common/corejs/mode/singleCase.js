class Single {
    instance = null; // 等同于 constructor 中 this.instance = null;
    constructor() {
        // this.instance = null;
    }

    static createInstance() {
        if (!this.instance) {
            console.log('仅首次实例化');
            this.instance = new Single();
        }

        return this.instance;
    }
}
Single.createInstance();
console.log(Single.createInstance());

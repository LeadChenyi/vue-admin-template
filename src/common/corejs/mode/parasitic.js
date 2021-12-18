// 寄生组合模式
function Parent(name) {
    this.name = name;
}
Parent.prototype.eat = function() {
    console.log(`${this.name} eatting`);
};
function Children(name, score) {
    Parent.call(this, name);
    this.score = score;
}

Children.prototype = Object.create(Parent.prototype); // 继承父类的原型方法二选一
Children.prototype = new Parent(); // 继承父类的原型方法二选一
Children.prototype.constructor = Children; // 将原型链指针指回该级构造函数

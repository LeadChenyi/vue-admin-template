class Operation {
    // 代理运算
    delegate = null;
    action(n, m) {
        return this.delegate.calc(n, m);
    }
}

class Sum {
    calc(n, m) {
        return n + m;
    }
}

class Mul {
    calc(n, m) {
        return n * m;
    }
}

const d = new Operation();
d.delegate = new Sum();
console.log(d.action(2, 3));
d.delegate = new Mul();
console.log(d.action(2, 3));

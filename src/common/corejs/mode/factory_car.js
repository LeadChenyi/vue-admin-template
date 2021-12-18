// 工厂模式
const carType = {
    Audi: 'Audi',
    Benz: 'Benz',
    Bmw: 'Bmw',
};

class Car {
    instance = null;

    static create(type) {
        switch (type) {
            case carType.Audi:
                this.instance = new Audi();
                break;
            case carType.Benz:
                this.instance = new Benz();
                break;
            case carType.Bmw:
                this.instance = new Bmw();
                break;
        }

        return this.instance;
    }
}

class Audi extends Car {}
class Benz extends Car {}
class Bmw extends Car {}

const audi = Car.create(carType.Audi);
console.log(audi);

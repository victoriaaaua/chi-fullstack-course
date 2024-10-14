//Реалізувати простий шаблон проєктування "Фабрика" (Factory), 
//який створює об'єкти різних типів (наприклад, Car і Bike).
// Ці об'єкти мають методи ride() та stop(), базовий клас повинен називатися Transport.

class Transport {
    ride() {
        throw new Error("ride() not implemented!");
    }

    stop() {
        throw new Error("stop() not implemented!");
    }
}

class Car extends Transport {
    constructor() {
        super();
        this.type = "car";
    }

    ride() {
        console.log(`The ${this.type} is moving!`);
    }

    stop() {
        console.log(`The ${this.type} has stopped!`);
    }
}

class Bike extends Transport {
    constructor() {
        super();
        this.type = "bike";
    }

    ride() {
        console.log(`The ${this.type} is moving!`);
    }

    stop() {
        console.log(`The ${this.type} has stopped!`);
    }
}


class TransportFactory {
    static createTransport(type) {
        switch(type) {
            case "car":
                return new Car();
            case "bike":
                return new Bike();
            default:
                throw new Error("Unknown type of transport");
        }
    }
}


const car = TransportFactory.createTransport("car");
car.ride();
car.stop();

const bike = TransportFactory.createTransport("bike");
bike.ride();
bike.stop();
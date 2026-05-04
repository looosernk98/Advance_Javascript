
// We have a class or "concrete factory" for each vehicle type
class Car{
    constructor(){
       this.name = "Car";
       this.wheels = 4;
    }
    turnOn = () => console.log("Car starts")
}

class Truck{
    constructor(){
       this.name = "Truck";
       this.wheels = 8;
    }
    turnOn = () => console.log("Truck starts")
}

class MotorCycle{
    constructor(){
       this.name = "MotorCycle";
       this.wheels = 2;
    }
    turnOn = () => console.log("MotorCycle starts")
}

// And and abstract factory that works as a single point of interaction for our clients
// Given the type parameter it receives, it will call the corresponding concrete factory

const vehicleFactory = {
    createVehicle: function (type){
        switch(type){
            case "car":
                return new Car()
            case "truck":
                return new Truck()
            case "motorcycle":
                return new MotorCycle()
            default:
                return null;
        }
    }
}

const car = vehicleFactory.createVehicle("car")
console.log('car wheels: ', car.wheels);

const truck = vehicleFactory.createVehicle("truck");
console.log('truck wheels: ', truck.wheels);

const motorcycle = vehicleFactory.createVehicle("motorcycle")
console.log('motorcycle wheels: ', motorcycle.wheels);



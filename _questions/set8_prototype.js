
//============================ Problem 1: Prototype Inheritance ==========================================

function Animal(name) {
  this.name = name;
}

Animal.prototype.sound = function () {
  console.log("Some generic sound");
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.sound = function () {
  console.log(this.name + " says Woof!");
};

const animal = new Animal("Generic Animal");
const dog = new Dog("Buddy", "Golden Retriever");

console.log(animal.sound()); // Output ?
console.log(dog.sound());    // Output ?
console.log(dog.__proto__ === Dog.prototype);           // Output ?
console.log(dog.__proto__.__proto__ === Animal.prototype); // Output ?
console.log(dog instanceof Dog);     // Output ?
console.log(dog instanceof Animal);  // Output ?
console.log(dog instanceof Object);  // Output ?

//============================= Problem 2: Modifying the Prototype ==============================================

function Car(make) {
  this.make = make;
}

Car.prototype.speed = 120;

const car1 = new Car("Toyota");
const car2 = new Car("Ford");

car1.speed = 150;

console.log(car1.speed); // Output ?
console.log(car2.speed); // Output ?

Car.prototype.speed = 180;

console.log(car1.speed); // Output ?
console.log(car2.speed); // Output ?


//======================== Problem 3: hasOwnProperty and Inheritance ===================================================

function Parent() {
  this.name = "Parent";
}

Parent.prototype.age = 50;

const child = new Parent();
child.name = "Child";

console.log(child.hasOwnProperty("name")); // Output ?
console.log(child.hasOwnProperty("age"));  // Output ?
console.log("name" in child);              // Output ?
console.log("age" in child);               // Output ?


//======================== Problem 4: Custom Prototype Chains ===================================================

const grandParent = { species: "Mammal" };
const parent = Object.create(grandParent);
parent.type = "Human";

const child = Object.create(parent);
child.name = "John";

console.log(child.name);         // Output ?
console.log(child.type);         // Output ?
console.log(child.species);      // Output ?
console.log(child.hasOwnProperty("type")); // Output ?
console.log(child.__proto__ === parent);   // Output ?
console.log(parent.__proto__ === grandParent); // Output ?
console.log(grandParent.__proto__ === Object.prototype); // Output ?
console.log(Object.prototype.__proto__); // Output ?


//========================== Problem 5: Shadowing on Prototype Chain =================================================

function Machine(type) {
  this.type = type;
}

Machine.prototype.power = "100W";

const robot = new Machine("Robot");
robot.power = "200W";

console.log(robot.power);             // Output ?
delete robot.power;
console.log(robot.power);             // Output ?
delete robot.power;
console.log(robot.power);             // Output ?



//============================= Problem 6: Dynamic Changes to the Prototype ==============================================

function Laptop(brand) {
  this.brand = brand;
}

Laptop.prototype.ram = "8GB";

const myLaptop = new Laptop("Dell");

Laptop.prototype.ram = "16GB";
console.log(myLaptop.ram); // Output ?

myLaptop.ram = "32GB";
delete myLaptop.ram;

console.log(myLaptop.ram); // Output ?


//========================== Problem 7: Functions as Constructors =================================================

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const john = new Person("John");

Person.prototype = {
  greet: function () {
      console.log(`Hi, this is a new prototype method`);
  },
};

const jane = new Person("Jane");

john.greet(); // Output ?
jane.greet(); // Output ?
console.log(john instanceof Person); // Output ?
console.log(jane instanceof Person); // Output ?


//========================== Problem 8: Circular References =================================================
const obj1 = {};
const obj2 = {};

obj1.__proto__ = obj2;
obj2.__proto__ = obj1;

console.log(obj1.isPrototypeOf(obj2)); // Output ?
console.log(obj2.isPrototypeOf(obj1)); // Output ?
console.log(obj1.__proto__ === obj2);  // Output ?
console.log(obj2.__proto__ === obj1);  // Output ?


//========================= Problem 9: Object Methods on the Prototype ================================================

const obj = { a: 1, b: 2 };

Object.prototype.showAll = function () {
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            console.log(`${key}: ${this[key]}`);
        }
    }
};

obj.showAll(); // Output ?

const newObj = Object.create(obj);
newObj.c = 3;
newObj.showAll(); // Output ?

//============================ Problem 10: Class and Prototypes ===============================================

class Parent {
  constructor(name) {
      this.name = name;
  }

  greet() {
      console.log(`Hello from Parent`);
  }
}

class Child extends Parent {
  greet() {
      console.log(`Hello from Child`);
  }
}

const parent = new Parent("Parent");
const child = new Child("Child");

parent.greet();         // Output ?
child.greet();          // Output ?
console.log(child.__proto__ === Child.prototype);        // Output ?
console.log('Child.prototype: ', Child.prototype);
console.log('child.__proto__: ', child.__proto__);
console.log(child.__proto__.__proto__ === Parent.prototype); // Output ?
console.log('Parent.prototype: ', Parent.prototype);
console.log('child.__proto__.__proto__: ', child.__proto__.__proto__);
console.log(child instanceof Child);     // Output ?
console.log(child instanceof Parent);    // Output ?
console.log(child instanceof Object);    // Output ?


/*

The Prototype Pattern is a creational design pattern where new objects are 
created by cloning an existing object (prototype) instead of creating them 
from scratch.

🧠 When to use Prototype Pattern

Use it when:
- Object creation is expensive
- You need many similar objects
- You want to avoid complex constructors
- Objects share a common structure

*/

// prototype object
const vehiclePrototype = {
   init(make, model){
    this.make = make;
    this.model = model;
   },

   getDetails(){
    return `${this.make} ${this.model}`
   }
}

// Create new instances using the prototype
const car1 = Object.create(vehiclePrototype)
car1.init("Toyota", "camry");

const car2 = Object.create(vehiclePrototype)
car2.init("Honda", "civic");

console.log(car1.getDetails()); // Output: 'Toyota Camry'
console.log(car2.getDetails()); // Output: 'Honda Civic'


/*

In this example, we define a vehiclePrototype object with methods and properties 
common to all vehicles. We use Object.create() to create new instances (car1 and 
car2) based on this prototype. These instances inherit the properties and methods 
from the prototype, allowing you to create new objects with shared behavior 
efficiently.

*/



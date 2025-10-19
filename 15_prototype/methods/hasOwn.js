/*
 It checks whether an object has a property directly on itself (not on its 
prototype chain).
*/
const irma = new Person("Irma");

console.log(Object.hasOwn(irma, "name")); // true
console.log(Object.hasOwn(irma, "greet")); // false

// You can also use the non-static Object.hasOwnProperty() method here, but we 
// recommend that you use Object.hasOwn() if you can.
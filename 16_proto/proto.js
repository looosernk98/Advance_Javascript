
/*

__proto__ is a property of Object.prototype that exposes the hidden [[Prototype]] 
property of an object and allows you to access or modify it.

The __proto__ getter function exposes the value of the internal [[Prototype]]
 of an object

 The __proto__ setter allows the [[Prototype]] of an object to be mutated. 
 The value provided must be an object or null.

Object.getPrototypeOf() and Object.setPrototypeOf() are the modern ways of 
getting access to and setting an object’s prototype.



*/

let personA = {
    name:"vinay",
    roll:"34"
}

let student = {
    bag:"1",
    dogs:"32"
}
// personA.prototype = { age: 67}
student.__proto__ = personA   // link one object with another 
console.log('student: ', student);
console.log('personA: ', personA);

console.log('student.prototype', student.prototype)
console.log('student: ', student);
console.log('student.__proto__', student.__proto__)

// console.log(student.name)
console.log(student.prototype == student.__proto__) // false

// console.log(typeof null)



function Test() {
    this.age = 67
}

Test.prototype.myName = function () {
  console.log("myName");
};

const test = new Test();
console.log(test.__proto__ === Test.prototype); // true
test.myName(); // myName

const obj = {};
obj.__proto__ = Test.prototype;
obj.myName(); // myName



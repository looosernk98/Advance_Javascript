/*
 The instanceof operator tests to see if the prototype property of a constructor 
 appears anywhere in the prototype chain of an object. The return value is a 
 boolean value. Its behavior can be customized with Symbol.hasInstance.
*/

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  const auto = new Car('Honda', 'Accord', 1998);
  
  console.log(auto instanceof Car);
  // Expected output: true
  
  console.log(auto instanceof Object);
  // Expected output: true
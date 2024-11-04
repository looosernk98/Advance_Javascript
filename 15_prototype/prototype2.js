

// ***************** Setting a protype ********************

/*
 1. Using Object.create:
 The Object.create() static method creates a new object, using an existing 
 object as the prototype of the newly created object.
*/
const personPrototype = {
    greet() {
      console.log("hello!");
    },
  };
  const carl = Object.create(personPrototype);
  console.log('carl: ', carl);
  carl.greet(); // hello!

//   2. Using a constructor
const personPrototype2 = {
    greet() {
      console.log(`hello, my name is ${this.name}!`);
    },
  };
  
  function Person(name) {
    this.name = name;
  }
  
  Object.assign(Person.prototype, personPrototype2);
  // or
  // Person.prototype.greet = personPrototype.greet;
  
  





  

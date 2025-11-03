/* 
Prototypes are the mechanism by which JavaScript objects inherit 
features from one another.

In JavaScript, every function and object has a property named prototype by default.

  ==> only functions provide prototype as property (prototype is like a free 
      space and empty object)

  1.All JavaScript objects inherit properties and methods from a prototype.
  2.you can not add a new property to an existing object constructor

  Every object in JavaScript has a built-in property, which is called its prototype. 
  The prototype is itself an object, so the prototype will have its own prototype, 
  making what's called a prototype chain. The chain ends when we reach a 
  prototype that has null for its own prototype.

-> Date objects inherit from Date.prototype
-> Array objects inherit from Array.prototype
-> Person objects inherit from Person.prototype

The Object.prototype is on the top of the prototype inheritance chain:

Date objects, Array objects, and Person objects inherit from Object.prototype

*/

// Sometimes you want to add new properties (or methods) to all existing objects 
// of a given type.

// Sometimes you want to add new properties (or methods) to an object constructor.

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
  
  Person.prototype.nationality = "English";
  
  // The JavaScript prototype property also allows you to add new methods to objects constructors:
  Person.prototype.name = function() {
    return this.firstName + " " + this.lastName;
  };
  const per = new Person("niru", "kumar",23,"red")
  // console.log('per: ', per);
  console.log(Object.getPrototypeOf(per));
  // per.__proto__ = {
  //   hello:function(){
  //     console.log("hello");
  //   }
  // }
  Object.setPrototypeOf(per, {
    hello:function(){
      console.log("hello");
    }
  })
  console.log("PROTO:", Object.getPrototypeOf(per));
  const per2 = new Person("pta", "kumar",26,"greebn")
  // console.log('per2: ', per2);
  console.log(Object.getPrototypeOf(per2));


  
  // Only modify your own prototypes. Never modify the prototypes of standard JavaScript objects.
  
  var str = "name";
  var strobj = new Object("strt");
  strobj.add = 123
  // console.log( typeof str);
  // console.log( typeof strobj, strobj.add);
  
  
  // ************************* Prototype inheritence *************************
  
  // In JavaScript, a prototype can be used to add properties and methods to a 
  // constructor function. And objects inherit properties and methods from a prototype.
  
  // creating objects
  const person1 = new Person();
  const person2 = new Person('rahul', 'gandhi',56, 'red');
  
  // adding property to constructor function later after instance has been created already
  Person.prototype.gender = 'male';
  
  // adding method to constructor function
  Person.prototype.printFullName = () => {
    console.log('fullname:', this.firstName + " "+ this.lastName);
  }
  
  // prototype value of Person
  console.log(Person.prototype);
  
  // inheriting the property from prototype
  console.log(person1.gender); // 
  console.log(person2.gender);
  console.log('person2: ', person2);

//   Why does adding properties later work?

// Because person1.__proto__ is a reference to the exact Person.prototype object.
// It’s not a copy — it’s a live link.
  
  /*
    NOTE: Prototype is used to provide additional property to all the objects 
          created from a constructor function.
  */
  
  // ************************ Changing Prototype *************************
  
  /*
    If a prototype value is changed, then all the new objects will have the 
    changed property value. All the previously created objects will have the 
    previous value.
  */
  // constructor function
  function Person() {
    this.name = 'John'
  }
  
  // add a property
  Person.prototype.age = 20;
  
  // creating an object
  const person3 = new Person();
  
  console.log(person3.age); // 20
  
  // changing the property value of prototype
  Person.prototype = { age: 50 }
  
  // creating new object
  const person4 = new Person();
  
  console.log(person4.age); // 50
  console.log(person3.age); // 20
  
  
  // ************************ JavaScript Prototype Chaining ***********************
  
  /*
   If an object tries to access the same property that is in the constructor 
   function and the prototype object, the object takes the property from the 
   constructor function. For example,
  
  */
  function User() {
    this.name = 'John'
  }
  
  // adding property 
  User.prototype.name = 'Peter';
  User.prototype.age = 23
  
  const user = new User();
  
  console.log(user.name); // John
  console.log(user.age); // 23
  
  
  // Note: You can also access the prototype property of a constructor function from an object.
  
  // accessing prototype property
  console.log(user.__proto__);   // { name: 'Peter', age: 23  }


// wrong, User is a constructor function, not object so can't access it's prototype 
// using proto and getProtoTypeOf. you can access using prototype property
  console.log(User.__proto__); 



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

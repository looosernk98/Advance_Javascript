
// https://www.tutorialsteacher.com/javascript/new-keyword-in-javascript

// The new keyword ignores return statement that returns primitive value.
function MyFunc() {
    this.x = 100;
    
    return 200;
}

var obj = new MyFunc();
console.log('obj: ', obj);
console.log(obj.x); // 100

function Person(name, age) {
  // 1. new {} is created
  // 2. {}.__proto__ = Person.prototype
  // 3. this = {}
  this.name = name;
  this.age = age;
  // 4. return this (unless constructor explicitly returns an object)
}


/*

Here's what happens behind the scenes when the new keyword is used:

-> A new object is created: The new keyword initiates the creation of a new JavaScript object.

-> A prototype is linked: The newly created object gets linked to the prototype 
  property of the constructor function.This means that it has access to properties
  and methods defined on the constructor's prototype.

-> Bind 'this' & constructor is called: The constructor function is called with the specified 
arguments and this is bound to the newly created object. If no explicit return 
value is specified from the constructor. JavaScript assumes this, the newly 
created object, to be intended return value

-> The new object is returned: After the constructor function has been called, 
   if it doesn't return a non-primitive value (object, array, function, etc.), 
   the newly created object is returned.

*/

/*

How to Prevent Functions From Being Called Without new ?

If you are using traditional functions instead of ES6 classes, you can use 
two main techniques to enforce safe instantiation.

Method 1: The Modern Way (new.target)Introduced in ES6,

-> new.target is a meta-property available in all functions.If a function is 
called with new, new.target references the constructor function itself.

-> If called without new, new.target is undefined.

function User(name) {
    if (!new.target) {
        throw new TypeError("User must be called with the 'new' keyword");
    }
    this.name = name;
}

Method 2: The Traditional Way (instanceof):

function User(name) {
    if (!(this instanceof User)) {
        // Option A: Throw an error
        throw new TypeError("Must use new");
        
        // Option B: Autocorrect and call 'new' for the user
        // return new User(name); 
    }
    this.name = name;
}



*/
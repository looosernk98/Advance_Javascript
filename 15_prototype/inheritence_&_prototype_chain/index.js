/*

In programming, inheritance refers to passing down characteristics from a parent 
to a child so that a new piece of code can reuse and build upon the features of an 
existing one. JavaScript implements inheritance by using objects. Each object has an 
internal link to another object called its prototype. That prototype object has a 
prototype of its own, and so on until an object is reached with null as its prototype. 

By definition, null has no prototype and acts as the final link in this prototype 
chain. It is possible to mutate any member of the prototype chain or even swap out 
the prototype at runtime, so concepts like static dispatching do not exist in 
JavaScript.





*/


// *********************** Inheriting properties ********************
const o = {
    a: 1,
    b: 2,
    // __proto__ sets the [[Prototype]]. It's specified here
    // as another object literal.
    __proto__: {
      b: 3,
      c: 4,
      __proto__: {
        d: 5,
      },
    },
  };
  
  // { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> { d: 5 } ---> Object.prototype ---> null
  
  console.log(o.d); // 5



// *********************** Inheriting "methods" ********************
  
/*
 When an inherited function is executed, the value of this points to
 the inheriting object, not to the prototype object where the function
 is an own property.

*/

const parent = {
    value: 2,
    method() {
      return this.value + 1;
    },
  };
  
  console.log(parent.method()); // 3
  // When calling parent.method in this case, 'this' refers to parent
  
  // child is an object that inherits from parent
  const child = {
    __proto__: parent,
  };
  console.log(child.method()); // 3
  // When child.method is called, 'this' refers to child.
  // So when child inherits the method of parent,
  // The property 'value' is sought on child. However, since child
  // doesn't have an own property called 'value', the property is
  // found on the [[Prototype]], which is parent.value.
  
  child.value = 4; // assign the value 4 to the property 'value' on child.
  // This shadows the 'value' property on parent.
  // The child object now looks like:
  // { value: 4, __proto__: { value: 2, method: [Function] } }
  console.log(child.method()); // 5
  // Since child now has the 'value' property, 'this.value' means
  // child.value instead
  

  const user = {
    name: 'abc',
    __proto__:{
        print(){
            console.log(this.name);
        }
    }
  }

  console.log("BOOLEAN:", Object.getPrototypeOf(user) == user.__proto__);
  console.log('user.__proto__: ', user.__proto__);
  console.log('user.prototype: ', user.prototype);
  console.log('Object.getPrototypeOf(user): ', Object.getPrototypeOf(user));

  function User(name){
    // Every instance created from a constructor function will automatically have the constructor's prototype 
    this.name = name
  }
  Object.assign(User.prototype, { age: 24})
  const user1 = new User("abcd")
  console.log('user1.prototype: ',user1.prototype);
  console.log("user1.__proto__: ",user1.__proto__);
  console.log("User.prototype:",User.prototype);




  //****************************************************************************************/

  class Box {
    constructor(value) {
      this.value = value;
    }
  
    // Methods are created on Box.prototype
    getValue() {
      return this.value;
    }
  }
/*

Classes are syntax sugar over constructor functions, which means you can still 
manipulate Box.prototype to change the behavior of all instances. However, because
classes are designed to be an abstraction over the underlying prototype mechanism

*/
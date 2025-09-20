/*
 =========================== Property flags ==========================

 Object properties, besides a value, have three special attributes 
 (so-called “flags”):

 1. writable – if true, the value can be changed, otherwise it’s read-only.
 2. enumerable – if true, then listed in loops, console.log, otherwise not listed.
 3. configurable – if true, the property can be deleted and these attributes 
                   can be modified, otherwise not.


We didn’t see them yet, because generally they do not show up. When we create a 
property “the usual way”, all of them are true. But we also can change them 
anytime.

======================= Property Descriptors ===========================

A property descriptor is an object that describes the attributes of a property. 
These descriptors can be accessed and modified using 
Object.getOwnPropertyDescriptor and Object.defineProperty.

There are two types of property descriptors:

1. Data Descriptor: Defines a property with a value and optional writable, 
                    enumerable, and configurable characteristics.
2. Accessor Descriptor: Defines a property with getter and/or setter functions 
                        instead of a direct value

The method Object.getOwnPropertyDescriptor allows to query the full information 
about a property.

let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

*/

let user = {
    name: "John"
};
  
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log('descriptor: ', descriptor);

console.log( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
"value": "John",
"writable": true,
"enumerable": true,
"configurable": true
}
*/


/* 
To change the flags, we can use Object.defineProperty.

Object.defineProperty(obj, propertyName, descriptor)
*/

Object.defineProperty(user, "age", {
  value: 20
});

let descriptorObj = Object.getOwnPropertyDescriptor(user, 'age');

console.log(descriptorObj);
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

//*************************** Non-Writable *************************/
// Let’s make user.name non-writable (can’t be reassigned) by changing writable flag:
Object.defineProperty(user,'name', {
    writable:false // now can't be reassigned
})
user.name = "peter" // Error: Cannot assign to read only property 'name'
/*
 Now no one can change the name of our user, unless they apply their own 
 defineProperty to override ours.

 NOTE: Errors appear only in strict mode but still operation will not succeed

let user = { };

Object.defineProperty(user, "name", {
  value: "John",
  // for new properties we need to explicitly list what's true
  enumerable: true,
  configurable: true
});

alert(user.name); // John
user.name = "Pete"; // Error

*/

/*************************** Non-Enumerable **************************/
 
Object.defineProperty(user, 'age', {
    enumerable:false
})

// Now, age key disappears:
for (let key in user) console.log(key); // name

console.log(Object.keys(user)); // [name]

//*************************** Non-configurable *********************/

/*
 A non-configurable property can’t be deleted, its attributes can’t be modified.
 Making a property non-configurable is a one-way road. We cannot change it back 
 with defineProperty.

 Please note: configurable: false prevents changes of property flags and its 
             deletion, while allowing to change its value.
*/

Object.defineProperty(user, 'name', {
    writable:true,
    enumerable:true,
    configurable: false
})

user.name = "alex"; // works fine
delete user.name; // Error
Object.defineProperty(user, 'name', {
    enumerable: false, // does not work bcoz configurable is false
})
Object.defineProperty(user, "name", { value: "harry" }); // does not work

/*
There’s a minor exception about changing flags.

We can change writable: true to false for a non-configurable property, thus 
preventing its value modification (to add another layer of protection). 
Not the other way around though.
*/
Object.defineProperty(user, 'name', {
    writable: false, // does not work bcoz configurable is false
})


/**********************************************************************/
 let person = {
    firstName: "Niranjan",
    lastName: "Kumar"
  };
  
  // Define a computed property "fullName"
  Object.defineProperty(person, "fullName", {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      [this.firstName, this.lastName] = value.split(" ");
    },
    enumerable: true,
    configurable: true
  });
  
  // Calling the getter
  console.log(person.fullName); // Output: Niranjan Kumar
  // Calling the setter
  person.fullName = "John Doe";
  console.log(person.firstName); // Output: John
  console.log(person.lastName);  // Output: Doe

  /*
  IMPORTANT NOTES: 
  Getters: Run every time you access the property, providing computed or transformed 
           values based on other properties.
  Setters: Run when you assign a value to the property, often used for validation 
           or transformation before assigning values to other properties.
  */
  

// ********************* Defining get and set in Object Literals ********************

let userObj = {
    firstName: "Niranjan",
    lastName: "Kumar",
  
    // Getter
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  
    // Setter
    set fullName(value) {
      [this.firstName, this.lastName] = value.split(" ");
    }
  };
  
  // Calling the getter
  console.log(userObj.fullName); // Output: Niranjan Kumar
  
  // Calling the setter
  userObj.fullName = "John Doe";
  console.log(userObj.firstName); // Output: John
  console.log(userObj.lastName);  // Output: Doe

  /*************************** Define many properties at once **************/
  Object.defineProperties(userObj, {
    state: { value: "Delhi", writable: false },
    gender: { value: "male", writable: false },
    // ...
  });


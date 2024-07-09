// function Person() {
//   this.name = 'John'
// }

// // add a property
// Person.prototype.age = 20;

// // creating an object
// const person3 = new Person();

// console.log(person3.age); // 20

// // changing the property value of prototype
// Person.prototype = { age: 50 }

// // creating new object
// const person4 = new Person();

// console.log(person4.age); // 50
// console.log(person3.age); // 20
// console.log(Person.prototype);

const obj1 = {
  name:"rahul",
  ag:23
}

const obj2 = {
  state:{
    // writable: true,
    // // enumerable: false,
    // configurable: true,
    value: "Delhi",
  },
}

const newObj = Object.create(obj1, obj2)
newObj.male = true
console.log('newObj: ', newObj);
console.log('newObj prototype: ', newObj.__proto__);
console.log(newObj.state);



// const normalObj = {
//   name: "hello"
// }
// // console.log(Object.getOwnPropertyDescriptor(normalObj, 'name'));

// Object.defineProperty(normalObj, 'loggedIn', {
//     value:true,
//     enumerable:true,
//     writable:true
// })
// normalObj.loggedIn = false
// const res = Object.getOwnPropertyDescriptor(normalObj, 'loggedIn')
// console.log('res: ', res);
// console.log(normalObj);


const detail = {
    name : 'ravi',
    age:45
}
detail.__proto__.gender = 'male'
// NOTE: we can't add property directly with prototype in case of normal object
// detail.prototype.gender = 'male'
console.log('detail: ', detail);
console.log('prototype: ', Object.getPrototypeOf(detail));
console.log('prototype: ', detail.__proto__);
console.log(detail.gender);



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
// per._proto_ = {
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
console.log('per2: ', per2);
console.log(Object.getPrototypeOf(per2));


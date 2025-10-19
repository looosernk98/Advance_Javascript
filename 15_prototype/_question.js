  const parent = {
    value: 2,
    method() {
      return this.value + 1;
    },
  };

  const child = {
    __proto__: parent,
  };

  console.log("parent.method()", parent.method());
  console.log("before adding value param  child.method()", child.method());
  child.value = 4;
  console.log("After adding value param child.method()", child.method());

  //**************************************************************************************/

//Call and bind
function person(name, age) {
    console.log('this:', this);
    this.name = name;
    this.age = age;
  }
  
  function student_marks(name, age, subject, marks) {
    person.call(this, name, age);
    this.subject = subject;
    this.marks = marks;
  }
  
  function get_percentage() {
    return this.marks / 99;
  }
  let student = new student_marks("Vineet", 20, "Maths", 27);
  console.log('student: ', student);
  console.log(
    `${student.name} has got ${get_percentage.call(student)} in ${
      student.subject
    } subject.`
  );
  
  console.log(
    `${student.name} has got ${get_percentage.bind(student)()} in ${
      student.subject
    } subject.`
  );

  //**************************************************************************************/
  //Overwrite
function person(name, age) {
    this.name = name;
    this.age = age;
    this.get_percentage = get_percentage();
  }
  
  function student_marks(name, age, subject, marks) {
    person.call(this, name, age);
    this.subject = subject;
    this.marks = marks;
    this.get_percentage = get_percentage();
  }
  
  function get_percentage() {
    console.log('this: ', this);
    return this.marks / 99;
  }
  
  let student2 = new student_marks("Vineet", 20, "Maths", 27);
  console.log('student2: ', student2);
  console.log(
    `${student2.name} has got ${student2.get_percentage()} in ${
        student2.subject
    } subject.`
  );
  //**************************************************************************************/

  // Object literals (without the `__proto__` key) automatically
// have `Object.prototype` as their `[[Prototype]]`
const object = { a: 1 };
Object.getPrototypeOf(object) === Object.prototype; // true

// Array literals automatically have `Array.prototype` as their `[[Prototype]]`
const array = [1, 2, 3];
console.log(Object.getPrototypeOf(array) === Array.prototype); // true
console.log(Object.getPrototypeOf(array) === Object.prototype) // false
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype) // true

// RegExp literals automatically have `RegExp.prototype` as their `[[Prototype]]`
const regexp = /abc/;
Object.getPrototypeOf(regexp) === RegExp.prototype; // true


Number.prototype + 1; // 1
Array.prototype.map((x) => x + 1); // []
String.prototype + "a"; // "a"
RegExp.prototype.source; // "(?:)"
Function.prototype()


  //**************************************************************************************/
  function Box(value) {
    this.value = value;
  }
  
  Box.prototype.getValue = function () {
    return this.value;
  };
  const box = new Box(2);
  
  // Mutate Box.prototype after an instance has already been created
  Box.prototype.getValue = function () {
    return this.value * 2;
  };
  const box1 = new Box(2);
  
  console.log("box value after mutating", box.getValue());
  console.log("box1 value after mutating", box1.getValue());

  //**************************************************************************************/

function doSomething() {}

doSomething.prototype.foo = "bar";
const doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:     ", doSomeInstancing.prop); //some value
console.log("doSomeInstancing.foo:      ", doSomeInstancing.foo); // bar
console.log("doSomething.prop:          ", doSomething.prop); // undefined
console.log("doSomething.foo:           ", doSomething.foo); //undefined
console.log("doSomething.prototype.prop:", doSomething.prototype.prop); //undefined
console.log("doSomething.prototype.foo: ", doSomething.prototype.foo); //bar

  //**************************************************************************************/
  let x = {
    a: 1,
    __proto__: {
        b: 1
    }
}
console.log(x.hasOwnProperty('b'))
//Checks down until the null prototype
console.log(x.b)
//Checks down until the null prototype
console.log(x['a'])
  //**************************************************************************************/
  //**************************************************************************************/
  //**************************************************************************************/

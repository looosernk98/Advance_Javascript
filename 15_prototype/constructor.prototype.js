const personPrototype = {
    greet() {
      console.log(`hello, my name is ${this.name}!`);
    },
};
  
  function Person(name) {
    this.name = name;
  }
  
  Object.assign(Person.prototype, personPrototype);
  // or
  // Person.prototype.greet = personPrototype.greet;

  const person = new Person("rahul");
  // console.log('person: ', person);
  // console.log('person proto: ',Object.getPrototypeOf(person))
  console.log('Person fn proto: ', Object.getPrototypeOf(Person), Person.prototype, Person.prototype.constructor);
  console.log(Person.prototype === Object.getPrototypeOf(person));
  // console.log('Person fn proto: ', Object.getPrototypeOf(Person.constructor.prototype), Person.prototype);
  // console.log('Person fn proto: ', Object.getPrototypeOf(Person), Person.prototype);


  
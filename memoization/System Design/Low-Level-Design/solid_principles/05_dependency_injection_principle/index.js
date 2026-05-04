
/*
 The dependency inversion principle is about decoupling software modules. That 
 is, making them as separate from one another as possible.

 The principle states that high-level modules should not depend on low-level 
 modules. Instead, they should both depend on abstractions. Additionally, 
 abstractions should not depend on details, but details should depend on 
 abstractions.

 In simpler terms, this means instead of writing code that relies on specific 
 details of how lower-level code works, you should write code that depends on 
 more general abstractions that can be implemented in different ways.

 This makes it easier to change the lower-level code without having to change 
 the higher-level code.

*/

// ********************************* INCORRECT CODE*****************************
class Animal {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Dog extends Animal {
    bark() {
      console.log('woof! woof!! woof!!');
    }
  }
  
  class Cat extends Animal {
    meow() {
      console.log('meooow!');
    }
  }
  
  function printAnimalNames(animals) {
    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      console.log(animal.name);
    }
  }
  
  const dog = new Dog('Jack');
  const cat = new Cat('Zoey');
  
  const animals = [dog, cat];
  
  printAnimalNames(animals);

  /*
  The code above violates dependency inversion principle because the printAnimalNames 
  function depends on the concrete implementations of Dog and Cat.

  If you wanted to add another animal like an ape, you’d have to modify the printAnimalNames 
  function to handle it.
  */

// ********************************* CORRECT CODE*****************************
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    getName() {
      return this.name;
    }
  }
  
  class Dog extends Animal {
    bark() {
      console.log('woof! woof!! woof!!!');
    }
  }
  
  class Cat extends Animal {
    meow() {
      console.log('meooow!');
    }
  }
  
  function printAnimalNames(animals) {
    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      console.log(animal.getName());
    }
  }
  
  const dog2 = new Dog('Jack');
  const cat2 = new Cat('Zoey');
  
  const animals2 = [dog2, cat2, ape];
  
  printAnimalNames(animals2);

  /*
   In the code above, I created a getName method inside the Animal class. This
   provides an abstraction that the printAnimalNames function can depend on. 
   Now, the printAnimalNames function only depends on the Animal class, not 
   the concrete implementations of Dog and Cat.

   If you wan to add an Ape class, you can do so without modifying the 
   printAnimalNames function:
  */

 // Add Ape class
class Ape extends Animal {
    meow() {
      console.log('woo! woo! woo!');
    }
  }
const ape = new Ape('King Kong'); // King Kong

// const animals = [dog, cat, ape];

// printAnimalNames(animals);
  
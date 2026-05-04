/*
 The principle states that child classes or subclasses must be substitutable 
 for their parent classes or super classes. In other words, the child class 
 must be able to replace the parent class
*/

// ********************************* CORRECT CODE*****************************

class Animal {
    constructor(name) {
      this.name = name;
    }
  
    makeSound() {
      console.log(`${this.name} makes a sound`);
    }
  }
  
  class Dog extends Animal {
    makeSound() {
      console.log(`${this.name} barks`);
    }
  }
  
  class Cat extends Animal {
    makeSound() {
      console.log(`${this.name} meows`);
    }
  }
  
  function makeAnimalSound(animal) {
    animal.makeSound();
  }
  
  const cheetah = new Animal('Cheetah');
  makeAnimalSound(cheetah); // Cheetah makes a sound
  
  const dog = new Dog('Jack');
  makeAnimalSound(dog); // Jack barks
  
  const cat = new Cat('Khloe');
  makeAnimalSound(cat); // Khloe meows

//   The Dog and Cat classes can successfully replace the parent Animal class.

// ********************************* INCORRECT CODE*****************************
class Bird extends Animal {
    fly() {
      console.log(`${this.name} flaps wings`);
    }
  }
  
  const parrot = new Bird('Titi the Parrot');
  makeAnimalSound(parrot); // Titi the Parrot makes a sound
  parrot.fly(); // Titi the Parrot flaps wings

  /* 
  The Bird class violates the Liskov substitution principle because it’s not 
  implementing its own makeSound from the parent Animal class. Instead, it’s 
  inheriting the generic sound.
*/

//To fix this, you have to make it use the makeSound method too:

class Bird extends Animal {
    makeSound() {
      console.log(`${this.name} chirps`);
    }
  
    fly() {
      console.log(`${this.name} flaps wings`);
    }
  }
  
  const parrot2 = new Bird('Titi the Parrot');
  makeAnimalSound(parrot2); // Titi the Parrot chirps
  parrot2.fly(); // Titi the Parrot flaps wings
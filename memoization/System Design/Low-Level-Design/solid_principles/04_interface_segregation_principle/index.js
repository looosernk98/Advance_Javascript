
/*
 The interface segregation principle states that clients should not be forced 
 to implement interfaces or methods they do not use.

 More specifically, the ISP suggests that software developers should break 
 down large interfaces into smaller, more specific ones, so that clients only 
 need to depend on the interfaces that are relevant to them. This can make the 
 codebase easier to maintain.

 This principle is fairly similar to the single responsibility principle (SRP). 
 But it’s not just about a single interface doing only one thing – it’s about 
 breaking the whole codebase into multiple interfaces or components.
*/

// ********************************* INCORRECT CODE*****************************
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    eat() {
      console.log(`${this.name} is eating`);
    }
  
    swim() {
      console.log(`${this.name} is swimming`);
    }
  
    fly() {
      console.log(`${this.name} is flying`);
    }
  }
  
  class Fish extends Animal {
    fly() {
      console.error("ERROR! Fishes can't fly");
    }
  }
  
  class Bird extends Animal {
    swim() {
      console.error("ERROR! Birds can't swim");
    }
  }
  
  const bird = new Bird('Titi the Parrot');
  bird.swim(); // ERROR! Birds can't swim
  
  const fish = new Fish('Neo the Dolphin');
  fish.fly(); // ERROR! Fishes can't fly

  /*
   The code above violates the interface segregation principle because the 
   Fish class doesn’t need the fly method. A fish cannot fly. Birds can’t swim 
   too, so the Bird class doesn’t need the swim method.
   Also, the Bird and Fish classes both extend the Animal class, and that 
   violates the ISP since the Animal class has methods that either class does 
   not need.
  */


// ********************************* CORRECT CODE*****************************

// Define interfaces for different types of animals

class Swimmer {
    constructor(name) {
      this.name = name;
    }
  
    swim() {
      console.log(`${this.name} is swimming`);
    }
  }
  
  class Flyer {
    constructor(name) {
      this.name = name;
    }
  
    fly() {
      console.log(`${this.name} is flying`);
    }
  }
  
  // Implement interfaces for specific types of animals
  
  class Bird extends Flyer {
    constructor(name) {
      super(name);
    }
  
    eat() {
      console.log(`${this.name} is eating`);
    }
  }
  
  class Fish extends Swimmer {
    constructor(name) {
      super(name);
    }
  
    eat() {
      console.log(`${this.name} is eating`);
    }
  }
  
  // Usage
  
  const bird2 = new Bird('Titi the Parrot');
  bird2.fly(); // Titi the Parrot is flying
  bird2.eat(); // Titi the Parrot is eating
  
  console.log('\n');
  
  const fish2 = new Fish('Neo the Dolphin');
  fish2.swim(); // Neo the Dolphin is swimming
  fish2.eat(); // Neo the Dolphin is eating

  /*
   In the code above, we have a class specifically for animals that swim and 
   another for animals that fly. The Fish and Bird classes only extend classes 
   with methods specific to their needs.
  */
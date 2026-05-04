/*
The single responsibility principle states that a class, module, or function 
should have only one reason to change, meaning it should do one thing.

 For example, a class that shows the name of an animal should not be the same 
 class that displays the kind of sound it makes and how it feeds.
*/

// ************************ INCORRECT CODE ***************************************
class Animal {
    constructor(name, feedingType, soundMade) {
      this.name = name;
      this.feedingType = feedingType;
      this.soundMade = soundMade;
    }
  
    nomenclature() {
      console.log(`The name of the animal is ${this.name}`);
    }
  
    sound() {
      console.log(`${this.name} ${this.soundMade}s`);
    }
  
    feeding() {
      console.log(`${this.name} is a ${this.feedingType}`);
    }
  }
  
  let elephant = new Animal('Elephant', 'herbivore', 'trumpet');
  elephant.nomenclature(); // The name of the animal is Elephant
  elephant.sound(); // Elephant trumpets
  elephant.feeding(); // Elephant is a herbivore

/*
The code above violates the single responsibility principle because the class 
that's responsible for printing the name of the animal also shows the sound 
it makes and its type of feeding.
*/

//************************************************************************/


// ********************************* CORRECT CODE*****************************
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    nomenclature() {
      console.log(`The name of the animal is ${this.name}`);
    }
  }
  
  let animal1 = new Animal('Elephant');
  animal1.nomenclature(); // The name of the animal is Elephant
  
  // Sound class
  class Sound {
    constructor(name, soundMade) {
      this.name = name;
      this.soundMade = soundMade;
    }
  
    sound() {
      console.log(`${this.name} ${this.soundMade}s`);
    }
  }
  
  let animalSound1 = new Sound('Elephant', 'trumpet');
  animalSound1.sound(); //Elephant trumpets
  
  // Feeding class
  class Feeding {
    constructor(name, feedingType) {
      this.name = name;
      this.feedingType = feedingType;
    }
  
    feeding() {
      console.log(`${this.name} is a/an ${this.feedingType}`);
    }
  }
  
  let animalFeeding1 = new Feeding('Elephant', 'herbivore');
  animalFeeding1.feeding(); // Elephant is a/an herbivore

/*
This way, each of the classes is doing only one thing:

-> the first one prints the name of the animal
-> the second prints the kind of sound it makes
-> and the third one prints its kind of feeding.

*/
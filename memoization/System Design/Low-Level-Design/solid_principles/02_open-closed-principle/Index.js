/*
The open-closed principle states that classes, modules, and functions should 
be open for extension but closed for modification.

open for extenstion: means you should design your classes so that new 
functionality can be added as new requirements are generated.

closed for modification: means that once you developed a class you should 
never modify it.

*/


// ************************ INCORRECT CODE ***************************************

class Animal {
    constructor(name, age, type) {
      this.name = name;
      this.age = age;
      this.type = type;
    }
  
    getSpeed() {
      switch (this.type) {
        case 'cheetah':
          console.log('Cheetah runs up to 130mph ');
          break;
        case 'lion':
          console.log('Lion runs up to 80mph');
          break;
        case 'elephant':
          console.log('Elephant runs up to 40mph');
          break;
        default:
          throw new Error(`Unsupported animal type: ${this.type}`);
      }
    }
  }
  
  const animal1 = new Animal('Lion', 4, 'lion');
  animal1.getSpeed(); // Lion runs up to 80mph

/*
 The code above violates the open-closed principle because if you want to add 
 a new animal type, you have to modify the existing code by adding another 
 case to the switch statement.
*/

// ********************************* CORRECT CODE*****************************
class Animal {
    constructor(name, age, speedRate) {
      this.name = name;
      this.age = age;
      this.speedRate = speedRate;
    }
  
    getSpeed() {
      return this.speedRate.getSpeed();
    }
}
  
  class SpeedRate {
    getSpeed() {}
  }
  
  class CheetahSpeedRate extends SpeedRate {
    getSpeed() {
      return 130;
    }
  }
  
  class LionSpeedRate extends SpeedRate {
    getSpeed() {
      return 80;
    }
  }
  
  class ElephantSpeedRate extends SpeedRate {
    getSpeed() {
      return 40;
    }
  }
  
  const cheetah = new Animal('Cheetah', 4, new CheetahSpeedRate());
  console.log(`${cheetah.name} runs up to ${cheetah.getSpeed()} mph`); // Cheetah runs up to 130 mph
  
  const lion = new Animal('Lion', 5, new LionSpeedRate());
  console.log(`${lion.name} runs up to ${lion.getSpeed()} mph`); // Lion runs up to 80 mph
  
  const elephant = new Animal('Elephant', 10, new ElephantSpeedRate());
  console.log(`${elephant.name} runs up to ${elephant.getSpeed()} mph`); // Elephant

  /*
  This way, if you want to add a new animal type, you can create a new class 
  that extends SpeedRate and pass it to the Animal constructor without modifying 
  the existing code.
  */
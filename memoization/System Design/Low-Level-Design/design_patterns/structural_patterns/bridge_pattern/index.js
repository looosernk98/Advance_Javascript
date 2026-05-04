/*
 The Bridge pattern separates an abstraction from its implementation so that the 
 two can evolve independently.

 “Bridge splits a large class or hierarchy into two independent hierarchies: 
 abstraction and implementation.”

 Use case: When you need to support multiple implementations for a 
         single abstraction.

  🔹 When to use Bridge Pattern

Use it when:

- You have multiple dimensions of variation
- Inheritance causes class explosion
- You want to switch implementations at runtime
- You want loose coupling

Example dimensions:
- Shape × Color
- Device × Remote
- Notification × Transport

Cars:         Engines:
SUV           Petrol
Sedan         Diesel
Hatchback     Electric

There can be 3*3 combinations and permutaions
We have to make 9 class

Instead using bridge pattern we can separate two heriecharies so it can grow independently

Car will have an instance of Engine
3 + 3 = 6 classes only


*/

  // abstraction
  class Device {
    turnOn() {
      throw new Error("Method not implemented");
    }
  }
  
  // concrete implementation
  class TV extends Device {
    turnOn() {
      console.log("TV is now ON");
    }
  }
  class LEDTV extends Device {
    turnOn() {
      console.log("LEDTV is now ON");
    }
  }

  // abstraction
  class Remote{
    constructor(device) {
      if(new.target === Remote){
        throw new Error("Abstract class Can't be instantiated")
      }
      this.device = device;
    }

    pressPowerButton(){
      throw new Error("pressPowerButton() must be implemented")
    }

  }

  // concrete implementations
  
  class RemoteControl extends Remote {
    pressPowerButton() {
      this.device.turnOn();
    }
  }

  class RemoteControlWithOTTButtons extends Remote {
    pressPowerButton() {
      this.device.turnOn();
    }
  }


  
  // Usage
  const tv = new TV();
  const remote = new RemoteControl(tv);
  remote.pressPowerButton(); // "TV is now ON"

  const remote2 = new RemoteControlWithOTTButtons(tv)
  remote2.pressPowerButton()

  const LedTV = new LEDTV()

  const remote3 = new RemoteControlWithOTTButtons(LedTV)
  remote3.pressPowerButton()
  
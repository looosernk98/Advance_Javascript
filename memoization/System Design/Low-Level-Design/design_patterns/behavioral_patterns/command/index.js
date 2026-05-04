/*

The Command Pattern is a behavioral design pattern that encapsulates 
a request as an object, allowing you to parameterize clients, queue 
or log requests, and support undo/redo.

Command pattern turns a request into an object so it can be 
executed, queued, logged, or undone later.

🔹 When to use Command

Use it when:
- You want to decouple sender from receiver
- You need undo / redo
- Commands should be queued or logged
- You want to treat actions uniformly

Real-world examples
- Button clicks
- Menu actions
- Undo/redo in editors
- Job queues
- Macro recording

Client → Command → Receiver
        ↑
      Invoker

Command: interface
ConcreteCommand: binds action to receiver
Receiver: performs actual work
Invoker: triggers command

*/

// 1️⃣ Command Interface (Conceptual)
class Command {
    execute() {
      throw new Error("execute() must be implemented");
    }
  
    undo() {
      throw new Error("undo() must be implemented");
    }
  }


//   2️⃣ Receiver (Does the real work)

class Light {
    turnOn() {
      console.log("💡 Light ON");
    }
  
    turnOff() {
      console.log("💡 Light OFF");
    }
  }

//   3️⃣ Concrete Commands

class LightOnCommand extends Command {
    constructor(light) {
      super();
      this.light = light;
    }
  
    execute() {
      this.light.turnOn();
    }
  
    undo() {
      this.light.turnOff();
    }
  }
  
  class LightOffCommand extends Command {
    constructor(light) {
      super();
      this.light = light;
    }
  
    execute() {
      this.light.turnOff();
    }
  
    undo() {
      this.light.turnOn();
    }
  }

//   4️⃣ Invoker (Triggers command)
class RemoteControl {
    setCommand(command) {
      this.command = command;
    }
  
    pressButton() {
      this.command.execute();
    }
  
    pressUndo() {
      this.command.undo();
    }
}

// 5️⃣ Client Code
const light = new Light();

const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);

const remote = new RemoteControl();

remote.setCommand(lightOn);
remote.pressButton(); // 💡 ON
remote.pressUndo();   // 💡 OFF

remote.setCommand(lightOff);
remote.pressButton(); // 💡 OFF
remote.pressUndo();   // 💡 ON

/*
🔍 Key Observations

Invoker doesn’t know receiver details
Commands are interchangeable
Easy to add new commands

*/
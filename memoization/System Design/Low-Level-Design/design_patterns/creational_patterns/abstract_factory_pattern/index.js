/*
The Abstract Factory Pattern is another creational pattern that provides an 
interface for creating families of related or dependent objects without specifying 
their concrete classes. 

It allows you to create sets of objects that work together 
harmoniously.

Basically it just adds an abstraction layer over the factory method pattern, 
so that we can create many different types of objects, but still interact with a 
single factory function or class.

🧠 When to use Abstract Factory

Use it when:
- You need to create multiple related objects
- Objects must be compatible with each other
- Client code should stay decoupled from concrete classes

Example families:
- Light theme UI vs Dark theme UI
- Windows UI vs Mac UI
- AWS services vs Azure services

*/

// Abstract Product classes
  class Button {
    render() {}
  }
  
  class Checkbox {
    render() {}
  }
  
  // Concrete Product classes
  class MacButton extends Button {
    render() {
      return 'Render Mac button';
    }
  }
  
  class MacCheckbox extends Checkbox {
    render() {
      return 'Render Mac checkbox';
    }
  }
  
  class WindowsButton extends Button {
    render() {
      return 'Render Windows button';
    }
  }
  
  class WindowsCheckbox extends Checkbox {
    render() {
      return 'Render Windows checkbox';
    }
  }
  
  // Abstract Factory interface
  class GUIFactory {
    constructor(){
      if(new.target === GUIFactory){
        throw Error("Cannot instantiate abstract class")
      }
    }
    createButton() {
      throw new Error("createButton must be implemented that inherit or implements it");
    }
    createCheckbox() {
      throw new Error("createCheckbox must be implemented that inherit or implements it");
    }
  }
  
  // Concrete Factories
  class MacFactory extends GUIFactory {
    createButton() {
      return new MacButton();
    }
  
    createCheckbox() {
      return new MacCheckbox();
    }
  }
  
  class WindowsFactory extends GUIFactory {
    createButton() {
      return new WindowsButton();
    }
  
    createCheckbox() {
      return new WindowsCheckbox();
    }
  }
  
  // Usage
  function createUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
  
    return { button, checkbox };
  }
  
  const macUI = createUI(new MacFactory());
  console.log(macUI.button.render()); // Output: 'Render Mac button'
  console.log(macUI.checkbox.render()); // Output: 'Render Mac checkbox'
  
  const windowsUI = createUI(new WindowsFactory());
  console.log(windowsUI.button.render()); // Output: 'Render Windows button'
  console.log(windowsUI.checkbox.render()); // Output: 'Render Windows checkbox'

  /*

  In this example, we have two concrete factories, MacFactory and WindowsFactory, 
  each capable of creating a set of related UI components (buttons and checkboxes) 
  for their respective platforms. The createUI function allows you to create a 
  cohesive UI for a specific platform using the appropriate factory.

  */
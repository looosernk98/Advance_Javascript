/*
 The Decorator pattern dynamically extends the behavior of an object without 
 modifying its structure.

 Decorator pattern allows behavior to be added to individual objects dynamically 
 by wrapping them, without affecting other objects of the same class.

 Use case: When you want to add functionalities without modifying the original 
          class.

🔹 When to use Decorator

Use it when:
- You want to extend functionality at runtime
- Subclassing would cause class explosion
- You want composition over inheritance

Real examples
- Coffee with add-ons ☕
- Middleware (Express, Koa)
- UI components (scroll, border, shadow)
- Logging / caching wrappers
- React HOCs

🔹 Problem without Decorator ❌

  class Coffee {}
  class MilkCoffee extends Coffee {}
  class SugarCoffee extends Coffee {}
  class MilkSugarCoffee extends Coffee {}
  class MilkSugarWhippedCoffee extends Coffee {}

  ➡ ❌ Class explosion 😵
*/

 class Coffee {
    cost() {
      return 5;
    }
  }
  
  class MilkDecorator {
    constructor(coffee) {
      this.coffee = coffee;
    }
  
    cost() {
      return this.coffee.cost() + 2;
    }
  }
  
  // Usage
  const basicCoffee = new Coffee();
  const milkCoffee = new MilkDecorator(basicCoffee);
  
  console.log(milkCoffee.cost()); // 7
  
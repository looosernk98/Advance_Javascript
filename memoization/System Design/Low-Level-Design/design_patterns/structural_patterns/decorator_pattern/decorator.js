// 1️⃣ Component (Base Interface)
 class Coffee {
    cost() {
      throw new Error("cost() must be implemented");
    }
  
    description() {
      throw new Error("description() must be implemented");
    }
  }
// ===================================================================

// 2️⃣ Concrete Component (Original object)
 class SimpleCoffee extends Coffee {
    cost() {
      return 100;
    }
  
    description() {
      return "Simple Coffee";
    }
  }

  //3️⃣ Decorator (Base Wrapper)
  class CoffeeDecorator extends Coffee {
    constructor(coffee) {
      super();
      this.coffee = coffee;
    }
  
    cost() {
      return this.coffee.cost();
    }
  
    description() {
      return this.coffee.description();
    }
  }
// ===================================================================


  // 4️⃣ Concrete Decorators (Add behavior)
  class MilkDecorator extends CoffeeDecorator {
    cost() {
      return super.cost() + 20;
    }
  
    description() {
      return super.description() + ", Milk";
    }
  }
  
  class SugarDecorator extends CoffeeDecorator {
    cost() {
      return super.cost() + 10;
    }
  
    description() {
      return super.description() + ", Sugar";
    }
  }
// ===================================================================


// 5️⃣ Client Code

let coffee = new SimpleCoffee();

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // Simple Coffee, Milk, Sugar
console.log(coffee.cost());        // 130
  
class Shape {
    constructor(color) {
      this.color = color;
    }
  }
  
  class ShapeFactory {
    constructor() {
      this.shapes = {};
    }
  
    getShape(color) {
      if (!this.shapes[color]) {
        this.shapes[color] = new Shape(color);
      }
      return this.shapes[color];
    }
  }
  
  // Usage
  const factory = new ShapeFactory();
  
  const redShape1 = factory.getShape("red");
  const redShape2 = factory.getShape("red");
  
  console.log(redShape1 === redShape2); // true (same instance)
  
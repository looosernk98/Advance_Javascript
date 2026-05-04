/*

The Builder Pattern is a creational design pattern that separates the construction 
of a complex object from its representation, allowing the same construction process 
to create different representations.

This pattern is especially useful when you have an object with a large number of 
properties, and you want to simplify the creation of instances while maintaining 
flexibility.

The Builder Pattern is a creational design pattern used to construct complex objects step-by-step, separating construction logic from representation.

It’s especially useful when:
- An object has many optional fields
- You want readable & fluent APIs
-Constructor arguments become messy

*/

// product class with multiple properties
class Product{
  constructor(){
    this.name = "";
    this.price = 0;
    this.color = "white"
    // other properties
  }
  
  // Additional methods can be defined here
}

// Builder for creating Product instances

class ProductBuilder{
    constructor(){
        this.product = new Product()
    }

    setName(name){
      this.product.name = name;
      return this  // Return the builder for method chaining
    }

    setPrice(price){
        this.product.price = price
        return this;
    }

    setColor(color){
        this.product.color = color
        return this;
    }

    // Other methods to set additional properties


    build(){
        return this.product  // Return the fully constructed product
    }
}

// Usage 
const builder = new ProductBuilder();

const productA = builder.setName("Product A")
        .setColor("red")
        .setPrice(1000)
        .build()

console.log(productA);

const productB = builder.setName("Product B")
        .setColor("green")
        .setPrice(2000)
        .build()

console.log(productB);
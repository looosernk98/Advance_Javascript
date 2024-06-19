// https://www.youtube.com/watch?v=-owpuf4lbyU

/*
The call() method of Function instances calls this function with a given this value 
and arguments provided individually.
*/

 function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  Product.prototype.printName = function(){
    console.log(this.name);
  }
  
  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }
//   Food.prototype.printName = function(){
//     console.log(this.name);
//   }
  const food = new Food('cheese', 5)
  console.log(food.name);
  food.printName()
  // Expected output: "cheese"


  /* 
  Warning: Do not use call() to chain constructors (for example, to implement inheritance).
  This invokes the constructor function as a plain function, which means new.target is 
  undefined, and classes throw an error because they can't be called without new. 
  Use Reflect.construct() or extends instead.
  */
  

//   Using call() to invoke a function without specifying the first argument
globalThis.globProp = "Wisen";

function display() {
  console.log(`globProp value is ${this.globProp}`);
}

display.call(); // Logs "globProp value is Wisen"

// -> In strict mode, the value of this is not substituted, so it stays as undefined.

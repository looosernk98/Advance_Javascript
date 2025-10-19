
// 

Function.prototype.myCall = function (thisArg, ...args) { // rest operator
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }
    // If `thisArg` is null or undefined, use the global object
    thisArg = thisArg || globalThis;
  
    // Temporarily assign the function to a property on `thisArg`
    thisArg._tempFn = this;
  
    // Call the function with the provided arguments
    const result = thisArg._tempFn(...args); // spread operator
  
    // Remove the temporary property
    delete thisArg._tempFn;
  
    return result;
  };
  
  // Example:
  function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
  }
  
  const person = { name: "Alice" };
  console.log(greet.myCall(person, "Hello", "!")); // Output: Hello, Alice!
  
  // ========================== Ployfill of Apply ===========================
  Function.prototype.myApply = function (thisArg, args) {
    if (typeof this !== "function") {
      throw new TypeError("myApply must be called on a function");
    }
    // If `thisArg` is null or undefined, use the global object
    thisArg = thisArg || globalThis;
  
    // Temporarily assign the function to a property on `thisArg`
    thisArg._tempFn = this;
  
    // Call the function with the provided arguments
    const result = thisArg._tempFn(...args);
  
    // Remove the temporary property
    delete thisArg._tempFn;
  
    return result;
  };

  console.log(greet.myApply(person, ["Hello", "!"])); // Output: Hello, Alice!


  // ========================== Ployfill of Bind ===========================

  Function.prototype.myBind = function (thisArg, ...args) {
    if (typeof this !== "function") {
      throw new TypeError("myBind must be called on a function");
    }
    // If `thisArg` is null or undefined, use the global object
    thisArg = thisArg || globalThis;
  
    const fn = this
    return function boundFunction(...boundArg){
       return fn.call(thisArg, ...args, ...boundArg)
    }

  };

  // function greet(greeting, punctuation) {
  //   return `${greeting}, ${this.name}${punctuation}`;
  // }
  // const person = { name: "Alice" };
  
const boundGreet = greet.myBind(person, "Hey");
console.log(boundGreet("!!")); // "Hey, Alice!!"


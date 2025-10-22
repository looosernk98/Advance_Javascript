
//************************** 1. Data Privacy and Encapsulation *************/

/*

Closures are often used to create private variables that cannot be accessed or 
modified from outside a function. This is particularly useful for encapsulating 
data and creating "private" methods in JavaScript.

*/
function createCounter() {
    let count = 0; // Private variable
    return {
      increment: function () {
        count++;
        return count;
      },
      decrement: function () {
        count--;
        return count;
      },
      getCount: function () {
        return count;
      }
    };
  }
  
  const counter = createCounter();
  console.log(counter.increment()); // 1
  console.log(counter.increment()); // 2
  console.log(counter.getCount());  // 2
  console.log(counter.count);       // undefined (count is private)


  //***************** 2. Creating Functions with Preset Arguments (Function Currying) ****/
  
  /*
    Closures are useful for currying, which allows you to create a function with 
    preset arguments.
  */
  function multiply(factor) {
    return function (number) {
      return number * factor;
    };
  }
  
  const double = multiply(2);
  const triple = multiply(3);
  
  console.log(double(5)); // 10
  console.log(triple(5)); // 15


//************************* 3. Factories function **********************/
/*
    You can use closures to create multiple functions with similar behavior but 
    different variables.
*/

function createGreeter(greeting) {
    return function (name) {
      console.log(`${greeting}, ${name}!`);
    };
  }
  
  const greetHello = createGreeter("Hello");
  const greetHi = createGreeter("Hi");
  
  greetHello("Alice"); // "Hello, Alice!"
  greetHi("Bob");      // "Hi, Bob!"


  //****************** 4. Maintaining State in Asynchronous Programming **********/
  /*
  Closures are helpful for preserving variables in asynchronous code, such as 
  callbacks or event handlers.
  */
  function fetchData(url) {
    setTimeout(function () {
      console.log(`Fetching data from ${url}`);
    }, 1000);
  }
  
  const apiUrl = "https://api.example.com";
  fetchData(apiUrl); // The closure remembers the `apiUrl` even after 1 second
  

  //***************** 5. Implementing Iterators and Generators ***************/
  function makeCounter() {
    let count = 0;
    return function () {
      count++;
      return count;
    };
  }
  
  const counter1 = makeCounter();
  console.log(counter1()); // 1
  console.log(counter1()); // 2
  console.log(counter1()); // 3
  

  //*************** 6. Partial Application of Functions ************/
  /*
    Closures allow you to fix a few arguments of a function and create a new 
    function.
  */

    function add(a) {
        return function (b) {
          return a + b;
        };
      }
      
      const addFive = add(5);
      console.log(addFive(10)); // 15


  // This is an example of nested closures — closures can form over multiple outer functions.
    function A(){
      const a = 9;
      function B(){
        const b = 10;
        console.log(a,b)
        function C(){
          const c = 12;
          console.log(a, b, c)
        }
        return C;
      }
      return B()
    }

    const func = A()
    func()

      
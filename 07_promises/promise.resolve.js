/*

 Promise.resolve(value) returns a Promise that is immediately resolved with the 
 given value. It is useful when you want to wrap a value in a Promise to work 
 with it in an asynchronous manner.

 */
 const resolvedPromise = Promise.resolve("Success!");

 resolvedPromise.then(value => {
   console.log(value); // Output: "Success!"
 });


/* 

How It Works:
-> If the value passed is not a Promise, Promise.resolve returns a Promise that 
   resolves with that value.
-> If the value passed is a Promise, Promise.resolve returns that same Promise.
-> If the value is a thenable (an object with a .then method), the returned 
   Promise will follow the behavior of the thenable, either resolving or 
   rejecting based on the thenable’s outcome.

*/

const promise1 = Promise.resolve(42);
promise1.then(value => console.log(value)); // Output: 42

const existingPromise = new Promise((resolve) => resolve("Existing Promise"));
const promise2 = Promise.resolve(existingPromise);
console.log(promise2 === existingPromise); // Output: true (same reference)

/************************** Example ********************/

function getUserData(isSuccessful) {
    if (isSuccessful) {
      return Promise.resolve({ name: "John Doe", age: 30 });
    } else {
      return Promise.reject("Failed to fetch user data");
    }
  }
  
  getUserData(true)
    .then(data => console.log("User data:", data))
    .catch(error => console.error("Error:", error));
  
  getUserData(false)
    .then(data => console.log("User data:", data))
    .catch(error => console.error("Error:", error));

/*

Whenever you return any Promise object (whether created via Promise.resolve() or 
new Promise()) from inside a .then() callback, the JavaScript engine executes an 
identical "unpacking" mechanism.According to the ECMAScript specification, 
this process always requires 2 extra microtask ticks to fully unpack and pass the 
resolved value down the chain.

Why Promise.resolve() and new Promise() behave identically here:

When a .then() callback finishes executing, the engine checks its return value.If it 
returns a primitive (like 5 or "hello"), the engine immediately resolves the outer 
chained promise in the current tick.If it returns a Promise instance, 
the engine cannot immediately resolve the outer chained promise. 
It must adopt the state of this returned promise.To safely adopt that state, the engine 
treats Promise.resolve() and new Promise((res) => res()) as the exact same type of object: 
a fulfilled Promise instance.

*/

// --- CHAIN A (Returns a promise instance, triggering the 2-tick unpack) ---
Promise.resolve()
    .then(() => {
        console.log('A1: Promise 1');
        return new Promise((res) => res()); // Or Promise.resolve()
    })
    .then(() => {
        console.log('A2: Promise 2');
    });

// --- CHAIN B (Standard flat promise chain) ---
Promise.resolve()
    .then(() => {
        console.log('B1');
    })
    .then(() => {
        console.log('B2');
    })
    .then(() => {
        console.log('B3');
    });

  
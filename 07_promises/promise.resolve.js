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
  
/*
The Promise.withResolvers() static method returns an object containing a new Promise 
object and two functions to resolve or reject it, corresponding to the two parameters 
passed to the executor of the Promise() constructor.

*/


// **************** Custom Implementation of Promise.withResolvers ***************
Promise.withResolvers = function() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
  
  // Usage
  const { promise, resolve, reject } = Promise.withResolvers();
  
  // You can resolve or reject the promise externally
  setTimeout(() => resolve("Resolved!"), 1000);
  
  promise.then(console.log).catch(console.error);
  
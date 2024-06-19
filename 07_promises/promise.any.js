/*

The Promise.any() static method takes an iterable of promises as input and returns a 
single Promise. This returned promise fulfills when any of the input's promises fulfills,
 with this first fulfillment value. It rejects when all of the input's promises reject 
 (including when an empty iterable is passed), with an AggregateError containing an 
 array of rejection reasons.

 <<<<Return value>>>
 A Promise that is:
-> Already rejected, if the iterable passed is empty.

-> Asynchronously fulfilled, when any of the promises in the given iterable fulfills. 
The fulfillment value is the fulfillment value of the first promise that was fulfilled.

-> Asynchronously rejected, when all of the promises in the given iterable reject. The 
rejection reason is an AggregateError containing an array of rejection reasons in its 
errors property. The errors are in the order of the promises passed, regardless of 
completion order. If the iterable passed is non-empty but contains no pending promises, 
the returned promise is still asynchronously (instead of synchronously) rejected.

*/





const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"

/*

Promise.any() fulfills with the first promise to fulfill, even if a promise rejects first. 
This is in contrast to Promise.race(), which fulfills or rejects with the first promise to settle.

*/

const pErr = new Promise((resolve, reject) => {
    reject("Always fails");
  });
  
  const pSlow = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "Done eventually");
  });
  
  const pFast = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "Done quick");
  });
  
  Promise.any([pErr, pSlow, pFast]).then((value) => {
    console.log(value);
    // pFast fulfills first
  });
  // Logs:
  // Done quick
  

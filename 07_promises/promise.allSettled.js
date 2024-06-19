/*

The Promise.allSettled() static method takes an iterable of promises as input and returns
 a single Promise. This returned promise fulfills when all of the input's promises settle 
 (including when an empty iterable is passed), with an array of objects that describe 
 the outcome of each promise.


 The Promise.allSettled() method is one of the promise concurrency methods. 
 Promise.allSettled() is typically used when you have multiple asynchronous 
 tasks that are not dependent on one another to complete successfully, or you'd 
 always like to know the result of each promise.

In comparison, the Promise returned by Promise.all() may be more appropriate 
if the tasks are dependent on each other, or if you'd like to immediately 
reject upon any of them rejecting.

*/

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo'),
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result, result.status)),
);

// Expected output:
// { status: 'fulfilled', value: 3 } fulfilled
// { status: 'rejected', reason: 'foo' } rejected

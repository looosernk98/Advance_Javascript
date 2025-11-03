/*

The Promise.race() static method takes an iterable of promises as input and 
returns a single Promise. This returned promise settles with the eventual state 
of the first promise that settles.

*/

const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});
  
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'two');
  });
  
  Promise.race([promise1, promise2])
  .then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  })
  .catch((err) => {
    console.log('err: ', err);
  })
  // Expected output: "two"

  /*
  Unlike other promise concurrency methods, Promise.race is always asynchronous: it 
  never settles synchronously,even when the iterable is empty.

  */
  
   // Passing an array of promises that are already resolved,
// to trigger Promise.race as soon as possible
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.race(resolvedPromisesArray);
// Immediately logging the value of p
console.log(p);

// Using setTimeout, we can execute code after the stack is empty
setTimeout(() => {
  console.log("the stack is now empty");
  console.log(p);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: 33 }


// An empty iterable causes the returned promise to be forever pending:
const foreverPendingPromise = Promise.race([]);
foreverPendingPromise.then((res) => console.log('output: ', res)).catch((err) => console.log(err))
console.log(foreverPendingPromise);
setTimeout(() => {
  console.log("the stack is now empty");
  console.log(foreverPendingPromise);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "pending" }


/*
If the iterable contains one or more non-promise value and/or an already settled promise, 
then Promise.race will settle to the first of these values found in the array:
*/
const foreverPendingProm = Promise.race([]);
const alreadyFulfilledProm = Promise.resolve(100);

const arr = [foreverPendingPromise, alreadyFulfilledProm, "non-Promise value"];
const arr2 = [foreverPendingPromise, "non-Promise value", Promise.resolve(100)];
const pp = Promise.race(arr);
const p2 = Promise.race(arr2);

console.log(pp);
console.log(p2);
setTimeout(() => {
  console.log("the stack is now empty");
  console.log(pp);
  console.log(p2);
});

// Logs, in order:
// Promise { <state>: "pending" }
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: 100 }
// Promise { <state>: "fulfilled", <value>: "non-Promise value" }

// *************************** Using Promise.race() to implement request timeout **********************
/*
You can race a potentially long-lasting request with a timer that rejects, 
so that when the time limit has elapsed, the resulting promise automatically rejects.

If the data promise fulfills, it will contain the data fetched from /api; otherwise, it will
 reject if fetch remains pending for 5 seconds and loses the race with the setTimeout timer.
*/
const data = Promise.race([
    fetch("/api"),
    new Promise((resolve, reject) => {
      // Reject after 5 seconds
      setTimeout(() => reject(new Error("Request timed out")), 5000);
    }),
  ])
    .then((res) => res.json())
    .catch((err) => displayError(err));

/************************** Using Promise.race() to detect the status of a promise ***************/





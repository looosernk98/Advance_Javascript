/*

https://interviewprep.org/promise-programming-interview-questions/

*/

/*

A Promise in JavaScript is an object representing the eventual completion or 
failure of an asynchronous operation. It serves as a placeholder for the result, 
which might not be immediately available

Promises have three states: pending, fulfilled, and rejected. Initially, a promise 
is in the ‘pending’ state, meaning that it’s neither successful nor failed yet. 
Once the operation completes, the promise transitions to the ‘fulfilled’ state 
if it was successful, or the ‘rejected’ state if an error occurred.

Once a promise is either fulfilled or rejected, it becomes settled and its 
state cannot change again

A promise is said to be settled if it is either fulfilled or rejected, but 
not pending.

*/

const promise = new Promise((res, rej) => {
    rej('REJECTED VALUE')
    // res("RESOLVED VALUE")
})
console.log('promise: ', promise);

promise.then((result) => {
    console.log('inside then promise: ', promise);
    console.log('result: ', result);
    // throw new Error('error from ist then')
})
.catch((err) => {
    console.log('inside catch promise: ', promise);

    console.log('err: ', err);
    // return 10;
    // throw new Error('error from ist catch')

})
.then((val) => {
    console.log('val: ', val);
    console.log('inside last then promise: ', promise);
})
.finally(() => {
    console.log('finally');
})
.then(() => {
    console.log('this is last');
})
.finally(() => {
    console.log('finally last one');
})
.catch(() => {
    console.log('final catch');
})

// ✅ 1. All .then() run after a resolved promise
// ❌ 2. Rejected promise — only first .catch() handles it
// ✅ 3. If a .catch() recovers or not, .then() below it will still run
// 🔁 4. .finally() always runs — whether resolved or rejected



/*
  resolved promises can be pending or rejected as well. For Example:

  new Promise((resolveOuter) => {
    resolveOuter(
      new Promise((resolveInner) => {
        setTimeout(resolveInner, 1000);
      }),
    );
  });

  This promise is already resolved at the time when it's created (because the 
  resolveOuter is called synchronously), but it is resolved with another promise,
  and therefore won't be fulfilled until 1 second later, when the inner promise 
  fulfills. In practice, the "resolution" is often done behind the scenes and 
  not observable, and only its fulfillment or rejection are.

*/


/*

A promise can participate in more than one nesting. For the following code, the 
transition of promiseA into a "settled" state will cause both instances of 
.then() to be invoked.

const promiseA = new Promise(myExecutorFunc);
const promiseB = promiseA.then(handleFulfilled1, handleRejected1);
const promiseC = promiseA.then(handleFulfilled2, handleRejected2);

*/


const prom = new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner, rejectInner) => {
      setTimeout(() => {
        // resolveInner("InnerResolver")
        rejectInner("InnerReject")
      }, 5000);
    }),
  );
});
console.log('prom: ', prom);

prom.then((res) => {
  console.log('res: ', res);
  return res;
})
.then((res2) => {
  console.log('res2: ', res2);
})
.catch((err) => {
  console.log('err: ', err);
})

/*
🔹 How your code runs

1. Outer promise created → prom.
  -> Executor runs immediately.
  -> Calls resolveOuter(innerPromise).
  -> At this point, the outer promise prom is pending but linked to the 
     inner promise.

2. Inner promise logic:
   -> After 5 seconds, rejectInner("InnerReject") runs.
   -> That makes the inner promise rejected.

3. Because prom is following the inner promise:
   -> Outer promise prom also becomes rejected with "InnerReject".

4. The .then handlers are skipped, and the .catch runs:


🔹 Why does it go to catch?

Because the outer promise adopts the state of the inner one.
If the inner resolves, outer resolves → .then runs.
If the inner rejects, outer rejects → .catch runs.

✅ So the rule: If you resolve a promise with another promise, the outer 
   one mirrors the inner one’s state.
*/




  
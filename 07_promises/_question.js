/*
https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/its-quiz-time
  https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/what-is-asynchronous-in-javascript
  https://github.com/Narahari-Sundaragopalan/JavaScript-Interview-Questions/blob/master/concepts/Promises.md
  https://eishta.medium.com/javascript-tricky-questions-promises-12c1ebeff20c
  https://levelup.gitconnected.com/vimp-javascript-promise-implementation-challenges-5a4f120d8606
*/



//Q1. What’s the output of the code below?

let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => reject(2), 1000);
    
    // setTimeout(() => reject(2), 1000);
    // resolve(1);
  });
  
promise.then((res) => {
  console.log('res: ', res);
})
.catch((err) => {
  console.log('err: ', err);
})

/*
  Why does reject(2) not trigger .catch()?

-> Because once a Promise is settled (either resolved or rejected), it becomes 
  immutable — its state is locked in and can't be changed.
-> Only the first call to either resolve or reject takes effect. All subsequent 
  calls are ignored.

*/

// REVERSE CASE

let promise2 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(2), 1000);
  resolve(1);
});
promise2.then((res) => {
  console.log('res: ', res);
})
.catch((err) => {
  console.log('err: ', err);
})

// You'll still see res: 1, because resolve(1) runs immediately before the timeout.


 // ====================== Promises Flattening ============================================

 Promise.resolve('A')
  .then(x => {
    return Promise.resolve('B').then(y => x + y);
  })
  .then(console.log);

  /*
  Output: AB

  Why: The inner then returns a Promise that resolves to 'AB'. Promises are 
       flattened: the outer .then returns a promise that resolves with the value 
       'AB', so the final .then logs 'AB'.

  If a promise resolves to another promise,
  the system will recursively unwrap until it reaches a non-promise value.

  */

  //********************************* Question *******************************/

 // sometime promise can stay pending forever, so build a function to that handle
 // promise with timeout, if stays pending for some x delay then it will 
//   automically be rejected
  const withTimeout = (promise, ms) => {
    let timeoutId;
  
    // 1. Create a promise that rejects after 'ms' milliseconds
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`Timed out after ${ms}ms`));
      }, ms);
    });
  
    // 2. Race the original promise against the timeout
    return Promise.race([promise, timeoutPromise])
      .finally(() => clearTimeout(timeoutId)); // 3. Clean up the timer
  };

  // custom thenable object
  const stuckThenable = {
    then(resolve, reject) {
      console.log("Inside the thenable...");
      // Neither resolve() nor reject() is ever called
    }
  };
  
// ... withTimeout and stuckThenable definitions ...

const task = Promise.resolve(stuckThenable);

// Wrap the task with the timeout
withTimeout(task, 3000)
  .then(val => console.log("Value:", val))
  .catch(err => console.error("Caught:", err.message)); // This will catch the timeout!

console.log("End of script");

//*****************************************************************/

Promise.resolve("done")
  .finally(() => {
    console.log("Cleanup");
  })
  .then(console.log);

/*
 OUTPUT: 
  Cleanup
  done
*/


//*****************************************************************/

console.log("A");

// Macro: []
// Micro: []

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

}, 0);

Promise.resolve()
  .then(() => { // .then consumes/adopts/unpacks the state of internal promise Promise.resolve("E");
    console.log("D");
    return Promise.resolve("E");
  })
  .then((val) => {
    console.log(val);

    return new Promise((resolve) => {
      console.log("F");
      resolve("G");
    });
  })
  .then((val) => {
    console.log(val);
  });

(async function () {
  console.log("H");

  await Promise.resolve();

  console.log("I");

  await Promise.resolve();

  console.log("J");
})();

console.log("K");

/*
Internal Behavior

Conceptually JS does something like:

const returnedPromise = Promise.resolve("A");

returnedPromise.then(
  value => resolveP2(value),
  err => rejectP2(err)
);

Meaning:

"When returnedPromise resolves,
resolve p2 with same value."
*/


// ==============================================================================

console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => {
    console.log("C");
  });
}, 0);

Promise.resolve()
  .then(() => { // .then consumes/adopts/unpacks the state of internal promise Promise.resolve("E");
    console.log("D");
    return "E";
  })
  .then((val) => {
    console.log(val);
    console.log("F");
    return "G"
  })
  .then((val) => {
    console.log(val);
  });

(async function () {
  console.log("H");
  await Promise.resolve();
  console.log("I");
  await Promise.resolve();
  console.log("J");
})();

console.log("K");


// ===================================================================
Promise.resolve()
  .then(function a() {
    Promise.resolve().then(function d() {})
    Promise.resolve().then(function e() {})
    throw new Error('OH TEH NOEZ!')
    Promise.resolve().then(function f() {})
  })
  .catch(function b() {})
  .then(function c() {})








  
  




 // ======================= Question1 ===========================================

async function f() {
    return 42; // 42 will be wrapped in Promise.resolve(42) and return promise
}
console.log(f());

/*
Output: logs a Promise: something like Promise { <resolved>: 42 } 
     (implementation detail may show Promise { 42 } or Promise {<fulfilled>: 42}).

Why: An async function always returns a Promise. return 42 is equivalent to 
     return Promise.resolve(42).
*/

 // ======================= Question2 ===========================================


// function test() {
//     await Promise.resolve('done');
//   }
// test();

// SyntaxError (await is only valid inside async functions or top-level in modules).


// ============================= Question 3 Await + loop (forEach) =====================================

const arr = [1, 2, 3];


arr.forEach(async (n) => {
  
  await new Promise(r => setTimeout(() => {
    console.log("fn called for :", n)
    r()
  }, 3000, n));
  
  console.log(n);
});

// forEach runs synchronously
// It does NOT wait for async callbacks
// So all 3 iterations start immediately

// async/await only pauses inside the function, not the loop itself.

// So each callback pauses independently, but the loop doesn't care.


/*

Behavior: The three async callbacks are started nearly simultaneously; they run 
in parallel (each waits ~1s and then logs). So results will appear roughly at 
the same time after ~1s: 1, 2, 3 (order preserved by scheduling but not 
sequential wait).

Why: forEach does not await promises returned by the callback. Each async 
     callback executes independently.
*/

// Fixes (sequential processing):

// Use for...of with await:
for (const n of arr) {
     await new Promise(r => setTimeout(() => {
     console.log("fn called for :", n)
     r()
   }, 3000, n));
     console.log(n);
   }

//    Because:

// It supports await
// It pauses the loop until the promise resolves

//======================================
// Q. How much time it will take
async function test() {
  const p1 = new Promise(res => setTimeout(res, 1000));
  const p2 = new Promise(res => setTimeout(res, 1000));

  await p1;
  await p2;
}
test()
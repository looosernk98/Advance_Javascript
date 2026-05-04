
// 1. then() mutates original promise internally

/*
This line is important:

it appends handlers to an internal list

Meaning:
*/
const p = Promise.resolve("Hello");

p.then(() => console.log("A"));
p.then(() => console.log("B"));
p.then(() => console.log("C"));

/*
All handlers are stored inside same promise p.

Output:

A
B
C

*/

// 2. Why this causes memory leak

const pendingPromise = new Promise(() => {});

while (true) {
  pendingPromise.then(() => {});
}
/*
This promise NEVER resolves.

So every .then() callback gets stored forever inside internal handlers list.

pendingPromise
   handlers:
   - callback1
   - callback2
   - callback3
   - callback4
   ...

Infinite memory growth → crash.
*/

// 3. Calling then() twice creates separate chains
const pp = Promise.resolve(5);

const p1 = pp.then((v) => {
  console.log("First:", v);
  return v * 2;
});

const p2 = pp.then((v) => {
  console.log("Second:", v);
  return v * 3;
});

p1.then(console.log);
p2.then(console.log);
/*
Output:

First: 5
Second: 5
10
15

Important:

These are TWO independent chains.

        p
      /   \
    p1     p2

They don't wait for each other.
*/

// 4. Thenables are automatically resolved

// A thenable is any object having .then().

// Example:

const thenable = {
  then(resolve, reject) {
    resolve("Resolved from thenable");
  }
};

Promise.resolve(thenable)
  .then(console.log);

  /*
Output:

Resolved from thenable

JavaScript automatically unwraps thenables.
*/

// 5. Returning a promise from then()
Promise.resolve(10)
  .then((v) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v * 2);
      }, 1000);
    });
  })
  .then(console.log);

/*
Output after 1 sec:

20

The next .then() waits automatically.
*/


// 6. onFulfilled never receives a thenable

// JS unwraps it before passing further.

Promise.resolve(5)
  .then((v) => {
    return Promise.resolve(v * 2);
  })
  .then((v) => {
    console.log(v);
  });

/*
Output:

10

Second .then() gets actual value 10, not Promise object.
*/

/*
7. Internal visualization

When you do:

promise.then(handler);

Internally something like:

promise = {
   state: "pending",
   value: undefined,
   handlers: [
      handler
   ]
}

When resolved:

state -> fulfilled
value -> result
run all handlers
*/

/*
8. catch() internally uses then()
promise.catch(fn);

is internally equivalent to:

promise.then(undefined, fn);

Example:

Promise.reject("Error")
  .catch(console.log);

Same as:

Promise.reject("Error")
  .then(undefined, console.log);
*/


// 9. finally() also uses then()

Promise.resolve("done")
  .finally(() => {
    console.log("Cleanup");
  })
  .then(console.log);


// Output:

// Cleanup
// done



// 10. Promise subclassing
// class MyPromise extends Promise {}

const prom = new MyPromise((resolve) => {
  resolve(10);
});

const result = prom.then((v) => v * 2);

console.log(result instanceof MyPromise);

/*
Output:

true

then() preserves subclass type.

Full mental model
.then()
   ↓
Registers callback
   ↓
Returns new promise
   ↓
When current promise settles:
   ↓
Run callback in microtask queue
   ↓
Take returned value
   ↓
Resolve next promise with that value
*/

// Simplified pseudo implementation
// then(onFulfilled, onRejected) {
//    return new Promise((resolve, reject) => {

//       this.handlers.push(() => {
//          try {
//             const result = onFulfilled(this.value);

//             resolve(result);
//          } catch(err) {
//             reject(err);
//          }
//       });

//    });
// }

//******************************************************************/
// Having a non-function as either parameter

Promise.resolve(1).then(2).then(console.log); // 1
Promise.reject(new Error("failed"))
.then(2, 2).then(console.log, console.log); // Error: failed
// Ist then bypasses the rejection value and 2nd then logging error, but 2nd 
// log actually log error value
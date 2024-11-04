/*
    The Promise.all() static method takes an iterable of promises as input and 
    returns a single Promise. This returned promise fulfills when all of the input's 
    promises fulfill (including when an empty iterable is passed), with an array of the 
    fulfillment values. It rejects when any of the input's promises rejects, 
    with this first rejection reason.
*/

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
//   setTimeout(reject, 100, 'foo');
  resolve(
    new Promise((innerRes,innerRej) => {
        innerRes(
            new Promise((res2, rej2) => {
                res2("foo")
                // rej2("innerRes 2")
            })
        )
     })
  )
});

Promise.all([promise1, promise2, promise3])
.then((values) => {
  console.log("values: ",values);
})
.catch((err) => {
    console.log('err: ', err);
})
// Expected output: Array [3, 42, "foo"]


/* 
If the iterable contains non-promise values, they will be ignored, but 
still counted in the returned promise array value (if the promise is fulfilled)
*/
// All values are non-promises, so the returned promise gets fulfilled
const p1 = Promise.all([1, 2, 3]);
// console.log('p1: ', p1); // pending

// The only input promise is already fulfilled,
// so the returned promise gets fulfilled
const p2 = Promise.all([1, 2, 3, Promise.resolve(444)]);

// One (and the only) input promise is rejected,
// so the returned promise gets rejected
const p3 = Promise.all([1, 2, 3, Promise.reject(555)]);

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
  console.log(p1);
  console.log(p2);
  console.log(p3);
},1000);

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[3] }
// Promise { <state>: "fulfilled", <value>: Array[4] }
// Promise { <state>: "rejected", <reason>: 555 }


// ***************************** Asynchronicity or synchronicity of Promise.all **********************
// Passing an array of promises that are already resolved,
// to trigger Promise.all as soon as possible
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.all(resolvedPromisesArray);
// Immediately logging the value of p
console.log(p);

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
  console.log("the queue is now empty");
  console.log(p);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }

// -> The same thing happens if Promise.all rejects:


// NOTE: Promise.all resolves synchronously if and only if the iterable passed is empty:
const pp = Promise.all([]); // Will be immediately resolved
const pp2 = Promise.all([1337, "hi"]); // Non-promise values are ignored, but the evaluation is done asynchronously

console.log(pp);
console.log(pp2);
setTimeout(() => {
  console.log("the queue is now empty");
  console.log(pp2);
});

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }


//************************************** */
// Directly passing the functions to Promise.all does not work, since they are not promises.
// WRONG
async function getPrice() {
    const [choice, prices] = await Promise.all([
      promptForDishChoice,
      fetchPrices,
    ]);
    // `choice` and `prices` are still the original async functions;
    // Promise.all() does nothing to non-promises
}
// WRONG


//**********************************************************************************/

/*
Promise.all is rejected if any of the elements are rejected. For example, 
if you pass in four promises that resolve after a timeout and one promise 
that rejects immediately, then Promise.all will reject immediately.


const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("one"), 1000);
  });
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("two"), 2000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("three"), 3000);
  });
  const p4 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("four"), 4000);
  });
  const p5 = new Promise((resolve, reject) => {
    reject(new Error("reject"));
  });
  
  // Using .catch:
  Promise.all([p1, p2, p3, p4, p5)])
    .then((values) => {
      console.log(values);
    })
    .catch((error) => {
      console.error(error.message);
    });
  
  // Logs:
  // "reject"
*/

//*********************************************************************/

// It is possible to change this behavior by handling possible rejections:

  const prom1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1_delayed_resolution"), 1000);
});

const prom2 = new Promise((resolve, reject) => {
  reject(new Error("p2_immediate_rejection"));
});

Promise.all([prom1.catch((error) => error), prom2.catch((error) => error)]).then(
  (values) => {
    console.log(values[0]); // "p1_delayed_resolution"
    console.error(values[1]); // "Error: p2_immediate_rejection"
  },
);

  
  



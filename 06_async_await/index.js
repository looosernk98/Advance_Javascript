/*
The async function declaration creates a binding of a new async function to a given
 name. The await keyword is permitted within the function body, enabling asynchronous, 
 promise-based behavior to be written in a cleaner style and avoiding the need to 
 explicitly configure promise chains

An async function declaration creates an AsyncFunction object. Each time when an 
async function is called, it returns a new Promise which will be resolved with the 
value returned by the async function, or rejected with an exception uncaught within 
the async function.

 Note: The purpose of async/await is to simplify the syntax necessary to consume 
 promise-based APIs. The behavior of async/await is similar to combining generators 
 and promises.

*/

console.log("first");

async function Hello(){
  console.log("second");
  const res = await Promise.resolve("third")
  console.log('res: ', res);
  console.log("fourth");
}
Hello()

console.log("fifth");

/*
Output:

  first
  second
  fifth
  res:  third
  fourth

*/


/*
Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve, they are not equivalent.

An async function will return a different reference, whereas Promise.resolve returns the same reference if the given value is a promise.

It can be a problem when you want to check the equality of a promise and a return value of an async function.
*/

const p = new Promise((res, rej) => {
    res(1);
  });

  console.log('p: ', p);
  
  async function asyncReturn() {
    return p;
  }
  console.log(asyncReturn())

  function basicReturn() {
    return Promise.resolve(p);
  }
  console.log(basicReturn())
  
  console.log(p === basicReturn()); // true
  console.log(p === asyncReturn()); // false

  
  // *************************************************
  async function foo() {
    return await 1;
  }
  console.log(foo())
  foo().then((res) => console.log(res))
  

  // *******************************************************************
  console.log('BEFORE');
  async function foo() {
    const result1 = await new Promise((resolve) =>
      setTimeout(() => resolve("1")),
    );
    const result2 = await new Promise((resolve) =>
      setTimeout(() => resolve("2")),
    );
    return 1;
  }

  const prom = foo();
  console.log('prom: ', prom);
  prom.then((res) => console.log(res)).catch((err) => console.log(err))
  console.log('AFTER');


  //******************************* Async functions and execution order  ***************/

  function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("slow");
        console.log("slow promise is done");
      }, 2000);
    });
  }
  
  function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("fast");
        console.log("fast promise is done");
      }, 1000);
    });
  }
  
  async function sequentialStart() {
    console.log("== sequentialStart starts ==");
  
    // 1. Start a timer, log after it's done
    const slow = resolveAfter2Seconds();
    console.log(await slow);
  
    // 2. Start the next timer after waiting for the previous one
    const fast = resolveAfter1Second();
    console.log(await fast);
  
    console.log("== sequentialStart done ==");
  }
  // sequentialStart()

  
  async function sequentialWait() {
    console.log("== sequentialWait starts ==");
  
    // 1. Start two timers without waiting for each other
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();
  
    // 2. Wait for the slow timer to complete, and then log the result
    console.log(await slow);
    // 3. Wait for the fast timer to complete, and then log the result
    console.log(await fast);
  
    console.log("== sequentialWait done ==");
  }
  sequentialWait()

  
  async function concurrent1() {
    console.log("== concurrent1 starts ==");
  
    // 1. Start two timers concurrently and wait for both to complete
    const results = await Promise.all([
      resolveAfter2Seconds(),
      resolveAfter1Second(),
    ]);
    // 2. Log the results together
    console.log(results[0]);
    console.log(results[1]);
  
    console.log("== concurrent1 done ==");
  }
  
  async function concurrent2() {
    console.log("== concurrent2 starts ==");
  
    // 1. Start two timers concurrently, log immediately after each one is done
    await Promise.all([
      (async () => console.log(await resolveAfter2Seconds()))(),
      (async () => console.log(await resolveAfter1Second()))(),
    ]);
    console.log("== concurrent2 done ==");
  }
  
  sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"
  
  // wait above to finish
  setTimeout(sequentialWait, 4000); // after 2 seconds, logs "slow" and then "fast"
  
  // wait again
  setTimeout(concurrent1, 7000); // same as sequentialWait
  
  // wait again
  setTimeout(concurrent2, 10000); // after 1 second, logs "fast", then after 1 more second, "slow"
  
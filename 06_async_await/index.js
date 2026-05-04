/*
async and await are used to handle asynchronous operations in JavaScript in a 
more readable and intuitive way compared to using Promises and .then() chains.

 Note: The purpose of async/await is to simplify the syntax necessary to consume 
 promise-based APIs. The behavior of async/await is similar to combining generators 
 and promises.

👉 async/await is NOT synchronous.
👉 It just makes asynchronous code look synchronous.

 Ques. How does async/await work under the hood?
 - async/await is just syntactic sugar over Promises

  What happens internally:

  async function foo() {
    console.log("A");
    await Promise.resolve();
    console.log("B");
  }

 Execution flow:

1. Synchronous Execution (The Call Stack)
The function foo() is called.
The engine enters the function and executes console.log("A") immediately.
Output: A

2. Encountering await
The engine reaches await Promise.resolve().
Promise.resolve() creates an already resolved promise.
Even though the promise is already resolved, the await keyword always yields control back to the main thread.
The rest of the function (everything after await, which is console.log("B")) is wrapped into a callback and scheduled as a Microtask.
The foo() function is "suspended," its execution context is popped off the Call Stack, and the engine continues executing any code that might be below the foo() call.

3. The Microtask Queue
Because the promise was already resolved, the "resume foo" task is placed into the Microtask Queue immediately.
Microtask Queue State: [ Resume foo() ]

4. Clearing the Call Stack
The Event Loop waits until the Call Stack is completely empty (i.e., the initial script execution has finished).

5. Executing Microtasks
Once the Call Stack is empty, the Event Loop checks the Microtask Queue.
It finds the "resume foo" task and pushes it back onto the Call Stack.
The engine resumes foo() right where it left off.
It executes console.log("B").
Output: B

  Equivalent:

  function foo() {
    console.log("A");
    return Promise.resolve().then(() => {
      console.log("B");
    });
  }

*/

// ********************* 1. What is async? *************************
/*
   -> async is a keyword used to declare an asynchronous function.

   -> An async function always returns a Promise, even if you don't explicitly 
   return a Promise. If a value is returned from the async function, JavaScript 
   wraps it in a Promise that resolves to that value.
*/

   async function exampleFunction() {
     return "Hello, world!";
   }

   console.log(exampleFunction())

  // Using the function:
  exampleFunction().then(value => {
    console.log(value); // Output: "Hello, world!"
  });

//********************** What is await?  **************************/
/*
 -> await is used to wait for a Promise to resolve.
 -> await can only be used inside an async function.
 -> When await is used, the code execution is paused until the Promise is 
    resolved. Once resolved, the execution continues with the resolved value.
-> await resumes via microtasks, which run before the next macrotask, causing 
   already-resolved promises to continue immediately.
*/

async function fetchData() {
  const data = await fetch("https://api.example.com/data");
  const json = await data.json();
  console.log(json);
}

/*
Benefits of async/await:

1. Readability: Code using async/await is easier to read and understand than 
                chained Promises.
2. Error Handling: Using try and catch blocks around await makes error handling 
                 more straightforward.
3. Cleaner Code: Avoids deeply nested .then() chains, leading to more 
                 maintainable and organized code.
*/


//=================================================================================

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
Even though the return value of an async function behaves as if it's wrapped in 
a Promise.resolve, they are not equivalent.

NOTE: An async function will return a different reference, whereas Promise.resolve 
returns the same reference if the given value is a promise.

It can be a problem when you want to check the equality of a promise and a 
return value of an async function.
*/

const p = new Promise((res, rej) => {
    res(1);
  });

  console.log('p: ', p); // output: promise with resolved to value 1
  
  async function asyncReturn() {
    return p;
  }
  console.log('asyncReturn:', asyncReturn())

  function basicReturn() {
    return Promise.resolve(p);
  }
  console.log('basicReturn:', basicReturn())
  
  console.log(p === basicReturn()); // true
  console.log(p === asyncReturn()); // false

  // *******************************************************************//

  async function test() {
    try {
      return await Promise.reject('error');
      // return Promise.reject('error'); // will throw error : handled rejection
    } catch (e) {
      return 'caught';
    }
  }
   
  test().then(console.log);
  
  // *******************************************************************//

  async function foo() {
    return await 1;
  }
  console.log(foo()) // pending promise
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


async function print(){
    return 1
 }
 
 console.log(print().then((res) => res)); // pending promise


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
  
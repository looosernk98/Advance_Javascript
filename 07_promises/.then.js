/*

The then() method of Promise instances takes up to two arguments: callback functions 
for the fulfilled and rejected cases of the Promise. It stores the callbacks 
within the promise it is called on and immediately returns another Promise object, 
allowing you to chain calls to other promise methods.

SYNTAX:
1. then(onFulfilled)
2. then(onFulfilled, onRejected)

# onFulfilled:
    A function to asynchronously execute when this promise becomes fulfilled. Its 
    return value becomes the fulfillment value of the promise returned by then(). 
    The function is called with the following arguments:

    value:
     - The value that the promise was fulfilled with.

     - If it is not a function, it is internally replaced with an identity function 
     ((x) => x) which simply passes the fulfillment value forward.

onRejected Optional:
    A function to asynchronously execute when this promise becomes rejected. Its 
    return value becomes the fulfillment value of the promise returned by then(). 
    The function is called with the following arguments:

    reason:
    The value that the promise was rejected with.

    If it is not a function, it is internally replaced with a thrower function 
    ((x) => { throw x; }) which throws the rejection reason it received.


🔍 How it Works (The Event Loop)

When you call .then(), JavaScript doesn't stop and wait. Instead, it follows these steps: 

1. Immediate Execution: The JavaScript engine executes the .then() method 
       synchronously.
2. Scheduling: It registers your callback function and moves it to the Microtask 
       Queue.
3. Non-Blocking: The rest of your synchronous code (the "main thread") continues 
       running immediately.
4. Callback Execution: Only after the main thread is completely empty does the 
       Event Loop pull the callback from the queue and run it

IMPORTANT POINTS TO REMEMBER:

-> The .then() method itself is executed synchronously, but the callback function 
   you pass into it is always executed asynchronously

-> A .then() returns a new Promise. That new promise resolves automatically 
  the moment its callback finishes executing

-> If your callback returns a normal value (or nothing), that new promise resolves 
   instantly, and the engine immediately queues the next .then() callback in case 
   of .then() chaining

-> However, if your callback returns a new Promise, the next .then() must wait for 
   that new promise to resolve first!

*/


Promise.resolve(4).then().then().then((val) => console.log(val))

Promise.resolve(4).then(console.log)



// ================================= Question1 ===============================

console.log(1);
setTimeout(()=>{console.log('setTimeOut')}, 0);
Promise.resolve().then(()=>{
    console.log('P1');
}).then(()=>{
    console.log('P2');
}).then(()=>{
    console.log('P3');
});
console.log(2);

/*

OUTPUT:
1
2
P1
P2
P3
setTimeOut

EXPLANATION: 

1️⃣ Phase 1: Synchronous Execution
The engine reads the script from top to bottom.

Step 1: console.log(1) enters the Stack, prints 1, and leaves.
Step 2: setTimeout() enters the Stack. The timer is handed to the browser/node API. 
        Its callback () => console.log('setTimeOut') is placed in the Macrotask 
        Queue. setTimeout leaves the Stack.
Step 3: The Promise chain executes synchronously:
    - Promise.resolve() creates a resolved promise.
    - The first .then() attaches the P1 callback. Since the promise is already resolved, the P1 callback is pushed to the Microtask Queue.
    - Crucially, the second and third .then() blocks are executed synchronously to register the event listeners, but because they are waiting on the previous .then() to finish, their callbacks (P2 and P3) are NOT put in the queue yet.
Step 4: console.log(2) enters the Stack, prints 2, and leaves.

2️⃣ Phase 2: Clearing the Microtasks
The synchronous code is now finished. The Call Stack is empty. The Event Loop checks the Microtask Queue before looking at Macrotasks.

Step 5: The engine pulls the P1 callback from the Microtask Queue and pushes it 
        to the Stack.
     - It prints P1.
     - As P1 finishes, the Promise returned by that first .then() is finally resolved.
     - This resolution triggers the scheduling of the P2 callback into the 
       Microtask Queue.
     - P1 callback leaves the Stack.
Step 6: The engine checks the Microtask Queue again. It finds the P2 callback and 
        pushes it to the Stack.
    - It prints P2.
    - As P2 finishes, its promise resolves and triggers the scheduling of the P3 callback into the Microtask Queue.
    - P2 callback leaves the Stack.
Step 7: The engine checks the Microtask Queue again. It finds the P3 callback and 
        pushes it to the Stack.
    - It prints P3.
    - P3 leaves the Stack. The Microtask queue is now completely empty!

3️⃣ Phase 3: Executing Macrotasks
Now that the Stack and the Microtask Queue are both completely empty, the Event Loop checks the Macrotask Queue.

Step 8: The engine pulls the setTimeout callback from the Macrotask Queue and 
        pushes it to the Stack.
    - It prints setTimeOut.
    - The callback leaves the Stack. The execution is complete.
*/


// ============================= Question 2 ==============================

console.log(1);

setTimeout(() => { console.log('setTimeOut') }, 0);

async function run() {
    await Promise.resolve();
    console.log('A1');
    console.log('A2');
}
run();

Promise.resolve().then(() => {
    console.log('P1');
});

console.log(2);

/*
📤 The Output
1
2
A1
A2
P1
setTimeOut

💡 Execution Breakdown:

1. Line-by-Line: 1 prints first. The setTimeout is sent to the macrotask queue.
2. The Await Pause: The run() function starts. It hits await, pauses, and pushes 
    everything below it (A1 and A2, means it schedules [resume run()] in microtask) to the microtask queue.
3. More Microtasks: The P1 promise completes and enters the microtask queue right 
    behind the paused async function.
4. Synchronous Finishes: 2 prints.
5. Queue Drain: The microtask queue runs A1, A2, and then P1. Finally, the macrotask 
   queue runs setTimeOut
*/


// =============================== Question 3 ================================

console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

async function asyncFn() {
    console.log('Async 1');
    await Promise.resolve();
    console.log('Async 2');
}

asyncFn();

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        return Promise.resolve();
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('End');

//********************** Question 4 (HARD) ***************************/

console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

async function asyncFn() {
    console.log('Async 1');
    await Promise.resolve();
    console.log('Async 2');
}

asyncFn();

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000) // schedules macrotask
        });
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('End');
/*

📤 The Output:

Start
Async 1
End
Async 2
Promise 1
Timeout
Promise 2

*/


//***************************** Question 5 ***************************/
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

async function asyncFn() {
    console.log('Async 1');
    await Promise.resolve();
    console.log('Async 2');
}

asyncFn();

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 0) // schedules macrotask
        });
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('End');
/*

📤 The Output:

Start
Async 1
End
Async 2
Promise 1
Timeout
Promise 2

🧱 State at the Beginning (Synchronous Phase)

Call Stack: Executes the script line-by-line.
console.log('Start') runs.
Output: Start
setTimeout(() => console.log('Timeout'), 0) runs. The Web API tracks this 0ms timer.
Macrotask Queue: ['Timeout callback']
asyncFn() enters the stack.
console.log('Async 1') runs. Output: Async 1
Hits await Promise.resolve(). Execution pauses. The rest of this function is sent to microtasks.
Microtask Queue: ['Async 2']
Promise.resolve().then(...) creates a resolved promise and registers the Promise 1 callback.
Microtask Queue: ['Async 2', 'Promise 1']
console.log('End') runs.
Output: End
The call stack is now completely empty. 

🌀 Phase 1: Clearing the Microtasks
The Event Loop prevents any Macrotasks from running until the Microtask queue is entirely empty. 
Turn 1: Pulls Async 2 from the Microtask Queue.
Call Stack: Runs console.log('Async 2').
Output: Async 2
Turn 2: Pulls Promise 1 from the Microtask Queue.
Call Stack: Runs console.log('Promise 1').
Output: Promise 1
Inside this callback, it returns a new Promise that triggers another setTimeout(..., 0).
The Web API registers this second 0ms timer and pushes it to the bottom of the Macrotask Queue.
Macrotask Queue: ['Timeout callback', 'Resolve callback'] 
The Call Stack and Microtask Queue are now empty. 

🔄 Phase 2: Running the Macrotasks
The Event Loop picks the first available task in the Macrotask Queue. 
Turn 3: Pulls Timeout callback from the Macrotask Queue.
Call Stack: Runs console.log('Timeout').
Output: Timeout
The Call Stack is empty again. The Event Loop checks the Microtask Queue (it is empty) and moves to the next Macrotask.
Turn 4: Pulls Resolve callback (from Promise 1's timer) from the Macrotask Queue.
Call Stack: Runs resolve().
Fulfilling this promise allows the very last .then() to execute, queuing its Promise 2 callback into the Microtasks.
Microtask Queue: ['Promise 2'] 

🧹 Phase 3: Final Microtask Cleanup
Before moving to another loop or stopping, the Event Loop sees a new microtask has been added and immediately prioritizes it! 
Turn 5: Pulls Promise 2 from the Microtask Queue.
Call Stack: Runs console.log('Promise 2').
Output: Promise 2

*/

// ******************************** Question 6 ******************************

console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

async function asyncFn() {
    console.log('Async 1');
    await Promise.resolve();
    console.log('Async 2');
}

asyncFn();

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        return new Promise((resolve, reject) => {
          queueMicrotask(resolve) // schedules microtask
        });
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('End');

/*

📤 The Output
Start
Async 1
End
Async 2
Promise 1
Promise 2
Timeout


💡 Execution Breakdown:

- Microtask Cut-In: In the previous example with setTimeout(resolve, 0), the 
      resolution of the promise had to wait at the back of the Macrotask Queue.
- The Shift: By using queueMicrotask(resolve), the resolution is placed directly 
       into the Microtask Queue.
- The Priority: Because the Event Loop refuses to move on to macrotasks (like 
       Timeout) until the microtask queue is completely drained, Promise 2 cuts 
       in line and executes before Timeout

*/

//************************ Question 7 *******************************/
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

async function asyncFn() {
    console.log('Async 1');
    await Promise.resolve();
    console.log('Async 2');
}

asyncFn();

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        return new Promise((resolve, reject) => {
          process.nextTick(resolve) // schedules its process.nextTick Queue (higher priority than microtask)
        });
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('End');

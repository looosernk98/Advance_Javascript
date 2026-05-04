async function test() {
    const p1 = new Promise(res => setTimeout(() => {
        console.log("p1 done");
        res();
    }, 2000));

    const p2 = new Promise(res => setTimeout(() => {
        console.log("p2 done");
        res();
    }, 2000));

    await p1;
    console.log("after p1");

    await p2;
    console.log("after p2");
}

test()

/*
test() fn is execute on the stack, it creates p1 promise and runs executor fn 
synchronously, inside executor fn , we have setTimeout so it is executed and JS
schedules a timer with cb in web API. timer API will wait for that delay.

Same will be happend with p2 . 

now code reaches the line 12 (await p1), JS pauses the execution of function and 
removes from the stack to run other synchronous code (off load the main thread).

as soon as timer1 (2000 ms) is elapsed , timer1 cb, timer2cb moves to macrotask queue. 
Now event loop checks if stack is empty or not. Since stack is already empty so 
it will execute the timer1 cb. and it will log "p1 done" and resolves p1 promise.
meanwhile timer2 also elapsed and p2 also resolved

as soon as p1 resolves, a microtask is scheduled to resumption of test function. 
Now JS checks the status of p1 , as it is resolved so it will pull run continue 
the execution of test function in stack.
it will log "after p1"

when code reaches line 25 (await p2). so it again pause the execution ,test fn 
removed from stack. now stack is empty , timer2 cb is there in macrotask queue 
so it will be pushed in stacke and executed. Now when p2 resolves then it 
schedules microtask to resume the test fn . now it logs "after p2"


// Now code reaches the line 15 (await p2), by the time code reaches this line 
// promise is already resolved and microtask is already scheduled. it will again 
// continue the execution of test function. 
// Now it will log "after p2"
*/

/*
Here is the exact step-by-step execution for your code:

- Immediate Execution: When new Promise(executor) is called for p1, the executor 
         function res => setTimeout(...) runs immediately on the main execution 
         stack.

- Timer Initiation: Inside that executor, setTimeout is called. This communicates 
         with the Browser's Timer API to start a 2000ms timer.

- Variable Assignment: The p1 variable is assigned the pending promise object, and 
         the code moves to the next line to do the exact same thing for p2.

- Microtask Queue: The Microtask Queue is only used when a promise resolves 
         (via .then(), .catch(), or await). In your code, when p1 finishes after 
         2 seconds and calls res(), the "reaction" (which is the resumption of 
        the async function after the await) is what gets scheduled in the 
        microtask queue.

When is the microtask created?
In this specific script, microtasks are created at two points:

When await p1 is encountered:
- The test() function execution is "suspended."
- The JavaScript engine creates a microtask to handle the resumption of the 
  function once p1 is fulfilled.
  
When res() is called inside the setTimeout:
- When the 2000ms timer finishes, the callback enters the Task Queue (Macrotask).
- Once that callback runs and executes res(), the promise p1 transitions from 
  pending to fulfilled. This fulfillment triggers the scheduling of the microtask 
  (the "continuation" of the test function) onto the Microtask Queue.


In your code, the microtasks handle:

1. Function Resumption: Restoring the execution context of the async function test().
2. Processing Results: Moving to the next line of code after the await 
   (e.g., executing console.log("after p1")).
3. Promise Chain Reactions: If you had .then() blocks, those callbacks would also 
   be handled as microtasks.

🔹 Promise creation
synchronous
runs executor immediately
*/



async function test2() {
    const p1 = new Promise(res => setTimeout(res, 1000));
    const p2 = new Promise(res => setTimeout(res, 1000));
  
    await Promise.all([p1, p2]);
}

test2()

// Event Loop Execution Flow:
// Call Stack: test() starts.
// Web API: p1 timer (1s) starts.
// Web API: p2 timer (1s) starts.
// Call Stack: Promise.all is called, and await pauses test(). Control returns to the main thread.
// Task Queue: After ~1000ms, both setTimeout callbacks arrive in the Macrotask queue.
// Resolution: As both p1 and p2 resolve, the Promise.all promise transitions to fulfilled.
// Microtask Queue: A microtask is queued to resume test().
// Resumption: The engine finishes any remaining code inside test() (in this case, just returning).


// =========================================================================

async function foo() {
    console.log("A");
    await Promise.resolve();
    console.log("B");
  }
  
  foo();
  console.log("C");

/*

🔹 Step 1: Call foo()
Call Stack: [ foo ]
console.log("A");

👉 Prints:

A
🔹 Step 2: Hit await
await Promise.resolve();

What happens:

Promise.resolve() → already resolved promise
await:
pauses foo
schedules continuation as a microtask
Microtask Queue: [ resume foo ]
Call Stack: []
🔹 Step 3: Continue main thread
console.log("C");

👉 Prints:

C
🔹 Step 4: Event loop runs microtasks
Microtask Queue: [ resume foo ]

👉 Now foo resumes:

Call Stack: [ foo ]
console.log("B");

👉 Prints:

B

🔥 Equivalent code:

function foo() {
  console.log("A");

  return Promise.resolve().then(() => {
    console.log("B");
  });
}

👉 That .then() is the microtask

*/
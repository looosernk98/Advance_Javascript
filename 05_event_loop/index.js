/*

-> Microtask queue has higher priority than callback queue
-> Microtask que contains callback coming from promises and mutation observer
-> Callback queue contains callback coming from setTimeout, setInterval

How do Event loops work?

1. Call Stack: JavaScript uses a call stack to keep track of the currently executing 
            function (where the program is in its execution).
2. Callback Queue:
Asynchronous operations, such as I/O operations or timers, are handled by the browser or Node.js runtime. When these operations are complete, corresponding functions (callbacks) are placed in the callback queue.

3. Event Loop:
The event loop continuously checks the call stack and the callback queue. If the call stack is empty, it takes the first function from the callback queue and pushes it onto the call stack for execution.

4. Execution:
The function on top of the call stack is executed. If this function contains asynchronous code, it might initiate further asynchronous operations.

5. Callback Execution:
When an asynchronous operation is complete, its callback is placed in the callback queue.

Repeat:
The event loop continues this process, ensuring that the call stack is always empty before taking the next function from the callback queue.
*/

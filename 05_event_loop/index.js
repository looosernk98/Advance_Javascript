/*

-> Microtask queue has higher priority than callback queue
-> Microtask que contains callback coming from promises and mutation observer
-> Callback queue contains callback coming from setTimeout, setInterval, 
   event listner, setImmediate, intersection observer

How do Event loops work?

1. Call Stack: JavaScript uses a call stack to keep track of the currently executing 
            function (where the program is in its execution).Initially, 
            JavaScript runs all synchronous code on the main thread.
2. Web API:

Web APIs are browser-provided interfaces that enable JavaScript to interact with 
features outside of the JavaScript engine, like making network requests, handling
timers, or interacting with the DOM. Examples of Web APIs include setTimeout, 
fetch, and DOM events.

Interaction with Web APIs:
When JavaScript code makes an asynchronous call (like setTimeout, fetch, or an 
event listener), the call is passed to the Web API provided by the browser.

The Web API handles the operation. For instance:
-> setTimeout waits for the specified delay.
-> fetch makes a network request and waits for the response.
-> Event listeners wait for a user action, such as a click or a key press.

Completion and Callback Registration:

Once the Web API completes the operation (e.g., the delay expires, or the 
network request completes), it places the callback function into the task 
queue (or microtask queue for Promises).

3. Event Loop:
The event loop continuously checks the call stack and the callback queue. 
If the call stack is empty, it takes the first function from the callback 
queue and pushes it onto the call stack for execution.

4. Execution:
The function on top of the call stack is executed. If this function contains 
asynchronous code, it might initiate further asynchronous operations.

5. Callback Execution:
When an asynchronous operation is complete, its callback is placed in the 
callback queue.

Repeat:
The event loop continues this process, ensuring that the call stack is always 
empty before taking the next function from the callback queue.
*/

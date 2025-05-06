/*
Browser JavaScript execution flow, as well as in Node.js, is based on 
an event loop.


The JavaScript engine does nothing most of the time, it only runs if a 
script/handler/event activates.

Examples of tasks:

When an external script <script src="..."> loads, the task is to execute it.
When a user moves their mouse, the task is to dispatch mousemove event and execute handlers.
When the time is due for a scheduled setTimeout, the task is to run its callback.

Tasks are set – the engine handles them – then waits for more tasks 
(while sleeping and consuming close to zero CPU).




===================== To schedule a new macrotask ======================

-> Use zero delayed setTimeout(f).

That may be used to split a big calculation-heavy task into pieces, 
for the browser to be able to react to user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully 
handled (bubbling done).

====================== To schedule a new microtask =====================

-> Use queueMicrotask(f).

Also promise handlers go through the microtask queue.
There’s no UI or network event handling between microtasks: they run immediately 
one after another.

So one may want to queueMicrotask to execute a function asynchronously, but 
within the environment state.

*/

console.log(1);
// The first line executes immediately, it outputs `1`.
// Macrotask and microtask queues are empty, as of now.

setTimeout(() => console.log(2));
// `setTimeout` appends the callback to the macrotask queue.
// - macrotask queue content:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// The callback is appended to the microtask queue.
// - microtask queue content:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// The callback with `setTimeout(...4)` is appended to microtasks
// - microtask queue content:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// The callback is appended to the microtask queue
// - microtask queue content:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` appends the callback to macrotasks
// - macrotask queue content:
//   `console.log(2); console.log(6)`

console.log(7);
// Outputs 7 immediately.


// output: 1 7 3 5 2 6 4.


// ======================================================
console.log("start")

setTimeout(function() {
  console.log("setimeout 1")
}, 0);

Promise.resolve("p1").then((res) => console.log(res))

Promise.resolve(() => console.log("p2")).then((res) => res())

Promise.resolve(() => setTimeout(() => console.log("p3"), 0)).then((res) => res())

setTimeout(function() {
  console.log("setimeout 2")
}, 0);

console.log("end")

// =============================================
console.log("start")

setTimeout(function() {
  console.log("setimeout 1")
}, 2);

Promise.resolve("p1").then((res) => console.log(res))

Promise.resolve(() => console.log("p2")).then((res) => res())

Promise.resolve(() => setTimeout(() => console.log("p3"), 0)).then((res) => res())

setTimeout(function() {
  console.log("setimeout 2")
}, 2);

console.log("end")

//============================================

console.log("start")

setTimeout(function() {
  console.log("setimeout 1")
}, 20);

Promise.resolve("p1").then((res) => console.log(res))

Promise.resolve(() => console.log("p2")).then((res) => res())

Promise.resolve(() => setTimeout(() => console.log("p3"), 0)).then((res) => res())

setTimeout(function() {
  console.log("setimeout 2")
}, 20);

console.log("end")
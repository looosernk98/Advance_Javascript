/*
 JavaScript has a built-in garbage collector that automatically manages memory. 
 Its primary role is to identify and free up memory that is no longer being used 
 by the program, making memory management simpler and reducing the risk of 
 memory leaks.

How Memory Management Works in JavaScript:
 When you create variables, objects, arrays, or functions in JavaScript, the 
 memory needed for these values is allocated. As your program runs, some of 
 these variables or objects may no longer be needed, so their allocated memory 
 needs to be reclaimed for future use. This is where the garbage collector 
 comes into play.

 How the Garbage Collector Works:
 The JavaScript garbage collector uses algorithms to determine which parts of 
 the memory are no longer accessible and can be safely released. The most common
 garbage collection strategy in JavaScript is called "mark-and-sweep"

 Mark-and-Sweep Algorithm:
 1. Mark: The garbage collector starts by "marking" all reachable objects in 
          memory. These are objects that can still be accessed by the program, 
          either directly or indirectly. The root of this reachability is usually 
          the window object in browsers or the global object in Node.js.
 2. Sweep: Once all reachable objects are marked, the garbage collector "sweeps" 
           through the memory and frees up the memory occupied by objects that 
           were not marked as reachable. These are objects that can no longer be 
           accessed by the program.


Example of Reachability:
Objects are considered reachable if they are:
-> Referenced by the current execution context (e.g., local variables or the 
   call stack).
-> Referenced by global variables.
-> Referenced by other reachable objects.
*/

let person = {
    name: "Alice"
  };
  
  // The object { name: "Alice" } is reachable via the 'person' variable.
  
  person = null;
  
  // Now, the object is no longer referenced and becomes eligible for garbage collection.

/*

Common Garbage Collection Strategies:
Reference Counting: This was one of the early techniques used for garbage 
         collection. An object is considered eligible for garbage collection if 
         there are no references to it. However, this approach has a significant 
         drawback: it cannot handle circular references well, where two objects 
         reference each other, but neither is actually reachable from the root.
Mark-and-Sweep: The most widely used strategy in modern JavaScript engines. It 
         can handle circular references and is more efficient for general use.

*/

// Example of Circular References
function createCircularReference() {
    const obj1 = {};
    const obj2 = {};
  
    obj1.ref = obj2;
    obj2.ref = obj1;
  
    // Both obj1 and obj2 reference each other, creating a circular reference.
  }
  
  createCircularReference();
  // Even though createCircularReference has finished executing, obj1 and obj2 reference each other, 
  // making them inaccessible from the outside and potentially leading to a memory leak if not handled properly.

  
/*

How to Avoid Memory Leaks:
Even with an efficient garbage collector, it's still possible to have memory 
leaks in JavaScript applications. Common causes include:

1. Global Variables: Variables defined globally or attached to the window object 
          remain in memory throughout the application's life cycle.

2. Uncleared Timers or Intervals: Using setInterval() or setTimeout() without 
           clearing them can lead to memory leaks.

let timer = setInterval(() => console.log("Running..."), 1000);
// Clear the interval when no longer needed
clearInterval(timer);

3. Event Listeners: Not removing event listeners when they are no longer needed 
       can cause objects to stay in memory longer than necessary.

const element = document.getElementById("myButton");
const handleClick = () => console.log("Button clicked");

element.addEventListener("click", handleClick);
// Remove the event listener to free up memory
element.removeEventListener("click", handleClick);

4. Closures: Closures can keep variables in memory if not used carefully, 
        especially when functions retain references to outer scope variables 
        even after the outer function has executed.

*/
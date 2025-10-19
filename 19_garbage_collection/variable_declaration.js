// 🔹 Global Scope with var
var a = 10;

/*
-> a becomes a property of the global object (window.a in browsers, 
   global.a in Node).
-> Since the global object is always reachable, a cannot be garbage collected 
   unless you explicitly set it to null or delete it.
-> Memory stays until page reload / process exit.
*/

// 🔹 Global Scope with let and const
let b = 20;
const c = 30;

/*
Unlike var, these are NOT added as properties of the global object.

console.log(window.b); // undefined
console.log(window.c); // undefined


Instead, they live in a special structure called the 
Script Environment Record (part of the global execution context).

This record also lives as long as the page / process lives.

Therefore: b and c are still never garbage collected until the page is 
closed or reloaded.

*/

// 🔹 In Node.js

// The global object is called global (instead of window).

// var declared in the top-level of a Node file does not become a property of global.

// This is because each Node file is wrapped in a module function, so the top-level scope is module scope, not truly global.

name = "alice"

const obj = {
    name: "alex",
    age: 23,
    printname: () => {
        console.log(this.name)
    }
}

obj.printname()
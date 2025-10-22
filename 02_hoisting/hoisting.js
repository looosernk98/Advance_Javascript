/*

hoisting : hoisting allows you to access variables and functions ecven before 
           it's *declaration*

JavaScript Hoisting refers to the process whereby the interpreter appears to 
move the declaration of functions, variables, classes, or imports to the top 
of their scope, prior to execution of the code.

*/

//********************************** Variable hoisting **********************/

/*

Variable hoisting means the JavaScript engine moves the variable declarations 
to the top of the script(scope)

Variable declarations are also hoisted, but there’s a crucial difference between 
them and function declarations. When a variable is hoisted, only the declaration is 
moved to the top, not the initialization. This means that the variable is accessible
but undefined until it’s assigned a value.



*/

console.log(counter); // undefined
var counter = 1;
//During the creation phase of the global execution context, the JavaScript 
// engine places the variable counter in the memory and initializes its value 
// to undefined.


// ===== The let keyword =====

// The JavaScript issues the following error in case of let:
console.log(num); // "ReferenceError: Cannot access 'counter' before initialization
let num = 10;

/*
 The error message explains that the counter variable is already in the heap 
 memory. However, it hasn’t been initialized.
 Behind the scenes, the JavaScript engine hoists the variable declarations 
 that use the let keyword. However, it doesn’t initialize the let variables.

 let and const are hoisted too, but placed in the Temporal Dead Zone (TDZ) until 
 their definition is reached.
*/

// Notice that if you access a variable that doesn’t exist, the JavaScript will throw a different error:

console.log(alien); // "ReferenceError: alien is not defined
let num2 = 1;



// ********************** Function hoisting ************************************
/*

 Like variables, the JavaScript engine also hoists the function declarations. 
 This means that the JavaScript engine also moves the function declarations to 
 the top of the script. For example:

 👉 Entire function is hoisted, so you can call it before it’s defined.
*/

let x = 20,
  y = 10;

let result = add(x, y); 
console.log(result); // 👉 30

function add(a, b) {
  return a + b;
}

/*
 During the creation phase of the execution context, the JavaScript engine 
 places the add() function declaration in the heap memory. To be precise, the 
 JavaScript engine creates an object of the Function type and a function reference 
 add that refers to the function object.

*/

// === Function expressions ====

let n1 = 20,
    n2 = 10;

let res = add_(n1,2); // ❌ Uncaught ReferenceError: add_ is not defined
console.log(res);

let add_ = function(x, y) { // will beahve same in case of arrow function
    return x + y;
}

/*

CONCLUSION:

JavaScript hoisting occurs during the creation phase of the execution context 
that moves the variable and function declarations to the top of the script.

The JavaScript engine hoists the variables declared using the let keyword, 
but it doesn’t initialize them as the variables declared with the var keyword.

The JavaScript engine doesn’t hoist the function expressions and arrow functions


Hoisting Order in a Function:

-> Inside a function, JavaScript hoists in this order:

1. Function declarations
2. Variable declarations (var)
3. Function parameters

Key Rule:
-> Parameter names are local variables.
-> If a var has the same name as a parameter, the var declaration is ignored 
   (but the assignment still runs during execution).

*/

// ========================== WHO HAS HIGH PRECEDENCE =====================
function example(a) {
  console.log(a); // Output ?
  var a = 20;
  console.log(a); // Output ?
//   function a() {}
//   console.log(a); // Output ?
}

example(10);

// OUTPUT : 
// [Function: a]
// 20
// 20

// EXPLANATION

/*
 Key concepts at play:

-> Function and variable declarations are hoisted.JS moves their declaration on 
   top of script
-> Function declarations are hoisted before variable declarations.
-> If a function and a variable have the same name, the function takes precedence 
  during hoisting.
-> Function parameters are also treated like variable declarations.

*/

// Here's how JavaScript "sees" the function after hoisting:
function example(a) {
  function a() {}       // Function `a` hoisted first
  var a;                // Then `var a` is hoisted but doesn't override the function
  console.log(a);       // ①
  a = 20;               // assignment
  console.log(a);       // ②
  console.log(a);       // ③
}

/*
✅ Initial State:

-> function a() is hoisted (overrides the parameter named a).

-> var a is also hoisted, but does not override the function a.

-> Parameter a is present as well (example(10)), but the hoisted function a() 
   takes precedence over the passed value 10.

-> So, inside the function:
a initially refers to the function a, not the value 10.


🔢 Execution:
console.log(a);
   -> a refers to the hoisted function a(), so:
   -> Output: function a() {}

a = 20;
   -> Reassigns a to 20.

console.log(a);
   -> a is now 20
   -> Output: 20

console.log(a);
   -> Still 20
   -> Output: 20
*/


function A(b){
  console.log(b)// declaration hoisted (but ignored since `b` already exists as a parameter)
  // parameters have higher priority than var declarations
  var b = 20
  console.log(b)
}

A(10)

/*
Function parameters behave like var variables inside that function.

If a var with the same name exists, its declaration is ignored.

Hence, var b doesn’t overwrite or hoist above the parameter value — so the 
parameter’s value (10) remains available for the first log.
*/

var u = 20;
console.log(u)
var u // will be ignored as u variable is already declared
console.log(u)
u = 30














/*

hoisting : hoisting allows you to access variables and functions ecven before 
           it's *declaration*

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
*/

// Notice that if you access a variable that doesn’t exist, the JavaScript will throw a different error:

console.log(alien); // "ReferenceError: alien is not defined
let num2 = 1;



// ********************** Function hoisting ************************************
/*
 Like variables, the JavaScript engine also hoists the function declarations. 
 This means that the JavaScript engine also moves the function declarations to 
 the top of the script. For example:
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

*/













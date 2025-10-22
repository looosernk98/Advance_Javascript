/*

JavaScript closure is a feature that allows inner functions to access the outer 
scope of a function. 

Closure helps in binding a function to its outer boundary 
and is created automatically whenever a function is created

OR 

function along with its lexical scope bundled together forms a closure


USES of closures:
1. Module design pattern
2. hiding implemenation details - it can be useful to create private variables or functions.


*******************  Why Closures Are Important *****************************
Closures are important for several reasons:

1. Data Encapsulation: Closures enable data encapsulation by allowing you to create 
private variables and functions within a scope, shielding them from external access.

2. Maintaining State: Closures can maintain state across multiple function calls. 
This is useful for scenarios like event handlers and asynchronous code.

3. Module Patterns: Closures are a key component in creating module patterns, which 
help structure and organize code into reusable components.

4. Callback Functions: Many callback functions in JavaScript are closures. They retain 
access to variables from their parent scopes, which can be crucial for callback functionality.

5. Memory Management: Closures play a role in managing memory. They ensure that variables 
referenced by a closure are not garbage collected as long as the closure exists.
*/

// Example 1 
function OuterFunction() {

    var outerVariable = 1;

    function InnerFunction() {
      console.log('outerVariable: ', outerVariable); // can access outer varibale   
    }

    InnerFunction();
}

OuterFunction();

// Example 2
// InnerFunction() can access outerVariable even if it will be executed separately
function OuterFunction2() {

    var outerVariable = 100;

    function InnerFunction2() {
        alert(outerVariable);
    }

    return InnerFunction2;
}
var innerFunc = OuterFunction2();

innerFunc(); // 100

// Example 3
//  outer variables can keep their states between multiple calls
function Counter() {
    var counter = 0;

    function IncreaseCounter() {
        return counter += 1;
    };

    return IncreaseCounter;
}

var counter = Counter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 4


// Example 4 - The following is not a closure.
var CounterVal = (function () {
    var i = 0;
    return { counter : i += 1 };
})();
console.log('CounterVal: ', CounterVal);


// Example 5 - below example is not a closure

function A(){
    var a = 8;
    B()
}

A()
/* 
  outer scope of B is global not Function A. 

  ***** scope is always referred in terms of where the decalaration of function is written ****
*/
function B(){ 
    console.log(a)
}


(function(){
    try {
        throw new Error();
    } catch (err) {
        var x = 1, y = 2; // var is not blocked scope it will be hoisted on top of scope
        console.log('inner x: ', x);
    }
    console.log('outer x: ', x);
    console.log('outer y: ', y);
})()

// ***********************************************************************

(function(){
    try {
        throw new Error();
    } catch (x) {
        // catch parameter is block-scoped
        // It behaves like let
        // It shadows outer variables
        var x = 1, y = 2;
        console.log('inner x: ', x);
    }
    console.log('outer x: ', x);
    console.log('outer y: ', y);
})()

/*
AFTER HOISTING ABOVE CODE LOOKS LIKE BELOW:

(function(){
    var x, y; // hoisted (function scope)

    try {
        throw new Error();
    } catch (x) { // ⚠️ NEW block-scoped x (shadows outer x)
        x = 1;    // modifies catch x, NOT outer x
        y = 2;    // modifies outer y
        console.log('inner x: ', x);
    }

    console.log('outer x: ', x);
    console.log('outer y: ', y);
})()

*/
// ***********************************************************************

(function(){
    var a = b = 3;
})()

console.log(a); // ❌ ReferenceError: a is not defined
console.log(b); // 3

/*
 Explanation:

 var a = b = 3; 
 -> IS NOT SAME AS
 var a = 3;
 var b = 3;


 JS evaluates it like:
 b = 3;        // (1) assignment WITHOUT declaration
 var a = b;    // (2) assign value of b to a

🚨 Important Rule
If you assign a variable without var/let/const
👉 it becomes a global variable (in non-strict mode)

Above code interprets as:

(function(){
    var a;   // hoisted (function scope)
    
    b = 3;   // ❗ creates GLOBAL variable
    a = b;   // assigns 3 to local `a`
})();

*/

// ***********************************************************************

// ***********************************************************************

// ***********************************************************************

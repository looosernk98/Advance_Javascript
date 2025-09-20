console.log(x) // error : not defined
x = 4

// If you don’t declare a variable using var, let, or const, JavaScript will implicitly create a global variable — but only in non-strict mode.
i = 0;
console.log(i); // print 0 without error

// Since there's no let, const, or var, i becomes a global variable (not 
// recommended in strict mode or modern JS best practices).


function setJ() {
    j = 10; // Implicit global
}
setJ();
console.log(j); // Outputs: 10

"use strict";
function setZ() {
  z = 10; // ❌ ReferenceError: i is not defined
}

setZ()
console.log(z)



function test() {
    i = 5; // No var/let/const
  }
  test();
  console.log(window.i); // 5 (in browser)
  

  
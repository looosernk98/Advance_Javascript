
/*

A script that updates/adds new functions is called “polyfill”. It “fills in” 
the gap and adds missing implementations

For example, Math.trunc(n) is a function that “cuts off” the decimal part of a 
number, e.g Math.trunc(1.23) returns 1.

In some (very outdated) JavaScript engines, there’s no Math.trunc, so such code 
will fail.

*/

if (!Math.trunc) { // if no such function
    // implement it
      Math.trunc = function(number) {
      // Math.ceil and Math.floor exist even in ancient JavaScript engines
      // they are covered later in the tutorial
      return number < 0 ? Math.ceil(number) : Math.floor(number);
    };
}

/* 

how to make our modern code work on older engines that don’t understand recent 
features yet?

There are two tools for that:
1. Transpilers
2. Polyfills

*/
  
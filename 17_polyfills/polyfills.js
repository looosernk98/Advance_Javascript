
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
1. Transpilers - A transpiler (short for "source-to-source compiler") converts 
                 modern JavaScript (ES6+) into older versions (like ES5) that 
                 older browsers can understand.

                 Popoular Tool: Babel

  // Modern ES6+
  const greet = () => console.log("Hello!");

  // Babel transpiles it to:
  var greet = function () {
    return console.log("Hello!");
  };


2. Polyfills - Polyfills add missing functionality to older environments by 
               emulating newer features.
   
  Example:
  If an old browser doesn’t support Promise, a polyfill provides a replacement implementation.

  Popular sources: core-js, polyfill.io

  Babel can also include polyfills with @babel/preset-env and core-js

  // Example: fetch polyfill
  // Older browsers don't support `fetch`, so you might use:
  import 'whatwg-fetch'; // or use axios instead of fetch


✅ Best Practice Setup
Use Babel + Webpack/Vite + core-js:

Transpile modern code

Automatically include needed polyfills based on target browser

npm install --save-dev @babel/core @babel/preset-env
npm install core-js regenerator-runtime

.babelrc file
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}

*/





  
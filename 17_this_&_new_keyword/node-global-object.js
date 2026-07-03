// In Node.js, the confusion arises because this at the top level of a file does 
// not point to the actual global object. Instead, it points to the module's 
// exports object, which starts completely empty {}

// Scenario 1: You See an Empty Object {} (File Execution) 

// When you run a standard JavaScript file using node filename.js, 
// Node.js automatically wraps your entire file inside an invisible wrapper 
// function before executing it.
// Because of this wrapper, the top-level this is bound to module.exports.
// Inside filename.js
console.log(this); // Output: {}

/*

Why it is empty?
It is empty because your module has not exported anything yet. 
If you add an export, this will change:

module.exports.foo = "bar";
console.log(this); // Output: { foo: 'bar' }


Scenario 2: You See a Populated Global Object (The REPL):

If you open your terminal, type node to enter the interactive REPL 
(Read-Eval-Print Loop), and type this, you will see a massive object 
filled with properties like setTimeout, console, and process.

// Inside the Node.js REPL terminal
> this
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate],
  ...
}

  Why it is populated?
  The REPL does not use the file module wrapper system. Code typed into the 
  REPL executes directly within the global execution context. Therefore, 
  this directly references the actual global object.

  Scenario 3: CommonJS Modules vs. ES Modules
  Node.js supports two different module systems, and they handle the top-level 
  this differently:
  CommonJS (.js or .cjs): As shown in Scenario 1, the file is wrapped in a function. 
    Top-level this refers to module.exports, which is initially an empty object {}.

ES Modules (.mjs or "type": "module"): According to the official ECMAScript 
specification, the top-level this inside an ES module is explicitly undefined. 
It will never be an object.

If you want to safely access the true global object across any environment 
(Node.js file, Node.js REPL, or browser) without worrying about context, 
you should use the standardized global variable globalThis


*/
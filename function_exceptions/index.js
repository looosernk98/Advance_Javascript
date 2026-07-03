// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

// You cannot declare a variable using var inside a block if a block-scoped variable (like a function or a let/const) already claims that exact same name in the same block.

var x = 1;
{
    console.log(x);

    var x = 2;

    function x() {
        return 3;
    }
}
console.log(x);

//*****************************************************************************/

"use strict";
{
  function foo() {}
  function foo() {} // SyntaxError: Identifier 'foo' has already been declared
}

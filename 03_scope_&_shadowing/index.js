/*

Scope: Scope refers to the availability of the variables and functions in 
       specific parts of the code

Scope Chain: finding variables and function in parent references chain

Lexical Scope: A function scope’s ability to access variables from the 
              parent scope is known as lexical scope. 
              We refer to the parent function’s lexical binding of the child 
              function as “lexically binding.”

In JavaScript, we have global scope, function scope, and block scope.

The variable declared with var is global-scoped as well as function scope,
meaning that if we create a variable inside of a function it will not be 
accessible outside the function. 

The let and const keywords are also function scope but at the same time they are
also block-scoped, meaning that in a block of code consisting of curly braces
like if conditions, switch statements, or loops, they will not be accessible 
if they were declared inside of them.

*/






// ************************** shadowing **************************

/*

 Variable shadowing occurs when a variable with the same name is declared in an 
 inner scope, such as a function or a block, as a variable in an outer scope.

 In such cases, the variable in the inner scope shadows or hides the variable 
 in the outer scope. This means that any references to the variable within the 
 inner scope will refer to the inner variable, effectively 
 "shadowing" the outer variable.

*/
// Example 1.
let x = 10;

function foo() {
  let x = 20; // shadows outer scoped x = 10;
  console.log(x); 
}

foo();
console.log(x);

// Example 2
 

// https://dillionmegida.com/p/temporal-dead-zone-in-javascript/
// https://www.freecodecamp.org/news/javascript-temporal-dead-zone-and-hoisting-explained/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

/*

TDZ refers to the Temporal Dead Zone, which is a time duration or period within a 
scope in JavaScript where variables declared with let or const exist but cannot be 
accessed until they are initialized. 

It's not a memory area, but a state of unreachability for these variables, a 
"dead zone" that lasts from the start of the scope until the variable's 
declaration line in the code

Why it exists: 
-> The TDZ is a safeguard to help prevent potential issues with uninitialized 
   variables, which was a common problem with var declarations.
-> It ensures that developers use variables only after they've been 
   explicitly declared and initialized with a value.

Does TDZ occupy some physical memory ?
No, TDZ does not occupy any additional memory

Let us understand this with a analogy , suppose there are 2 tables, there is an apple 
on table 1 and you want to move that to table 2. Now you picked apple from table 1 
and the apple is in air. That space in air where apple is not on table and can be 
classified as TDZ and think of table 1 as declaration phase and table 2 as 
initialization phase and air with temporal dead zone.


This concept applies to variables declared with let and const (but not var).

*/

// the block’s TDZ starts from the opening curly bracket ({) and ends once the 
// computer initializes bestFood with the string value "Vegetable Fried Rice".
// When you run the snippet, you will see that the console.log() statement will 
// return a ReferenceError.
// JavaScript will return a ReferenceError because we used the console.log() 
// code to access bestFood before its complete initialization. In other words, 
// we invoked bestFood within the temporal dead zone.

// However, here is how you can access bestFood successfully after its complete 
// initialization:
{
    // bestFood’s TDZ starts here (at the beginning of this block’s local scope)
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    console.log(bestFood); // returns ReferenceError because bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    let bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ ends here
    // bestFood’s TDZ does not exist here
    // bestFood’s TDZ does not exist here
    // bestFood’s TDZ does not exist here
  }

{
    // TDZ starts here (at the beginning of this block’s local scope)
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    let bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ ends here
    console.log(bestFood); // returns "Vegetable Fried Rice" because bestFood’s TDZ does not exist here
    // bestFood’s TDZ does not exist here
    // bestFood’s TDZ does not exist here
  }



  //===========================================================================
//  You can see that the first console.log code in the snippet above returned 
//  undefined.

// JavaScript returned undefined because we did not assign bestFood a value before 
// using (invoking) it. As such, JavaScript defaulted its value to undefined.
  {
    // TDZ starts here (at the beginning of this block’s local scope)
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    // bestFood’s TDZ continues here
    let bestFood; // bestFood’s TDZ ends here
    console.log(bestFood); // returns undefined because bestFood’s TDZ does not exist here
    bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ does not exist here
    console.log(bestFood); // returns "Vegetable Fried Rice" because bestFood’s TDZ does not exist here
  }

/*
  
Hoisting refers to JavaScript giving higher precedence to the declaration of
variables, classes, and functions during a program’s execution.

Hoisting makes the computer process declarations before any other code.
Note: Hoisting does not mean JavaScript rearranges or moves code above one 
another.

Hoisting simply gives higher specificity to JavaScript declarations. Thus, it 
makes the computer read and process declarations first before analyzing any 
other code in a program.
  */
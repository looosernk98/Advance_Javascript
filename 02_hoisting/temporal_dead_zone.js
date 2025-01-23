// https://dillionmegida.com/p/temporal-dead-zone-in-javascript/
// https://www.freecodecamp.org/news/javascript-temporal-dead-zone-and-hoisting-explained/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

/*

The TDZ of a variable declared in your JavaScript code is the area where the 
variable is hoisted but inaccessible until it is initialized with a value. 
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
/*

JavaScript Execution Context is the environment in which JavaScript code is 
executed. It contains information about the variables, functions, and objects 
that are available to the code being executed, as well as the scope chain and 
the value of the 'this' keyword.

There are two types of context : global and functional

An execution context has two phases:
1. Creation phase: In this phase, the JavaScript engine creates the execution 
                   context and sets up the script's environment. It determines 
                   the values of variables and functions and sets up the scope 
                   chain for the execution context.

2. Execution phase: In this phase, the JavaScript engine executes the code in the 
                 execution context. It processes any statements or expressions 
                 in the script and evaluates any function calls.For Each function invocation,
                 a new execution context is created


 -> Call Stack:

 To keep the track of all the contexts, including global and functional, the 
 JavaScript engine uses a call stack. A call stack is also known as an 
 'Execution Context Stack', 'Runtime Stack', or 'Machine Stack'

 */
/*

JavaScript closure is a feature that allows inner functions to access the outer 
scope of a function. 

Closure helps in binding a function to its outer boundary 
and is created automatically whenever a function is created

OR 

function along with its lexical scope bundled together forms a closure


USES of closures:
1. Mudule design pattern
2. hiding implemenation details - it can be useful to create private variables or functions.
*/

// Example 1 
function OuterFunction() {

    var outerVariable = 1;

    function InnerFunction() {
      console.log('outerVariable: ', outerVariable); // can access outer varibale   
    }

    InnerFunction();
}

OuterFunction();

// Example 2
// InnerFunction() can access outerVariable even if it will be executed separately
function OuterFunction2() {

    var outerVariable = 100;

    function InnerFunction2() {
        alert(outerVariable);
    }

    return InnerFunction2;
}
var innerFunc = OuterFunction2();

innerFunc(); // 100

// Example 3
//  outer variables can keep their states between multiple calls
function Counter() {
    var counter = 0;

    function IncreaseCounter() {
        return counter += 1;
    };

    return IncreaseCounter;
}

var counter = Counter();
alert(counter()); // 1
alert(counter()); // 2
alert(counter()); // 3
alert(counter()); // 4


// Example 4 - The following is not a closure.
var CounterVal = (function () {
    var i = 0;
    return { counter : i += 1 };
})();
console.log('CounterVal: ', CounterVal);


// Example 5 - below example is not a closure

function A(){
    var a = 8;

    B()
}

A()
// outer scope of B is global not Function A. scope is always referred in terms of where the decalaration of function is written
function B(){ 
    console.log(a)
}

// Closure is usedful for hiding implementation details. See below example
var counterObject = (function() {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function() {
        changeBy(1);
      },
      decrement: function() {
        changeBy(-1);
      },
      value: function() {
        return privateCounter;
      }
    };   
  })();
  
  console.log(counterObject.value()); // 0
  counterObject.increment();
  counterObject.increment();
  console.log(counterObject.value()); // 2
  counterObject.decrement();
  console.log(counterObject.value()); // 1

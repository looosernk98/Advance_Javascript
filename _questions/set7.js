
//===========================================================================

function outer() {
    let count = 0;

    return function inner() {
        count++;
        console.log(count);
    };
}

const firstCall = outer();  // execution context1
const secondCall = outer(); // execution context2

console.log(firstCall == secondCall)

firstCall();  // Output ? 1
firstCall();  // Output ? 2
secondCall(); // Output ? 1
firstCall();  // Output ? 3
secondCall(); // Output ? 2

//===========================================================================

console.log(foo()); // Output ?

function foo() {
    return "Function declaration";
}

var foo = function () {
    return "Function expression";
};

console.log(foo()); // Output ?

//===========================================================================


let x = {
    a: 1,
    b: {
      a: 1,
    },
  };
  
  let y = {
    a: 1,
    b: {
      a: 1,
    },
  };
  
  console.log(JSON.stringify(x) === JSON.stringify(y));

//===========================================================================

function hello(){
    return { a: 1}
}

console.log(hello() === hello())

//===========================================================================

function func() {
    console.log(a); // Output ?
    var a = 10;
    console.log(a); // Output ?
    if (true) {
        var a = 20;
        console.log(a); // Output ?
    }
    console.log(a); // Output ?
}

func();


//===========================================================================
function delayedLogs() {
  for (var i = 0; i < 3; i++) {
      setTimeout(function () {
          console.log(i);
      }, i * 1000);
  }
}

delayedLogs(); // Output ?

// Follow-up: Fix it to print 0, 1, 2 using closures.
// function delayedLogs() {
//   for (let i = 0; i < 3; i++) {
//       setTimeout(function () {
//           console.log(i);
//       }, i * 1000);
//   }
// }

//===========================================================================
const funcs = [];

for (let i = 0; i < 3; i++) {
    funcs.push(function () {
        console.log(i);
    });
}

funcs[0](); // Output ?
funcs[1](); // Output ?
funcs[2](); // Output ?

// Follow-up: Rewrite the loop with var instead of let and predict the output.

//===========================================================================

var a = 1;

function outer() {
    console.log(a); // Output ?
    var a = 2;

    function inner() {
        console.log(a); // Output ?
        let a = 3;
        console.log(a); // Output ?
    }

    inner();
}

outer();


//===========================================================================
function createCounter() {
  let count = 0;

  return {
      increment: function () {
          count++;
      },
      getCount: function () {
          return count;
      },
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.increment();

console.log(counter1.getCount()); // Output ?
console.log(counter2.getCount());

//===========================================================================

function test() {
  console.log(a); // Output ?
  let a = 5;
  console.log(a); // Output ?
}

test();


//===========================================================================

for (var i = 0; i < 3; i++) {
  (function (j) {
      setTimeout(function () {
          console.log(j);
      }, j * 1000);
  })(i);
}

//===========================================================================
const obj = {
  name: "Object",
  logName: function () {
      console.log(this.name); // Output ?

      setTimeout(function () {
          console.log(this.name); // Output ?
      }, 1000);
  },
};

obj.logName();

// Follow-up: How can you fix the second console.log to print the object's name?

//===========================================================================
function add(a, b){
  this.a = a;
  this.b = b;

  console.log(this.a, this.b);
}

add.prototype.assignA = function(a){
this.a = a;
console.log(this.a, this.b);
}

add.prototype.assignB = function(b){
this.b = b;
console.log(this.a, this.b);
}

const res = new add(10,10);
res.assignA(20)
res.assignB(30)

//===========================================================================





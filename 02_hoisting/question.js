// ================================ Question 1 ========================================

console.log(a);
var a = 10;

function a() {
  console.log("Function a");
}

console.log(typeof a);

// ================================= Question 2 =======================================
console.log(foo);
let foo = 5;

function foo() {
  console.log("inside function");
}


// =============================== Question 3 =========================================

var x = 1;

(function() {
  console.log(x);
  var x = 2;
  function x() {}
  console.log(x);
})();

// =================================== Question 4=====================================


foo();

// fn expression
var foo = function() {
  console.log("bar");
};
// fn declaration
function foo() {
  console.log("foo");
}

foo();

// ================================== Question 5 ======================================

var a = 5;

(function() {
  console.log(a);
  console.log(b);
  var a = 10;
  let b = 20;
})();


// ================================ Question 6 ========================================

{
  console.log(x);
  function x() {}
  let x = 10;
}

// ================================== Question 7 ======================================

function test() {
  console.log(a);
  if (true) {
    var a = 10;
  }
  console.log(a);
}
test();

// =================================== Question 8 =====================================

function bar() {
  return foo;
  var foo = 10;
  function foo() {}
  var foo = 20;
}
console.log(typeof bar());

// ==================================== Question 9 ====================================

var a = 1;
function b() {
    a = 10;
    return;
    function a() {}
}
b()
console.log(a);

// =================================== Question 10 =====================================


var b = 80

function f(){
  b = 90;
}

f()

console.log(b);
// ================================== Question 11======================================

var x = 1;
{
    console.log(x);

    let x = 2;

    function x() {
        return 3;
    }
}
console.log(x);
// ==================================== Question 12====================================

function foo() {
    console.log(a); // undefined
    console.log(b); // function b(){}

    var a = 1;
    function b() { return 2; }

    var a = 5;
    b = 10;

    console.log(a);// 5
    console.log(b); // 10
}
foo();













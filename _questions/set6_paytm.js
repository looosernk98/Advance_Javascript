/*

Q1. what will be the output of the following code snippet?

(function() {
  var greet = 'Hello World';
  var toGreet = [].filter.call(greet, function(element, Index){ 
    return index > 5;
  });
  console.log(toGreet);
}());

Pick ONE option:

A.) ['H', 'e', 'l', 'l', 'o', '','W', 'o', 'r', 'I', 'd']
B.) ['H', 'e', 'l', 'l', 'o']
C.) Hello World
D.) ['W', 'o', 'r', '', 'd']


Q2.What will be the output of the following code snippet
var a = "outer"
function test1(name) {
   let a = name;

   function test2() {
     console.log('Output:', this.a);
   }
   test2();
}
test1 ("paytm")

function test1(name) {
   let a = name;

   function test2() {
     console.log('Output:', this);
   }
    console.log("this::", this)
   test2
}
test1 ("paytm")

Pick ONE option:

A.) undefined
B.) paytm 
C.) RunTime Error
D.) Syntax Error


Q3. What will be the output of the following code snippet?
 
 (function(){
    var objA = {
        foo: 'foo',
        bar: 'bar',
    };
     var objB = {
        foo: 'foo',
        bar: 'bar',
    };

    console.log(objA == objB); // reference
    console.log(objA === objB); // reference + data-type

 })()

 pick ONE option:

 A.) true, true
 B.) false, false
 C.) true, false
 D.) false, true


Q4. What will be the output of the following code snippet?

  const obj = {
    value: 299,
    getValue:function(){
        return this.value;
    }
  }

  const newObj = Object.create(obj);
  newObj.value = 199;
  delete newObj.value

  console.log(newObj.getValue());

  pick ONE option:
  A.) 299
  B.) 199
  C.) undefined
  D.) error



Q5. What will be output of the following ?

  (function(){
    var arr = new Array('100');
    console.log(arr);
    console.log(arr.length);
  })()
 
  pick ONE option:

  A.) ['100']
      1

  B.) []
      100

  C.) [100]
      100

  D.) 100'
      1


 Q6. What will be output of the following ?

//   Part1: 

 var a = 1;

 (function(){
    console.log(a);
    var a = 2;
    console.log(a);
 })()

//  Part2: 
 var a = 1;

 (function(){
    console.log(a);
    a = 2;
    console.log(a);
 })()

pick ONE option:

A.) // part1
     1
     2

    //part2
    1
    2

B.)// part1
     undefined
     2

    //part2
    1
    2

C.)// part1
     1
     2

    //part2
    undefined
    2

D.)// part1
     undefined
     undefined

    //part2
    1
    2


Q7. What will be the output?
   console.log(Number('1') === 1); 

   A.) true
   B.) false
   C.) NAN
   D.) Error

Q8. What will be the output?

 (function(){
    bar()
    
    function bar(){
        abc();
        console.log(typeof abc);
    }

    function abc(){
        console.log(typeof bar);
    }
 })()

 A.) bar
     abc

 B.) undefined
     undefined

 C.) function
     function

 D.) NAN
     NAN

Q9. What will be the output?

 var count = 1;

 function placeOrder(){
    console.log(count);
    var count = 2;
    console.log(count);

    function sendOrder(){
      console.log(count);
      count++;
      console.log(count);
      var count = 4;
      console.log(count);
      var count = 10;
    }

    sendOrder();
 }

 placeOrder()
 
 A.)1, 2, 2, 3, 4
 B.) undefined, 2, undefined, NaN,4
 C.)
 D.)


Q10. What will be the output?

  function Rect(l, b){
    this.length = l
    this.breadth = b;

    this.area = function(){
        console.log(this.length * this.breadth)
    }
  }
  
  Rect.prototype.area1 = function(){
        console.log(this.length * this.breadth)
    }
  Rect.prototype.area2 = function(){
        console.log(this.length * this.breadth)
    }

    let rect = new Rect(2,5);
    rect.area()
    rect.area1()
    rect.area2()

    pick ONE option:

    A.)10, 10, 10
    B.)NaN, NaN, NaN
    C.)
    D.)

Q20. What will be the output of below code snippet?

function foo() {
  function bar() {
    return 3;
  }

  return bar();

  function bar() {
    return 8;
  }
}
console.log(foo());

function A(){
    var val = 1;
    return val;
    var val = 2;
}

 console.log(A())

 pick one option
 A.) 3
 B.) 38
 C.) 8
 D.) 83

Q19. What will be the output of below code snippet?

 console.log(0 && 1, 1 || 0);

 A.) true, true
 B.) false, false
 C.) 0, 1
 D.) false, true
 

//18 - Object, memory concept

const obj1 = { x: 10, y: 20 };
let obj2 = obj1;
obj2.x = 100;

console.log(obj1.x, obj2.x);

 pick one option
 A.) 10,100
 B.) 100100
 C.) 10,10
 D.) Type Error

Q17. - What will be the output of below code snippet?
var length = 10;
function fn() {
  var length = 20;
  // console.log(this);
  console.log(this.length); // in browser , output will be 10. but in vs code , it will be undefined
}
fn();

 Pick one option
 A.) 10
 B.) 20
 C.) undefined
 D.) null

Q.16 - eval
var x = 2;
var y = 3;
console.log(eval("x+y"))


 Pick one option
 A.) 20
 B.) x+y
 C.) 128
 D.) 5

Q15. - What will be the output of below code snippet?
(
  function () {
    console.log(1);
    setTimeout(() => console.log(2), 2000);
    setTimeout(() => console.log(4), 0);
    console.log(3);
  }
)();

 Pick one option
 A.) 1234
 B.) 2341
 C.) 2431
 D.) 1342

Q14. - What will be the output of below code snippet?
const arr = [-1, 0, 1, 0, 4, -1, 0, -2];
arr.filter((a) => a);
console.log(arr)

A.) [-1, 0, 1, 0, 4, -1, 0, -2];
B.) Syntax Error
C.) [0, 1, 0, 4, 0]
D.) [-1, 1, 4, -1, -2]

Q13. - function

(
  function (a) {
    return (function () {
      console.log(a);
      a = 6;
    })();
  }
)(21);


A.) 6
B.) NaN
C.) 21
D.) undefined
E.) None of these

Q12. What will be the output of below code snippet?

const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; ++i) {
  setTimeout(function () {
    console.log(Index: ${i}, element: ${arr[i]});
  }, 2000);
}

A.) Index: 0, element: 10 Index: 1, element: 12 Index: 2, element: , Index: 3, element: 21
B.) Index: 4, element: undefined(printed 4 times)
C.) Index: 3, element: 21(printed 4 times)
D.) reference error

Q.11 What will be the output of below code snippet?

const arr = [0,1,3,2,5,11,112,21,12,111,4]
arr.sort()
console.log(arr)

pick ONE option: 

A.) [0, 1, 3, 2, 5, 11, 112, 21, 12, 111, 4]
B.) Type Error
C.) arr
D.) [0, 1, 11, 111, 112, 12, 2, 21, 3, 4, 5)

*/


const greet = "Hello World";

const filtered = Array.prototype.filter.call(greet, function(char, index) {
  return index > 5; // Keep characters with index > 5
});

console.log(filtered); // Output: ['W', 'o', 'r', 'l', 'd']


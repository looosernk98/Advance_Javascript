
// ============================= Question 1 =============================

const arr = new Array(20);
// This creates an empty array with length 20,
// but it does not actually fill it with values — it’s a sparse 
// array (no elements, just empty slots).

console.log(arr.length); // 20
console.log(arr)         // [<20 empty items>] -> there are 20 “holes” — not undefined values, just missing elements.
console.log(arr[3])      // undefined -> Accessing a missing index returns undefined
console.log({...arr})    // {} -> Since there are no defined elements, there are no enumerable properties to copy.

arr.forEach((item, index) => console.log("item: ", item, index)) // nothing prints
// map, filter, other methods will not work too

console.log("-----------------------")

const arr2 = new Array(5).fill(1);
console.log(arr2)      // [1, 1, 1, 1, 1]
console.log(arr2[3])   // 1  
console.log({...arr2}) // {0: 1, 1:1, 2:1, 3:1, 4:1}


// ============================= Question 2 =============================

function print(){
    console.log('this', this) // [ 1, [Function: print], true ]
    console.log(this.length)
}
const nums = [1, print, true] // 3

nums[1]()

// ============================= Question 3 =============================

var a = 10

function b(){
    a = 20
    return
    // Hoisted to the top of its scope (you can call it before it’s defined).
    // Creates a variable (the function name) that holds the function.
    function a(){} // declaration of a variable happens internally, so a is local variable inside b's scope
}

b()

console.log(a)

// =============

console.log(x = 2) //assigns 2 to variable x, returns the assigned value
// throw reference err in strict mode

// ===============
// Because JavaScript uses IEEE 754 floating-point standard

// Numbers are stored in binary
// Some decimals cannot be represented exactly
console.log(0.1 + 0.2 == 0.3) //// 0.1 + 0.2 = 0.30000000000000004
// 1. Using tolerance (best practice)
// Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON

// 2. Rounding
// (0.1 + 0.2).toFixed(2) == "0.30"

// ====================

console.log(JSON.stringify({a:1, b: undefined, c: function(){}, d: Symbol("sec"), e: NaN, f: null}))

// ================
console.log(Object.getPrototypeOf(function f(){}).constructor.name);

console.log(Object.getPrototypeOf(async function f(){}).constructor.name);

// ============

setTimeout(() => console.log('macro'));
Promise.resolve().then(function f() {
  console.log('micro');
  Promise.resolve().then(f);
});

async function f() {
    throw new Error('fail');
  }
  f()
  .catch(e => console.log('caught:', e.message));

const arr = [1, 2, 3];
arr.forEach(async (n, index) => {
  await new Promise(r => setTimeout(r, 2000*(index+1)));
  console.log(n);
});







/*
🔹 1. Do arrays convert to primitives?

👉 Yes.

When JS needs a primitive (comparison, +, etc.):

Calls valueOf()
If not primitive → calls toString()

🔹 2. How arrays behave internally

✅ valueOf() for arrays
[1,2].valueOf() // returns the array itself (object)

❌ Not useful → still an object

✅ toString() for arrays
[1,2].toString() // "1,2"

✔️ This returns a primitive string

👉 So arrays almost always end up using toString()

*/

// ✅ Example 1: Array + number

console.log([1,2] + 3);

/*
👉 Steps:

[1,2].toString() → "1,2"
"1,2" + 3 → "1,23"

✔️ Output: "1,23"
*/

// ✅ Example 2: Array + Array

console.log([1,2] + [3,4]); // "1,2" + "3,4" => "1, 23, 4"

// ✅ Example 3: Empty array
console.log([] + 1); // "" + 1 = "1"

// ✅ Example 4: Array comparison
console.log([10] == 10); // true

// 👉 Steps:
// [10].toString() → "10"
// "10" == 10 → true


// 🚨 Example 5: Weird one
console.log([] == false);  // true
/*
 [] => ""
 false => 0

 now "" == 0

 "" => 0 ( Number("") == 0)

 0 == 0 = true
*/

console.log( [] == '0' ); // false (none of oprnd is number)
console.log( [] == '' ); // true

console.log([1] == true); // true

// 👉 Steps:

// [1] → "1"
// "1" → 1
// true → 1

// ================= 🔥 3. Built-in cases where valueOf() IS actually used =========
// ✅ 1. Date objects (SPECIAL CASE 🚨)
let d = new Date();

console.log(d + 1);
/*

✔️ Why?

Date overrides valueOf()
Returns timestamp (number)
d.valueOf() // 1710000000000 (number)

👉 So valueOf() is used directly ✅
*/

// ✅ 2. Wrapper objects (Number, String, Boolean)

let num = new Number(10);
console.log('typeof num: ', typeof num);

console.log(num + 5); // 15

// 👉 Why?

// valueOf() → 10 (primitive)
// No need for toString()

let str = new String("hello");

console.log(str + " world"); // "hello world"

// 👉 Internally:

// valueOf() → "hello" ✅

// ✅ 3. Custom objects with valueOf

let obj = {
  valueOf() {
    return 42;
  }
};

console.log(obj + 8); // 50

// 👉 Here:

// valueOf() works → used directly

// ✅ 4. Boolean object
let b = new Boolean(true);

console.log(b + 1); // 2

// 👉 valueOf() → true → 1

// ⚙️ Built-in Objects (Smart ones)
// Date
// Number
// String
// Boolean

// 👉 These override valueOf()

// ✔️ So valueOf() is actually used first

/*
🔥 6. One SUPER IMPORTANT edge case

let d = new Date();

console.log(d == d.toString()); // true

👉 Why?

== with Date uses default hint
But Date is special:

🚨 Date uses STRING hint by default (exception!)

So:

toString() is tried first
*/
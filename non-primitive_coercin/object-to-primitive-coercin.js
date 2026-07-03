/*
 If one operand is an object and the other is a primitive, JavaScript tries 
 to convert the object to a primitive using either valueOf() or toString() 
 before comparing or doing arithmetic.

When JavaScript needs to convert an object to a primitive:
-> It first tries to call the object’s valueOf() method.
-> If valueOf() doesn’t return a primitive, it tries toString().

*/

// Example 1: Object compared to a number

let obj = {
    valueOf() {
      return 10;
    }
  };
  
console.log(obj == 10); // true


// Example 2: Object compared to a string
let obj2 = {
    toString() {
      return "hello";
    }
  };
console.log(obj2 == "hello"); // true


// Example 3: When neither returns primitive
let obj3 = {
    valueOf() {
      return {};
    },
    toString() {
      return {};
    }
  };
  
// Both methods return objects, not primitives.
// JavaScript fails to convert it properly, so the comparison gives false.
console.log(obj3 == "something"); // TypeError: Cannot convert object to primitive value
console.log(obj3 === "something"); // false bcoz type coercin does not happens in ===
/*
When using + (arithmetic), JavaScript:

-> Tries to convert objects to primitives.
-> If either operand is a string (after conversion), it concatenates.
-> Otherwise, it performs numeric addition.

*/

// Example 1: Numeric addition with object
let obj4 = {
    valueOf() {
      return 3;
    }
  };
  
console.log(obj4 + 5); // 8


// Example 2: String concatenation with object
let obj5 = {
    toString() {
      return "abc";
    }
  };
  
console.log(obj5 + "def"); // "abcdef"

// Example 3: valueOf returns object, toString returns number

let obj6 = {
    valueOf() {
      return {}; // not a primitive
    },
    toString() {
      return 100;
    }
  };
  
  console.log(obj + 50); // 150

// Example 4: Both methods return objects
let obj7 = {
    valueOf() {
      return {};
    },
    toString() {
      return {};
    }
  };
  
console.log(obj7 + 1); // TypeError: Cannot convert object to primitive value

//***************************** Miscllaneous *****************************/

console.log({ name: "alex" } + 1) // "[object Object]" + 1  // → "[object Object]1"

/*
Explanation:

-> { name: "alex" } is a plain object.
-> + operator here tries to convert the object to a primitive.
-> JavaScript calls toString() on the object since valueOf() returns the object itself.
-> {}.toString() → "[object Object]" (default representation)

*/

console.log({} + true) // browser output , "[object Object]true" -> vs-code output

// This one's tricky because {} can be interpreted in two ways depending on context:

/*
Interpretation 1: Empty block + true

-> When JavaScript sees {} at the beginning of a line, it treats it as a code block, not an object.
-> {} + true
-> {} → empty block (ignored)
-> +true → unary plus applied to true → 1

OUTPUT : 1

*/


console.log(({}) + true); // "[object Object]true"
/*
Interpretation 2: (Object) + true

-> ({}) → object → coerces to "[object Object]"
-> true → coerces to "true"
-> So: "[object Object]" + "true" → "[object Object]true"

OUTPUT : "[object Object]true"

*/




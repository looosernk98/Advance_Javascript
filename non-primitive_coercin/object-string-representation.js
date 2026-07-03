/*
  What is "[object Object]"?

  It’s the default string representation of a plain JavaScript object 
  when it’s automatically converted to a string.

*/
const obj = { name: "Alex" };
console.log(obj.valueOf());  // return object itself
console.log(String(obj));  // [object Object]

/*
This happens because:

-> When JavaScript needs to convert an object to a string (like in obj + 1), it calls:

i) obj.valueOf() → returns the object itself (not a primitive)
ii) Then obj.toString() → default implementation returns "[object Object]"


Breakdown of "[object Object]":

-> The outer brackets: [ ... ] are part of the string format returned 
   by Object.prototype.toString.
-> The first word "object": comes from the object’s internal class tag.
-> The second word "Object": refers to the object's constructor 
   (i.e., it's a plain object).

So, [object Object] → "This is an object of type Object"

*/


/*
Other types return different strings:

Object.prototype.toString.call([]);       // [object Array]
Object.prototype.toString.call(null);     // [object Null]
Object.prototype.toString.call(123);      // [object Number]
Object.prototype.toString.call(() => {}); // [object Function]


You can customize it:
You can override toString() to give a more meaningful result:

const user = {
  name: "Alex",
  toString() {
    return this.name;
  }
};

console.log(user + " is here");  // Alex is here

*/
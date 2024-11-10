/*

An array-like is an object.
-> Has indexed access to the elements and a non-negative length property to know the 
   number of elements in it. These are the only similarities it has with an array.

-> Doesn't have any of the Array methods like push, pop, join, map, etc.

Array-like is completely different from a normal array. It is not constructed by 
Array or with an Array literal []. Hence it won't inherit anything from 
Array.prototype. That's the reason we do not see any of the Array methods in 
array-like.The length property will not automatically update as well. You can not 
shrink the array-like by reducing the length property value you do with arrays.

*/

// const arr_like_object = {0: 'I', 1: 'am', 2: 'array-like', length: 3};

// How to convert array-like object to Array
//  -> spread operator , 
const arr1 = [...arr_like_object]
console.log('arr1: ', arr1);

//  -> Array.from(arr_like_object)
const arr2 = Array.from(arr_like_object)
console.log('arr2: ', arr2);

//  -> using Slice , Array.prototype.slice.call(arr_like_object);
const arr3 = Array.prototype.slice.call(arr_like_object)
console.log('arr3: ', arr3);

//**************** Examples of Array-Like Objects ******************/

// 1. Arguments Object: In a non-arrow function, arguments is an array-like object 
//      that contains all the arguments passed to that function.

function example() {
   console.log(arguments); // array-like object
 }
 example(1, 2, 3); // Outputs: { 0: 1, 1: 2, 2: 3, length: 3 }


 // 2. DOM NodeList: The result of document.querySelectorAll() or 
//       document.getElementsByClassName() is an array-like object.
const divs = document.querySelectorAll("div");
console.log(divs); // NodeList (array-like object)


// 3. Strings: Strings are also considered array-like because they can be accessed 
//      via indexes and have a length property.
let str = "hello";
console.log(str[0]); // "h"
console.log(str.length); // 5

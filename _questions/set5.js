/*
 Question1: How would you deeply clone an object in JavaScript, considering nested 
           objects and arrays? Explain at least two different methods, including 
           their limitations.
*/
const obj = {
    name: "alex",
    age:23,
    printName: function(){
        console.log(this.name);
    }
}
const deepCopy = deepClone(obj)
deepClone.printName = function(){
    console.log(this.age);
}
deepCopy.age = 28
console.log(obj.printName());
console.log(deepCopy.printName());



/*
Limitation: This approach doesn’t work with non-JSON-safe values like functions, 
            undefined, or special objects like Date and Map.
*/

function deepClone(obj){
   if(obj === null || obj === undefined || typeof obj !== 'object') return obj
   if(Array.isArray(obj)) return obj.map(deepClone)

   let clone = {};
   for(let key in obj){
      clone[key] = deepClone(obj[key])
   }
   return clone;
}

// This is more flexible and can handle circular references with added logic.

// ==============================================================================

/*
Question2: How would you flatten a nested array of arbitrary depth without using 
          the built-in flat() method?
*/

function flat(inputArr){
  let arr = [];
  for(let item of inputArr){
     if(Array.isArray(item)){
        const flattendArr = flat(item);
        arr = arr.concat(flattendArr)
     }else{
        arr.push(item);
     }
  }
  return arr;
}

// OR

// function flattenArray(arr) {
//     return arr.reduce((acc, val) => 
//         Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []
//     );
// }


const arr = [1,2, ['hi', 'hello', ['x', 'y', 'z'], 9], '100']
const flattenArray = flat(arr)
console.log('flattenArray: ', flattenArray);


// ==============================================================================
/*
 Question: How can you find duplicate elements in an array?
*/
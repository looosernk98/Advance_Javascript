/* definition : In functional programming, currying is the process of converting
                a function, that takes multiple arguments at once,
                to a function that takes these arguments step by step

                -> Currying doesn’t call a function. It just transforms it.

 :  _.curry from lodash library, return a wrapper that allows a function 
   to be called both normally and partially:

*/


// ******************************* exmaple 1 ***************************************

// function curry(sum){
//    return function (a){
//        return function(b){
//           return sum(a,b)
//        }
//    }
// }

// function sum(a,b){
//     return a+b;
// }

let curriedSum = curry(sum);
//  let res = curriedSum(3,7);  // can,t call normally
let res = curriedSum(3)(7);
console.log(res);

// *************************** example 2 (like .curry of lodash) ****************************************

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      // console.log(this)
      return func.apply(this, args);
    } else {
      return function (...args2) {
        console.log(args2, args);
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedsum = curry(sum);

console.log( curriedsum(1, 2,3) ); // 6, still callable normally
console.log(curriedsum(1)(2, 3)); // 6, currying of 1st arg
// console.log( curriedsum(1)(2)(3) ); // 6, full currying

// function callMe(a,b,c){
//     console.log("hi")
// }

// // let result = callMe(2,4,5);

// console.log( callMe instanceof Object,callMe)

// const addCurry =(a) => {
//   return (b)=>{
//       return (c)=>{
//         console.log('c: ', c);
//           return a+b+c
//       }
//   }
// }
console.log(addCurry(2)(3)(5)) // 10

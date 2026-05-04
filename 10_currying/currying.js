/* definition : In functional programming, currying is the process of converting
                a function, that takes multiple arguments at once,
                to a function that takes these arguments step by step

                -> Currying doesn’t call a function. It just transforms it.

 :  _.curry from lodash library, return a wrapper that allows a function 
   to be called both normally and partially:

*/


// ******************************* exmaple 1 ***************************************

function curry(sum){
   return function (a){
       return function(b){
          return sum(a,b)
       }
   }
}

function sum(a,b){
    return a+b;
}

let curriedSum = curry(sum);
//  let res = curriedSum(3,7);  // can,t call normally
let res = curriedSum(3)(7);
console.log(res);






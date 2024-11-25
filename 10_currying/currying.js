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

// *************************** example 2 (like .curry of lodash) ****************************************

// implementation of curry fn that can be called normally as well as like curry fn
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      console.log('args: ',args)
      return func.apply(this, args);
    } else {
      return function (...args2) {
        console.log('args, args2: ', args, args2);
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedsum = curry(sum);

// console.log(curriedsum(1, 2, 3));  // 6, still callable normally
// console.log(curriedsum(1)(2, 3));   // 6, currying of 1st arg
console.log(curriedsum(1)(2)(3)); // 6, full currying


//***********************************************************************/
// Ques. write a currying func that accepts infinite number of arguments return 
        // sum when empty argument is encountered
        
function sum(...args) {
  const total = args.reduce((acc, num) => acc + num, 0);

  function curriedSum(...nextArgs) {
    if (nextArgs.length === 0) {
      return total;
    }
    return sum(total, ...nextArgs);
  }

  return curriedSum;
}

// Usage
const result = sum(1)(2)(3)(); // 6
console.log(result); // 6

const anotherResult = sum(5)(10)(15)(20)(); // 50
console.log(anotherResult); // 50





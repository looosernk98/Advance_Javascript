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

// follow up: What if sum args are not known in advance?
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
      // return func(args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
        // return curried(args.concat(args2));
      };
    }
  };
}

function sum(...args) {
  return args.reduce((acc, num) => acc + num, 0);
}

let curriedsum = curry(sum);

console.log(curriedsum(1, 2, 3, 4, 5));  // 6, still callable normally
console.log(curriedsum(1)(2, 3));   // 6, currying of 1st arg
console.log(curriedsum(1)(2)(3)); // 6, full currying


//***********************************************************************/
// Ques. write a currying func that accepts infinite number of arguments return 
        // sum when empty argument is encountered

// follow up question: how to handle empty argument case?
// answer: we can handle it by checking if the first argument is empty
// and if it is, we can return the total sum

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
// console.log(sum()); not handled if first arg is empty

// Usage
const result = sum(1)(2)(3)(); // 6
console.log(result); // 6

const anotherResult = sum(5)(10)(15)(20)(); // 50
console.log(anotherResult); // 50





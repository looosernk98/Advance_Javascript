/*

Q1. write a function to return sum of arguments. There can be infinite arguments

 sum(1)(2)(0)(3)
 Output - 6

*/

function sum(a){
    let total = a;
    
    function inner(b){
      total += b
      return inner
    }

    inner.valueOf = () => {
      return total
    }

    inner.toString = () =>{
      return total
    }

    return inner
  }

console.log(sum(1)(2)(0)(3) + 0) 
// trying to convert non-primitive value to primtive using valueOf or toString
console.log(sum(1)(2)(0)(3).valueOf()) 
console.log(+sum(1)(2)(0)(3)) 


// *************************************************************************

/*
 Q2. Implementation of curry fn that can be called normally as well as like curry fn
  
case1: curriedsum(1, 2, 3, 4, 5) // output - 6
case2: curriedsum(1)(2, 3) // output - 6
case3: curriedsum(1)(2)(3) //output - 6

follow up: What if sum args are not known in advance?
*/
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
  
  function sum(a, b, c){
    return a + b + c;
  }
  
  let curriedsum = curry(sum);
  
  console.log(curriedsum(1, 2, 3));  // 6, still callable normally
  console.log(curriedsum(1)(2, 3));   // 6, currying of 1st arg
  console.log(curriedsum(1)(2)(3)); // 6, full currying
  
  
  //*************************************************************************/

  /*
   Q3. write a currying func that accepts infinite number of arguments return 
       sum when empty argument is encountered
  
  Follow up : how to handle empty argument case?
  Answer: we can handle it by checking if the first argument is empty and if it 
          is, we can return the total sum

  */
  
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
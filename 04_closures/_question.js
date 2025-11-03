// Q1. What is the output ?

for(var i = 0; i<=5; i++){
    setTimeout(() => {
      console.log('i: ', i);
    }, 1000)
}

// output : 6, 6, 6, 6, 6, 6

// =======================================================================


let i;
for( i = 0; i<=5; i++){
   setTimeout(() => {
     console.log('i: ', i);
   }, 1000)
}
// output : 6, 6, 6, 6, 6, 6

// =======================================================================


for(let i = 0; i<=5; i++){
   function fn() {
      console.log(i);
   }
    setTimeout(fn, 1000)
}

/*
Explanation :
 output - 0, 1, 2, 3, 4, 5

 as we know variable declared with let is blocked scope. so here every time 
 callback fn forms a closure with i variable having different reference in each iteration
*/

// =======================================================================

// Q2. Guess the ouput
for(var i = 0; i<=5; i++){
    setTimeout(() => {
      console.log('i: ', i);
    }, 1000)
}

/*
 Explanation :
 output - 6, 6, 6, 6, 6, 6

 as we know variable declared with var is not blocked scope. so here every time 
 callback fn forms a closure with i variable having same/shared reference each time

*/

// =======================================================================

for(var i = 0; i<=5; i++){
   function run(i){
    setTimeout(() => {
        console.log('i: ', i);
      }, 1000)
   }
   run(i);
}
/*
Explanation :
 output - 0, 1, 2, 3, 4, 5

 we have passed variable i in function. so run fn will store i variable in it's 
 local scope.So now cb fn of setimeout will form a closure with variable i 
 having each time different reference
*/

// =======================================================================



// ********************************** example 1 **************************************************************//
function outerfunction(...args) {
   console.log(args);
   var outervariable = 8;
 
   function innerFunction() {
     console.log("fisrt name :", args[0], "last name :", args[1]);
     console.log(outervariable);
   }
 
   return innerFunction;
 }
 
 let innerFunc = outerfunction("niranjan", "kumar")
 
 innerFunc()
 
 // ********************************************** exmaple 2 *******************************************************//
 
 function Counter(){
     var counter = 0;
 
     setTimeout(() => {
          counter+=1;
 
          var innerCounter = 0;
          console.log("counter : ",counter);
 
          setTimeout(()=>{
             counter+=1;
             innerCounter+=1;
 
             console.log("couner : ",counter, " ", "innerCouneter",innerCounter);
          },500)
 
     }, 1000)
 }
 
 for(let i=0; i<5; i++){
     Counter()
 }
 
 // ********************************************** example 3 ***************************************************************//
 
 function outer() {
   let arr = [];
   let i;
   for (i = 0; i < 4; i++) {
     arr[i] = function () { // is it a closure ???? yes
       return i;
     };
   }
   return arr;
 }
 
 let result = outer();
 
 console.log("*******", result[0]()); // 4
 console.log(result[1]()); // 4
 console.log(result[2]()); // 4
 console.log(result[3]()); // 4
  
 //*************************************************** example 4 ***********************************************************************/
 
 function outer() {
   function createClojure(val) {
     return function () {
       return val;
     };
   }
 
   let arr = [];
   var i;
 
   for (i = 0; i < 4; i++) {
     arr[i] = createClojure(i);
   }
 
   return arr;
 }
 
 let results = outer();
 
 console.log(results[0]()); // 0
 console.log(results[1]()); // 1
 console.log(results[2]()); // 2
 console.log(results[3]()); // 3
 
 // *************************** Exmaple 5 ***********************************************
 
 for(var i=1; i<=5; i++){
     setTimeout(()=>{
      console.log(i);
     },i*1000)
 }
 
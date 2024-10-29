// Q1. What is the output ?

for(var i = 0; i<=5; i++){
    setTimeout(() => {
      console.log('i: ', i);
    }, 1000)
}

// output : 6, 6, 6, 6, 6, 6
/*

let i;
for( i = 0; i<=5; i++){
   setTimeout(() => {
     console.log('i: ', i);
   }, 1000)
}
// output : 6, 6, 6, 6, 6, 6

for(let i = 0; i<=5; i++){
   function fn() {
      console.log(i);
   }
    setTimeout(fn, 1000)
}
*/

/*
Explanation :
 output - 0, 1, 2, 3, 4, 5

 as we know variable declared with let is blocked scope. so here every time 
 callback fn forms a closure with i variable having different reference each time
*/

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
 callback fn forms a closure with i variable having same reference each time

*/

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

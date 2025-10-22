// references

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
  
// ********************************** QUESTION 1*********************************************
  const add = (...args) => JSON.parse()

  const memoizedAdd = memoizedOne(add);

  const map = new Map();

  // Implement memoizedOne function

  const memoizedOne = (fn)=> {
     return function(...args){
        const key = JSON.stringify([...args]);
        console.log('key: ', key);
        if(map.has(key)){
            console.log('Getting from Cache');
            return map.get(key)
        }
       const value = fn(...args);
       console.log("EXECUTED");
       map.set(key, value);
       return value;
     }
  }
  
  console.log(memoizedAdd(1,2, 3) )// 3
  // add fn is called to get new value

  console.log(memoizedAdd(1,2,3)) // 3
  // add fn is not executed , previous result is returned

  console.log(memoizedAdd(2,3)) // 5
  // add fn is called to get new value
  console.log(memoizedAdd(2,3)) // 5
    // add fn is not executed , previous result is returned

// ************************************* QUESTION 2 ******************************************

// Q2. flatten the array without using inbuilt methods. Array can have all the 
// data types values but you just need to flatten array and rest will be as it is

const arr = [1,2,3,[4,[5,6]], [7,8], {key: 'value'}, true]
const flattenArray = (arr) =>{
   const ans = [];
   for(let i =0; i<arr.length; i++){
    if(Array.isArray(arr[i])){
        const res = flattenArray(arr[i]);
       res.forEach((item) => {
         ans.push(item);
       })
    }else{
        ans.push(arr[i]);
    }
   }
   return ans;
}
console.log(flattenArray(arr));
// ************************************** QUESTION 3 *****************************************

// *************************************** QUESTION 4****************************************

// **************************************** QUESTION 5 ***************************************
// **************************************** QUESTION 6 ***************************************


  


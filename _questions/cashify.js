// const person = {
//   name: "alex",
//   age: 23,
// }

// person.age = 26;

// person = {
//   name: "abc"
// }

// let a = 10;
function outer(){
  let a = 10;
  
  function inner(){
    console.log(a);
    a++;
  }
  
  inner()
}

outer()

outer()

outer()

// // // for()



// const input = "hi i am test"
// // output -> tset ma i ih

// // ih i ma tset

// const arr = input.split(" ");

// let output = "";

// for(let i =0; i<arr.length; i++){
//   output += reverseStr(arr[i]) + " ";
// }

// console.log(output);

// function reverseStr(str){
//   let ans = "";
//   for(let i = str.length-1; i>=0; i--){
//     ans += str.charAt(i);
//   }
//   return ans;
// }




  




























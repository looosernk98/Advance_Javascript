// https://www.youtube.com/watch?v=QCQVttjblRs



const input = [
    {
        key: 'Sample1',
        data: 'Data1'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample1',
        data: 'Data1'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample3',
        data: 'Data3'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample3',
        data: 'Data3'
    },
    {
        key: 'Sample4',
        data: 'Data4'
    },
]


/*
EXPECTED OUTPUT

output:  {
  Sample1: [
    { key: 'Sample1', data: 'Data1' },
    { key: 'Sample1', data: 'Data1' }
  ],
  Sample2: [
    { key: 'Sample2', data: 'Data2' },
    { key: 'Sample2', data: 'Data2' },
    { key: 'Sample2', data: 'Data2' },
    { key: 'Sample2', data: 'Data2' }
  ],
  Sample3: [
    { key: 'Sample3', data: 'Data3' },
    { key: 'Sample3', data: 'Data3' }
  ],
  Sample4: [ { key: 'Sample4', data: 'Data4' } ]
}
*/

const output = {

}

input.forEach((item, index) => {
    if(output.hasOwnProperty(item.key)){
       output[item.key].push(item)
    }else{
      output[item.key] = [item];
    }
})
console.log('output: ', output);

/******************************************************************************/

const arr = [
    {name: 'harry', age: 19},
    {name: 'alex', age: 28},
    {name: 'peter', age: 26},
]

// Ques1. sort in descending order by age
arr.sort((a,b) => b.age - a.age)
console.log('arr: ', arr);

// Ques2. sort in descending order by name
arr.sort((a,b) => b.name.localeCompare(a.name))
console.log('arr: ', arr);

/******************************************************************************/

// What will be the output of below 

const sum = function(a, b=10){
 console.log(a+b);
}

console.log(sum(10, null))
console.log(sum(10, undefined))

/******************************************************************************/

// Q. convert the below data into single array that consist all inner objects like below
// Q. write a single liner function that accepts label as parameter and returns it's respective value
// output: 
    // [
    //  {label:'Standard - Generic', value:'STANDARD_GENERIC'},
    //  {label:'Standard - Niche', value:'STANDARD_NICHE'},
    //  {label:'Specialised', value:'SPECIALISED'},
    //  {label:'Unknown', value:'UNKNOWN'},
    // ]


const options = {
    core:[
      {
        label: 'Standard - Generic',
        value: 'STANDARD_GENERIC'
      },
      {
        label: 'Standard - Niche',
        value: 'STANDARD_NICHE'
      },
    ],
    non_core:[
      {
        label: 'Specialised',
        value: 'SPECIALISED'
      },
      {
        label: 'Unknown',
        value: 'UNKNOWN'
      }
    ]
  }
const label = 'Unknown'
const value = Object.values(options).flat().find(item => item.label === label).value
console.log('value: ', value);

/******************************************************************************/
//Ques. What will be the output of below questions

console.log(z) // output ??
console.log([]==[])
console.log([]===[])


// if (true) let a = 1; // SyntaxError: Lexical declaration cannot appear in a single-statement context

{
    // TDZ starts at beginning of scope
    const func = () => console.log(letVar); // OK
  
    // Within the TDZ letVar access throws `ReferenceError`
  
    let letVar = 3; // End of TDZ (for letVar)
    func(); // Called outside TDZ!
}
  
{
    typeof i; // ReferenceError: Cannot access 'i' before initialization
    let i = 10;
}

  console.log(typeof undeclaredVariable); // "undefined"


var x = "global";
let y = "global";
console.log(this.x); // "global"
console.log(this.y); // undefined

function test() {
    var foo = 33;
    if (foo) {
      let foo = foo + 55; // ReferenceError
    }
  }
test();


// function test(a, ...b, c){
//    console.log(a, b, c); // rest opeator is always used as last parameter
// }

// test(2, 7, 8, 9)

const a = 8
console.log(typeof typeof typeof a)

//
// let arr = [1,2,3,"hello", true]
// console.log(...arr)
  







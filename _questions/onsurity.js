

const person = {
    name: "John Doe",
    age: 30,
    address: {
      street: {
        streetName: "Main St",
        number: 123,
        zip: 12345
      },
      city: "Anytown",
      state: "CA"
    }
}

function deepClone(obj){
  const copy = {};
  
  for(let key in obj){
    const val = obj[key];
    
    if(Array.isArray(val)){
      copy[key] = [...val];
    }else if(typeof val === 'object'){
      copy[key] = deepClone(val)
    }else{
      copy[key] = val;
    }
  }
  
  return copy;
  
}

const cloned = deepClone(person);
console.log(cloned);

cloned.address.street = "bacd"

console.log(person);
console.log(cloned);















// Promise.resolve().then(() => console.log(1));

// setTimeout(() => console.log(2), 10);

// queueMicrotask(() => {
//     console.log(3);
//     queueMicrotask(() => console.log(4));
// });

// console.log(5);

// 5
// 1
// 3
// 4
// 2


const a = {
  b: 'b',
  c: 'c'
}

let b = {}
b[a] = 'b'
let c = {}
c[a] = 'c'

console.log(a)
console.log(b)
console.log(c)

console.log(a[b])


const arr = [1,2,3,4]

const res = arr.reduce((prev, curr) => prev + curr, undefined)
// const res = arr.reduce((prev, curr) => prev + curr, true)
console.log('res: ', res);

const nums = [1,2,,,3]
console.log(nums.reduce((p,c) => p+c))
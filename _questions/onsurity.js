

















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
console.log({...nums}) // { '0': 1, '1': 2, '4': 3 }
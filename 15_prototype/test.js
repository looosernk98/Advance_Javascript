const user = {
  name: 'abc',
  age: 34
}

console.log(Object.getPrototypeOf(user))

// function printName(name){
//   console.log('name: ', name);
// }

// new printName('abc')


// let handler = {
//   apply: function(target, this_args, argumentsList) {
//     console.log(argumentsList)
//     return Reflect.apply(target,this_args, argumentsList);
//   }
// }

// function helllo(a) {
//   return a;
// }

// let proxy = new Proxy(helllo, handler);
// console.log(proxy(1))
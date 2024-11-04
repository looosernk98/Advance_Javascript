// //1. Write the output of below code
for (let i = 0; i < 4; ++i) {
  setTimeout(() => console.log(i), 0);
}

// //2. Write the output of below code
for (var j = 0; j < 4; ++j) {
  setTimeout(() => console.log(j), 0);
}

// //3. Write the output of below code
for (var k = 0; k < 4; ++k) {
  (function (k) {
    setTimeout(() => console.log(k), 1000);
  })(k);
}

// //Q.4 Write output of below code
console.log("first");
setTimeout(() => console.log("second"), 1000);
console.log("third");

// //Q.5 Write the output of below code
// let x = (data) => new Promise((res) => setTimeout(() => res(data), 1000));
// async function hello() {
//   console.log("first");
//   await x("second").then((data) => console.log(data));
//   console.log("third");
// }
// hello();

// //Q.6 Write the output of below code
// let y = (data) => new Promise((res) => setTimeout(res(data), 1000));
// async function hello() {
//   console.log("first");
//   await y("second").then((data) => console.log(data));
//   console.log("third");
// }
// hello();

//Q.7 Write output of below code
// function resolve_after_2_seconds() {
//   console.log("starting slow promise");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("slow");
//       console.log("slow promise is done");
//     }, 2000);
//   });
// }

// async function hello() {
//   let x = await resolve_after_2_seconds();
//   console.log(x);
// }
// hello();


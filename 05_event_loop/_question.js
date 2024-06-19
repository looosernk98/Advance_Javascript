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


function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("slow");
        console.log("slow promise is done");
      }, 2000);
    });
  }
  
  function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("fast");
        console.log("fast promise is done");
      }, 1000);
    });
  }
  
  async function sequentialStart() {
    console.log("==SEQUENTIAL START==");
  
    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.
  
    const fast = await resolveAfter1Second();
    console.log(fast); // 3. this runs 3 seconds after 1.
  }
  
  async function concurrentStart() {
    console.log("==CONCURRENT START with await==");
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second(); // starts timer immediately
  
    // 1. Execution gets here almost instantly
    console.log(await slow); // 2. this runs 2 seconds after 1.
    console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
  }
  
  function concurrentPromise() {
    console.log("==CONCURRENT START with Promise.all==");
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
      (messages) => {
        console.log(messages[0]); // slow
        console.log(messages[1]); // fast
      }
    );
  }
  
  async function parallel() {
    console.log("==PARALLEL with await Promise.all==");
  
    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
      (async () => console.log(await resolveAfter2Seconds()))(),
      (async () => console.log(await resolveAfter1Second()))(),
    ]);
  }
  
  sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"
  
  // wait above to finish
  setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"
  
  // wait again
  setTimeout(concurrentPromise, 7000); // same as concurrentStart
  
  // wait again
  setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"
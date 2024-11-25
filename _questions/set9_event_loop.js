//===========================================================================

console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve()
    .then(() => {
        // Promise.resolve(1);
        console.log("Promise 1");
        // return Promise.resolve(1);
    })
    .then(() => {
        console.log("Promise 2");
    });

// queueMicrotask(() => {
//     console.log("manually pushed to micro");
// })

setTimeout(() => {
    console.log("Timeout 2");
}, 0);

console.log("End");

//============================ Problem 2: Mixed Tasks ===============================================

console.log("Script Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
        setTimeout(() => {
            console.log("Timeout 2");
        }, 0);
    })
    .then(() => {
        console.log("Promise 2");
    });

console.log("Script End");


//========================= Problem 3: Chained Promises and Tasks ==================================================

console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

const prom = Promise.resolve();

prom
    .then(() => {
        console.log("Promise 1");
        return prom;
    })
    .then(() => {
        console.log("Promise 2");
        return Promise.resolve();
    })
    .then(() => {
        console.log("Promise 3");
    });

setTimeout(() => {
    console.log("Timeout 2");
}, 0);

console.log("End");


//========================= Problem 4: Recursive Tasks ==================================================

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
        return Promise.resolve();
    })
    .then(() => {
        console.log("Promise 2");
        return Promise.resolve();
    })
    .then(() => {
        console.log("Promise 3");
        return Promise.resolve();
    });

console.log("End");


//======================= Problem 5: Async/Await with Microtasks ====================================================

console.log("Start");

async function asyncFunc() {
    console.log("Async Function Start");
    await Promise.resolve();
    console.log("Async Function End");
}

asyncFunc();

console.log("End");

//========================= Problem 6: Nested Async/Await and Tasks ==================================================

console.log("Start");

async function asyncFunc1() {
    console.log("Async 1 Start");
    await asyncFunc2();
    console.log("Async 1 End");
}

async function asyncFunc2() {
    console.log("Async 2 Start");
    await Promise.resolve();
    console.log("Async 2 End");
}

asyncFunc1();

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");


//========================= Problem 7: Mixed Tasks with Errors ==================================================

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
        throw new Error("Error in Promise 1");
    })
    .catch((err) => {
        console.log("Caught:", err.message);
    })
    .then(() => {
        console.log("Promise 2");
    });

console.log("End");



//======================= Problem 8: Task Prioritization ====================================================

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
    })
    .then(() => {
        console.log("Promise 2");
        setTimeout(() => {
            console.log("Timeout in Promise");
        }, 0);
    });

console.log("End");


//========================== Problem 9: Long Running Tasks =================================================

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
        let start = Date.now();
        while (Date.now() - start < 1000) {} // Blocking task
        console.log("Long Task Done");
    })
    .then(() => {
        console.log("Promise 2");
    });

console.log("End");


//======================= Problem 10: Event Loop Phases====================================================

console.log("Start");

setImmediate(() => {
    console.log("Immediate");
});

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise");
    })
    .then(() => {
        process.nextTick(() => {
            console.log("Next Tick");
        });
    });

console.log("End");


//===========================================================================

console.log("Script start");

const promise = new Promise((resolve, reject) => {
  console.log("Promise executor");
  resolve("First value");
});

promise
  .then((value) => {
    console.log("First .then:", value);
    return "Second value";
  })
  .then((value) => {
    console.log("Second .then:", value);
    // setTimeout(() =>{
    //     console.log('after 0 delay setTimeout');
    // })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Resolved after timeout");
      }, 1000);
    });
  })
  .then((value) => {
    console.log("Third .then:", value);
  });

console.log("Script end");

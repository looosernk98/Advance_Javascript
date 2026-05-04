

// Polyfill for Promise.allSettled

// Behavior:

// Waits for ALL promises
// Never rejects
// Returns status of each promise

Promise.myAllSettled = function (promises) {
    return new Promise((resolve) => {
      const results = [];
      let completed = 0;
  
      if (promises.length === 0) {
        resolve([]);
        return;
      }
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            results[index] = { status: "fulfilled", value};
          })
          .catch((reason) => {
            results[index] = { status: "rejected", reason };
          })
          .finally(() => {
            completed++;
  
            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  };

  const p1 = Promise.resolve(100);
  const p2 = Promise.reject("Error");
  const p3 = Promise.resolve(300);
  
  Promise.myAllSettled([p1, p2, p3])
    .then(console.log);

// Output:
// [
//     { status: 'fulfilled', value: 100 },
//     { status: 'rejected', reason: 'Error' },
//     { status: 'fulfilled', value: 300 }
//   ]


// Why use Promise.resolve(promise)?

// Because array can contain:

// promises
// normal values
// thenables

// Why preserve index?

// Because promises may resolve out of order.
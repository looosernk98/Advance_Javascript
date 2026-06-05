
// Polyfill for Promise.all

// Behavior:

// Resolves when ALL promises resolve
// Rejects immediately if ANY promise rejects
// Maintains order of results

Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completed = 0;
  
      if (promises.length === 0) {
        resolve([]); // empty promises arr Should resolve immediately:
        return;
      }
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise) // handles non promise value
          .then((value) => {
            results[index] = value;
            completed++;
  
            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  };

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.myAll([p1, p2, p3])
  .then(console.log)
  .catch(console.error);

// output: [1, 2, 3]

// Why use Promise.resolve(promise)?

// Because array can contain:

// promises
// normal values
// thenables

// Why preserve index?

// Because promises may resolve out of order.
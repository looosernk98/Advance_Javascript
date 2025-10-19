/*
Promise.race() settles as soon as one promise resolves/rejects.

But the other promises keep running, because Promises are just wrappers around async 
tasks — and JS has no built-in way to cancel those tasks.

*/

// 🔹 How can we stop them?

// 1. With AbortController (for fetch)
function cancellableFetch(url, controller) {
    return fetch(url, { signal: controller.signal });
  }
  
  const controller1 = new AbortController();
  const controller2 = new AbortController();
  
  const p1 = cancellableFetch("https://slow.com/1", controller1);
  const p2 = cancellableFetch("https://slow.com/2", controller2);
  
  Promise.race([p1, p2])
    .then(res => {
      console.log("Winner:", res.url);
      // cancel the loser
      controller1.abort();
      controller2.abort();
    })
    .catch(err => console.error("Error:", err));

    // 👉 As soon as one fetch wins the race, you .abort() the rest.


// ============================================================================

    // 2. With custom cancellable promises
    function cancellablePromise(executor) {
        let cancel;
        const promise = new Promise((res, rej) => {
          cancel = () => rej(new Error("cancelled"));
          executor(res, rej);
        });
        return { promise, cancel };
      }
      
      const t1 = cancellablePromise((res) => setTimeout(() => res("t1 done"), 2000));
      const t2 = cancellablePromise((res) => setTimeout(() => res("t2 done"), 3000));
      
      Promise.race([t1.promise, t2.promise]).then((result) => {
        console.log("Winner:", result);
        // cancel all others
        t1.cancel();
        t2.cancel();
      });

    //   👉 Once one settles, you manually cancel the rest.  
    
// ============================================================================

// 3. With a helper function

// We can generalize it:
async function raceWithCancel(promises) {
    return new Promise((res, rej) => {
      promises.forEach(({ promise, cancel }) => {
        promise.then(value => {
          // cancel others
          promises.forEach(p => p.cancel?.());
          res(value);
        }).catch(rej);
      });
    });
  }
  
// ============================================================================

function raceWithCancel(cancellables) {
    return new Promise((resolve, reject) => {
      let settled = false;
  
      cancellables.forEach(({ promise, cancel }) => {
        promise.then(value => {
          if (!settled) {
            settled = true;
            // cancel all other promises
            cancellables.forEach(c => c.cancel?.());
            resolve(value);
          }
        }).catch(err => {
          if (!settled) {
            settled = true;
            cancellables.forEach(c => c.cancel?.());
            reject(err);
          }
        });
      });
    });
  }

const task1 = cancellablePromise(res => setTimeout(() => res("Task1 done"), 2000));
const task2 = cancellablePromise(res => setTimeout(() => res("Task2 done"), 3000));
const task3 = cancellablePromise(res => setTimeout(() => res("Task3 done"), 1000));

raceWithCancel([task1, task2, task3])
  .then(result => console.log("Winner:", result))
  .catch(err => console.log("Error:", err));


  
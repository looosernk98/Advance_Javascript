
function cancellablePromise(executor){
  let cancel;
  const promise = new Promise((res, rej) => {
    cancel = () => {
        rej(new Error("cancelled")) // reject promise only but work still continue - setTimeout will run
    }
    executor(res, rej)
  })

  return {
    cancel, promise
  }
}
/*

Important point:

cancel is not magical.

It’s just:
-> A function stored in a variable.
-> That function holds a reference (closure) to the promise’s rej callback.
-> When you call it, it rejects the promise.

✅ So internally cancel works because it’s closing over the rej function that new 
   Promise gave you.
*/

const { promise, cancel} = cancellablePromise((res, rej) => {
    setTimeout(() => {
       res(100)
       console.log("Resolved") // this will be printed evne after cancelling promise
    }, 3000)
})

promise.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log("caught: ", err)
})

setTimeout(() => {
   cancel()
}, 1000)

// ******************* Fix: Cancellable promise with actual work cancellation *******

function cancellablePromise(executor) {
  const controller = new AbortController();
  const { signal } = controller;

  let rejectRef;

  const promise = new Promise((resolve, reject) => {
    rejectRef = reject;

    // Pass signal to executor so it can cancel work
    executor(resolve, reject, signal);
  });

  const cancel = () => {
    controller.abort(); // cancel underlying work
    rejectRef?.(new Error("Cancelled")); // reject promise
  };

  return { promise, cancel };
}

const { promise, cancel } = cancellablePromise((resolve, reject, signal) => {

  const id = setTimeout(() => {
    resolve("Done");
    console.log("Resolved") // will not be printed
  }, 3000);

  signal.addEventListener("abort", () => {
    clearTimeout(id); // ✅ stop actual work
  });
});

setTimeout(cancel, 1000);

promise
  .then(console.log)
  .catch(err => console.log(err.message));
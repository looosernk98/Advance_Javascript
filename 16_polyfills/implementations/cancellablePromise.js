
function cancellablePromise(executor){
  let cancel;
  const promise = new Promise((res, rej) => {
    cancel = () => {
        rej(new Error("cancelled"))
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
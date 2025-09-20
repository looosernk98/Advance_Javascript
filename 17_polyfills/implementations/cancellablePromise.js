
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
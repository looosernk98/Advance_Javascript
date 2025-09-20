
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
  
    function MyPromise(executor) {
      let state = PENDING;
      let value = null;
      let thenCbs = [];
      let catchCbs = [];
  
      function runCallbacks() {
        if (state === FULFILLED) {
          thenCbs.forEach(cb => cb(value));
        } else if (state === REJECTED) {
          catchCbs.forEach(cb => cb(value));
        }
        thenCbs = [];
        catchCbs = [];
      }
  
      function resolve(val) {
        if (state !== PENDING) return;
        state = FULFILLED;
        value = val;
        setTimeout(runCallbacks, 0);
      }
  
      function reject(err) {
        if (state !== PENDING) return;
        state = REJECTED;
        value = err;
        setTimeout(runCallbacks, 0);
      }
  
      this.then = function (thenCb) {
        return new MyPromise((resolveNext, rejectNext) => {

          function handleThen(val) {
            try {
              const result = thenCb(val);
              if (result instanceof MyPromise) {
                result.then(resolveNext).catch(rejectNext);
              } else {
                resolveNext(result);
              }
            } catch (e) {
              rejectNext(e);
            }
          }
  
          if (state === FULFILLED) {
            setTimeout(() => handleThen(value), 0);
          } else if (state === PENDING) {
            thenCbs.push(handleThen);
          }
  
          if (state === REJECTED) {
            // propagate rejection
            setTimeout(() => rejectNext(value), 0);
          }
        });
      };
  
      this.catch = function (catchCb) {
        return new MyPromise((resolveNext, rejectNext) => {
          function handleCatch(err) {
            try {
              const result = catchCb(err);
              if (result instanceof MyPromise) {
                result.then(resolveNext).catch(rejectNext);
              } else {
                resolveNext(result);
              }
            } catch (e) {
              rejectNext(e);
            }
          }
  
          if (state === REJECTED) {
            setTimeout(() => handleCatch(value), 0);
          } else if (state === PENDING) {
            catchCbs.push(handleCatch);
          }
  
          if (state === FULFILLED) {
            // propagate fulfillment
            setTimeout(() => resolveNext(value), 0);
          }
        });
      };
  
      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
  
  
  // new MyPromise((resolve, reject) => {
  //   setTimeout(() => resolve("Hello after 1 sec!"), 1000);
  // })
  // .then(data => {
  //   console.log(data);
  //   return "Next then!";
  // })
  // .then(msg => {
  //   console.log(msg);
  // })
  // .catch(err => {
  //   console.error("Error:", err);
  // });
  const p = new MyPromise((res, rej) => {
    setTimeout(function() {
      res(10)
    }, 3000);
})
  p.then((result) => {

    console.log(result)
    // return "Hello"
    return new MyPromise((res, rej) => {
        rej("my error")
    })
  
})
.then((res) => {
    console.log(res);
})
.catch((err) => {
  console.log(err);
})
  
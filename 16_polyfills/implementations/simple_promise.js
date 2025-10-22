
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(cb){
    let state = PENDING;
    let value = null
    let thenCbs = [];
    let catchCbs = [];
    
    function runAllCallbacks(){
        console.log("runAllCallbacks");
      
      if(state == FULFILLED){
        console.log("runAllCallbacks, FULFILLED");
        thenCbs.forEach((callback) => callback(value))
        thenCbs = [] // clear after running
      }

      if(state == REJECTED){
        catchCbs.forEach((callback) => callback(value))
        catchCbs = []
      }
    }

    function resolve(val){
      console.log('resolve: BEFOPRE ', state, val);
      if(state !== PENDING) return;
      value = val;
      state = FULFILLED;
      console.log('resolve: AFTER ', resolve);

      runAllCallbacks()
    }

    function reject(val){
        if(state !== PENDING) return;
        value = val;
        state = REJECTED;
        runAllCallbacks()
    }
    
    // this.then = function(successCb) {
    //     console.log("Inside then");
    // //    return new MyPromise((res) => {
    //     if(state == FULFILLED){
    //     console.log("Inside then if cond");

    //         successCb(value)
    //      }else{
    //     console.log("Inside then else cond");

    //         thenCbs.push(successCb)
    //      }
    // //    })
    // //    runAllCallbacks()

    //    return this
    // }
    this.then = function(successCb) {
        return new MyPromise((resolve, reject) => {
          function handleCallback() {
            try {
              const result = successCb(value);
              // If result is a promise, wait for it
              if (result instanceof MyPromise) {
                result.then(resolve).catch(reject);
              } else {
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          }
      
          if (state === FULFILLED) {
            handleCallback();
          } else if (state === PENDING) {
            thenCbs.push(() => handleCallback());
          } else if (state === REJECTED) {
            // Propagate rejection if no success callback can handle it
            reject(value);
          }
        });
      };
      

    // this.catch = function(failureCb) {
    // //    return new MyPromise((res, rej) => {
    //     if(state == REJECTED){
    //         failureCb(value)
    //      }else{
    //         catchCbs.push(failureCb)
    //      }
    // //    })
    // //   runAllCallbacks()
    //   return this
    // }

    this.catch = function(failureCb) {
        return new MyPromise((resolve, reject) => {
          function handleCallback() {
            try {
              const result = failureCb(value);
              if (result instanceof MyPromise) {
                result.then(resolve).catch(reject);
              } else {
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          }
      
          if (state === REJECTED) {
            handleCallback();
          } else if (state === PENDING) {
            catchCbs.push(() => handleCallback());
          }
        });
      };
      

    // intitialization
    cb(resolve, reject)
    // then = then.bind(this)
 
}

const p = new MyPromise((res, rej) => {
    console.log("Inside custom promise");
    setTimeout(() => {
        console.log("setTimeout");
        rej(100)
    }, 5000)
})

p.then((res) => {
    console.log('result: ', res);
    return 20
})
.then((res2) => {
    console.log('res2: ', res2);
    console.log("END");
})
.catch((err) => {
    console.log('err: ', err);
})

// function MyPromise(executor) {
//     let onResolve;
//     let onReject;
//     let isFulfilled = false;
//     let isRejected = false;
//     let isCalled = false; // indicates callback has been called
//     let value;
//     let error;

//     function resolve(val) {
//         isFulfilled = true;
//         value = val;
//         if (typeof onResolve === 'function' && !isCalled) {
//             onResolve(val);
//             isCalled = true;
//         }
//     }

//     function reject(err) {
//         isRejected = true;
//         error = err;
//         if (typeof onReject === 'function' && !isCalled) {
//             onReject(err);
//             isCalled = true;
//         }
//     }

//     then = function (thenHandler) {
//         onResolve = thenHandler;
//         if (!isCalled && isFulfilled) {
//             onResolve(value);
//             isCalled = true;
//         }
//         return this;
//     };

//     catch = function (catchHandler) {
//         onReject = catchHandler;
//         if (!isCalled && isRejected) {
//             onReject(error);
//             isCalled = true;
//         }
//         return this;
//     };

//     executor(resolve, reject);
// }

// const p = new MyPromise((res, rej) => {
//     setTimeout(() => {
//         res(100)
//     }, 5000)
// })

// p.then((res) => {
//     console.log('result: ', res);
// })
// .catch((err) => {
//     console.log('err: ', err);
// })


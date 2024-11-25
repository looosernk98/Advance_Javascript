
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
      }

      if(state == REJECTED){
        catchCbs.forEach((callback) => callback(value))
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
    
    this.then = function(successCb) {
        console.log("Inside then");
    //    return new MyPromise((res) => {
        if(state == FULFILLED){
        console.log("Inside then if cond");

            successCb(value)
         }else{
        console.log("Inside then else cond");

            thenCbs.push(successCb)
         }
    //    })
    //    runAllCallbacks()

       return this
    }

    this.catch = function(failureCb) {
    //    return new MyPromise((res, rej) => {
        if(state == REJECTED){
            failureCb(value)
         }else{
            catchCbs.push(failureCb)
         }
    //    })
    //   runAllCallbacks()
      return this
    }

    // intitialization
    cb(resolve, reject)
    // then = then.bind(this)
 
}

const p = new MyPromise((res, rej) => {
    console.log("Inside custom promise");
    setTimeout(() => {
        console.log("setTimeout");
        res(100)
    }, 2000)
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


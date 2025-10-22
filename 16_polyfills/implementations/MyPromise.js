
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor){
    let state = PENDING;
    let value = null;
    let thenCbs = [];
    let catchCbs = [];

    function runAllCallbacks(){
       if(state === FULFILLED){
          thenCbs.forEach((cb) => cb(value))
       }

       if(state === REJECTED){
        catchCbs.forEach((cb) => cb(value))
       }

       thenCbs = [];
       catchCbs = [];
    }

    function resolve(val){
      if(state !== PENDING) return;

      value = val;
      state = FULFILLED;

      runAllCallbacks()

    }

    function reject(val){
        if(state !== PENDING) return;

        value = val;
        state = REJECTED;
  
        runAllCallbacks()
    }

    this.then = function(successCb){
      return new MyPromise((resolveNext, rejectNext) => {

        function handleThen(value){
            const result = successCb(value);
        
            try {
                if(result instanceof MyPromise){
                    result.then(resolveNext).catch(rejectNext)
                }else{
                    resolveNext(value)
                }
            } catch (error) {
                rejectNext(error)
            }
        }

        if(state === FULFILLED){
           handleThen(value)
        }

        if(state === PENDING){
           thenCbs.push(handleThen)
        }

        if(state === REJECTED){
           rejectNext(value);
        }

      })
    }

    this.catch = function(failureCb){
        return new MyPromise((resolveNext, rejectNext) => {

            function handleCatch(err){
                const result = failureCb(err);
            
                try {
                    if(result instanceof MyPromise){
                        result.then(resolveNext).catch(rejectNext)
                    }else{
                        resolveNext(err)
                    }
                } catch (error) {
                    rejectNext(error)
                }
            }
    
            if(state === FULFILLED){
               resolveNext(value)
            }
    
            if(state === PENDING){
               catchCbs.push(handleCatch)
            }
    
            if(state === REJECTED){
               handleCatch(value)
            }
    
          })
    }

    executor(resolve, reject)
}


const p = new MyPromise((res, rej) => {
    setTimeout(function() {
      res(10)
    }, 3000);
})

// Ist way

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

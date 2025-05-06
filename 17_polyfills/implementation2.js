// polyfill of promise.race

const myRace = function(arr){
   return new Promise((resolve, reject) => {
    for(let i =0; i<arr.length; i++){
        arr[i].then((result) =>  resolve(result))
        .catch((err) => {
            reject(err)
        })

        // Promise.resolve(arr[i]).then(resolve, reject)
     }
   })
}

const p1 = new Promise((res, rej) => {
    setTimeout(() => {
       res("resolve after 1 sec")
    }, 2000)
})
const p2 = new Promise((res, rej) => {
    setTimeout(() => {
       res("resolve after 1 sec")
    }, 1000)
})
const p3 = new Promise((res, rej) => {
    setTimeout(() => {
       rej("reject after 0.5 sec")
    }, 500)
})

const promise = myRace([p1,p2,p3])

promise.then((res) =>{
    console.log('res: ', res);
})
.catch((err) =>{
    console.log('err: ', err);

})
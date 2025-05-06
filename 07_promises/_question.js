/*
https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/its-quiz-time
  https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/what-is-asynchronous-in-javascript
  https://github.com/Narahari-Sundaragopalan/JavaScript-Interview-Questions/blob/master/concepts/Promises.md
  https://eishta.medium.com/javascript-tricky-questions-promises-12c1ebeff20c
  https://levelup.gitconnected.com/vimp-javascript-promise-implementation-challenges-5a4f120d8606
*/



//Q1. What’s the output of the code below?

let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => reject(2), 1000);
    
    // setTimeout(() => reject(2), 1000);
    // resolve(1);
  });
  
promise.then((res) => {
  console.log('res: ', res);
})
.catch((err) => {
  console.log('err: ', err);
})

/*
  Why does reject(2) not trigger .catch()?

-> Because once a Promise is settled (either resolved or rejected), it becomes 
  immutable — its state is locked in and can't be changed.
-> Only the first call to either resolve or reject takes effect. All subsequent 
  calls are ignored.

*/

// REVERSE CASE
let promise2 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(2), 1000);
  resolve(1);
});
promise2.then((res) => {
  console.log('res: ', res);
})
.catch((err) => {
  console.log('err: ', err);
})

// You'll still see res: 1, because resolve(1) runs immediately before the timeout.

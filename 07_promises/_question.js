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
  });
  
promise.then((res) => {
  console.log('res: ', res);
})
.catch((err) => {
  console.log('err: ', err);
})
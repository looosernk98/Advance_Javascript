
//========================================================================

// 1. What happens if a promise resolves to another promise?
//    What is the output? Why?

const promise1 = Promise.resolve(Promise.resolve(42));
promise1.then(console.log);


/* 

Q1. what if API calls take more time than delay passed in setTimeout which one 
   will run first b/w handler of API call and handler of setTimeout

If the API call resolves faster than the setTimeout delay, its callback runs 
first due to the event loop's microtask prioritization.

If the API call takes longer than the timeout delay, the setTimeout handler 
executes first.

*/

//========================================================================

// 2. What is the difference between microtasks and macrotasks in the context of 
// Promises? How does it affect code execution?

console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');

//========================================================================
// 3. Can you explain the difference between chaining Promises vs nesting 
// Promises? What are the implications?

// Compare the behavior of the below two code blocks.

Promise.resolve(1)
    .then(value => {
        return Promise.resolve(value + 1);
    })
    .then(console.log);

Promise.resolve(1).then(value => {
    Promise.resolve(value + 1).then(console.log);
});


//========================================================================
// 4. How does async/await handle errors differently from Promises?
// How is error handling in async/await internally implemented? What happens 
// if a .catch is not provided?

async function example() {
    throw new Error('Error inside async');
}

example().catch(err => console.log('Caught:', err.message));


//========================================================================
// 5. What is the difference between await Promise.all() vs await 
// Promise.allSettled() in terms of behavior and use cases?
(async() => {
    const promises = [
        Promise.resolve(1),
        Promise.reject('Error'),
        Promise.resolve(3),
    ];
    const resultAll = await Promise.all(promises).catch(console.log);
    const resultAllSettled = await Promise.allSettled(promises);
    console.log(resultAllSettled);
})()


//========================================================================

// 6. What happens when await is used inside a loop?
// Is this concurrent or sequential execution? How can you improve concurrency?

async function loopExample() {
    for (let i = 0; i < 3; i++) {
        console.log(`Start ${i}`);
        await new Promise(res => setTimeout(res, 1000));
        console.log(`End ${i}`);
    }
}
loopExample();


//========================================================================
// 7. How can you achieve true parallelism in JavaScript, given that it runs on 
// a single thread?

// Hint: Discuss the role of Web Workers, Worker Threads, and native APIs like setTimeout for managing concurrency.



//========================================================================
// 8. Explain how to implement a promise pool for limiting the number of 
//    concurrently executed Promises.

// How would you handle a scenario where you want to process 100 tasks but only allow 5 concurrent promises at any given time?

async function runWithConcurrencyLimit(tasks, limit = 5) {
    const results = [];
    let i = 0;
  
    async function worker() {
      while (i < tasks.length) {
        const currentIndex = i++;
        const result = await tasks[currentIndex]();
        results[currentIndex] = result;
      }
    }
  
    // Start `limit` workers
    const workers = [];
    for (let j = 0; j < limit; j++) {
      workers.push(worker());
    }
  
    await Promise.all(workers);
    return results;
}

  const tasks = Array.from({ length: 100 }, (_, i) => () =>
    new Promise(res => setTimeout(() => res(i), 1000))
  );

runWithConcurrencyLimit(tasks, 5).then(results => {
  console.log("All done", results);
});

// ✅ Key Notes

// This pattern is important when:

// Calling APIs with rate limits.

// Downloading large files concurrently.

// Heavy CPU / memory operations in Node.

// The first approach is pure JS, works anywhere.

// Libraries like p-limit are more readable and handle edge cases well.

//========================================================================
// 9. What are the subtle differences between Promise.all(), Promise.race(), 
// Promise.any(), and Promise.allSettled()?
const promises = [
    new Promise((res) => setTimeout(() => res('A'), 100)),
    new Promise((res, rej) => setTimeout(() => rej('B'), 50)),
    new Promise((res) => setTimeout(() => res('C'), 10)),
];

const all = Promise.all(promises).catch(console.log);
const race = Promise.race(promises);
const any = Promise.any(promises).catch(console.log);
const allSettled = Promise.allSettled(promises);

all.then(console.log);
race.then(console.log);
any.then(console.log);
allSettled.then(console.log);


//========================================================================
// 10. What are the downsides of using Promise.all() in real-world applications? 
// How do you mitigate these?
// Discuss scenarios where a single rejection can crash the entire operation, 
// and explore alternatives like Promise.allSettled().


//========================================================================
// 11. How do you handle a dynamic list of promises, where some need to be 
// retried on failure?
// Question: Improve this code to support a configurable number of retries per promise.

const fetchData = (url) => fetch(url).catch(() => fetch(url));
const urls = ['url1', 'url2', 'url3'];

const retryPromises = urls.map(fetchData);
Promise.all(retryPromises).then(console.log);



//========================================================================
// 12. How would you use Promise.race() to implement a timeout for an async 
// operation?
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject('Timeout!'), ms)
    );
    return Promise.race([promise, timeout]);
}

const delayedPromise = new Promise((res) => setTimeout(() => res('Done!'), 2000));
withTimeout(delayedPromise, 1000).catch(console.log);



//========================================================================
// 13. How would you implement a custom Promise.all()?
// Question: Write a function that mimics Promise.all()'s behavior without using 
// the built-in method.


//========================================================================
// 14. How do you combine Promise.race() and Promise.any() for fallback logic 
// in requests?


//========================================================================
// 15. How does async/await work under the hood with the event loop and 
// microtasks?

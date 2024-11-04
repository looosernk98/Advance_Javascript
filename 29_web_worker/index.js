/*
Web Workers makes it possible to run a script operation in a background thread 
separate from the main execution thread of a web application. The advantage of 
this is that laborious processing can be performed in a separate thread, 
allowing the main (usually the UI) thread to run without being blocked/slowed down.

Web Workers are a simple means for web content to run scripts in background 
threads. The worker thread can perform tasks without interfering with the user
interface. In addition, they can make network requests using the fetch() or 
XMLHttpRequest APIs. Once created, a worker can send messages to the JavaScript 
code that created it by posting messages to an event handler specified by that 
code (and vice versa).

For long heavy calculations that shouldn’t block the event loop, we can use 
Web Workers.

That’s a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own 
variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for 
calculations, to use multiple CPU cores simultaneously.
*/


/* 
 A worker is an object created using a constructor (e.g. Worker()) that runs a 
 named JavaScript file — this file contains the code that will run in the worker 
 thread.

 Data is sent between workers and the main thread via a system of messages — both 
 sides send their messages using the postMessage() method, and respond to 
 messages via the onmessage event handler (the message is contained within the 
 message event's data property). The data is copied rather than shared.
*/

/**************************** Worker Types ***************************/

/*

1. Dedicated workers: are workers that are utilized by a single script. This 
            context is represented by a DedicatedWorkerGlobalScope object.

2. Shared workers: are workers that can be utilized by multiple scripts running 
          in different windows, IFrames, etc., as long as they are in the same 
          domain as the worker. They are a little more complex than dedicated 
          workers — scripts must communicate via an active port.

3. Service Workers: essentially act as proxy servers that sit between web 
          applications, the browser, and the network (when available). They are 
          intended, among other things, to enable the creation of effective 
          offline experiences, intercept network requests and take appropriate 
          action based on whether the network is available, and update assets 
          residing on the server. They will also allow access to push notifications 
          and background sync APIs.

*/


const dataButton = document.querySelector('.data-btn')
const bgButton = document.querySelector('.bg-btn')

// it will block the UI as JS is single threaded, backgound color will not be change untill this heavy calculation is done
// dataButton.addEventListener('click', () => {
//     let sum = 0;
//     for(let i =0; i<1000_000_000_0; i++){
//        sum += i
//     }
//     alert(sum)
// })


// optimization using web worker
dataButton.addEventListener('click', () => {
   
    const worker = new Worker('worker.js')

    worker.postMessage("start, worker")

    worker.onmessage = (event) => {
      console.log('message received',event.data);
      alert(event.data)
    }

})



bgButton.addEventListener('click', () => {
    if(document.body.style.background == 'green'){
        document.body.style.background = 'yellow' 
    }else{
        document.body.style.background = 'green' 
    }
})

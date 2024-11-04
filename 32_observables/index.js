/*

Observables are a core concept in Reactive Programming, used extensively in 
frameworks like RxJS and Angular. They provide a way to handle asynchronous 
data streams and events. An Observable can emit multiple values over time, 
which can be listened to (or "observed") by subscribers.


How Observables Work:

-> An Observable is a function that sets up an observation, allowing you to 
   subscribe to a data source.
-> A Subscriber is a consumer that gets notified when the Observable emits data, 
   completes, or encounters an error.
-> The key point is that an Observable can emit multiple values asynchronously.

*/

import { Observable } from 'rxjs';

// Create an Observable that emits values over time
const myObservable = new Observable(observer => {
  observer.next('First value');
  observer.next('Second value');
  
  setTimeout(() => {
    observer.next('Value after 2 seconds');
    observer.complete();
  }, 2000);
});

// Subscribe to the Observable to receive values
myObservable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Observable complete!')
});


/*
 OUTPUT: 

 First value
 Second value
 Value after 2 seconds
 Observable complete!
*/


//********************* Observables vs Promises ***************************/

/*
 Observables and Promises are both used to handle asynchronous operations in 
 JavaScript, but they have significant differences in behavior and use cases.

1. Handling Multiple Values:

  Promise: A Promise can only handle one single value (or error) and cannot 
         emit multiple values over time.
  Observable: An Observable can emit multiple values or errors over time, 
            making it more suitable for data streams, like handling events or 
            WebSocket connections.

2. Lazy vs. Eager Execution:
   Promise: A Promise starts executing immediately when it is created. It's 
            eager, which means it will run regardless of whether you attach .
            then() handlers.
   Observable: An Observable is lazy. It does not start emitting values until 
               there is a subscription. You have full control over when the data 
               stream starts.

3. Cancellation:
   Promise: A Promise cannot be canceled once it has started executing.
   Observable: An Observable can be canceled or unsubscribed from, which can be 
               useful for cleaning up resources and stopping data streams when 
               they are no longer needed.

4. Operators and Functional Composition:
   Promise: Promises are simpler and provide methods like .then(), .catch(), 
            and .finally() for chaining operations.
   Observable: Observables come with a wide range of operators (like map, 
              filter, merge, debounce, etc.) that make complex asynchronous 
              operations easier to compose and manage.

*/


/************************** When to Use Observables vs. Promises *************************/
/*
  Use Promises: When you only need to handle a single asynchronous value, like 
                making an HTTP request or loading a resource.
  Use Observables: When you need to handle multiple asynchronous events over 
               time, like user input events, WebSocket connections, or streams 
               of data.
*/
/*

 he AbortController interface represents a controller object that allows you to 
 abort one or more Web requests as and when desired.

 You can create a new AbortController object using the AbortController() constructor.

 Communicating with an asynchronous operation is done using an AbortSignal object.

Constructor:
 - AbortController() : Creates a new AbortController object instance.

Instance properties:
- AbortController.signal (Read only): Returns an AbortSignal object instance, which
          can be used to communicate with, or to abort, an asynchronous operation.

Instance methods:
- AbortController.abort(): Aborts an asynchronous operation before it has completed.
        This is able to abort fetch requests, consumption of any response bodies, 
        and streams.

IMPORTANT POINTS:

1. If the async task (e.g., a fetch) has already completed, calling abort() later 
   has no effect on that completed operation.
2. controller.abort() only affects in-flight (pending) operations.
3. If the promise is already resolved or rejected, it’s settled → cannot be changed.
4. The abort just flips signal.aborted = true and notifies listeners, but your 
   finished task is unaffected.
*/
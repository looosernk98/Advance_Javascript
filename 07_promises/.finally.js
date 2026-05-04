
/*
The finally() method of Promise instances schedules a function to be called when 
the promise is settled (either fulfilled or rejected). It immediately returns 
another Promise object, allowing you to chain calls to other promise methods.

this method is usually intended for cleanup actions, regardless of the promise's 
outcome, acting as a "pass-through" for the data. It lets you avoid duplicating code in both the promise's then() and 
catch() handlers.

*/

Promise.resolve("done")
.finally(() => {
     console.log("Cleanup"); 
}) .then(console.log)

/*

OUTPUT: 
Cleanup
done

Why it works this way:

1. Promise.resolve("done"): Creates a promise that is immediately fulfilled with the 
   value "done".

2. .finally(() => { ... }): The finally block runs as soon as the promise 
    settles (whether it's fulfilled or rejected). Importantly, finally does not 
    receive the promise's value, and unless it throws an error or returns a 
    rejected promise, it passes the original fulfillment value through to 
    the next link in the chain.Action: 
      It logs "Cleanup" first.

3. .then(console.log): This block receives the value passed through from the 
    finally block, which is "done".Action: 
     It logs "done"

*/
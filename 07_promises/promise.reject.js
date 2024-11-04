/*
 Promise.reject(reason) returns a Promise that is immediately rejected with 
 the given reason. This method is helpful when you need to create a Promise 
 that represents a failure or error state.
*/

const rejectedPromise = Promise.reject("Something went wrong!");

rejectedPromise.catch(reason => {
  console.error(reason); // Output: "Something went wrong!"
});


/*
 How It Works:
-> The reason can be any value, usually an Error object or a string that 
   describes what went wrong.
-> The returned Promise will be rejected immediately, and the rejection will be 
   handled in a .catch() block.
*/

const errorPromise = Promise.reject(new Error("Custom error message"));

errorPromise.catch(error => {
  console.error(error.message); // Output: "Custom error message"
});


// **************** Example ***********************************

function getUserData(isSuccessful) {
    if (isSuccessful) {
      return Promise.resolve({ name: "John Doe", age: 30 });
    } else {
      return Promise.reject("Failed to fetch user data");
    }
  }
  
  getUserData(true)
    .then(data => console.log("User data:", data))
    .catch(error => console.error("Error:", error));
  
  getUserData(false)
    .then(data => console.log("User data:", data))
    .catch(error => console.error("Error:", error));
  
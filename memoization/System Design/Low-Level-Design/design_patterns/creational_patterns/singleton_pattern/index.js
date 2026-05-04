/*

The Singleton Pattern is a creational design pattern that ensures a class has only 
one immutable instance and provides a global point of access to that instance. 

This pattern is especially useful when you want to limit the number of instances 
of a class in your application and control access to a single shared instance.

Let's say for example we want to have all of our app's configuration in a single 
object. And we want to disallow any duplication or modification of that object.
*/

let instance = null;

class Singleton {
    constructor() {
      if (!instance) {
        instance = this;
        
        // Your initialization code here
      } else {
        // throw new Error("You can only create one instance!");
        return instance;
      }
    }
  
    // Your methods and properties here
}

const instanceA = new Singleton();
const instanceB = new Singleton();

console.log(instanceA === instanceB); // Output: true (both variables reference the same instance)

/*

In this example, we create a Singleton class with a constructor that checks if an 
instance already exists. If an instance doesn't exist, it creates one and assigns it 
to the instance variable. Subsequent calls to the constructor return the existing 
instance, ensuring that there's only one instance of the Singleton class.

*/
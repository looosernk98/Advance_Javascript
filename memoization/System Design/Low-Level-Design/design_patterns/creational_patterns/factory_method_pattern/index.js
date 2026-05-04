/*

 The Factory Pattern is a creational pattern that provides an interface for 
 creating objects but allows subclasses to alter the type of objects that will 
 be created. It encapsulates the object creation process, making it more flexible 
 and decoupled from the client code.

 OR

The Factory Pattern in JavaScript is a creational design pattern used to create 
objects without exposing the creation logic and to decide which object to 
create at runtime.
 
*/

/*************************************************
 * CONCRETE CLASSES
 * -----------------------------------------------
 * These are the actual implementations.
 * They contain the real business logic.
 * Can be changed without touching client code
 *************************************************/

class EmailNotification{
  send(msg){
    console.log("user notified via email: ", msg)
  }
}

class SMSNotification{
   send(msg){
    console.log("user notified via SMS: ", msg)
   }
}


/*************************************************
 * FACTORY
 * -----------------------------------------------
 * Responsible ONLY for object creation.
 * Hides the concrete class instantiation logic.
 * Centralized object creation
 * Applies Open–Closed Principle
 * Client never uses "new" keyword directly
 *************************************************/

class NotificationFactory{
  
  static create(type){
    switch(type){
      case 'EMAIL':
        return new EmailNotification();
      
      case 'SMS':
        return new SMSNotification();

      default:
        throw Error("Invalid type")
    }
   
  }
}

/*************************************************
 * CLIENT CODE
 * -----------------------------------------------
 * Uses the factory.
 * Does NOT know or care about concrete classes.
 * Depends on factory, not concrete classes
 * Loosely coupled
 * Easy to test and extend
 *************************************************/

const emailNotification = NotificationFactory.create("SMS")
emailNotification.send("Hi, prices dropped for your product")


/*

In this example, the ProductFactory is responsible for creating instances of the 
Product class. It abstracts the creation process, allowing you to create different
types of products by extending the factory.

🔁 Without Factory (tight coupling ❌)

const notifier = new EmailNotification(); // ❌ client tied to concrete class

Problems:
- Hard to change
- Hard to extend
- Violates Dependency Inversion Principle

*/

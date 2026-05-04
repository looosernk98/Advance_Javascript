/*

The Observer Pattern is a behavioral design pattern where multiple observers 
subscribe to a subject, and are automatically notified whenever the subject’s 
state changes.

Observer pattern defines a one-to-many dependency so that when one 
object changes state, all its dependents are notified.

🔹 When to use Observer

Use it when:
- Multiple parts of the app must react to the same change
- You want loose coupling
- Events should be broadcast automatically
- You want dynamic subscribe / unsubscribe

Real-world examples
- Event listeners
- Pub/Sub systems
- Redux store subscriptions
- UI updates
- WebSocket listeners

# Subject maintains observer list
# Observers react to updates
*/

// 1️⃣ Observer Interface (Conceptual)
class Observer{
    update(data){
        throw new Error("update() must be implemented");
    }
}

// 2️⃣ Concrete Observers 
class EmailObserver extends Observer{
    update(data){
      console.log("📧 Email Sent: ", data)
    }
}

class SMSObserver extends Observer{
    update(data){
      console.log("✉️ SMS Sent: ", data)
    }
}

// 3️⃣ Subject (Publisher)
class Subject{
    constructor(){
        this.observers = []
    }

    subscribe(observer){
      this.observers.push(observer)
    }

    unsubscribe(observer){
        this.observers = this.observers.fillter(ob => ob !== observer)
    }
    
    notify(data){
        this.observers.forEach((observer) => observer.update(data))
    }
    
}

// 4️⃣ Client Code

const subject = new Subject();

const emailObserver = new EmailObserver();
const smsObserver = new SMSObserver();

subject.subscribe(emailObserver)
subject.subscribe(smsObserver)

// subject.notify("OTP is 12345")
subject.notify("Order Placed")

/*

🔍 What’s happening?
- Subject doesn’t know observer details
- Observers can be added/removed dynamically
- All observers are notified on change
- follows Open/Closed principle

*/

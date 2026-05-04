/*
 The Facade pattern provides a simple interface to a complex subsystem.

 Facade pattern hides system complexity by exposing a simplified interface to the 
 client.

 Use case: Simplifying interactions with multiple classes.

 🔹 When to use Facade

Use it when:
- A system has many classes / complex interactions
- Clients should not depend on internal details
- You want to decouple client from subsystem
- You want a clean API boundary

Real examples
- SDKs (Stripe, AWS)
- Service layers
- Database repositories
- UI controllers
- Video players (play, pause hides internals)

🔹 Problem without Facade ❌

  const auth = new AuthService();
  auth.login();

  const payment = new PaymentService();
  payment.validate();
  payment.pay();

  const notification = new EmailService();
  notification.send();

❌ Client knows too much → tight coupling 😵

*/


// 1️⃣ Subsystem Classes (Complex internals)

class AuthService{
  login(){
    console.log("User authenticated");
  }
}

class PaymentService{
  pay(){
    console.log("Payment processed");
  }
}

class EmailService{
  sendEmail(){
    console.log("Email sent");
  }
}

// 2️⃣ Facade (Simplified Interface)

class OrderFacade{
  placeOrder(){
    const auth = new AuthService();
    auth.login();

    const paymentProcessor = new PaymentService();
    paymentProcessor.pay();

    const email = new EmailService();
    email.sendEmail();

    console.log("order placed successfully");
  }
}

// 3️⃣ Client Code

const order = new OrderFacade();
order.placeOrder()

// 🔍 Key Observations:
// - Client doesn’t know subsystem details
// - Facade does not replace subsystems
// - Subsystems can still be used directly (if needed)
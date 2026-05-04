/*
 The Adapter pattern allows incompatible interfaces to work together by acting 
 as a bridge. 

  Use case: When integrating a third-party API that has a different method 
           signature.
  
🔹 When to use Adapter Pattern

Use it when:
- You want to reuse existing code
- A third-party library has a different interface
- Client code expects a specific API
- You want to avoid modifying legacy code

*/

// paypal has it's own payment mechanism (payViaPaypal)
class PayPal{
  payViaPaypal(amt){
     console.log("payment done by paypal", amt);
  }
}

// raqzorpay has it's own payment mechanism (payViaRazorpay)
class RazorPay{
  payViaRazorpay(amt){
     console.log("payment done by razorpay", amt);
  }
}

// Client expects a pay() method , does not internal implementations of each payment provider

class RazorPayAdapter{
   pay(amt){
     const paymentProcessor = new RazorPay();
     paymentProcessor.payViaRazorpay(amt)
   }
}

class PayPalAdapter{
  pay(amt){
    const paymentProcessor = new PayPal();
    paymentProcessor.payViaPaypal(amt)
  }
}


// client code

const razorpay = new RazorPayAdapter()
razorpay.pay(113)

const paypal = new PayPalAdapter()
paypal.pay(223)

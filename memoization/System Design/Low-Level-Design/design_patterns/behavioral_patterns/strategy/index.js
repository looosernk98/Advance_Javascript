/*
 The Strategy Pattern is a behavioral design pattern that defines a family of 
 algorithms, encapsulates each one, and makes them interchangeable at runtime.

 Strategy pattern lets you select an algorithm’s behavior at runtime without 
 changing the client code.

 🔹 When to use Strategy

Use it when:
- You have multiple ways to perform an operation
- You want to avoid big if/else or switch blocks
- Behavior should be changeable at runtime
- You want to follow Open–Closed Principle

Real-world examples
- Payment methods (Card / UPI / Wallet)
- Sorting algorithms
- Compression (zip / rar)
- Authentication strategies
- Pricing / discount rules

*/

// 1️⃣ Strategy Interface (Conceptual)
class PaymentStrategy {
  pay(amount) {
    throw new Error("pay() must be implemented");
  }
}

// 2️⃣ Concrete Strategies
class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`💳 Paid ₹${amount} using Credit Card`);
  }
}

class UPIPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`📲 Paid ₹${amount} using UPI`);
  }
}

class WalletPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`👛 Paid ₹${amount} using Wallet`);
  }
}

// 3️⃣ Context (Uses Strategy)
class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  pay(amount) {
    this.strategy.pay(amount);
  }
}

// 4️⃣ Client Code
const payment = new PaymentContext(new UPIPayment());
payment.pay(500);

payment.setStrategy(new CreditCardPayment());
payment.pay(1000);

/*

🔍 Key Observations
- Strategies are interchangeable
- Context doesn’t know strategy details
- New strategies can be added without modifying context

*/

// 🎯 JavaScript-style Strategy (Functional)

const strategies = {
    credit: amount => console.log(`Paid ₹${amount} via Credit Card`),
    upi: amount => console.log(`Paid ₹${amount} via UPI`),
    wallet: amount => console.log(`Paid ₹${amount} via Wallet`)
  };
  
  function pay(amount, type) {
    strategies[type](amount);
  }
  
  pay(300, "upi");
  

//  references : 1.https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339
/*
Currying is more than just a functional programming exercise; it is a practical 
way to create pre-configured function factories that reduce code repetition and 
improve modularity. In the real world, you see it most often when one piece of 
information is available early (like a config) and the rest comes later 
(like user data)

USE CASES:

1. Reusable API Wrappers:
   Instead of repeating HTTP methods and base URLs, you can curry a generic request 
   function to create specialized ones.
   - Base Function: request(method, url, data)
   - Curried Use Case: Create get and post helpers once, then use them across the 
     app.

    const makeRequest = (method) => (url) => (data) => fetch(url, { method, body: JSON.stringify(data) });
    const get = makeRequest('GET');
    const post = makeRequest('POST');

    // Usage is much cleaner
    get('/profile')();
    post('/users')({ name: 'Alice' });

2. Configurable Logging & Analytics: 
   Production apps often need to log messages with different levels (INFO, ERROR) 
   or prefixes. Currying allows you to set the "level" once and reuse that specific 
   logger everywhere.
   Example: 
   const errorLogger = logger('ERROR'); 

   then simply call:
   errorLogger('Something broke').
   
3. Dynamic UI Event Handlers (React/React Native):
   In React, passing parameters to event handlers often results in messy inline 
   functions. Currying lets you "pre-fill" an ID or index, which can also help 
   with performance and cleaner JSX.
   Example: 
    <button onClick={handleDelete(item.id)}>
      Delete
    </button> 

    - where handleDelete is a curried function.

5. Domain Logic (Pricing & Validation):
   Currying is highly effective for business rules that have several layers of 
   calculation, like taxes, discounts, or shipping.E-commerce: 

   Create a applyTax function pre-filled with a specific state's tax rate 
   (e.g., const applyNYTax = calculateTax(0.08875)).
*/





// Write little code modules that can be reused and configured with ease, much 
// like what we do with npm:

function discount(price, discount) {
    return price * discount
}

// You see that in the long run, we would find ourselves calculating discount 
// with 10% on a daily basis.
// const price = discount(1500,0.10); // $150
// $1,500 - $150 = $1,350
// const price = discount(2000,0.10); // $200
// $2,000 - $200 = $1,800
// const price = discount(50,0.10); // $5
// $50 - $5 = $45
// const price = discount(5000,0.10); // $500
// $5,000 - $500 = $4,500
const price = discount(300,0.10); // $30
// $300 - $30 = $270


// We can curry the discount function, so we don’t always add the 0.10 discount:
function discount(discount) {
    return (price) => {
        return price * discount;
    }
}
const tenPercentDiscount = discount(0.1);
tenPercentDiscount(500); // $50
// $500 - $50 = $450

// Again, it happens that, some fav customers are more important than some fav customers- let’s call them super-fav customers. And we want to give 20% discount to our super-fav customers.
// We use our curried discount function:

const twentyPercentDiscount = discount(0.2);
twentyPercentDiscount(500); // 100
// $500 - $100 = $400
twentyPercentDiscount(5000); // 1000
// $5,000 - $1,000 = $4,000
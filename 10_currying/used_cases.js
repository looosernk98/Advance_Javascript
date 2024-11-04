//  references : 1.https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339


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
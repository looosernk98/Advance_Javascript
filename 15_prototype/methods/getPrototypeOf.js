function Rabbit() {}

Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

console.log("after replace whole prototype: ", rabbit.eats ); // ?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit2 = new Rabbit();
delete rabbit2.eats;


console.log("after delete:", rabbit2.eats ); // ?